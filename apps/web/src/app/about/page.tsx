import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { APP_CONFIG, BUSINESS_CONTACT, FOUNDER, MANTRA_AI_DESCRIPTION } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { JsonLd } from '@/components/seo/json-ld';
import { BulletList, CounsellingCta, OutcomeNotice, SectionHeading } from '@/components/content/blocks';
import { pageMetadata, personSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Mantra Global Education | Coimbatore',
  description:
    'Mantra Global Education is a Coimbatore study abroad consultancy founded by Vinodhini Y., and the education vertical of Mantra.Ai. Learn how we work.',
  path: '/about',
});

const PRINCIPLES = [
  'Student-first: every recommendation starts with what suits the student and family.',
  'Honest advice: we explain trade-offs and never promise outcomes that are decided by universities or governments.',
  'Transparency: we tell you what a service includes and what it does not.',
  'Accuracy: our guides link to official sources and show when they were last reviewed.',
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <JsonLd data={personSchema()} />
        <PageHero
          eyebrow="About us"
          title="About Mantra Global Education"
          description={`${APP_CONFIG.name} is a study abroad consultancy based in ${BUSINESS_CONTACT.city}, ${BUSINESS_CONTACT.region}, helping students and families plan, apply for and prepare for international education.`}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]}
        />

        <section className="section-padding">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-start">
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">Who we are</h2>
              <p>
                {APP_CONFIG.name} was founded by {FOUNDER.name} to give students the kind of personal, expert guidance
                that is often missing from study abroad planning. We work with students from Coimbatore and across India,
                mainly through online counselling.
              </p>
              <p>{MANTRA_AI_DESCRIPTION}</p>
              <p>
                Our services cover the full journey — counselling, university applications, SOP and LOR guidance,
                scholarships, education loan guidance, visa documentation and pre-departure support.{' '}
                <Link href="/services" className="font-semibold text-primary underline underline-offset-2">See all services</Link>.
              </p>
            </div>
            <div className="relative aspect-[4/5] max-w-md w-full mx-auto rounded-[2rem] overflow-hidden shadow-premium-xl">
              <Image
                src="/images/founder-counselor.png"
                alt={`${FOUNDER.name}, ${FOUNDER.title}`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 448px"
              />
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <SectionHeading title={`Our founder: ${FOUNDER.name}`} />
            <p className="text-muted-foreground leading-relaxed">
              {FOUNDER.name} leads counselling at {APP_CONFIG.name}. Her background in international education counselling
              shapes how we work with students and families.
            </p>
            <ul className="mt-6 space-y-3">
              {FOUNDER.credentials.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <BadgeCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <SectionHeading title="How we work" className="mb-5" />
              <BulletList items={PRINCIPLES} />
            </div>
            <div>
              <SectionHeading title="Editorial policy" className="mb-5" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our destination guides and resources are written by the {APP_CONFIG.name} team to help students make
                  informed decisions. Where we describe visa rules, fees, scholarships or work rights, we link to the
                  official government or university source and show the date the content was last reviewed.
                </p>
                <p>
                  Rules and fees change. If you notice something out of date, please email{' '}
                  <a href={BUSINESS_CONTACT.emailHref} className="font-semibold text-primary underline underline-offset-2 break-all">
                    {BUSINESS_CONTACT.email}
                  </a>{' '}
                  and we will review it.
                </p>
              </div>
            </div>
            <OutcomeNotice />
          </div>
        </section>

        <CounsellingCta location="about" />
      </main>
      <Footer />
    </>
  );
}
