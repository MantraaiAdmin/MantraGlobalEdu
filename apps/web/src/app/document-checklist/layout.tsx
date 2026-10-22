import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Document Checklist | Mantra Global Education',
  description:
    'Country-specific checklists of the application and student visa documents commonly needed for undergraduate and postgraduate study abroad.',
  path: '/document-checklist',
});

export default function DocumentChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
