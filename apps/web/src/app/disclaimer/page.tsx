import { LegalPageView, legalMetadata } from '@/components/content/legal-page';

export const metadata = legalMetadata('disclaimer');

export default function Page() {
  return <LegalPageView slug="disclaimer" />;
}
