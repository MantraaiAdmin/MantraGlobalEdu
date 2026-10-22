/**
 * Single source of truth for public business information.
 *
 * Every public page, CTA, footer, form and JSON-LD block must read from here.
 * Do not hardcode phone numbers, emails or business statistics in components.
 *
 * Only values the business has verified belong in this file. Anything that is
 * still unverified is `null` and must not be rendered — see
 * docs/seo/BUSINESS-VERIFICATION.md for the open items.
 */

export const SITE_URL = 'https://mantraglobaledu.com' as const;

export const BUSINESS_CONTACT = {
  name: 'Mantra Global Education',
  legalName: null,
  website: `${SITE_URL}/`,
  phoneDisplay: '+91 99401 13077',
  phoneHref: 'tel:+919940113077',
  /** E.164 format for structured data */
  phoneE164: '+919940113077',
  email: 'vinodhini@mantraglobaledu.com',
  emailHref: 'mailto:vinodhini@mantraglobaledu.com',
  /** City-level location the business operates from. Street address is unverified. */
  city: 'Coimbatore',
  region: 'Tamil Nadu',
  country: 'IN',
  /** Unverified — do not render until confirmed. */
  streetAddress: null,
  postalCode: null,
  openingHours: null,
  whatsappNumber: null,
  googleBusinessProfileUrl: null,
  sameAs: [] as string[],
} as const;

/**
 * Business statistics. `null` means the claim has not been verified and must not
 * be shown anywhere on the public site. Replace with a real number only when the
 * business can evidence it.
 */
export const BUSINESS_STATS: {
  studentsGuided: number | null;
  partnerUniversities: number | null;
  visaSuccessRate: number | null;
  partnerSatisfaction: number | null;
  yearsOperating: number | null;
} = {
  studentsGuided: null,
  partnerUniversities: null,
  visaSuccessRate: null,
  partnerSatisfaction: null,
  yearsOperating: null,
};

export const FOUNDER = {
  name: 'Vinodhini Y.',
  title: 'Founder, Mantra Global Education',
  /**
   * Founder-supplied biography. Kept on the About page and founder section only.
   * Evidence (certificates / award letters) should be on file before launch —
   * listed in docs/seo/BUSINESS-VERIFICATION.md.
   */
  credentials: [
    '10+ years of experience in international education counselling',
    'Former IDP counsellor',
    'British Council certified counsellor',
    'Recognised among the Pan-India Top 17 counsellors (Best Counsellor — Silver category)',
  ],
} as const;

export const MANTRA_AI_DESCRIPTION =
  'Mantra Global Education is the education vertical of Mantra.Ai, an IT services company. Alongside admissions guidance, students can get help building a technology portfolio — projects, skills and a professional profile — while they prepare for and pursue their studies.' as const;

export const OUTCOME_DISCLAIMER =
  'Admission, visa and scholarship decisions are made by universities, funding bodies and government authorities. Mantra Global Education provides guidance and application support and does not guarantee any outcome.' as const;

export const POLICY_CHANGE_NOTICE =
  'Requirements, fees, immigration rules and university policies may change. Always confirm the latest requirements with the relevant university or government authority.' as const;
