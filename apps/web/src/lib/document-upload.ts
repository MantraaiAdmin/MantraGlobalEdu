/** Client-safe document type resolver (mirrors server logic). */
import { UPLOAD_CONFIG } from '@mge/config';

export function validateClientUploadFile(file: File): string | null {
  if (file.size > UPLOAD_CONFIG.maxFileSize) {
    return `File exceeds maximum size of ${UPLOAD_CONFIG.maxFileSizeLabel}`;
  }

  const ext = file.name.split('.').pop()?.toLowerCase();
  const allowedExts = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'docx'];
  if (!ext || !allowedExts.includes(ext)) {
    return `File type not allowed. Accepted: ${UPLOAD_CONFIG.allowedExtensions.join(', ')}`;
  }

  if (file.type && !UPLOAD_CONFIG.allowedMimeTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedMimeTypes)[number])) {
    return `File type not allowed. Accepted: ${UPLOAD_CONFIG.allowedExtensions.join(', ')}`;
  }

  return null;
}

export function resolveDocumentType(checklistItemKey: string): string {
  if (checklistItemKey.includes('lor')) return 'lor';
  if (checklistItemKey.includes('passport')) return 'passport';
  if (checklistItemKey === 'sop') return 'sop';
  if (checklistItemKey === 'resume') return 'resume';
  if (
    checklistItemKey === 'transcript' ||
    checklistItemKey.includes('certificate') ||
    checklistItemKey === 'english_test' ||
    checklistItemKey.includes('degree')
  ) {
    return 'transcript';
  }
  if (checklistItemKey.includes('test')) return 'test_score';
  return 'other';
}
