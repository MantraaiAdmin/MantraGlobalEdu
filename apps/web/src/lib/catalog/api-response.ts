import { NextResponse } from 'next/server';
import type { ApiResponse } from '@mge/types';

export function jsonSuccess<T>(data: T, status = 200) {
  const body: ApiResponse<T> = { success: true, data };
  return NextResponse.json(body, { status });
}

export function jsonError(message: string, status = 404) {
  const body: ApiResponse<null> = { success: false, data: null, error: message };
  return NextResponse.json(body, { status });
}
