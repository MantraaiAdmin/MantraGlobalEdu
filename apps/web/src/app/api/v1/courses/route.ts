import { NextRequest } from 'next/server';
import { getCatalogCourses } from '@/lib/catalog';
import { jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const result = getCatalogCourses({
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 20),
    query: searchParams.get('query') || undefined,
    countryId: searchParams.get('countryId') || undefined,
    universityId: searchParams.get('universityId') || undefined,
    degreeLevel: searchParams.get('degreeLevel') || undefined,
    tuitionMin: searchParams.get('tuitionMin') ? Number(searchParams.get('tuitionMin')) : undefined,
    tuitionMax: searchParams.get('tuitionMax') ? Number(searchParams.get('tuitionMax')) : undefined,
    intake: searchParams.get('intake') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
  });

  return jsonSuccess(result);
}
