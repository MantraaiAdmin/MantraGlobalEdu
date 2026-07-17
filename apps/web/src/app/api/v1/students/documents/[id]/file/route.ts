import { NextRequest, NextResponse } from 'next/server';
import { AuthError } from '@/lib/server/auth';
import { getStudentDocumentFile } from '@/lib/server/student-documents';
import { getBearerToken, jsonError } from '@/lib/server/api-response';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = getBearerToken(request) || request.nextUrl.searchParams.get('token');
    if (!token) {
      throw new AuthError('Access token required', 401, 'UNAUTHORIZED');
    }

    const { id } = await params;
    const file = await getStudentDocumentFile(token, id);

    return new NextResponse(file.buffer, {
      status: 200,
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': `inline; filename="${file.name.replace(/"/g, '')}"`,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    return jsonError(error);
  }
}
