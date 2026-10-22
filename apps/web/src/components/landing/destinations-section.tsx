import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '@mge/config';
import { COUNTRY_GUIDES } from '@/data/country-guides';
import { getUniversityCountByCountryCode } from '@/lib/catalog';
import { SectionHeading } from '@/components/content/blocks';
import { reveal } from '@/lib/motion';

const FLAGS = Object.fromEntries(DESTINATIONS.map((d) => [d.code, d.flag]));

export function DestinationsSection() {
  return (
    <section className="section-padding bg-muted/40 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <SectionHeading
              eyebrow="Destinations"
              title="Popular Study Destinations"
              description="Country guides covering intakes, entry and English requirements, costs, student visas and post-study options — with links to the official sources."
              className="mb-0"
            />
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-premium hover:shadow-premium-lg transition-all shrink-0"
          >
            All destinations <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {COUNTRY_GUIDES.map((guide, i) => {
            const uniCount = getUniversityCountByCountryCode(guide.code);
            return (
              <li key={guide.slug} {...reveal('fade-up', (i % 5) * 70)}>
                <Link href={`/countries/${guide.slug}`} className="premium-card group block h-full p-5 sm:p-6">
                  <span className="block text-4xl mb-3" aria-hidden="true">{FLAGS[guide.code]}</span>
                  <span className="block font-semibold text-primary">Study in {guide.inName}</span>
                  <span className="mt-2 block text-xs text-muted-foreground">
                    {uniCount > 0 ? `${uniCount} universities in our course finder` : 'Destination guide'}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
