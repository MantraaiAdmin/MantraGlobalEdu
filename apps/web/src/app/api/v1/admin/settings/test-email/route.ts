import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';
import { sendTestNotificationEmail } from '@/lib/server/mailer';

export const runtime = 'nodejs';
export const maxDuration = 30;

/** Admin-only: verifies the SMTP login and sends a test to the booking notification recipients. */
export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    return jsonSuccess(await sendTestNotificationEmail());
  } catch (error) {
    return jsonError(error);
  }
}
