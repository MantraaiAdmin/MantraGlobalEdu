import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Cost Estimator | Mantra Global Education',
  description:
    'Estimate the total cost of studying abroad, including tuition, living expenses, visa and insurance, for popular destinations.',
  path: '/cost-estimator',
});

export default function CostEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
