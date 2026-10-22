'use client';

import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  GA_MEASUREMENT_ID,
  readConsent,
  trackEvent,
  writeConsent,
  type AnalyticsEvent,
  type ConsentState,
} from '@/lib/analytics';

const HIDDEN_PREFIXES = ['/portal'];

/**
 * Loads GA4 only when a measurement ID is configured, with Consent Mode v2
 * defaulting to denied. Shows a consent banner; nothing is stored or sent for
 * analytics until the visitor accepts. Also tracks tel:/mailto: clicks and any
 * element with a `data-track` attribute, so server components can opt in to
 * events without becoming client components.
 */
export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentState>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const updateConsent = useCallback((value: 'granted' | 'denied') => {
    writeConsent(value);
    setConsent(value);
    window.gtag?.('consent', 'update', { analytics_storage: value });
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('a, button');
      if (!target) return;
      const explicit = target.getAttribute('data-track') as AnalyticsEvent | null;
      const href = target.getAttribute('href') ?? '';
      const location = target.getAttribute('data-track-location') ?? undefined;
      if (explicit) trackEvent(explicit, { location, page_path: window.location.pathname });
      else if (href.startsWith('tel:')) trackEvent('phone_click', { location, page_path: window.location.pathname });
      else if (href.startsWith('mailto:')) trackEvent('email_click', { location, page_path: window.location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!GA_MEASUREMENT_ID || HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
try{if(localStorage.getItem('mge_analytics_consent')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}
gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      {ready && consent === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-20 lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md z-[60] rounded-2xl border border-border bg-white p-5 shadow-premium-xl"
        >
          <p className="text-sm text-primary">
            We use optional analytics cookies to understand how the site is used. They are only set if you accept.{' '}
            <Link href="/cookie-policy" className="font-semibold underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => updateConsent('granted')}
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => updateConsent('denied')}
              className="flex-1 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
