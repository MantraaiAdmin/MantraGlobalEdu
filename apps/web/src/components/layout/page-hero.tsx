import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, className, children }: PageHeroProps) {
  return (
    <section className={cn('relative pt-28 pb-16 overflow-hidden mesh-hero', className)}>
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(42_78%_52%/0.15),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
