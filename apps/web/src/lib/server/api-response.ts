import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@mge/types';
import { AuthError } from '@/lib/server/auth';

export function jsonSuccess<T>(data: T, status = 200, message?: string) {
  const body: ApiResponse<T> = { success: true, data, ...(message ? { message } : {}) };
  return NextResponse.json(body, { status });
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
    error: error instanceof Error ? error.message : fallback,
  };
  return NextResponse.json(body, { status: 500 });
}

export function getBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}
