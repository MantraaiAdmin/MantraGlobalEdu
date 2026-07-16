import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { ScholarshipsPageContent } from '@/features/scholarships/components/scholarships-page-content';
import { Loader2 } from 'lucide-react';

export default function ScholarshipsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Funding"
          title="Scholarship Finder"
          description="Discover scholarships matching your academic profile, budget, and destination preferences."
        />
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          <ScholarshipsPageContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
