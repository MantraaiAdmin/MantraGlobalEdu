import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_CONTACT, ROUTES } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: '/', label: 'Homepage' },
  { href: '/countries', label: 'Study destinations' },
  { href: ROUTES.findACourse, label: 'Find a course' },
  { href: '/services', label: 'Our services' },
  { href: '/resources', label: 'Resources & guides' },
  { href: '/contact', label: 'Contact us' },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-primary">We couldn’t find that page</h1>
          <p className="mt-4 text-muted-foreground">
            The page may have moved or the link may be out of date. Try one of these instead:
          </p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl border border-border px-4 py-3 font-medium text-primary hover:border-accent/40 hover:bg-muted/40"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href={ROUTES.bookCounseling}>Book Free Counselling</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={BUSINESS_CONTACT.phoneHref}>Call {BUSINESS_CONTACT.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
