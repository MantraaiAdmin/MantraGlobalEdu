import { NextRequest } from 'next/server';
import { UserRole } from '@mge/types';
import { adminCreateUserSchema } from '@mge/shared';
import { AuthError, createUserAsAdmin, getUserFromAccessToken, listUsers } from '@/lib/server/auth';
import { getBearerToken, jsonError, jsonSuccess } from '@/lib/server/api-response';

async function requireAdmin(request: NextRequest) {
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

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const page = Number(request.nextUrl.searchParams.get('page') || 1);
    const limit = Number(request.nextUrl.searchParams.get('limit') || 20);
    const result = await listUsers(page, limit);
    return jsonSuccess(result);
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    const body = await request.json();
    const parsed = adminCreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(new Error(parsed.error.errors[0]?.message || 'Invalid request'), 'Invalid request');
    }

    const user = await createUserAsAdmin(parsed.data);
    return jsonSuccess(user, 201, 'User created successfully');
  } catch (error) {
    return jsonError(error);
  }
}
