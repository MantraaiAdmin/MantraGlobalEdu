import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustMetrics } from '@/components/landing/trust-metrics';
import { MantraFrameworkSection } from '@/components/landing/mantra-framework-section';
import { ExpertCounselorSection } from '@/components/landing/expert-counselor-section';
import { StudentsShowcaseSection } from '@/components/landing/students-showcase-section';
import { ServicesSection } from '@/components/landing/services-section';
import { DestinationsSection } from '@/components/landing/destinations-section';
import { ToolsSection } from '@/components/landing/tools-section';
import { SuccessStoriesSection } from '@/components/landing/success-stories-section';
import { ResourcesSection } from '@/components/landing/resources-section';
import { CTASection } from '@/components/landing/cta-section';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustMetrics />
        <MantraFrameworkSection />
        <ExpertCounselorSection />
        <StudentsShowcaseSection />
        <ServicesSection />
        <DestinationsSection />
        <ToolsSection />
        <SuccessStoriesSection />
        <ResourcesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
