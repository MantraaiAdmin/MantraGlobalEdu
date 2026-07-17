import { NextRequest } from 'next/server';
import { syncStudentFavorite } from '@/lib/server/students';
import { requireStudent } from '@/lib/server/admin-guard';
import { getBearerToken, jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function POST(request: NextRequest) {
  try {
    await requireStudent(request);
    const token = getBearerToken(request)!;
    const body = await request.json();
    if (!body.universityId) {
      return jsonError(new Error('universityId is required'), 'Invalid request');
    }
    const data = await syncStudentFavorite(token, body.universityId);
    return jsonSuccess(data, 201);
  } catch (error) {
    return jsonError(error);
  }
}
