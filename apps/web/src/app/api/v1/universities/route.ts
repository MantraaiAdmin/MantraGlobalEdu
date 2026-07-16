import { NextRequest } from 'next/server';
import { getCatalogUniversities } from '@/lib/catalog';
import { jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const result = getCatalogUniversities({
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 20),
    countryId: searchParams.get('countryId') || undefined,
    search: searchParams.get('search') || undefined,
    tuitionMin: searchParams.get('tuitionMin') ? Number(searchParams.get('tuitionMin')) : undefined,
    tuitionMax: searchParams.get('tuitionMax') ? Number(searchParams.get('tuitionMax')) : undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
  });

  return jsonSuccess(result);
}
