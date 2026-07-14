import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserRole, JwtPayload, AuthTokens } from '@mge/types';
import { UserRole as PrismaUserRole } from '@prisma/client';
import { AUTH_CONFIG } from '@mge/config';
import { UnauthorizedError, ConflictError, NotFoundError } from '@mge/shared';
import { env } from '../../config/env';
import { prisma } from '../../database/prisma';
import { AuthRepository } from './auth.repository';

export class AuthService {
  constructor(private readonly repository = new AuthRepository()) {}

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role?: UserRole;
  }) {
    const existing = await this.repository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    const passwordHash = await bcrypt.hash(data.password, AUTH_CONFIG.bcryptRounds);
    const role = data.role || UserRole.STUDENT;

    const user = await this.repository.create({
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: role as PrismaUserRole,
    });

    if (role === UserRole.STUDENT) {
      await prisma.student.create({ data: { userId: user.id } });
    } else if (role === UserRole.COUNSELOR) {
      await prisma.counselor.create({ data: { userId: user.id } });
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role as UserRole);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    await this.repository.updateLastLogin(user.id);
    const tokens = await this.generateTokens(user.id, user.email, user.role as UserRole);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
      const stored = await this.repository.findRefreshToken(token);
      if (!stored || stored.expiresAt < new Date()) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      const user = await this.repository.findById(payload.sub);
      if (!user) {
        throw new NotFoundError('User');
      }

      await this.repository.deleteRefreshToken(token);
      const tokens = await this.generateTokens(user.id, user.email, user.role as UserRole);
      return { user: this.sanitizeUser(user), ...tokens };
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  async logout(refreshToken: string) {
    await this.repository.deleteRefreshToken(refreshToken);
  }

  async getProfile(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }
    return this.sanitizeUser(user);
  }

  private async generateTokens(userId: string, email: string, role: UserRole): Promise<AuthTokens> {
    const payload: JwtPayload = { sub: userId, email, role };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await this.repository.createRefreshToken(userId, refreshToken, expiresAt);

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    avatar: string | null;
    role: string;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: Date;
  }) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }
}

export const authService = new AuthService();
