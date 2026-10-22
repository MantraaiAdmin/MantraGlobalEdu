import { LegalPageView, legalMetadata } from '@/components/content/legal-page';

export const metadata = legalMetadata('cookie-policy');

export default function Page() {
  return <LegalPageView slug="cookie-policy" />;
}
