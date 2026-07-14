import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CourseFinderHero } from '@/features/courses/components/course-finder-hero';
import { CourseFinder } from '@/features/courses/components/course-finder';
import { Loader2 } from 'lucide-react';

import { APP_CONFIG } from '@mge/config';

export const metadata: Metadata = {
  title: 'Find a Course',
  description:
    `Discover international degree programs from top universities. Filter by destination, study level, budget, and intake with ${APP_CONFIG.name}.`,
};

function CourseFinderFallback() {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function FindACoursePage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <CourseFinderHero />
        <Suspense fallback={<CourseFinderFallback />}>
          <CourseFinder />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
