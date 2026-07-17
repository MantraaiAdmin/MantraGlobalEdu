import { NextRequest } from 'next/server';
import { getStudentDocumentWorkspace } from '@/lib/server/student-documents';
import { getBearerToken, jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    const token = getBearerToken(request);
    if (!token) {
      return jsonError(new Error('Access token required'), 'Unauthorized');
    }

    const workspace = await getStudentDocumentWorkspace(token);
    return jsonSuccess(workspace);
  } catch (error) {
    return jsonError(error);
  }
}
