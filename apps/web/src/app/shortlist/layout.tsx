import type { Metadata } from 'next';
import { privatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = privatePageMetadata('My Shortlist');

export default function ShortlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
