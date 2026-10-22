/**
 * GA4 event helpers. Nothing is sent unless NEXT_PUBLIC_GA_MEASUREMENT_ID is
 * configured AND the visitor has accepted analytics cookies (Consent Mode v2
 * defaults to denied). Never send personal data (names, emails, phone numbers)
 * as event parameters.
 */

export type AnalyticsEvent =
  | 'book_counselling_click'
  | 'counselling_form_start'
  | 'counselling_form_submit'
  | 'contact_form_submit'
  | 'phone_click'
  | 'email_click'
  | 'course_search'
  | 'course_view'
  | 'course_shortlist'
  | 'scholarship_view'
  | 'country_view'
  | 'partner_enquiry';

export const CONSENT_STORAGE_KEY = 'mge_analytics_consent';
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export type ConsentState = 'granted' | 'denied' | null;

export function readConsent(): ConsentState {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: 'granted' | 'denied') {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage unavailable (private mode) — consent applies to this page view only.
  }
}
