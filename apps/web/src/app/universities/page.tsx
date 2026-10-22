import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { UniversityExplorer } from '@/features/universities/components/university-explorer';
import { Loader2 } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { CATALOG_COUNTS } from '@/lib/catalog';

export const metadata = pageMetadata({
  title: 'Universities Abroad for Indian Students | Mantra Global Education',
  description:
    'Explore universities in the UK, USA, Australia, Canada, Germany and more listed in our course finder, with courses, recorded fees and scholarship links.',
  path: '/universities',
});

export default function UniversitiesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Explore"
          title="Universities Abroad"
          description={`Explore the ${CATALOG_COUNTS.universities} universities across ${CATALOG_COUNTS.countries} destinations in our course finder, with courses and links to official information.`}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Universities', path: '/universities' },
          ]}
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
