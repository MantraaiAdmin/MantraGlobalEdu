import Link from 'next/link';
import type { ComponentType } from 'react';
import {
  ArrowRight, Award, Briefcase, Compass, FileCheck, FileText, GraduationCap, Landmark, Laptop, Plane,
} from 'lucide-react';
import { SERVICES } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { CounsellingCta, OutcomeNotice, SectionHeading } from '@/components/content/blocks';
import { getServicePage } from '@/data/services';
import { pageMetadata } from '@/lib/seo';
import { reveal } from '@/lib/motion';

export const metadata = pageMetadata({
  title: 'Study Abroad Counselling & Admission Services | Mantra',
  description:
    'Study abroad counselling, university admissions, scholarships, visa documentation, SOP/LOR support, education loans, pre-departure and career guidance.',
  path: '/services',
});

const ICONS: Record<string, ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>> = {
  Compass, GraduationCap, Award, FileCheck, Plane, Briefcase, FileText, Landmark, Laptop,
};

const PROCESS = [
  { title: 'Free counselling', detail: 'Understand your goals, academic background, budget and timeline.' },
  { title: 'Personalised plan', detail: 'Agree a country, course and university shortlist with clear reasons.' },
  { title: 'Applications', detail: 'Prepare and submit complete applications, SOPs and supporting documents.' },
  { title: 'Funding and visa', detail: 'Plan scholarships and loans, then prepare your visa documentation.' },
  { title: 'Departure', detail: 'Arrange accommodation, travel and money before you fly.' },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Services"
          title="Study Abroad Counselling and Admission Services"
          description="Choose the support you need — from a single counselling session to help with every stage of applying, funding and preparing to study abroad."
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]}
        />

        <section className="section-padding">
          <div className="mx-auto max-w-7xl">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => {
                const Icon = ICONS[service.icon] ?? Compass;
                const content = getServicePage(service.slug);
                return (
                  <li key={service.slug} {...reveal('fade-up', (i % 3) * 90)}>
                    <Link href={`/services/${service.slug}`} className="premium-card group flex h-full flex-col p-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h2 className="mt-5 text-lg font-semibold text-primary group-hover:underline underline-offset-4">{service.title}</h2>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{content?.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8a5f00]">
                        Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="How Our Support Works" align="center" />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {PROCESS.map((step, index) => (
                <li key={step.title} {...reveal('fade-up', index * 80)} className="premium-card p-5">
                  <span className="text-2xl font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-semibold text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
                </li>
              ))}
            </ol>
            <OutcomeNotice className="mt-10" />
          </div>
        </section>

        <CounsellingCta location="services_hub" />
      </main>
      <Footer />
    </>
  );
}
