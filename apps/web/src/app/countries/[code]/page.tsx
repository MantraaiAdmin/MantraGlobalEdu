'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { useCountry } from '@/hooks/use-api';
import { use } from 'react';
import { formatCurrency, formatDate } from '@mge/utils';
import {
  GraduationCap, DollarSign, Home, FileText, Briefcase, Loader2, Building2, Award, BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CountryDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const { data: country, isLoading, isError } = useCountry(code);

  const infoItems = country ? [
    { title: 'Tuition Estimates', icon: DollarSign, content: country.tuitionRange },
    { title: 'Living Costs', icon: Home, content: country.livingCost },
    { title: 'Admission & Visa', icon: FileText, content: country.visaRequirements },
    { title: 'Graduate Opportunities', icon: Briefcase, content: country.graduateOpportunities },
  ].filter((i) => i.content) : [];

  const courses = 'courses' in (country || {}) ? (country as typeof country & { courses: Array<{
    id: string; slug: string; name: string; degreeLevel: string; duration: string;
    tuition: number; currency: string; university?: { name: string };
  }> }).courses : [];

  const scholarships = 'scholarships' in (country || {}) ? (country as typeof country & { scholarships: Array<{
    id: string; name: string; awardAmount: number; currency: string; deadline: string; eligibility: string;
  }> }).scholarships : [];

  const popularPrograms = 'popularPrograms' in (country || {}) ? (country as typeof country & { popularPrograms: string[] }).popularPrograms : [];

  return (
    <>
      <Header />
      <main>
        {isLoading && (
          <div className="flex justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-32">
            <h1 className="text-2xl font-bold text-primary">Country not found</h1>
            <Button className="mt-4" asChild><Link href="/countries">Back to Countries</Link></Button>
          </div>
        )}

        {country && (
          <>
            <PageHero
              eyebrow={country.name}
              title={`Study in ${country.name}`}
              description={country.description || ''}
            >
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="text-7xl">{country.flag}</span>
                {country.intakePeriods?.length > 0 && (
                  <div className="text-sm text-white/60">
                    Intakes: {country.intakePeriods.join(', ')}
                  </div>
                )}
                {country.universities && (
                  <div className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
                    {country.universities.length} universities · {courses.length} courses · {scholarships.length} scholarships
                  </div>
                )}
              </div>
            </PageHero>

            <section className="section-padding">
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-12">
                  {infoItems.map((item) => (
                    <div key={item.title} className="premium-card p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-4">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-primary">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>

                {popularPrograms.length > 0 && (
                  <div className="premium-card p-8 mb-8">
                    <h3 className="font-display text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" /> Popular Majors & Programs
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularPrograms.map((program) => (
                        <span
                          key={program}
                          className="rounded-full bg-primary/5 border border-primary/10 px-4 py-1.5 text-sm text-primary"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {country.universities && country.universities.length > 0 && (
                  <div className="premium-card p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Building2 className="h-5 w-5" /> Universities in {country.name}
                      </h3>
                      <Link href={`/universities?country=${country.id}`} className="text-sm text-accent hover:underline">
                        View all
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {country.universities.map((uni) => (
                        <Link
                          key={uni.id}
                          href={`/universities/${uni.slug}`}
                          className="flex items-center gap-4 rounded-xl border border-border/60 p-4 hover:border-accent/30 transition-all"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-primary text-sm">{uni.name}</h4>
                            <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                              {uni.worldRanking ? <span>Rank #{uni.worldRanking}</span> : null}
                              {uni.tuitionMin ? (
                                <span>
                                  {formatCurrency(uni.tuitionMin)} – {formatCurrency(uni.tuitionMax || uni.tuitionMin)}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {courses.length > 0 && (
                  <div className="premium-card p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" /> Courses & Programmes
                      </h3>
                      <Link href={`/find-a-course?country=${country.id}`} className="text-sm text-accent hover:underline">
                        Search all courses
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {courses.slice(0, 8).map((course) => (
                        <Link
                          key={course.id}
                          href={`/courses/${course.slug}`}
                          className="block rounded-xl border border-border/60 p-4 hover:border-accent/30 hover:shadow-premium transition-all"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="font-semibold text-primary">{course.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {course.degreeLevel} · {course.duration}
                                {course.university?.name ? ` · ${course.university.name}` : ''}
                              </p>
                            </div>
                            <span className="font-semibold text-primary text-sm shrink-0">
                              {formatCurrency(course.tuition, course.currency)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {scholarships.length > 0 && (
                  <div className="premium-card p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" /> Scholarships
                      </h3>
                      <Link href={`/scholarships?country=${country.id}`} className="text-sm text-accent hover:underline">
                        View all
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {scholarships.slice(0, 6).map((scholarship) => (
                        <Link
                          key={scholarship.id}
                          href={`/scholarships/${scholarship.id}`}
                          className="rounded-xl bg-muted/50 p-4 hover:bg-muted/80 transition-colors"
                        >
                          <h4 className="font-medium text-primary text-sm">{scholarship.name}</h4>
                          <p className="text-success font-semibold text-sm mt-1">
                            {formatCurrency(scholarship.awardAmount, scholarship.currency)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{scholarship.eligibility}</p>
                          <p className="text-xs text-muted-foreground mt-1">Deadline: {formatDate(scholarship.deadline)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 text-center">
                  <Button variant="accent" asChild>
                    <Link href="/book-counseling">Get Counseling for {country.name}</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
