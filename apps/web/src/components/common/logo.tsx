import Image from 'next/image';
import Link from 'next/link';
import { APP_CONFIG } from '@mge/config';
import { cn } from '@/lib/utils';

const BRAND_EMBLEM = '/brand/mantra-logo-emblem.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string | null;
  /** White wordmark for dark backgrounds (hero header, footer) */
  inverted?: boolean;
}

const sizeStyles = {
  sm: {
    emblem: 44,
    gap: 'gap-2.5',
    name: 'text-sm sm:text-[15px]',
    tagline: 'text-[8px] sm:text-[9px] tracking-[0.22em]',
  },
  md: {
    emblem: 52,
    gap: 'gap-3',
    name: 'text-base sm:text-lg',
    tagline: 'text-[9px] sm:text-[10px] tracking-[0.2em]',
  },
  lg: {
    emblem: 60,
    gap: 'gap-3.5',
    name: 'text-lg sm:text-xl',
    tagline: 'text-[10px] sm:text-[11px] tracking-[0.18em]',
  },
} as const;

/**
 * Premium circular emblem — cropped to circle so the white canvas
 * never shows as a box on dark navy headers.
 */
function BrandEmblem({
  size,
  inverted,
}: {
  size: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}) {
  const px = sizeStyles[size].emblem;

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 overflow-hidden rounded-full',
        inverted
          ? 'ring-1 ring-white/15 shadow-[0_4px_20px_rgba(200,145,22,0.28)]'
          : 'ring-1 ring-accent/20 shadow-[0_4px_16px_rgba(0,35,78,0.1)]'
      )}
      style={{ width: px, height: px }}
      aria-hidden
    >
      <Image
        src={BRAND_EMBLEM}
        alt=""
        width={px}
        height={px}
        className="h-full w-full scale-[1.06] object-cover object-center"
        priority
        sizes={`${px}px`}
      />
    </span>
  );
}

function BrandWordmark({
  size,
  inverted,
}: {
  size: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}) {
  const styles = sizeStyles[size];

  return (
    <span className="flex min-w-0 flex-col justify-center leading-none">
      <span
        className={cn(
          'font-display font-bold tracking-tight',
          styles.name,
          inverted ? 'text-white' : 'text-primary'
        )}
      >
        Mantra
      </span>
      <span className={cn('mt-0.5 font-semibold uppercase text-accent', styles.tagline)}>
        Global Education
      </span>
    </span>
  );
}

export function Logo({
  className,
  size = 'md',
  href = '/',
  inverted = false,
}: LogoProps) {
  const styles = sizeStyles[size];

  const content = (
    <span className={cn('inline-flex max-w-full items-center', styles.gap)}>
      <BrandEmblem size={size} inverted={inverted} />
      <BrandWordmark size={size} inverted={inverted} />
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
      className={cn('inline-flex max-w-[min(100%,280px)] items-center transition-opacity hover:opacity-95 sm:max-w-none', className)}
      aria-label={APP_CONFIG.name}
    >
      {content}
    </Link>
  );
}
