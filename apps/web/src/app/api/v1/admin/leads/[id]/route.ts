import { NextRequest } from 'next/server';
import { updateAdminLead } from '@/lib/server/admin';
import { requireAdmin } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const body = await request.json();
    const lead = await updateAdminLead(id, body);
    return jsonSuccess(lead, 200, 'Lead updated');
  } catch (error) {
    return jsonError(error);
  }
}
