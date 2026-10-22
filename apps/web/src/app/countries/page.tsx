import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { CounsellingCta, PolicyNotice, SectionHeading } from '@/components/content/blocks';
import { COUNTRY_GUIDES } from '@/data/country-guides';
import { getUniversityCountByCountryCode } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Destinations, Universities & Costs | Mantra',
  description:
    'Compare study destinations for Indian students — UK, USA, Canada, Australia, Germany, Ireland and more — by intakes, costs, visas and post-study options.',
  path: '/countries',
});

const FLAGS = Object.fromEntries(DESTINATIONS.map((d) => [d.code, d.flag]));
const GUIDE_CODES = new Set(COUNTRY_GUIDES.map((g) => g.code));
const OTHER_DESTINATIONS = DESTINATIONS.filter((d) => !GUIDE_CODES.has(d.code));

export default function CountriesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Destinations"
          title="Study Abroad Destinations for Indian Students"
          description="Compare countries by course length, intakes, costs, student visa requirements and post-study options before you decide where to apply."
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Countries', path: '/countries' },
          ]}
        />

        <section className="section-padding">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Destination guides"
              description="Each guide covers entry and English requirements, intakes, costs, scholarships, student visas and work rules, with links to official sources."
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {COUNTRY_GUIDES.map((guide) => {
                const uniCount = getUniversityCountByCountryCode(guide.code);
                return (
                  <li key={guide.slug}>
                    <Link href={`/countries/${guide.slug}`} className="premium-card group flex h-full flex-col p-6">
                      <span className="text-5xl" aria-hidden="true">{FLAGS[guide.code]}</span>
                      <h2 className="mt-4 text-xl font-semibold text-primary font-display group-hover:underline underline-offset-4">
                        Study in {guide.inName}
                      </h2>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{guide.overview[0]}</p>
                      <p className="mt-4 text-xs text-muted-foreground">
                        {uniCount > 0 ? `${uniCount} universities in our course finder · ` : ''}Main intake: {guide.intakes.split('.')[0]}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8a5f00]">
                        Read the guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <PolicyNotice className="mt-10" />
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="More destinations in our course finder"
              description="We also list universities and courses in these countries. Speak to a counsellor for guidance on them."
            />
            <ul className="flex flex-wrap gap-3">
              {OTHER_DESTINATIONS.map((d) => (
                <li key={d.code}>
                  <Link href={`/countries/${d.slug}`} className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-medium text-primary hover:border-accent/40">
                    <span aria-hidden="true">{d.flag}</span> {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CounsellingCta location="countries_hub" title="Not sure which country suits you?" />
      </main>
      <Footer />
    </>
  );
}
