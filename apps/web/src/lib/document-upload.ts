/** Client-safe document type resolver (mirrors server logic). */
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
