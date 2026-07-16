import { getCatalogScholarshipById } from '@/lib/catalog';
import { jsonError, jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const scholarship = getCatalogScholarshipById(id);

  if (!scholarship) {
    return jsonError('Scholarship not found', 404);
  }

  return jsonSuccess(scholarship);
}
