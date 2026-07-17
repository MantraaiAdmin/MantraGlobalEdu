import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@mge/types';
import { AuthError } from '@/lib/server/auth';

export function jsonSuccess<T>(data: T, status = 200, message?: string) {
  const body: ApiResponse<T> = { success: true, data, ...(message ? { message } : {}) };
  return NextResponse.json(body, { status });
}

function sanitizeErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AuthError) {
    return error.message;
  }

  if (!(error instanceof Error)) {
    return fallback;
  }

  const message = error.message;
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

  if (isProduction) {
    if (
      message.includes('DATABASE_URL') ||
      message.includes('localhost:5432') ||
      message.includes('Prisma') ||
      message.includes('database server')
    ) {
      return 'Authentication is temporarily unavailable. Please try again shortly or contact support.';
    }
  }

  return message || fallback;
}

export function jsonError(error: unknown, fallback = 'Request failed') {
  if (error instanceof AuthError) {
    const body: ApiResponse<null> = {
      success: false,
      data: null,
      error: error.message,
    };
    return NextResponse.json(body, { status: error.status });
  }

  const body: ApiResponse<null> = {
    success: false,
    data: null,
    error: sanitizeErrorMessage(error, fallback),
  };
  return NextResponse.json(body, { status: 500 });
}

export function getBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}
