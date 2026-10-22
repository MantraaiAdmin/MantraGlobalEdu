import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { BUSINESS_CONTACT, ROUTES, SERVICE_AREA } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import {
  BulletList, CounsellingCta, FaqList, OutcomeNotice, SectionHeading,
} from '@/components/content/blocks';
import { COUNTRY_GUIDES } from '@/data/country-guides';
import { SERVICE_PAGES } from '@/data/services';
import { CITY_PAGES, getCityPage } from '@/data/locations';
import { pageMetadata } from '@/lib/seo';
import { reveal } from '@/lib/motion';

export function cityMetadata(slug: string) {
  const page = getCityPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.seoTitle, description: page.metaDescription, path: page.path });
}

const STEPS = [
  { title: 'Book a free session', detail: 'Use the booking form, call us or email us to choose a time.' },
  { title: 'Counselling conversation', detail: 'We discuss your academics, interests, budget and timeline.' },
  { title: 'Your shortlist and plan', detail: 'You receive suggested countries, courses and universities, with a timeline for tests and applications.' },
  { title: 'Ongoing support if you need it', detail: 'Continue with application, scholarship, visa and pre-departure support as required.' },
];

/** Local landing page. Content comes from data/locations.ts. */
export function CityLandingPage({ slug }: { slug: string }) {
  const page = getCityPage(slug);
  if (!page) notFound();
  const track = page.slug;
  const otherCities = CITY_PAGES.filter((c) => c.slug !== page.slug);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow={page.eyebrow}
          title={page.h1}
          description={page.heroDescription}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: `Study Abroad Consultants${page.isBase ? ' in' : ' for'} ${page.city}`, path: page.path },
          ]}
        >
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button size="lg" variant="accent" asChild>
              <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location={`${track}_hero`}>
                Book Free Counselling <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="premium" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
              <a href={BUSINESS_CONTACT.phoneHref} data-track-location={`${track}_hero`}>
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {BUSINESS_CONTACT.phoneDisplay}
              </a>
            </Button>
          </div>
        </PageHero>

        <section className="section-padding">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                {page.intro.map((p) => <p key={p}>{p}</p>)}
              </div>

              <div>
                <SectionHeading title="Who we help" className="mb-5" />
                <BulletList items={page.whoWeHelp} />
              </div>

              <div>
                <SectionHeading
                  title={`Study abroad support for ${page.city} students`}
                  description="Choose the help you need — each service has its own page with details of what is and is not included."
                  className="mb-6"
                />
                <ul className="grid gap-4 sm:grid-cols-2">
                  {SERVICE_PAGES.map((service, i) => (
                    <li key={service.slug} {...reveal('fade-up', (i % 2) * 80)}>
                      <Link href={`/services/${service.slug}`} className="premium-card group block h-full p-5">
                        <h3 className="font-semibold text-primary group-hover:underline underline-offset-4">{service.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{service.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionHeading title="Countries we support" className="mb-5" />
                <ul className="flex flex-wrap gap-2">
                  {COUNTRY_GUIDES.map((guide) => (
                    <li key={guide.slug}>
                      <Link href={`/countries/${guide.slug}`} className="inline-block rounded-full border border-primary/15 px-4 py-1.5 text-sm text-primary hover:border-accent/40">
                        Study in {guide.inName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionHeading title={page.delivery.heading} className="mb-5" />
                <p className="text-muted-foreground leading-relaxed">
                  {page.delivery.text} Call{' '}
                  <a href={BUSINESS_CONTACT.phoneHref} data-track-location={`${track}_body`} className="font-semibold text-primary underline underline-offset-2">
                    {BUSINESS_CONTACT.phoneDisplay}
                  </a>{' '}
                  or email{' '}
                  <a href={BUSINESS_CONTACT.emailHref} data-track-location={`${track}_body`} className="font-semibold text-primary underline underline-offset-2 break-all">
                    {BUSINESS_CONTACT.email}
                  </a>.
                </p>
              </div>

              {page.local && (
                <div>
                  <SectionHeading title={page.local.heading} className="mb-5" />
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {page.local.paragraphs.map((p) => <p key={p}>{p}</p>)}
                  </div>
                </div>
              )}

              <div>
                <SectionHeading title="How to book an appointment" className="mb-5" />
                <ol className="grid gap-4 sm:grid-cols-2">
                  {STEPS.map((step, index) => (
                    <li key={step.title} {...reveal('fade-up', index * 80)} className="premium-card p-5">
                      <span className="text-sm font-bold text-[#8a5f00]">Step {index + 1}</span>
                      <h3 className="mt-1 font-semibold text-primary">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <OutcomeNotice />

              <div>
                <SectionHeading title={`Questions from ${page.city} students and parents`} className="mb-5" />
                <FaqList items={page.faqs} />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 self-start">
              <div className="premium-card p-6">
                <h2 className="font-semibold text-primary text-lg">Contact Mantra Global Education</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href={BUSINESS_CONTACT.phoneHref} data-track-location={`${track}_sidebar`} className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent">
                        <Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS_CONTACT.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href={BUSINESS_CONTACT.emailHref} data-track-location={`${track}_sidebar`} className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent break-all">
                        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {BUSINESS_CONTACT.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">{page.isBase ? 'Location' : 'Based in'}</dt>
                    <dd className="text-primary">
                      {BUSINESS_CONTACT.city}, {BUSINESS_CONTACT.region}
                      {!page.isBase && <span className="block text-muted-foreground">Online counselling for {page.city} students</span>}
                    </dd>
                  </div>
                </dl>
                <Button variant="accent" className="mt-6 w-full" asChild>
                  <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location={`${track}_sidebar`}>
                    Book Free Counselling
                  </Link>
                </Button>
              </div>
              <div className="premium-card p-6">
                <h2 className="font-semibold text-primary">We also counsel students in</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {otherCities.map((c) => (
                    <li key={c.slug}>
                      <Link href={c.path} className="text-primary underline-offset-4 hover:underline">{c.city}</Link>
                    </li>
                  ))}
                  <li className="text-muted-foreground">Anywhere in {SERVICE_AREA.country}, online</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <CounsellingCta location={`${track}_final`} title={`Start your study abroad plan from ${page.city}`} />
      </main>
      <Footer />
    </>
  );
}
