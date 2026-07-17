import { NextRequest } from 'next/server';
import { UserRole } from '@mge/types';
import { adminCreateUserSchema } from '@mge/shared';
import { createUserAsAdmin, listUsers } from '@/lib/server/auth';
import { requireAdmin, parseListQuery } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const q = parseListQuery(request);
    const result = await listUsers({
      page: q.page,
      limit: q.limit,
      search: q.search,
      role: q.role as UserRole | undefined,
      status: q.status,
      sortBy: (q.sortBy as 'createdAt' | 'email' | 'firstName' | 'role' | 'lastLoginAt') || 'createdAt',
      sortOrder: q.sortOrder,
    });
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
