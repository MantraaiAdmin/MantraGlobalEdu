import { NextRequest } from 'next/server';
import { getAdminDashboardStats } from '@/lib/server/admin';
import { requireAdmin } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const stats = await getAdminDashboardStats();
    return jsonSuccess(stats);
  } catch (error) {
    return jsonError(error);
  }
}
