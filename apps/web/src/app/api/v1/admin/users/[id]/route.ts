import { NextRequest } from 'next/server';
import { adminUpdateUserSchema } from '@mge/shared';
import { updateUserAsAdmin } from '@/lib/server/auth';
import { requireAdmin } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

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
