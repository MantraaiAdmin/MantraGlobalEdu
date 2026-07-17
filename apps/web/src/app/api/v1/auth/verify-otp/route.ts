import { NextRequest } from 'next/server';
import { verifyOtpSchema } from '@mge/shared';
import { verifyPasswordOtp } from '@/lib/server/auth';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = verifyOtpSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(new Error(parsed.error.errors[0]?.message || 'Invalid request'), 'Invalid request');
    }

    const result = await verifyPasswordOtp(
      parsed.data.identifier,
      parsed.data.channel,
      parsed.data.otp
    );
    return jsonSuccess(result);
  } catch (error) {
    return jsonError(error);
  }
}
