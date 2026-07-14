import { Response, NextFunction } from 'express';
import { loginSchema, registerSchema } from '@mge/shared';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { validateBody } from '../../middlewares/validate.middleware';
import { sendSuccess, sendCreated } from '../../shared/utils/response';
import { authService } from './auth.service';

export class AuthController {
  register = [
    validateBody(registerSchema),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
        const result = await authService.register(req.body);
        sendCreated(res, result, 'Registration successful');
      } catch (error) {
        next(error);
      }
    },
  ];

  login = [
    validateBody(loginSchema),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
        const result = await authService.login(req.body.email, req.body.password);
        sendSuccess(res, result, 'Login successful');
      } catch (error) {
        next(error);
      }
    },
  ];

  refresh = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      sendSuccess(res, result, 'Token refreshed');
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      sendSuccess(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  };

  profile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const profile = await authService.getProfile(req.user!.sub);
      sendSuccess(res, profile);
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
