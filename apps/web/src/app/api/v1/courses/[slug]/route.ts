import { getCatalogCourseBySlug } from '@/lib/catalog';
import { jsonError, jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const course = getCatalogCourseBySlug(slug);

  if (!course) {
    return jsonError('Course not found', 404);
  }

  return jsonSuccess(course);
}
