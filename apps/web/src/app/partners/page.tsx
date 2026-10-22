import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { PartnersPageContent } from '@/features/partners/components/partners-page-content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Partner with Mantra Global Education | Universities & Colleges',
  description:
    'Partnership opportunities for universities, engineering colleges and career partners who want to work with Mantra Global Education.',
  path: '/partners',
});

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }]} />
        </div>
        <PartnersPageContent />
      </main>
      <Footer />
    </>
  );
}
