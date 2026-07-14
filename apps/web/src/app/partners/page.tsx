import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { APP_CONFIG } from '@mge/config';
import { PartnersPageContent } from '@/features/partners/components/partners-page-content';

export const metadata: Metadata = {
  title: 'Partners',
  description:
    `Partner with ${APP_CONFIG.name} — university, college, and placement partnerships for USA, UK, and Australia student recruitment.`,
};

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <PartnersPageContent />
      </main>
      <Footer />
    </>
  );
}
