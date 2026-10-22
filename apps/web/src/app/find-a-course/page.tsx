import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CourseFinderHero } from '@/features/courses/components/course-finder-hero';
import { CourseFinder } from '@/features/courses/components/course-finder';
import { Loader2 } from 'lucide-react';

import { pageMetadata } from '@/lib/seo';

// Filtered views (?country=, ?level=, ...) all canonicalise to /find-a-course,
// so parameter combinations are not indexed as separate pages.
export const metadata = pageMetadata({
  title: 'Find Courses to Study Abroad | Mantra Global Education',
  description:
    'Search study abroad courses by country, university, study level, tuition and intake. Shortlist programmes and get free counselling from Mantra Global Education.',
  path: '/find-a-course',
});

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
      <main id="main-content" className="bg-background">
        <CourseFinderHero />
        <Suspense fallback={<CourseFinderFallback />}>
          <CourseFinder />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
