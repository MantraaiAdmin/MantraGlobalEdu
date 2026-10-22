import type { Metadata } from 'next';
import { privatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = privatePageMetadata('Login');

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
