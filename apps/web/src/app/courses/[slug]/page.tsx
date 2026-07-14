'use client';

import Link from 'next/link';
import { use } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useCourse } from '@/hooks/use-api';
import { formatCurrency } from '@mge/utils';
import { GraduationCap, ArrowLeft, Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: course, isLoading, isError } = useCourse(slug);

  return (
    <>
      <Header />
      <main className="pt-24">
        {isLoading && <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {isError && (
          <div className="text-center py-32">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <Button className="mt-4" asChild><Link href="/find-a-course">Back to Courses</Link></Button>
          </div>
        )}
        {course && (
          <section className="section-padding">
            <div className="mx-auto max-w-4xl">
              <Link href="/find-a-course" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="h-4 w-4" /> All Courses
              </Link>
              <div className="premium-card p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-display text-3xl font-bold text-primary">{course.name}</h1>
                    {course.university && (
                      <Link href={`/universities/${course.university.slug}`} className="flex items-center gap-2 mt-2 text-muted-foreground hover:text-primary">
                        <Building2 className="h-4 w-4" /> {course.university.name} · {course.university.country?.name}
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Tuition', value: formatCurrency(course.tuition, course.currency) },
                    { label: 'Duration', value: course.duration },
                    { label: 'Degree', value: course.degreeLevel },
                    { label: 'Intakes', value: course.intakePeriods?.join(', ') || 'N/A' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-muted/50 p-4">
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                      <div className="font-semibold text-primary mt-1 text-sm">{s.value}</div>
                    </div>
                  ))}
                </div>

                {course.description && (
                  <p className="mt-6 text-muted-foreground leading-relaxed">{course.description}</p>
                )}
                {course.eligibility && (
                  <div className="mt-6 rounded-xl bg-muted/50 p-4">
                    <h3 className="font-semibold text-primary text-sm">Eligibility</h3>
                    <p className="text-sm text-muted-foreground mt-2">{course.eligibility}</p>
                  </div>
                )}

                <Button variant="accent" className="mt-8" asChild>
                  <Link href="/book-counseling">Apply with Counselor</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
