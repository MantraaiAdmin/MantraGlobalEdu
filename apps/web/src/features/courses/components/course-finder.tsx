'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourses, useCountries, useUniversities } from '@/hooks/use-api';
import type { CourseFilters } from '@/services/api.service';
import { CourseFiltersPanel, ActiveFilterPills } from '@/features/courses/components/course-filters';
import { CourseCard, CourseListEmpty, CourseListSkeleton } from '@/features/courses/components/course-card';
import { cn } from '@/lib/utils';

export function CourseFinder() {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<CourseFilters>({
    page: 1,
    limit: 12,
    sortBy: 'tuition',
    sortOrder: 'asc',
  });

  useEffect(() => {
    const countryId = searchParams.get('country');
    const query = searchParams.get('q');
    if (countryId || query) {
      setFilters((f) => ({
        ...f,
        countryId: countryId || undefined,
        query: query || undefined,
        page: 1,
      }));
    }
  }, [searchParams]);

  const { data, isLoading, isError, error } = useCourses(filters);
  const { data: countries } = useCountries();
  const { data: universities } = useUniversities({ page: 1, limit: 50 });

  return (
    <section className="pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block sticky top-24">
            <div className="premium-card p-6">
              <CourseFiltersPanel filters={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                {data && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{data.meta.total}</span> courses found
                    {data.meta.totalPages > 1 && (
                      <span> · Page {data.meta.page} of {data.meta.totalPages}</span>
                    )}
                  </p>
                )}
                <div className="mt-3">
                  <ActiveFilterPills
                    filters={filters}
                    onChange={setFilters}
                    countries={countries?.data}
                    universities={universities?.data}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </Button>
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-') as [string, 'asc' | 'desc'];
                    setFilters((f) => ({ ...f, sortBy, sortOrder, page: 1 }));
                  }}
                  className="h-9 rounded-xl border border-input bg-background px-3 text-sm"
                >
                  <option value="tuition-asc">Tuition: Low to High</option>
                  <option value="tuition-desc">Tuition: High to Low</option>
                  <option value="name-asc">Name: A–Z</option>
                  <option value="createdAt-desc">Recently Added</option>
                </select>
              </div>
            </div>

            {isError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm mb-6">
                Failed to load courses: {(error as Error).message}. Ensure the API server is running.
              </div>
            )}

            {isLoading ? (
              <CourseListSkeleton />
            ) : !data?.data.length ? (
              <CourseListEmpty />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {data.data.map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} />
                  ))}
                </div>

                {data.meta.totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
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
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-50 transition-opacity duration-300',
          mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl p-6 shadow-premium-xl transition-transform duration-300',
            mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-muted" />
          <CourseFiltersPanel
            filters={filters}
            onChange={setFilters}
            onClose={() => setMobileFiltersOpen(false)}
          />
        </div>
      </div>
    </section>
  );
}
