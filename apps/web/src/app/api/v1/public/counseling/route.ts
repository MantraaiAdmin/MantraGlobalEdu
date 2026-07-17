import { NextRequest } from 'next/server';
import { createCounselingBooking } from '@/lib/server/public-forms';
import { jsonError, jsonSuccess } from '@/lib/server/api-response';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const booking = await createCounselingBooking(body);
    return jsonSuccess(booking, 201, 'Counseling session booked successfully');
  } catch (error) {
    return jsonError(error);
  }
}
