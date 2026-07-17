import { NextRequest } from 'next/server';
import { forgotPasswordSchema } from '@mge/shared';
import { requestPasswordReset } from '@/lib/server/auth';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(new Error(parsed.error.errors[0]?.message || 'Invalid request'), 'Invalid request');
    }

    const result = await requestPasswordReset(parsed.data.identifier, parsed.data.channel);
    return jsonSuccess(result);
  } catch (error) {
    return jsonError(error);
  }
}
