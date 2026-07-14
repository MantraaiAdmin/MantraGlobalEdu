import Link from 'next/link';
import { APP_CONFIG } from '@mge/config';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string | null;
  /** Light text for dark backgrounds (e.g. hero header) */
  inverted?: boolean;
}

const sizeStyles = {
  sm: {
    name: 'text-sm sm:text-base',
    tagline: 'text-[9px] sm:text-[10px]',
  },
  md: {
    name: 'text-base sm:text-lg',
    tagline: 'text-[10px] sm:text-[11px]',
  },
  lg: {
    name: 'text-lg sm:text-xl',
    tagline: 'text-[11px] sm:text-xs',
  },
} as const;

export function Logo({
  className,
  size = 'md',
  href = '/',
  inverted = false,
}: LogoProps) {
  const styles = sizeStyles[size];

  const content = (
    <span className="flex flex-col leading-tight min-w-0">
      <span
        className={cn(
          'font-display font-bold tracking-tight',
          styles.name,
          inverted ? 'text-white' : 'text-primary'
        )}
      >
        Mantra
      </span>
      <span
        className={cn(
          'font-semibold uppercase tracking-[0.18em]',
          styles.tagline,
          inverted ? 'text-accent' : 'text-accent'
        )}
      >
        Global Education
      </span>
    </span>
  );

  if (href == null) {
    return (
      <span className={cn('inline-flex items-center', className)} aria-label={APP_CONFIG.name}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn('inline-flex items-center transition-opacity hover:opacity-90', className)}
      aria-label={APP_CONFIG.name}
    >
      {content}
    </Link>
  );
}
