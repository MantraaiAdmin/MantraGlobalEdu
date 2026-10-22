'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { BUSINESS_CONTACT, NAVIGATION, ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { NavLink } from '@/components/common/nav-link';
import { cn } from '@/lib/utils';

/** Pages whose first section is a dark mesh hero — the header starts transparent with white text. */
const DARK_HERO_EXACT = new Set([
  '/',
  '/countries',
  '/services',
  '/scholarships',
  '/resources',
  '/universities',
  '/about',
  '/sitemap',
  '/cost-estimator',
  '/login/student',
  '/study-abroad-consultants-coimbatore',
  '/study-abroad-consultants-chennai',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/disclaimer',
]);

/** Section prefixes where one level below the hub is also a dark-hero page. */
const DARK_HERO_CHILD_PREFIXES = ['/countries/', '/services/', '/resources/'];

function hasDarkHero(pathname: string): boolean {
  if (DARK_HERO_EXACT.has(pathname)) return true;
  return DARK_HERO_CHILD_PREFIXES.some(
    (prefix) => pathname.startsWith(prefix) && !pathname.slice(prefix.length).includes('/')
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDarkHeroPage = hasDarkHero(pathname);
  const useSolidHeader = scrolled || !isDarkHeroPage;

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const updateScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    updateScroll();
  }, [pathname, updateScroll]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') updateScroll();
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisible);
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [updateScroll]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        useSolidHeader ? 'glass shadow-premium py-0' : 'bg-transparent py-1'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            useSolidHeader ? 'h-16' : 'h-20 py-2'
          )}
        >
          <Logo
            size={useSolidHeader ? 'sm' : 'md'}
            inverted={!useSolidHeader}
            className="shrink-0"
          />

          <nav aria-label="Main" className="hidden xl:flex items-center gap-0.5">
            {NAVIGATION.public.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className={cn(
                  'whitespace-nowrap px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  useSolidHeader
                    ? 'text-primary/70 hover:text-primary hover:bg-muted/60'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-2">
            <a
              href={BUSINESS_CONTACT.phoneHref}
              data-track-location="header"
              className={cn(
                'hidden 2xl:inline-flex whitespace-nowrap items-center gap-1.5 px-2 py-2 text-sm font-semibold rounded-lg',
                useSolidHeader ? 'text-primary hover:text-accent' : 'text-white hover:text-accent'
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {BUSINESS_CONTACT.phoneDisplay}
            </a>
            <Button variant="accent" size="sm" asChild>
              <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="header">
                Book Free Counselling
              </Link>
            </Button>
          </div>

          <button
            className={cn(
              'xl:hidden p-2 rounded-lg transition-colors',
              useSolidHeader ? 'text-primary' : 'text-white'
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="xl:hidden glass border-t border-border/40 max-h-[calc(100vh-4rem)] overflow-y-auto"
      >
        <nav aria-label="Mobile" className="px-4 py-4 space-y-1">
          {NAVIGATION.public.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="block px-3 py-2.5 text-sm font-medium text-primary/70 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="accent" asChild>
              <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="mobile_menu">
                Book Free Counselling
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={BUSINESS_CONTACT.phoneHref} data-track-location="mobile_menu">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {BUSINESS_CONTACT.phoneDisplay}
              </a>
            </Button>
            <Link href="/login/student" className="block px-3 py-2.5 text-sm font-medium text-primary/70 hover:text-primary">
              Student Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
