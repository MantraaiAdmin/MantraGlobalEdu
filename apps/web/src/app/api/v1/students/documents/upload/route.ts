import { NextRequest } from 'next/server';
import { uploadStudentDocument } from '@/lib/server/student-documents';
import { getBearerToken, jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function POST(request: NextRequest) {
  try {
    const token = getBearerToken(request);
    if (!token) {
      return jsonError(new Error('Access token required'), 'Unauthorized');
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return jsonError(new Error('File is required'), 'Bad Request');
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
