import { NextRequest } from 'next/server';
import { createCounselingBooking } from '@/lib/server/public-forms';
import { handlePublicForm } from '@/lib/server/form-route';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return handlePublicForm(request, createCounselingBooking, 'Counselling request received');
}
