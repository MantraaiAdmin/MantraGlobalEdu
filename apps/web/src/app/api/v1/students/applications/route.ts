import { NextRequest } from 'next/server';
import { getStudentApplications } from '@/lib/server/students';
import { requireStudent } from '@/lib/server/admin-guard';
import { getBearerToken, jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireStudent(request);
    const token = getBearerToken(request)!;
    const data = await getStudentApplications(token);
    return jsonSuccess(data);
  } catch (error) {
    return jsonError(error);
  }
}
