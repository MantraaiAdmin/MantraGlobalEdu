import { NextRequest } from 'next/server';
import { getAdminSettings } from '@/lib/server/admin';
import { requireAdmin } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const settings = await getAdminSettings();
    return jsonSuccess(settings);
  } catch (error) {
    return jsonError(error);
  }
}
