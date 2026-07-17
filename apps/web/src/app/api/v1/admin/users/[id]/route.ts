import { NextRequest } from 'next/server';
import { UserRole } from '@mge/types';
import { adminUpdateUserSchema } from '@mge/shared';
import { AuthError, getUserFromAccessToken, updateUserAsAdmin } from '@/lib/server/auth';
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const body = await request.json();
    const parsed = adminUpdateUserSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(new Error(parsed.error.errors[0]?.message || 'Invalid request'), 'Invalid request');
    }

    const user = await updateUserAsAdmin(id, parsed.data);
    return jsonSuccess(user, 200, 'User updated successfully');
  } catch (error) {
    return jsonError(error);
  }
}
