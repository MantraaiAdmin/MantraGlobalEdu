import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, Building2, CalendarDays, GraduationCap, Wallet } from 'lucide-react';
import { DESTINATIONS } from '@mge/config';
import { formatCurrency } from '@mge/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import {
  BulletList, CounsellingCta, FaqList, PolicyNotice, SectionHeading, SourceList,
} from '@/components/content/blocks';
import { getCountryGuide } from '@/data/country-guides';
import { SERVICE_PAGES } from '@/data/services';
import { ARTICLES, articlePath } from '@/data/articles';
import { getCatalogCountryByCode } from '@/lib/catalog';
import { getDestinationBySlug } from '@/lib/destinations';
import { pageMetadata } from '@/lib/seo';
import { ViewTracker } from '@/components/common/view-tracker';

export const dynamicParams = false;

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  const guide = getCountryGuide(slug);
  if (guide) {
    return pageMetadata({ title: guide.seoTitle, description: guide.metaDescription, path: `/countries/${slug}` });
  }
  // Destinations without a full reviewed guide are useful to visitors but too
  // thin to index. They stay out of the sitemap until a guide is written.
  return pageMetadata({
    title: `Study in ${destination.name}: Universities & Courses | Mantra`,
    description: `Universities, courses and scholarships in ${destination.name} listed in the Mantra Global Education course finder.`,
    path: `/countries/${slug}`,
    noIndex: true,
  });
}

