import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { CounsellingCta, PolicyNotice, SectionHeading } from '@/components/content/blocks';
import { getPublicScholarships } from '@/lib/catalog';
import { destinationPathFromCountryId } from '@/lib/destinations';
import { ARTICLES, articlePath } from '@/data/articles';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Scholarships for Indian Students | Mantra',
  description:
    'Browse government and university scholarship programmes for study in the UK, USA, Australia, Germany, Canada, Ireland and more, with links to each official source.',
  path: '/scholarships',
});

export default function ScholarshipsPage() {
  const scholarships = getPublicScholarships();
  const byCountry = new Map<string, typeof scholarships>();
  for (const s of scholarships) {
    const list = byCountry.get(s.country.name) ?? [];
    list.push(s);
    byCountry.set(s.country.name, list);
  }
  const groups = [...byCountry.entries()].sort((a, b) => b[1].length - a[1].length);
  const guide = ARTICLES.find((a) => a.slug === 'how-to-find-study-abroad-scholarships');

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Funding"
          title="Study Abroad Scholarships for Indian Students"
          description="Government and university scholarship programmes by destination. Award values, eligibility and deadlines change every year, so each entry links to the official source."
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Scholarships', path: '/scholarships' },
          ]}
        />

        <section className="section-padding">
          <div className="mx-auto max-w-5xl">
            <PolicyNotice
              className="mb-10"
              text="We list programmes for research only and have not verified them for the current application cycle. Always confirm eligibility, award value, deadline and current status on the official website."
            />
            <nav aria-label="Jump to destination" className="mb-10">
              <ul className="flex flex-wrap gap-2">
                {groups.map(([country]) => (
                  <li key={country}>
                    <a href={`#${country.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block rounded-full border border-primary/15 px-3 py-1.5 text-sm text-primary hover:border-accent/40">
                      {country}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12">
              {groups.map(([country, items]) => (
                <section key={country} id={country.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
                  <h2 className="font-display text-2xl font-bold text-primary">
                    <Link href={destinationPathFromCountryId(items[0].countryId)} className="underline-offset-4 hover:underline">
                      Scholarships in {country}
                    </Link>
                  </h2>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {items.map((s) => (
                      <li key={s.id} className="premium-card p-5 flex flex-col">
                        <h3 className="font-semibold text-primary">
                          <Link href={`/scholarships/${s.id}`} className="underline-offset-4 hover:underline">{s.name}</Link>
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">{s.university.name}</p>
                        <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.eligibility}</p>
                        {s.sourceUrl && (
                          <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-2">
                            Official source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            <span className="sr-only">for {s.name}</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <SectionHeading title="Need help with scholarship applications?" description="We can help you find programmes that fit your profile, plan around deadlines and prepare stronger applications." />
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/services/scholarship-assistance" className="font-semibold text-primary underline underline-offset-4">Scholarship assistance</Link>
              {guide && <Link href={articlePath(guide)} className="font-semibold text-primary underline underline-offset-4">{guide.title}</Link>}
              <Link href="/find-a-course" className="font-semibold text-primary underline underline-offset-4">Find a course</Link>
            </div>
          </div>
        </section>

        <CounsellingCta location="scholarships" />
      </main>
      <Footer />
    </>
  );
}
