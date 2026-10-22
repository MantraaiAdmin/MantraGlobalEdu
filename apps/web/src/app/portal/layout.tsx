import type { Metadata } from 'next';
import { privatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = privatePageMetadata('Portal');

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
