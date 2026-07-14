import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { UniversityExplorer } from '@/features/universities/components/university-explorer';
import { Loader2 } from 'lucide-react';

export default function UniversitiesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Explore"
          title="University Explorer"
          description="Discover top universities across USA, UK, and Australia with official tuition and scholarship data."
        />
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          <UniversityExplorer />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
