'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { useCountry } from '@/hooks/use-api';
import { use } from 'react';
import {
  GraduationCap, DollarSign, Home, FileText, Briefcase, Loader2, ArrowLeft, Building2,
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
              <div className="mt-6 flex items-center gap-4">
                <span className="text-7xl">{country.flag}</span>
                {country.intakePeriods?.length > 0 && (
                  <div className="text-sm text-white/60">
                    Intakes: {country.intakePeriods.join(', ')}
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

                {country.universities && country.universities.length > 0 && (
                  <div className="premium-card p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                        <Building2 className="h-5 w-5" /> Top Universities in {country.name}
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
                          <div>
                            <h4 className="font-semibold text-primary text-sm">{uni.name}</h4>
                            {uni.worldRanking && (
                              <p className="text-xs text-muted-foreground">World Rank #{uni.worldRanking}</p>
                            )}
                          </div>
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
