/**
 * Publication status for catalog scholarships.
 *
 * The catalog records award amounts and deadlines from an earlier data import
 * that has not been re-verified for the current cycle, so the public site shows
 * only the programme, provider, eligibility summary and official source link.
 *
 * Entries listed in HIDDEN_SCHOLARSHIP_IDS could not be matched to a clearly
 * named, published programme and are not shown publicly. Their old URLs
 * redirect to the scholarship listing. Re-enable an entry only after confirming
 * it on the provider's official website.
 */
export const HIDDEN_SCHOLARSHIP_IDS = new Set<string>([
  'sch-mit-intl-excellence',
  'sch-columbia-intl',
  'sch-manchester-equity',
  'sch-anu-coe',
  'sch-ud-excellence',
  'sch-kyoto-international',
  'sch-um-international',
  'sch-monash-my-merit',
  'sch-ub-mobility',
  'sch-ie-talent',
]);

/** Date the source links were last checked to resolve (404 links were replaced with the university website). */
export const SCHOLARSHIP_SOURCES_CHECKED = '2026-10-22';
