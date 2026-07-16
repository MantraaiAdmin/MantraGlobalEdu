import { NextRequest } from 'next/server';
import { getCatalogCountries } from '@/lib/catalog';
import { jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 50);

  const result = getCatalogCountries({ page, limit });
  return jsonSuccess(result);
}
