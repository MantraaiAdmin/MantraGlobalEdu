import { NextRequest } from 'next/server';
import { registerSchema } from '@mge/shared';
import { registerStudent } from '@/lib/server/auth';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(new Error(parsed.error.errors[0]?.message || 'Invalid request'), 'Invalid request');
    }

    const result = await registerStudent(parsed.data);
    return jsonSuccess(result, 201, 'Registration successful');
  } catch (error) {
    return jsonError(error);
  }
}
