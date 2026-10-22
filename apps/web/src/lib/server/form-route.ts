import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import type { SpamSignals } from '@/lib/counselling-form';
import { assertNotSpam, SpamRejectedError } from './spam-guard';
import { jsonSuccess } from './api-response';

/**
 * Shared POST handler for public forms: spam checks, validation errors returned
 * as field messages (422), and a generic success message.
 */
export async function handlePublicForm(
  request: NextRequest,
  save: (body: unknown) => Promise<{ id: string }>,
  successMessage: string
) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, data: null, error: 'Invalid request' }, { status: 400 });
  }

  const { website, startedAt, ...fields } = body as Record<string, unknown> & SpamSignals;

  try {
    assertNotSpam(request, { website: typeof website === 'string' ? website : undefined, startedAt: Number(startedAt) || undefined });
    const result = await save(fields);
    return jsonSuccess(result, 201, successMessage);
  } catch (error) {
    if (error instanceof SpamRejectedError) {
      return error.silent
        ? jsonSuccess({ id: 'received' }, 201, successMessage)
        : NextResponse.json({ success: false, data: null, error: error.message }, { status: 429 });
    }
    if (error instanceof ZodError) {
      const fieldErrors = Object.fromEntries(error.issues.map((issue) => [issue.path.join('.'), issue.message]));
      return NextResponse.json(
        { success: false, data: null, error: 'Please check the highlighted fields.', fieldErrors },
        { status: 422 }
      );
    }
    console.error('[public form]', error);
    return NextResponse.json(
      { success: false, data: null, error: 'We could not send your request right now.' },
      { status: 503 }
    );
  }
}
