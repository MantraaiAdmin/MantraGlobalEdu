/**
 * Old database-driven article URLs (/resources/<slug>) mapped to their closest
 * successor. These pages never rendered content in production (the articles
 * API returned 404), so each is pointed at the most relevant new page.
 */
export const LEGACY_ARTICLE_REDIRECTS: Record<string, string> = {
  'complete-guide-study-usa-2026': '/countries/usa',
  'uk-student-visa-updates-2026': '/resources/visa-updates/student-visa-documents-guide',
  'study-australia-guide-2026': '/countries/australia',
};
