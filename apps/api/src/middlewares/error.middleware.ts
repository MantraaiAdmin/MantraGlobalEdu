import { Request, Response, NextFunction } from 'express';
import { AppError } from '@mge/shared';
import { ZodError } from 'zod';
import multer from 'multer';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      code: err.code,
      ...(err instanceof Error && 'errors' in err ? { errors: (err as AppError & { errors?: Record<string, string[]> }).errors } : {}),
    });
    return;
  }

  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'File exceeds maximum upload size of 10 MB'
      : err.message;
    res.status(400).json({ success: false, error: message, code: 'UPLOAD_ERROR' });
    return;
  }

  if (err.message?.includes('File type not allowed')) {
    res.status(400).json({ success: false, error: err.message, code: 'UPLOAD_ERROR' });
    return;
  }

  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) errors[path] = [];
      errors[path].push(issue.message);
    }
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors,
    });
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND',
  });
}
