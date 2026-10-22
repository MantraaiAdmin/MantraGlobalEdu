import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { APP_CONFIG, BUSINESS_CONTACT, OUTCOME_DISCLAIMER, ROUTES, SERVICE_AREA, SERVICES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { COUNTRY_GUIDES } from '@/data/country-guides';
import { RESOURCE_CATEGORY_PAGES } from '@/data/articles';

const FOOTER_DESTINATIONS = COUNTRY_GUIDES.slice(0, 8).map((guide) => ({
  href: `/countries/${guide.slug}`,
  label: guide.name,
}));

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: ROUTES.coimbatore, label: 'Coimbatore Counselling' },
  { href: ROUTES.chennai, label: 'Chennai Counselling' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
  { href: ROUTES.bookCounseling, label: 'Book Counselling' },
  { href: '/login/student', label: 'Student Login' },
];

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/sitemap', label: 'Site Map' },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="font-semibold mb-4 text-xs uppercase tracking-wider text-white/60">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/75 hover:text-accent transition-colors duration-200">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-primary text-white overflow-hidden pb-20 lg:pb-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(42_80%_44%/0.14),transparent_50%)]" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 mb-12 border-b border-white/10">
          <div>
            <p className="font-display text-2xl font-bold">Start planning your studies abroad</p>
            <p className="mt-2 text-white/70 text-sm">Personal counselling in Coimbatore, for Chennai students and online across India.</p>
          </div>
          <Button variant="accent" size="lg" asChild>
            <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="footer">
              Book Free Counselling <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="mb-5">
              <Logo size="md" href="/" inverted />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">{APP_CONFIG.description}</p>
            <h2 className="mt-6 font-semibold mb-3 text-xs uppercase tracking-wider text-white/60">Contact</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={BUSINESS_CONTACT.phoneHref} data-track-location="footer" className="inline-flex items-center gap-2 text-white/85 hover:text-accent">
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  {BUSINESS_CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={BUSINESS_CONTACT.emailHref} data-track-location="footer" className="inline-flex items-center gap-2 text-white/85 hover:text-accent break-all">
                  <Mail className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                  {BUSINESS_CONTACT.email}
                </a>
              </li>
              <li className="text-white/70">
                Based in {BUSINESS_CONTACT.city} · Serving {SERVICE_AREA.label}
              </li>
            </ul>
          </div>

          <FooterColumn title="Study Destinations" links={[...FOOTER_DESTINATIONS, { href: '/countries', label: 'All destinations' }]} />
          <FooterColumn
            title="Services"
            links={SERVICES.map((service) => ({ href: `/services/${service.slug}`, label: service.title }))}
          />
          <FooterColumn
            title="Resources"
            links={[
              ...RESOURCE_CATEGORY_PAGES.map((category) => ({ href: `/resources/${category.id}`, label: category.title })),
              { href: ROUTES.findACourse, label: 'Find a Course' },
              { href: '/scholarships', label: 'Scholarship Finder' },
            ]}
          />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <p className="mt-12 text-xs text-white/60 leading-relaxed max-w-4xl">{OUTCOME_DISCLAIMER}</p>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
