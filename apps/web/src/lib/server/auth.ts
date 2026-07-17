import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserRole as PrismaUserRole } from '@prisma/client';
import { AUTH_CONFIG, SEED_ADMIN_EMAIL } from '@mge/config';
import { UserRole, JwtPayload, AuthTokens } from '@mge/types';
import { prisma } from './prisma';
import { sendOtpEmail, sendOtpSms } from './mailer';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
const RESET_TOKEN_SECRET = process.env.JWT_RESET_SECRET || JWT_SECRET;

export const BOOTSTRAP_ADMIN_ID = 'bootstrap-admin';

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return false;
  if (process.env.VERCEL === '1' && /localhost|127\.0\.0\.1/.test(url)) {
    return false;
  }
  return true;
}

export function getBootstrapAdminUser() {
  return {
    id: BOOTSTRAP_ADMIN_ID,
    email: SEED_ADMIN_EMAIL,
    firstName: 'Vinodhini',
    lastName: 'Y.',
    phone: null as string | null,
    avatar: null as string | null,
    role: UserRole.ADMIN,
    isActive: true,
    emailVerified: true,
    createdAt: new Date(),
  };
}

export function requireDatabase() {
  if (!isDatabaseConfigured()) {
    throw new AuthError(
      'Database is not connected. Configure DATABASE_URL on the server to manage users and records.',
      503,
      'SERVICE_UNAVAILABLE'
    );
  }
}

function sanitizeUser(user: {
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

async function generateTokens(userId: string, email: string, role: UserRole): Promise<AuthTokens> {
  const payload: JwtPayload = { sub: userId, email, role };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  if (isDatabaseConfigured()) {
    await prisma.refreshToken.create({
      data: { userId, token: refreshToken, expiresAt },
    });
  }

  return { accessToken, refreshToken };
}

function generateOtp(): string {
  return String(crypto.randomInt(100000, 999999));
}

function hashOtp(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

async function deliverOtp(channel: 'email' | 'phone', target: string, otp: string) {
  if (channel === 'email') {
    await sendOtpEmail(target, otp);
    return;
  }
  await sendOtpSms(target, otp);
}

export class AuthError extends Error {
  constructor(
    message: string,
    public status = 400,
    public code = 'AUTH_ERROR'
  ) {
    super(message);
  }
}

export async function registerStudent(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
  if (existing) {
    throw new AuthError('Email already registered', 409, 'CONFLICT');
  }

  const passwordHash = await bcrypt.hash(data.password, AUTH_CONFIG.bcryptRounds);
  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: PrismaUserRole.STUDENT,
    },
  });

  await prisma.student.create({ data: { userId: user.id } });
  const tokens = await generateTokens(user.id, user.email, UserRole.STUDENT);
  return { user: sanitizeUser(user), ...tokens };
}

export async function loginUser(email: string, password: string) {
  const normalizedEmail = email.toLowerCase();

  if (!isDatabaseConfigured()) {
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;
    if (
      adminPassword &&
      normalizedEmail === SEED_ADMIN_EMAIL &&
      password === adminPassword
    ) {
      const tokens = await generateTokens(BOOTSTRAP_ADMIN_ID, SEED_ADMIN_EMAIL, UserRole.ADMIN);
      return {
        user: getBootstrapAdminUser(),
        ...tokens,
      };
    }
    throw new AuthError('Invalid email or password', 401, 'UNAUTHORIZED');
  }

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    throw new AuthError('Invalid email or password', 401, 'UNAUTHORIZED');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new AuthError('Invalid email or password', 401, 'UNAUTHORIZED');
  }

  if (!user.isActive) {
    throw new AuthError('Account is deactivated', 401, 'UNAUTHORIZED');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const tokens = await generateTokens(user.id, user.email, user.role as UserRole);
  return { user: sanitizeUser(user), ...tokens };
}

export async function requestPasswordReset(identifier: string, channel: 'email' | 'phone') {
  const normalized = identifier.trim().toLowerCase();
  const user =
    channel === 'email'
      ? await prisma.user.findUnique({ where: { email: normalized } })
      : await prisma.user.findFirst({
          where: {
            phone: {
              contains: identifier.replace(/\D/g, '').slice(-10),
            },
          },
        });

  if (!user) {
    return { message: 'If an account exists, a verification code has been sent.' };
  }

  const target = channel === 'email' ? user.email : user.phone || identifier;
  if (!target) {
    throw new AuthError('No phone number on file for this account', 400);
  }

  await prisma.passwordResetOtp.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.passwordResetOtp.create({
    data: {
      userId: user.id,
      channel,
      target,
      codeHash: hashOtp(otp),
      expiresAt,
    },
  });

  await deliverOtp(channel, target, otp);

  return { message: 'If an account exists, a verification code has been sent.' };
}

