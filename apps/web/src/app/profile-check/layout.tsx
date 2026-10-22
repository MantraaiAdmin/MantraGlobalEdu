import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Profile Check | Mantra Global Education',
  description:
    'A free four-step readiness check for your target study destination. See where your profile stands and what to work on before you apply.',
  path: '/profile-check',
});

export default function ProfileCheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
