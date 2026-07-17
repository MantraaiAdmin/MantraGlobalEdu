import { NextRequest } from 'next/server';
import { loginSchema } from '@mge/shared';
import { loginUser } from '@/lib/server/auth';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(new Error(parsed.error.errors[0]?.message || 'Invalid request'), 'Invalid request');
    }

    const result = await loginUser(parsed.data.email, parsed.data.password);
    return jsonSuccess(result, 200, 'Login successful');
  } catch (error) {
    return jsonError(error);
  }
}
