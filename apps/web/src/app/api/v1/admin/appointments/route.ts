import { NextRequest } from 'next/server';
import { listAdminAppointments } from '@/lib/server/admin';
import { requireAdmin, parseListQuery } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const q = parseListQuery(request);
    const result = await listAdminAppointments({
      ...q,
      filterStatus: q.filterStatus,
    });
    return jsonSuccess(result);
  } catch (error) {
    return jsonError(error);
  }
}
