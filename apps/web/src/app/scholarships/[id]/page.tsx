import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Award, ExternalLink } from 'lucide-react';
import { ROUTES } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Button } from '@/components/ui/button';
import { PolicyNotice } from '@/components/content/blocks';
import { ViewTracker } from '@/components/common/view-tracker';
import { getCatalogScholarshipById, getPublicScholarships } from '@/lib/catalog';
import { destinationPathFromCountryId } from '@/lib/destinations';
import { HIDDEN_SCHOLARSHIP_IDS } from '@/data/scholarship-verification';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicScholarships().map((s) => ({ id: s.id }));
}

function getScholarship(id: string) {
  if (HIDDEN_SCHOLARSHIP_IDS.has(id)) return null;
  return getCatalogScholarshipById(id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = getScholarship(id);
  if (!scholarship) return {};
  return pageMetadata({
    title: `${scholarship.name} | Scholarships | Mantra`,
    description: `${scholarship.name} for study in ${scholarship.country.name}: eligibility summary and a link to the official source for current award details and deadlines.`,
    path: `/scholarships/${scholarship.id}`,
    noIndex: true,
  });
}

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = getScholarship(id);
  if (!scholarship) notFound();
  const path = `/scholarships/${scholarship.id}`;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        <ViewTracker event="scholarship_view" params={{ scholarship: scholarship.id }} />
        <section className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'Scholarships', path: '/scholarships' },
                { name: scholarship.name, path },
              ]}
              className="mb-6"
            />
            <div className="flex items-start gap-4">
              <span className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 shrink-0">
                <Award className="h-7 w-7 text-accent" aria-hidden="true" />
              </span>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary">{scholarship.name}</h1>
                <p className="mt-2 text-muted-foreground">
                  <Link href={destinationPathFromCountryId(scholarship.countryId)} className="underline-offset-4 hover:underline">
                    {scholarship.country.flag} {scholarship.country.name}
                  </Link>
                  {' · '}
                  <Link href={`/universities/${scholarship.university.slug}`} className="underline-offset-4 hover:underline">
                    {scholarship.university.name}
                  </Link>
                </p>
              </div>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="premium-card p-4">
                <dt className="text-xs text-muted-foreground">Status</dt>
                <dd className="mt-1 text-sm font-semibold text-primary">Not verified for the current cycle — check the official source</dd>
              </div>
              <div className="premium-card p-4">
                <dt className="text-xs text-muted-foreground">Award value and deadline</dt>
                <dd className="mt-1 text-sm font-semibold text-primary">See the official source</dd>
              </div>
            </dl>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="font-semibold text-primary">Eligibility summary</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{scholarship.eligibility}</p>
              </div>
              <div>
                <h2 className="font-semibold text-primary">Typical application requirements</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{scholarship.requirements}</p>
              </div>
              {scholarship.sourceUrl && (
                <p>
                  <a href={scholarship.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2">
                    Official scholarship information <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </p>
              )}
            </div>

            <PolicyNotice className="mt-8" text="Scholarship values, eligibility and deadlines change each year. Always confirm the current details on the provider’s official website before applying." />

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="accent" asChild>
                <Link href="/services/scholarship-assistance">
                  Get scholarship assistance <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={ROUTES.findACourse}>Find related courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
