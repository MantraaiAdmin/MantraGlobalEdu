import type { NextRequest } from 'next/server';
import type { SpamSignals } from '@/lib/counselling-form';

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort in-memory limiter. On serverless platforms each instance keeps
// its own counts, so this slows down abuse rather than enforcing a hard limit.
const hits = new Map<string, number[]>();

export class SpamRejectedError extends Error {
  constructor(public readonly silent: boolean, message = 'Submission rejected') {
    super(message);
  }
}

function clientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

/**
 * Honeypot + minimum fill time + per-IP rate limit. Throws SpamRejectedError.
 * `silent` rejections (bots) should return a fake success so bots learn nothing.
 */
export function assertNotSpam(request: NextRequest, signals: SpamSignals) {
  if (signals.website && signals.website.trim() !== '') {
    throw new SpamRejectedError(true);
  }
  if (typeof signals.startedAt === 'number' && Date.now() - signals.startedAt < MIN_FILL_MS) {
    throw new SpamRejectedError(true);
  }

  const ip = clientIp(request);
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    throw new SpamRejectedError(false, 'Too many submissions. Please try again later or call us.');
  }
  recent.push(now);
  hits.set(ip, recent);
}
