'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UniversityFiltersBar } from '@/features/universities/components/university-filters';
import { UniversityCard, UniversityListEmpty, UniversityListSkeleton } from '@/features/universities/components/university-card';
import { useUniversities } from '@/hooks/use-api';
import type { UniversityFilters } from '@/services/api.service';

export function UniversityExplorer() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<UniversityFilters>({
    page: 1,
    limit: 10,
    sortBy: 'worldRanking',
    sortOrder: 'asc',
  });

  useEffect(() => {
    const countryId = searchParams.get('country');
    const search = searchParams.get('search');
    if (countryId || search) {
      setFilters((f) => ({
        ...f,
        countryId: countryId || undefined,
        search: search || undefined,
        page: 1,
      }));
    }
  }, [searchParams]);

  const { data, isLoading, isError, error } = useUniversities(filters);

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <UniversityFiltersBar filters={filters} onChange={setFilters} />

        {isError && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
            Failed to load universities: {(error as Error).message}. Ensure the API server is running on port 4000.
          </div>
        )}

        <div className="mt-8">
          {isLoading ? (
            <UniversityListSkeleton />
          ) : !data?.data.length ? (
            <UniversityListEmpty />
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {data.data.length} of {data.meta.total} universities
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.data.map((uni) => (
                  <UniversityCard key={uni.id} university={uni} />
                ))}
              </div>

              {data.meta.totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!data.meta.hasPrevPage}
                    onClick={() => setFilters((f) => ({ ...f, page: (f.page || 1) - 1 }))}
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {data.meta.page} of {data.meta.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!data.meta.hasNextPage}
                    onClick={() => setFilters((f) => ({ ...f, page: (f.page || 1) + 1 }))}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
