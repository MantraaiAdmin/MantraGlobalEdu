'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { useUniversity } from '@/hooks/use-api';
import { formatCurrency, formatDate } from '@mge/utils';
import {
  Building2, Globe, Star, ExternalLink, ArrowLeft, GraduationCap, Award, Loader2,
} from 'lucide-react';
import { use } from 'react';

export default function UniversityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: university, isLoading, isError } = useUniversity(slug);

  return (
    <>
      <Header />
      <main className="pt-24">
        {isLoading && (
          <div className="flex justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="mx-auto max-w-3xl px-4 py-32 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary">University not found</h1>
            <Button className="mt-6" asChild>
              <Link href="/universities"><ArrowLeft className="h-4 w-4" /> Back to Universities</Link>
            </Button>
          </div>
        )}

        {university && (
          <>
            <section className="mesh-hero relative overflow-hidden py-16">
              <div className="absolute inset-0 noise pointer-events-none" />
              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href="/universities" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className="h-4 w-4" /> All Universities
                </Link>
                <div className="flex items-start gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 shrink-0">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-white/70 text-sm mb-2">
                      <span>{university.country?.flag}</span>
                      <Globe className="h-3.5 w-3.5" />
                      <span>{university.country?.name}</span>
                      {university.worldRanking && (
                        <span className="flex items-center gap-1 text-accent">
                          <Star className="h-3.5 w-3.5 fill-accent" /> Rank #{university.worldRanking}
                        </span>
                      )}
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{university.name}</h1>
                    {university.description && (
                      <p className="mt-4 text-white/70 max-w-3xl leading-relaxed">{university.description}</p>
                    )}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {university.website && (
                        <Button variant="accent" size="sm" asChild>
                          <a href={university.website} target="_blank" rel="noopener noreferrer">
                            Visit Website <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}
                      <Button variant="premium" size="sm" className="bg-white/10 text-white border-white/25" asChild>
                        <Link href="/book-counseling">Apply with Counselor</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Tuition Range', value: university.tuitionMin ? `${formatCurrency(university.tuitionMin)} – ${formatCurrency(university.tuitionMax || university.tuitionMin)}` : 'N/A' },
                      { label: 'Acceptance Rate', value: university.acceptanceRate ? `${university.acceptanceRate}%` : 'N/A' },
                      { label: 'World Ranking', value: university.worldRanking ? `#${university.worldRanking}` : 'N/A' },
                    ].map((stat) => (
                      <div key={stat.label} className="premium-card p-5 text-center">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        <div className="text-xl font-bold text-primary mt-2">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {university.popularPrograms?.length > 0 && (
                    <div className="premium-card p-6">
                      <h2 className="font-display text-xl font-bold text-primary mb-4">Popular Programs</h2>
                      <div className="flex flex-wrap gap-2">
                        {university.popularPrograms.map((p) => (
                          <span key={p} className="rounded-full bg-primary/5 border border-primary/10 px-4 py-1.5 text-sm text-primary">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {university.courses && university.courses.length > 0 && (
                    <div className="premium-card p-6">
                      <h2 className="font-display text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" /> Courses
                      </h2>
                      <div className="space-y-3">
                        {university.courses.map((course) => (
                          <Link key={course.id} href={`/courses/${course.slug}`} className="block rounded-xl border border-border/60 p-4 hover:border-accent/30 hover:shadow-premium transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-primary">{course.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{course.degreeLevel} · {course.duration}</p>
                              </div>
                              <span className="font-semibold text-primary text-sm">{formatCurrency(course.tuition, course.currency)}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {university.scholarships && university.scholarships.length > 0 && (
                    <div className="premium-card p-6">
                      <h2 className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" /> Scholarships
                      </h2>
                      <div className="space-y-3">
                        {university.scholarships.map((s) => (
                          <div key={s.id} className="rounded-xl bg-muted/50 p-4">
                            <h3 className="font-medium text-primary text-sm">{s.name}</h3>
                            <p className="text-success font-semibold text-sm mt-1">{formatCurrency(s.awardAmount, s.currency)}</p>
                            <p className="text-xs text-muted-foreground mt-1">Deadline: {formatDate(s.deadline)}</p>
                          </div>
                        ))}
                      </div>
                      <Button variant="ghost" className="mt-4 w-full" asChild>
                        <Link href="/scholarships">View All Scholarships</Link>
                      </Button>
                    </div>
                  )}

                  <div className="premium-card p-6 bg-primary text-white">
                    <h3 className="font-semibold">Need help applying?</h3>
                    <p className="text-white/70 text-sm mt-2">Our counselors specialize in {university.country?.name} admissions.</p>
                    <Button variant="accent" className="mt-4 w-full" asChild>
                      <Link href="/book-counseling">Book Free Counseling</Link>
                    </Button>
                  </div>
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
