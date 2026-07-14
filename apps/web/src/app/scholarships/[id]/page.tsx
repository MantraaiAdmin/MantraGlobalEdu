'use client';

import { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { useScholarship } from '@/hooks/use-api';
import { formatCurrency, formatDate } from '@mge/utils';
import { Award, Calendar, Loader2, ArrowRight } from 'lucide-react';
import { APP_CONFIG, ROUTES } from '@mge/config';

export default function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: scholarship, isLoading, isError } = useScholarship(id);

  return (
    <>
      <Header />
      <main className="bg-background pt-24 pb-24 lg:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          {isLoading && <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
          {isError && <p className="text-center text-red-600">Scholarship not found.</p>}
          {scholarship && (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 shrink-0">
                  <Award className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-primary">{scholarship.name}</h1>
                  {scholarship.country && (
                    <p className="mt-2 text-muted-foreground">{scholarship.country.flag} {scholarship.country.name}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="premium-card p-4">
                  <p className="text-xs text-muted-foreground">Award Amount</p>
                  <p className="text-xl font-bold text-success mt-1">{formatCurrency(scholarship.awardAmount, scholarship.currency)}</p>
                </div>
                <div className="premium-card p-4">
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="text-lg font-bold text-primary mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {formatDate(scholarship.deadline)}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h2 className="font-semibold text-primary">Eligibility</h2>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{scholarship.eligibility}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-primary">Requirements</h2>
                  <p className="mt-2 text-muted-foreground leading-relaxed whitespace-pre-line">{scholarship.requirements}</p>
                </div>
                {scholarship.university && (
                  <div>
                    <h2 className="font-semibold text-primary">University</h2>
                    <Link href={`/universities/${scholarship.university.slug}`} className="mt-2 text-accent hover:underline">
                      {scholarship.university.name}
                    </Link>
                  </div>
                )}
              </div>

              <Button variant="accent" className="mt-10" size="lg" asChild>
                <Link href={ROUTES.bookCounseling}>Apply with {APP_CONFIG.shortName} Counselor <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
