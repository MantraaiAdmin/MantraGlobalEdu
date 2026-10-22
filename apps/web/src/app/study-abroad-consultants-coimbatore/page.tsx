import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { BUSINESS_CONTACT, FOUNDER, ROUTES } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import {
  BulletList, CounsellingCta, FaqList, OutcomeNotice, SectionHeading,
} from '@/components/content/blocks';
import { COUNTRY_GUIDES } from '@/data/country-guides';
import { SERVICE_PAGES } from '@/data/services';
import { pageMetadata } from '@/lib/seo';

const PATH = '/study-abroad-consultants-coimbatore';

export const metadata = pageMetadata({
  title: 'Study Abroad Consultants in Coimbatore: Counselling & Support | Mantra',
  description:
    'Study abroad counselling for Coimbatore students and parents: country and course selection, applications, scholarships, visa documents and profile support.',
  path: PATH,
});

const WHO_WE_HELP = [
  'Class 11 and 12 students in Coimbatore planning an undergraduate degree abroad',
  'Engineering, science, commerce and arts graduates considering a master’s abroad',
  'Working professionals from Coimbatore’s IT, manufacturing and textile sectors looking at postgraduate study',
  'Parents who want clear, honest information about costs, timelines and risks',
];

const STEPS = [
  { title: 'Book a free session', detail: 'Use the booking form, call us or email us to choose a time.' },
  { title: 'Counselling conversation', detail: 'We discuss your academics, interests, budget and timeline — online or in person by arrangement.' },
  { title: 'Your shortlist and plan', detail: 'You receive suggested countries, courses and universities, with a timeline for tests and applications.' },
  { title: 'Ongoing support if you need it', detail: 'Continue with application, scholarship, visa and pre-departure support as required.' },
];

const FAQS = [
  {
    q: 'Do I need to visit an office for counselling?',
    a: 'No. Counselling is available online, so you can work with us from anywhere in Coimbatore, Tamil Nadu or the rest of India. If you would prefer to meet in person, call us to discuss arrangements.',
  },
  {
    q: 'Is the first counselling session free?',
    a: 'Yes. The first session is free and you are under no obligation to continue.',
  },
  {
    q: 'Which countries can you help Coimbatore students with?',
    a: 'We provide detailed guidance for the UK, USA, Canada, Australia, Germany, Ireland, France, New Zealand, the Netherlands and Singapore, and our course finder covers further destinations.',
  },
  {
    q: 'Can parents join the counselling session?',
    a: 'Yes, and we encourage it. Studying abroad is a family decision and parents often have important questions about cost, safety and timelines.',
  },
  {
    q: 'Can you guarantee admission, a scholarship or a visa?',
    a: 'No. Universities, scholarship providers and governments make those decisions. We help you prepare strong, complete applications and understand your options.',
  },
  {
    q: 'How early should students in Coimbatore start planning?',
    a: 'Ideally 12 to 18 months before the intended start date. That leaves time for English tests, applications, scholarship deadlines and visa preparation.',
  },
];

export default function CoimbatorePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Coimbatore, Tamil Nadu"
          title="Personalised Study Abroad Counselling in Coimbatore"
          description="Mantra Global Education is a Coimbatore-based study abroad consultancy. We help students and parents choose the right country, course and university, and support them through applications, scholarships and visa preparation."
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Study Abroad Consultants in Coimbatore', path: PATH },
          ]}
        >
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button size="lg" variant="accent" asChild>
              <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="coimbatore_hero">
                Book Free Counselling <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="premium" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
              <a href={BUSINESS_CONTACT.phoneHref} data-track-location="coimbatore_hero">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {BUSINESS_CONTACT.phoneDisplay}
              </a>
            </Button>
          </div>
        </PageHero>

        <section className="section-padding">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Coimbatore has a strong tradition of engineering, science and business education, and every year
                  many students from the city and the wider Kongu region consider continuing their studies overseas.
                  Choosing well means weighing course content, total cost, intakes, visa rules and career goals —
                  and that is where personal counselling helps.
                </p>
                <p>
                  Our counselling is led by {FOUNDER.name}, and we work with families through online sessions as well
                  as in-person meetings by arrangement. Because Mantra Global Education is the education vertical of
                  Mantra.Ai, an IT services company, students can also get help building a technology portfolio
                  alongside their applications.
                </p>
              </div>

              <div>
                <SectionHeading title="Who we help" className="mb-5" />
                <BulletList items={WHO_WE_HELP} />
              </div>

              <div>
                <SectionHeading
                  title="Study abroad support for Coimbatore students"
                  description="Choose the help you need — each service has its own page with details of what is and is not included."
                  className="mb-6"
                />
                <ul className="grid gap-4 sm:grid-cols-2">
                  {SERVICE_PAGES.map((service) => (
                    <li key={service.slug}>
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
                <SectionHeading title="Online and in-person counselling" className="mb-5" />
                <p className="text-muted-foreground leading-relaxed">
                  Online counselling lets you speak with us from home, college or work, and makes it easy for both
                  parents to join. If you would like to meet in person in Coimbatore, call{' '}
                  <a href={BUSINESS_CONTACT.phoneHref} data-track-location="coimbatore_body" className="font-semibold text-primary underline underline-offset-2">
                    {BUSINESS_CONTACT.phoneDisplay}
                  </a>{' '}
                  to arrange a time.
                </p>
              </div>

              <div>
                <SectionHeading title="How to book an appointment" className="mb-5" />
                <ol className="grid gap-4 sm:grid-cols-2">
                  {STEPS.map((step, index) => (
                    <li key={step.title} className="premium-card p-5">
                      <span className="text-sm font-bold text-[#8a5f00]">Step {index + 1}</span>
                      <h3 className="mt-1 font-semibold text-primary">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <OutcomeNotice />

              <div>
                <SectionHeading title="Questions from Coimbatore students and parents" className="mb-5" />
                <FaqList items={FAQS} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 self-start">
              <div className="premium-card p-6">
                <h2 className="font-semibold text-primary text-lg">Contact Mantra Global Education</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href={BUSINESS_CONTACT.phoneHref} data-track-location="coimbatore_sidebar" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent">
                        <Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS_CONTACT.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href={BUSINESS_CONTACT.emailHref} data-track-location="coimbatore_sidebar" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent break-all">
                        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {BUSINESS_CONTACT.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Location</dt>
                    <dd className="text-primary">{BUSINESS_CONTACT.city}, {BUSINESS_CONTACT.region}, India</dd>
                  </div>
                </dl>
                <Button variant="accent" className="mt-6 w-full" asChild>
                  <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="coimbatore_sidebar">
                    Book Free Counselling
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        <CounsellingCta location="coimbatore_final" title="Start your study abroad plan from Coimbatore" />
      </main>
      <Footer />
    </>
  );
}
