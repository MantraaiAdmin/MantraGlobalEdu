'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';
import { ROUTES } from '@mge/config';
import { fetchCourseBySlug, type Course } from '@/services/api.service';
import { formatCurrency } from '@mge/utils';

function CompareContent() {
  const searchParams = useSearchParams();
  const slugs = searchParams.getAll('slug').slice(0, 3);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugs.length < 2) {
      setLoading(false);
      return;
    }
    Promise.all(slugs.map((s) => fetchCourseBySlug(s)))
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [slugs.join(',')]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (slugs.length < 2) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Save at least 2 courses to your shortlist, then compare them here.</p>
        <Button className="mt-4" asChild><Link href={ROUTES.findACourse}>Find Courses</Link></Button>
      </div>
    );
  }

  const rows = [
    { label: 'University', key: (c: Course) => c.university?.name || '—' },
    { label: 'Country', key: (c: Course) => c.university?.country?.name || '—' },
    { label: 'Level', key: (c: Course) => c.degreeLevel },
    { label: 'Duration', key: (c: Course) => c.duration },
    { label: 'Tuition', key: (c: Course) => formatCurrency(c.tuition, c.currency) },
    { label: 'Intakes', key: (c: Course) => c.intakePeriods?.join(', ') || '—' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 text-sm text-muted-foreground font-medium" />
            {courses.map((c) => (
              <th key={c.id} className="p-3 text-left">
                <p className="font-semibold text-primary text-sm">{c.name}</p>
                <Link href={`/courses/${c.slug}`} className="text-xs text-accent hover:underline">View details</Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-border">
              <td className="p-3 text-sm font-medium text-muted-foreground">{row.label}</td>
              {courses.map((c) => (
                <td key={c.id} className="p-3 text-sm text-primary">{row.key(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 text-center">
        <Button variant="accent" asChild>
          <Link href={ROUTES.bookCounseling}>Discuss These Courses <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

export default function CompareCoursesPage() {
  return (
    <>
      <Header />
      <main className="bg-background pt-24 pb-24 lg:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl font-bold text-primary">Compare Courses</h1>
          <p className="mt-2 text-muted-foreground">Side-by-side comparison of up to 3 shortlisted courses.</p>
          <div className="mt-8 premium-card p-4 sm:p-6">
            <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
              <CompareContent />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
