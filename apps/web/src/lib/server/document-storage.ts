import { UPLOAD_CONFIG } from '@mge/config';
import { AuthError } from './auth';

const EXTENSION_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export function resolveMimeType(file: File): string {
  if (file.type && UPLOAD_CONFIG.allowedMimeTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedMimeTypes)[number])) {
    return file.type;
  }

  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext && EXTENSION_MIME[ext]) {
    return EXTENSION_MIME[ext];
  }

  return file.type || 'application/octet-stream';
}

export function validateUploadFile(file: File) {
  if (file.size > UPLOAD_CONFIG.maxFileSize) {
    throw new AuthError(`File exceeds maximum size of ${UPLOAD_CONFIG.maxFileSizeLabel}`, 400, 'VALIDATION');
  }

  const mimeType = resolveMimeType(file);
  if (!UPLOAD_CONFIG.allowedMimeTypes.includes(mimeType as (typeof UPLOAD_CONFIG.allowedMimeTypes)[number])) {
    throw new AuthError(
      `File type not allowed. Accepted: ${UPLOAD_CONFIG.allowedExtensions.join(', ')}`,
      400,
      'VALIDATION'
    );
  }

  return mimeType;
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
  if (checklistItemKey.includes('test') || checklistItemKey === 'english_test') return 'test_score';
  return 'other';
}

export function buildDocumentFileUrl(documentId: string): string {
  return `/api/v1/students/documents/${documentId}/file`;
}

export function useDatabaseFileStorage(): boolean {
  return process.env.VERCEL === '1' || process.env.USE_DATABASE_FILE_STORAGE === 'true';
}
