import { NextRequest } from 'next/server';
import { resetPasswordSchema } from '@mge/shared';
import { resetPassword } from '@/lib/server/auth';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(new Error(parsed.error.errors[0]?.message || 'Invalid request'), 'Invalid request');
    }

    const result = await resetPassword(parsed.data.resetToken, parsed.data.password);
    return jsonSuccess(result);
  } catch (error) {
    return jsonError(error);
  }
}
