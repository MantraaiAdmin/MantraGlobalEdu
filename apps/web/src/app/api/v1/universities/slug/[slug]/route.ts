import { getCatalogUniversityBySlug } from '@/lib/catalog';
import { jsonError, jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const university = getCatalogUniversityBySlug(slug);

  if (!university) {
    return jsonError('University not found', 404);
  }

  return jsonSuccess(university);
}
