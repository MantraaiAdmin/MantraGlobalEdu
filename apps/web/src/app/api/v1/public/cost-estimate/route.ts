import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateCostEstimate } from '@mge/utils';
import { jsonSuccess } from '@/lib/server/api-response';

const amount = z.coerce.number().nonnegative().max(100_000_000);

const costEstimateSchema = z.object({
  countryId: z.string().min(1).max(40),
  tuition: amount,
  accommodation: amount,
  livingExpenses: amount,
  visa: amount,
  travel: amount,
  insurance: amount,
  programDurationYears: z.coerce.number().positive().max(10).optional().default(1),
});

/** Stateless calculation used by the public cost estimator. Nothing is stored. */
export async function POST(request: NextRequest) {
  const parsed = costEstimateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, data: null, error: 'Please check the amounts entered.' }, { status: 422 });
  }
  return jsonSuccess(calculateCostEstimate(parsed.data));
}
