import { NextRequest } from 'next/server';
import { getCatalogScholarships } from '@/lib/catalog';
import { jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const result = getCatalogScholarships({
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 20),
    countryId: searchParams.get('countryId') || undefined,
    universityId: searchParams.get('universityId') || undefined,
    courseId: searchParams.get('courseId') || undefined,
    budget: searchParams.get('budget') ? Number(searchParams.get('budget')) : undefined,
  });

  return jsonSuccess(result);
}
