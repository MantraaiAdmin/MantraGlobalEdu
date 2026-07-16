import { getCatalogCountryByCode } from '@/lib/catalog';
import { jsonError, jsonSuccess } from '@/lib/catalog/api-response';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const country = getCatalogCountryByCode(code);

  if (!country) {
    return jsonError('Country not found', 404);
  }

  return jsonSuccess(country);
}
