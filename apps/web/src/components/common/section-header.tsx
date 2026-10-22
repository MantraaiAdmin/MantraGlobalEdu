import { cn } from '@/lib/utils';
import { reveal } from '@/lib/motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div {...reveal('fade-up')} className={cn('max-w-3xl mb-16', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <div className={cn('mb-4', align === 'center' && 'flex justify-center')}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8a5f00]">
            <span className="motion-pulse-dot" aria-hidden="true" />
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
