import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ServicesPageContent } from '@/features/services/components/services-page-content';

export const metadata: Metadata = {
  title: 'Student Services',
  description:
    'Comprehensive study abroad services for 19+ countries — counseling, admissions, scholarships, visa, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <ServicesPageContent />
      </main>
      <Footer />
    </>
  );
}
