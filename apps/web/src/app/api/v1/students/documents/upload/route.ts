import { NextRequest } from 'next/server';
import { AuthError } from '@/lib/server/auth';
import { uploadStudentDocument } from '@/lib/server/student-documents';
import { getBearerToken, jsonError, jsonSuccess } from '@/lib/server/api-response';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const token = getBearerToken(request);
    if (!token) {
      throw new AuthError('Access token required', 401, 'UNAUTHORIZED');
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      throw new AuthError('File is required', 400, 'VALIDATION');
    }

    const name = String(formData.get('name') || file.name);
    const type = String(formData.get('type') || 'other');
    const checklistItemKey = formData.get('checklistItemKey');
    const applicationId = formData.get('applicationId');

    const document = await uploadStudentDocument(token, file, {
      name,
      type,
      checklistItemKey: checklistItemKey ? String(checklistItemKey) : undefined,
      applicationId: applicationId ? String(applicationId) : undefined,
    });

    return jsonSuccess(document, 201, 'Document uploaded successfully');
  } catch (error) {
    return jsonError(error);
  }
}
