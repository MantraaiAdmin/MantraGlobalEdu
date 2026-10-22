import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Building2, ExternalLink } from 'lucide-react';
import { ROUTES } from '@mge/config';
import { formatCurrency } from '@mge/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Button } from '@/components/ui/button';
import { PolicyNotice } from '@/components/content/blocks';
import { getAllCatalogUniversities, getCatalogUniversityBySlug } from '@/lib/catalog';
import { destinationPathFromCountryId } from '@/lib/destinations';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCatalogUniversities().map((university) => ({ slug: university.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = getCatalogUniversityBySlug(slug);
  if (!university) return {};
  return pageMetadata({
    title: `${university.name}: Courses & Scholarships | Mantra`,
    description: `Courses and scholarships at ${university.name}, ${university.country.name}, listed in the Mantra Global Education course finder.`,
    path: `/universities/${university.slug}`,
    noIndex: true,
  });
}

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = getCatalogUniversityBySlug(slug);
  if (!university) notFound();
  const path = `/universities/${university.slug}`;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        <section className="section-padding">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'Universities', path: '/universities' },
                { name: university.name, path },
              ]}
              className="mb-6"
            />
            <div className="premium-card p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shrink-0">
                  <Building2 className="h-7 w-7 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary">{university.name}</h1>
                  <p className="mt-2 text-muted-foreground">
                    <Link href={destinationPathFromCountryId(university.countryId)} className="underline-offset-4 hover:underline">
                      {university.country.flag} {university.country.name}
                    </Link>
                  </p>
                </div>
              </div>

              {university.description && <p className="mt-6 text-muted-foreground leading-relaxed">{university.description}</p>}

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {university.tuitionMin ? (
                  <div className="rounded-xl bg-muted/50 p-4">
                    <dt className="text-xs text-muted-foreground">Recorded annual tuition range</dt>
                    <dd className="mt-1 text-sm font-semibold text-primary">
                      {formatCurrency(university.tuitionMin)} – {formatCurrency(university.tuitionMax || university.tuitionMin)}
                    </dd>
                  </div>
                ) : null}
                {university.popularPrograms.length > 0 && (
                  <div className="rounded-xl bg-muted/50 p-4">
                    <dt className="text-xs text-muted-foreground">Popular programmes</dt>
                    <dd className="mt-1 text-sm font-semibold text-primary">{university.popularPrograms.join(', ')}</dd>
                  </div>
                )}
              </dl>

              {university.website && (
                <p className="mt-6 text-sm">
                  <a href={university.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2">
                    Official university website <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </p>
              )}

              <PolicyNotice className="mt-6" text="Fees and programme details are recorded from published sources and may have changed. Confirm current details with the university." />

              {university.courses.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-semibold text-primary">Courses in our course finder</h2>
                  <ul className="mt-3 space-y-2">
                    {university.courses.map((course) => (
                      <li key={course.id}>
                        <Link href={`/courses/${course.slug}`} className="text-sm text-primary underline-offset-4 hover:underline">
                          {course.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {university.scholarships.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-semibold text-primary">Scholarships</h2>
                  <ul className="mt-3 space-y-2">
                    {university.scholarships.map((s) => (
                      <li key={s.id}>
                        <Link href={`/scholarships/${s.id}`} className="text-sm text-primary underline-offset-4 hover:underline">{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button variant="accent" className="mt-8" asChild>
                <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="university_page">
                  Get advice on applying <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
