import { NextRequest } from 'next/server';
import { UserRole } from '@mge/types';
import { AuthError, getUserFromAccessToken } from './auth';
import { getBearerToken } from './api-response';

export async function requireAdmin(request: NextRequest) {
  const token = getBearerToken(request);
  if (!token) {
    throw new AuthError('Access token required', 401, 'UNAUTHORIZED');
  }
  const user = await getUserFromAccessToken(token);
  if (user.role !== UserRole.ADMIN) {
    throw new AuthError('Insufficient permissions', 403, 'FORBIDDEN');
  }
  return user;
}

export async function requireStudent(request: NextRequest) {
  const token = getBearerToken(request);
  if (!token) {
    throw new AuthError('Access token required', 401, 'UNAUTHORIZED');
  }
  const user = await getUserFromAccessToken(token);
  if (user.role !== UserRole.STUDENT) {
    throw new AuthError('Student access required', 403, 'FORBIDDEN');
  }
  return user;
}

export function parseListQuery(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  return {
    page: Number(params.get('page') || 1),
    limit: Math.min(Number(params.get('limit') || 20), 100),
    search: params.get('search') || undefined,
    sortBy: params.get('sortBy') || undefined,
    sortOrder: (params.get('sortOrder') === 'asc' ? 'asc' : 'desc') as 'asc' | 'desc',
    role: params.get('role') || undefined,
    status: (params.get('status') as 'active' | 'inactive' | 'all' | null) || undefined,
    filterStatus: params.get('filterStatus') || undefined,
    countryId: params.get('countryId') || undefined,
    universityId: params.get('universityId') || undefined,
  };
}
