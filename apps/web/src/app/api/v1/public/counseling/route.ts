import { NextRequest } from 'next/server';
import { createCounselingBooking } from '@/lib/server/public-forms';
import { handlePublicForm } from '@/lib/server/form-route';

export const runtime = 'nodejs';
// Allow time for the SMTP round-trips after the booking is saved.
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  return handlePublicForm(request, createCounselingBooking, 'Counselling request received');
}
