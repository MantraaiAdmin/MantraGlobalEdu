import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Building2, ExternalLink, GraduationCap } from 'lucide-react';
import { DEGREE_LEVELS, INTAKE_PERIODS, ROUTES } from '@mge/config';
import { formatCurrency } from '@mge/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { PolicyNotice } from '@/components/content/blocks';
import { getAllCatalogCourses, getCatalogCourseBySlug } from '@/lib/catalog';
import { destinationPathFromCountryId } from '@/lib/destinations';
import { courseSchema, pageMetadata } from '@/lib/seo';
import { ViewTracker } from '@/components/common/view-tracker';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCatalogCourses().map((course) => ({ slug: course.slug }));
}

const levelLabel = (value: string) => DEGREE_LEVELS.find((l) => l.value === value)?.label ?? value;
const intakeLabel = (value: string) => INTAKE_PERIODS.find((i) => i.value === value)?.label ?? value;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCatalogCourseBySlug(slug);
  if (!course) return {};
  // Course pages repeat data published by the university, so they are kept
  // out of the index; the course finder and country guides are the entry points.
  return pageMetadata({
    title: `${course.name} — ${course.university.name} | Mantra`,
    description: `${course.name} at ${course.university.name}, ${course.university.country.name}: duration, recorded tuition, intakes and eligibility, with a link to the official course page.`,
    path: `/courses/${course.slug}`,
    noIndex: true,
  });
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCatalogCourseBySlug(slug);
  if (!course) notFound();
  const path = `/courses/${course.slug}`;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        <ViewTracker event="course_view" params={{ course: course.slug }} />
        <JsonLd
          data={courseSchema({
            name: course.name,
            description: course.description ?? course.name,
            path,
            providerName: course.university.name,
            providerUrl: course.university.website,
          })}
        />
        <section className="section-padding">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'Find a Course', path: ROUTES.findACourse },
                { name: course.name, path },
              ]}
              className="mb-6"
            />
            <div className="premium-card p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shrink-0">
                  <GraduationCap className="h-7 w-7 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary">{course.name}</h1>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    <Link href={`/universities/${course.university.slug}`} className="hover:text-primary underline-offset-4 hover:underline">
                      {course.university.name}
                    </Link>
                    ·
                    <Link href={destinationPathFromCountryId(course.university.countryId)} className="hover:text-primary underline-offset-4 hover:underline">
                      {course.university.country.name}
                    </Link>
                  </p>
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Recorded tuition (per year)', value: formatCurrency(course.tuition, course.currency) },
                  { label: 'Duration', value: course.duration },
                  { label: 'Study level', value: levelLabel(course.degreeLevel) },
                  { label: 'Intakes', value: course.intakePeriods.map(intakeLabel).join(', ') || '—' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-muted/50 p-4">
                    <dt className="text-xs text-muted-foreground">{item.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-primary">{item.value}</dd>
                  </div>
                ))}
              </dl>

              {course.description && <p className="mt-6 text-muted-foreground leading-relaxed">{course.description}</p>}
              {course.eligibility && (
                <div className="mt-6 rounded-xl bg-muted/50 p-4">
                  <h2 className="font-semibold text-primary text-sm">Eligibility summary</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{course.eligibility}</p>
                </div>
              )}

              {course.sourceUrl && (
                <p className="mt-6 text-sm">
                  <a href={course.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2">
                    Official course information <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </p>
              )}

              <PolicyNotice className="mt-6" text="Tuition, intakes and entry requirements are recorded from published sources and may have changed. Confirm the current details on the university’s website." />

              {course.scholarships.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-semibold text-primary">Related scholarships</h2>
                  <ul className="mt-3 space-y-2">
                    {course.scholarships.map((s) => (
                      <li key={s.id}>
                        <Link href={`/scholarships/${s.id}`} className="text-sm text-primary underline-offset-4 hover:underline">{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button variant="accent" asChild>
                  <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="course_page">
                    Get advice on this course <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={ROUTES.findACourse}>Search more courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
