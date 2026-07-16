'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import Link from 'next/link';
import { useScholarships, useCountries } from '@/hooks/use-api';
import { formatCurrency, formatDate } from '@mge/utils';
import { Award, Calendar, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { ScholarshipFilters } from '@/services/api.service';

export default function ScholarshipsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ScholarshipFilters>({ page: 1, limit: 20 });
  const { data, isLoading, isError } = useScholarships(filters);
  const { data: countries } = useCountries();

  useEffect(() => {
    const countryId = searchParams.get('country');
    if (countryId) {
      setFilters((f) => ({ ...f, countryId, page: 1 }));
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Funding"
          title="Scholarship Finder"
          description="Discover scholarships matching your academic profile, budget, and destination preferences."
        />

        <section className="section-padding">
          <div className="mx-auto max-w-4xl">
            <div className="premium-card p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={filters.countryId || ''}
                onChange={(e) => setFilters((f) => ({ ...f, countryId: e.target.value || undefined, page: 1 }))}
                className="flex h-10 rounded-lg border border-input bg-background px-3 text-sm"
              >
                <option value="">All Countries</option>
                {countries?.data.map((c) => (
                  <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="Max budget ($)"
                onChange={(e) => setFilters((f) => ({ ...f, budget: e.target.value ? Number(e.target.value) : undefined, page: 1 }))}
              />
            </div>

            {isLoading && <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {isError && <p className="text-center text-red-600">Failed to load scholarships.</p>}

            {data && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">{data.meta.total} scholarships found</p>
                {data.data.map((scholarship) => (
                  <Link key={scholarship.id} href={`/scholarships/${scholarship.id}`} className="block">
                  <div className="premium-card p-6 hover:shadow-premium-lg transition-shadow">
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 shrink-0">
                        <Award className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary text-lg">{scholarship.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{scholarship.eligibility}</p>
                        <div className="mt-3 flex items-center gap-6">
                          <span className="text-lg font-bold text-success">{formatCurrency(scholarship.awardAmount, scholarship.currency)}</span>
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" /> {formatDate(scholarship.deadline)}
                          </span>
                        </div>
                        {scholarship.country && (
                          <span className="inline-block mt-2 text-xs text-muted-foreground">{scholarship.country.flag} {scholarship.country.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
