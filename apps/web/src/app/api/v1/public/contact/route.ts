import { NextRequest } from 'next/server';
import { createContactInquiry } from '@/lib/server/public-forms';
import { handlePublicForm } from '@/lib/server/form-route';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return handlePublicForm(request, createContactInquiry, 'Message received');
}
