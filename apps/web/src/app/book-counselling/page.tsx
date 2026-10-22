import { CheckCircle2, Mail, Phone } from 'lucide-react';
import { BUSINESS_CONTACT, FOUNDER, OUTCOME_DISCLAIMER } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { CounsellingForm } from '@/features/counselling/components/counselling-form';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book Free Study Abroad Counselling | Mantra Global Education',
  description:
    'Request a free study abroad counselling session online, by phone or in Coimbatore. Get help choosing a country, course and universities, and plan your applications.',
  path: '/book-counselling',
});

const WHAT_YOU_GET = [
  'A conversation about your goals, academics and budget',
  'Suggested countries and course types that fit your profile',
  'An outline of university options and application timelines',
  'Clear next steps — with no obligation',
];

export default function BookCounsellingPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Book Free Counselling', path: '/book-counselling' },
            ]}
            className="mb-8"
          />
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary leading-tight">
                Book Free Study Abroad Counselling
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Tell us a little about your plans and we will arrange a free session with {FOUNDER.name} and the
                Mantra Global Education team — online, by phone or in Coimbatore by arrangement.
              </p>
              <h2 className="mt-8 font-semibold text-primary">In your session</h2>
              <ul className="mt-4 space-y-3">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-3 text-sm">
                <p className="font-semibold text-primary">Prefer to talk now?</p>
                <a href={BUSINESS_CONTACT.phoneHref} data-track-location="booking_page" className="flex items-center gap-2 text-primary hover:text-accent font-semibold">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS_CONTACT.phoneDisplay}
                </a>
                <a href={BUSINESS_CONTACT.emailHref} data-track-location="booking_page" className="flex items-center gap-2 text-primary hover:text-accent font-semibold break-all">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {BUSINESS_CONTACT.email}
                </a>
              </div>
              <p className="mt-8 text-xs text-muted-foreground leading-relaxed">{OUTCOME_DISCLAIMER}</p>
            </div>

            <div className="lg:col-span-3 premium-card p-5 sm:p-8 relative">
              <CounsellingForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
