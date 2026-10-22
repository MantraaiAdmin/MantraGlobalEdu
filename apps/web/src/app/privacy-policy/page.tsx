import { LegalPageView, legalMetadata } from '@/components/content/legal-page';

export const metadata = legalMetadata('privacy-policy');

export default function Page() {
  return <LegalPageView slug="privacy-policy" />;
}
