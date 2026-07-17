import { NextRequest } from 'next/server';
import { listAdminUniversities } from '@/lib/server/admin';
import { requireAdmin, parseListQuery } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const q = parseListQuery(request);
    const result = await listAdminUniversities(q);
    return jsonSuccess(result);
  } catch (error) {
    return jsonError(error);
  }
}
