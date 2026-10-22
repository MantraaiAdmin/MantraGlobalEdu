import type { CSSProperties } from 'react';

export type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'tilt-in';

/**
 * Props that animate an element into view as it scrolls on screen.
 * Usable from server and client components: <div {...reveal('fade-up', 80)}>.
 */
export function reveal(variant: RevealVariant = 'fade-up', delayMs = 0) {
  return {
    'data-reveal': variant,
    style: delayMs ? ({ '--reveal-delay': `${delayMs}ms` } as CSSProperties) : undefined,
  };
}

/**
 * Runs before first paint: enables reveal styles only when JS is available, and
 * shows everything anyway if the observer has not started within 3 seconds.
 */
export const REVEAL_BOOT_SCRIPT = `document.documentElement.classList.add('js-reveal');setTimeout(function(){if(!window.__mgeReveal){document.querySelectorAll('[data-reveal]').forEach(function(e){e.classList.add('is-visible')})}},3000);`;
