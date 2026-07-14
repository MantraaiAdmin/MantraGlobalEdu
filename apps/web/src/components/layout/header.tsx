'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAVIGATION, ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { NavLink } from '@/components/common/nav-link';
import { cn } from '@/lib/utils';

/** Pages with a dark mesh-hero under the header — white nav text only at the top */
const DARK_HERO_PREFIXES = [
  '/',
  '/universities',
  '/countries',
  '/scholarships',
  '/resources',
  '/cost-estimator',
  '/login/student',
];

function hasDarkHero(pathname: string): boolean {
  if (pathname === '/') return true;
  return DARK_HERO_PREFIXES.some(
    (prefix) => prefix !== '/' && (pathname === prefix || pathname.startsWith(`${prefix}/`))
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDarkHeroPage = hasDarkHero(pathname);
  const useSolidHeader = scrolled || !isDarkHeroPage;

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

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAVIGATION.public.slice(0, 8).map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  useSolidHeader
                    ? 'text-primary/70 hover:text-primary hover:bg-muted/60'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              className={
                useSolidHeader
                  ? 'text-primary/70 hover:text-primary'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }
              asChild
            >
              <Link href="/login/student">Student Login</Link>
            </Button>
            <Button variant="accent" size="sm" asChild>
              <Link href={ROUTES.bookCounseling}>Book Counseling</Link>
            </Button>
          </div>

          <button
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              useSolidHeader ? 'text-primary' : 'text-white'
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 glass',
          mobileOpen ? 'max-h-[28rem] border-t border-border/40' : 'max-h-0'
        )}
      >
        <nav className="px-4 py-4 space-y-1">
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
            <Button variant="outline" asChild>
              <Link href="/login/student">Student Login</Link>
            </Button>
            <Button variant="accent" asChild>
              <Link href={ROUTES.bookCounseling}>Book Free Counseling</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