const RELATED_SERVICE_SLUGS = ['study-abroad-counselling', 'university-admissions', 'scholarship-assistance', 'visa-documentation'];

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const guide = getCountryGuide(slug);
  const catalog = getCatalogCountryByCode(destination.code);
  const universities = catalog?.universities ?? [];
  const courses = catalog?.courses ?? [];
  const scholarships = catalog?.scholarships ?? [];
  const path = `/countries/${slug}`;
  const name = guide?.name ?? destination.name;
  const inName = guide?.inName ?? destination.name;
  const relatedArticles = ARTICLES.filter((article) => article.relatedCountries.includes(slug)).slice(0, 4);
  const relatedServices = SERVICE_PAGES.filter((service) => RELATED_SERVICE_SLUGS.includes(service.slug));

  return (
    <>
      <Header />
      <main id="main-content">
        <ViewTracker event="country_view" params={{ country: slug }} />
        <PageHero
          eyebrow={`${destination.flag} Study destination`}
          title={guide ? `Study in ${inName}: Universities, Costs and Intakes` : `Study in ${name}`}
          description={guide?.overview[0] ?? catalog?.description ?? undefined}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Countries', path: '/countries' },
            { name, path },
          ]}
        >
          {catalog && (
            <p className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/85">
              In our course finder: {universities.length} universities · {courses.length} courses
            </p>
          )}
        </PageHero>

        {guide && (
          <section className="section-padding">
            <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-3">
              <article className="lg:col-span-2 space-y-12">
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  {guide.overview.slice(1).map((p) => <p key={p}>{p}</p>)}
                </div>

                <PolicyNotice />

                <div>
                  <SectionHeading title={`Why Indian students consider ${inName}`} className="mb-5" />
                  <BulletList items={guide.whyConsider} />
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h2 className="font-display text-xl font-bold text-primary mb-4">Popular fields of study</h2>
                    <BulletList items={guide.popularFields} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-primary mb-4">Common qualifications</h2>
                    <BulletList items={guide.qualifications} />
                  </div>
                </div>

                <div>
                  <SectionHeading title="Entry and English language requirements" className="mb-5" />
                  <h3 className="font-semibold text-primary">Academic entry requirements</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{guide.entryRequirements}</p>
                  <h3 className="mt-6 font-semibold text-primary">English language requirements</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{guide.englishRequirements}</p>
                </div>

                <div>
                  <SectionHeading title="Intakes and application timeline" className="mb-5" />
                  <p className="flex gap-3 text-muted-foreground leading-relaxed">
                    <CalendarDays className="h-5 w-5 text-accent shrink-0 mt-1" aria-hidden="true" />
                    {guide.intakes}
                  </p>
                  <ol className="mt-6 space-y-3">
                    {guide.timeline.map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span>
                        <span className="text-muted-foreground pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <SectionHeading title="Tuition fees and living costs" className="mb-5" />
                  <p className="flex gap-3 text-muted-foreground leading-relaxed">
                    <Wallet className="h-5 w-5 text-accent shrink-0 mt-1" aria-hidden="true" />
                    {guide.costGuidance}
                  </p>
                  {catalog && (catalog.tuitionRange || catalog.livingCost) && (
                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      {catalog.tuitionRange && (
                        <div className="rounded-xl bg-muted/50 p-4">
                          <dt className="text-xs text-muted-foreground">Indicative tuition (our database)</dt>
                          <dd className="mt-1 font-semibold text-primary">{catalog.tuitionRange}</dd>
                        </div>
                      )}
                      {catalog.livingCost && (
                        <div className="rounded-xl bg-muted/50 p-4">
                          <dt className="text-xs text-muted-foreground">Indicative living costs (our database)</dt>
                          <dd className="mt-1 font-semibold text-primary">{catalog.livingCost}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">Indicative ranges only. Check each university’s fee page and the official visa funds requirement.</p>
                </div>

                <div>
                  <SectionHeading title="Scholarships" className="mb-5" />
                  <p className="text-muted-foreground leading-relaxed">{guide.scholarshipGuidance}</p>
                  {scholarships.length > 0 && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {scholarships.slice(0, 6).map((s) => (
                        <li key={s.id}>
                          <Link href={`/scholarships/${s.id}`} className="block rounded-xl border border-border p-4 hover:border-accent/40">
                            <span className="font-medium text-primary text-sm">{s.name}</span>
                            <span className="block mt-1 text-xs text-muted-foreground">{s.university.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href="/scholarships" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
                    Browse all scholarships <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div>
                  <SectionHeading title="Student visa overview" className="mb-5" />
                  <p className="text-muted-foreground leading-relaxed">{guide.visaOverview}</p>
                  <h3 className="mt-6 font-semibold text-primary">Working while you study</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{guide.workRules}</p>
                  <h3 className="mt-6 font-semibold text-primary">After graduation</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{guide.postStudy}</p>
                </div>

                <div>
                  <SectionHeading title="Popular student cities" className="mb-5" />
                  <ul className="flex flex-wrap gap-2">
                    {guide.cities.map((city) => (
                      <li key={city} className="rounded-full border border-primary/15 px-4 py-1.5 text-sm text-primary">{city}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <SectionHeading title="Choosing a course and university" className="mb-5" />
                  <BulletList items={guide.selectionTips} />
                </div>

                <div>
                  <SectionHeading title={`Studying in ${inName}: common questions`} className="mb-5" />
                  <FaqList items={guide.faqs} />
                </div>

                <SourceList sources={guide.sources} reviewed={guide.lastReviewed} />
              </article>

              <aside className="space-y-6 lg:sticky lg:top-24 self-start">
                <div className="premium-card p-6">
                  <h2 className="font-semibold text-primary">How we can help</h2>
                  <ul className="mt-3 space-y-2">
                    {relatedServices.map((service) => (
                      <li key={service.slug}>
                        <Link href={`/services/${service.slug}`} className="text-sm text-primary underline-offset-4 hover:underline">
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {relatedArticles.length > 0 && (
                  <div className="premium-card p-6">
                    <h2 className="font-semibold text-primary">Related guides</h2>
                    <ul className="mt-3 space-y-2">
                      {relatedArticles.map((article) => (
                        <li key={article.slug}>
                          <Link href={articlePath(article)} className="text-sm text-primary underline-offset-4 hover:underline">
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </section>
        )}

        {catalog && (universities.length > 0 || courses.length > 0) && (
          <section className="section-padding bg-muted/30">
            <div className="mx-auto max-w-7xl space-y-10">
              {universities.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-primary mb-5 flex items-center gap-2">
                    <Building2 className="h-5 w-5" aria-hidden="true" /> Universities in {name} in our course finder
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {universities.map((uni) => (
                      <li key={uni.id}>
                        <Link href={`/universities/${uni.slug}`} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 hover:border-accent/40">
                          <GraduationCap className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                          <span className="text-sm font-semibold text-primary">{uni.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {courses.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-primary mb-5 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" aria-hidden="true" /> Example courses
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {courses.slice(0, 8).map((course) => (
                      <li key={course.id}>
                        <Link href={`/courses/${course.slug}`} className="block rounded-xl border border-border bg-white p-4 hover:border-accent/40">
                          <span className="font-semibold text-primary text-sm">{course.name}</span>
                          <span className="block mt-1 text-xs text-muted-foreground">
                            {course.university.name} · {course.duration} · recorded tuition {formatCurrency(course.tuition, course.currency)}/year
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/find-a-course" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
                    Search all courses <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        <CounsellingCta location={`country_${slug}`} title={`Plan your studies in ${inName}`} />
      </main>
      <Footer />
    </>
  );
}
