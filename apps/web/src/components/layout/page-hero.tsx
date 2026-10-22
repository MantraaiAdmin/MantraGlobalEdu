import { cn } from '@/lib/utils';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import type { BreadcrumbItem } from '@/lib/seo';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, className, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className={cn('relative pt-28 pb-14 sm:pb-16 overflow-hidden mesh-hero', className)}>
      <div className="absolute inset-0 noise pointer-events-none" aria-hidden="true" />
      <div className="motion-aurora" aria-hidden="true" />
      <div className="motion-blob motion-blob--gold -top-10 right-[10%] h-64 w-64" aria-hidden="true" />
      <div className="motion-blob motion-blob--blue motion-blob--slow bottom-0 left-[5%] h-56 w-56" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(42_78%_52%/0.15),transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone="dark" className="mb-6" />}
        {eyebrow && (
          <p className="mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              {eyebrow}
            </span>
          </p>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
