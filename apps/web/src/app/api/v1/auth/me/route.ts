import { NextRequest } from 'next/server';
import { AuthError, getUserFromAccessToken } from '@/lib/server/auth';
import { getBearerToken, jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    const token = getBearerToken(request);
    if (!token) {
      throw new AuthError('Access token required', 401, 'UNAUTHORIZED');
    }
    const user = await getUserFromAccessToken(token);
    return jsonSuccess(user);
  } catch (error) {
    return jsonError(error);
  }
}
