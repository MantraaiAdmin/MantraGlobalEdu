'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Adds `is-visible` to elements marked `data-reveal` as they enter the
 * viewport. One observer for the whole page; re-scans after client-side
 * navigation. Paired with the motion CSS in globals.css.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __mgeReveal?: boolean }).__mgeReveal = true;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal on entering the viewport, and also anything already scrolled
          // past (fast scrolls, back/forward scroll restoration, anchor links).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