export async function verifyPasswordOtp(identifier: string, channel: 'email' | 'phone', otp: string) {
  const normalized = identifier.trim().toLowerCase();
  const user =
    channel === 'email'
      ? await prisma.user.findUnique({ where: { email: normalized } })
      : await prisma.user.findFirst({
          where: {
            phone: {
              contains: identifier.replace(/\D/g, '').slice(-10),
            },
          },
        });

  if (!user) {
    throw new AuthError('Invalid verification code', 401, 'UNAUTHORIZED');
  }

  const record = await prisma.passwordResetOtp.findFirst({
    where: {
      userId: user.id,
      channel,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!record || record.codeHash !== hashOtp(otp)) {
    throw new AuthError('Invalid or expired verification code', 401, 'UNAUTHORIZED');
  }

  await prisma.passwordResetOtp.update({
    where: { id: record.id },
    data: { usedAt: new Date() },
  });

  const resetToken = jwt.sign(
    { sub: user.id, purpose: 'password_reset' },
    RESET_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  return { resetToken };
}

export async function resetPassword(resetToken: string, password: string) {
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(resetToken, RESET_TOKEN_SECRET) as jwt.JwtPayload;
  } catch {
    throw new AuthError('Reset link expired. Please request a new code.', 401, 'UNAUTHORIZED');
  }

  if (payload.purpose !== 'password_reset' || !payload.sub) {
    throw new AuthError('Invalid reset token', 401, 'UNAUTHORIZED');
  }

  const passwordHash = await bcrypt.hash(password, AUTH_CONFIG.bcryptRounds);
  await prisma.user.update({
    where: { id: payload.sub },
    data: { passwordHash },
  });

  await prisma.refreshToken.deleteMany({ where: { userId: payload.sub } });
  return { message: 'Password updated successfully' };
}

export async function getUserFromAccessToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (payload.sub === BOOTSTRAP_ADMIN_ID) {
      if (!isDatabaseConfigured()) {
        return getBootstrapAdminUser();
      }
      const dbAdmin = await prisma.user.findFirst({
        where: { email: SEED_ADMIN_EMAIL, role: PrismaUserRole.ADMIN },
      });
      if (dbAdmin?.isActive) {
        return sanitizeUser(dbAdmin);
      }
      return getBootstrapAdminUser();
    }

    if (!isDatabaseConfigured()) {
      throw new AuthError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || !user.isActive) {
      throw new AuthError('Unauthorized', 401, 'UNAUTHORIZED');
    }
    return sanitizeUser(user);
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Unauthorized', 401, 'UNAUTHORIZED');
  }
}

export async function createUserAsAdmin(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
}) {
  requireDatabase();

  const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
  if (existing) {
    throw new AuthError('Email already registered', 409, 'CONFLICT');
  }

  const passwordHash = await bcrypt.hash(data.password, AUTH_CONFIG.bcryptRounds);
  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role as PrismaUserRole,
      emailVerified: true,
    },
  });

  if (data.role === UserRole.STUDENT) {
    await prisma.student.create({ data: { userId: user.id } });
  } else if (data.role === UserRole.COUNSELOR) {
    await prisma.counselor.create({
      data: {
        userId: user.id,
        department: 'International Admissions',
        bio: 'Mantra Global Education counselor',
        specialties: [],
      },
    });
  }

  return sanitizeUser(user);
}

export async function listUsers(options: {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: 'active' | 'inactive' | 'all';
  sortBy?: 'createdAt' | 'email' | 'firstName' | 'role' | 'lastLoginAt';
  sortOrder?: 'asc' | 'desc';
} = {}) {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy ?? 'createdAt';
  const sortOrder = options.sortOrder ?? 'desc';

  if (!isDatabaseConfigured()) {
    const bootstrap = getBootstrapAdminUser();
    return {
      data: [{
        ...bootstrap,
        lastLoginAt: null as Date | null,
      }],
      meta: {
        total: 1,
        page: 1,
        limit,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
        databaseConnected: false,
      },
    };
  }

  const where: {
    OR?: Array<{ email?: { contains: string; mode: 'insensitive' }; firstName?: { contains: string; mode: 'insensitive' }; lastName?: { contains: string; mode: 'insensitive' }; phone?: { contains: string } }>;
    role?: PrismaUserRole;
    isActive?: boolean;
  } = {};

  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { email: { contains: q, mode: 'insensitive' } },
      { firstName: { contains: q, mode: 'insensitive' } },
      { lastName: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q.replace(/\D/g, '') } },
    ];
  }

  if (options.role) {
    where.role = options.role as PrismaUserRole;
  }

  if (options.status === 'active') where.isActive = true;
  if (options.status === 'inactive') where.isActive = false;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        lastLoginAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      databaseConnected: true,
    },
  };
}

export async function updateUserAsAdmin(
  userId: string,
  data: Partial<{ firstName: string; lastName: string; phone: string; role: UserRole; isActive: boolean }>
) {
  requireDatabase();

  if (userId === BOOTSTRAP_ADMIN_ID) {
    throw new AuthError('Bootstrap admin cannot be modified without a database connection.', 400, 'BAD_REQUEST');
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...data,
      role: data.role as PrismaUserRole | undefined,
    },
  });
  return sanitizeUser(user);
}
