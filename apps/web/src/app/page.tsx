import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustMetrics } from '@/components/landing/trust-metrics';
import { UspSection } from '@/components/landing/usp-section';
import { MantraFrameworkSection } from '@/components/landing/mantra-framework-section';
import { ExpertCounselorSection } from '@/components/landing/expert-counselor-section';
import { ServicesSection } from '@/components/landing/services-section';
import { DestinationsSection } from '@/components/landing/destinations-section';
import { ToolsSection } from '@/components/landing/tools-section';
import { ResourcesSection } from '@/components/landing/resources-section';
import {
  CoimbatoreSection,
  HomeFaq,
  ScholarshipsTeaser,
  WhyMantraSection,
} from '@/components/landing/home-sections';
import { CounsellingCta } from '@/components/content/blocks';
import { pageMetadata } from '@/lib/seo';
import { ARTICLES, RESOURCE_CATEGORY_PAGES } from '@/data/articles';

export const metadata = pageMetadata({
  title: 'Study Abroad Consultants in Coimbatore | Mantra Global Education',
  description:
    'Personalised study abroad counselling, university applications, scholarship and visa guidance — plus Mantra.Ai profile building. Book a free session.',
  path: '/',
});

const articleCounts = Object.fromEntries(
  RESOURCE_CATEGORY_PAGES.map((category) => [
    category.id,
    ARTICLES.filter((article) => article.category === category.id).length,
  ])
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <TrustMetrics />
        <DestinationsSection />
        <ToolsSection />
        <WhyMantraSection />
        <UspSection />
        <ServicesSection />
        <MantraFrameworkSection />
        <ScholarshipsTeaser />
        <ExpertCounselorSection />
        <ResourcesSection articleCounts={articleCounts} />
        <CoimbatoreSection />
        <HomeFaq />
        <CounsellingCta location="home_final" />
      </main>
      <Footer />
    </>
  );
}
