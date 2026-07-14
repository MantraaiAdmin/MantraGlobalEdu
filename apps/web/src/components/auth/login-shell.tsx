'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, ReactNode } from 'react';
import { Logo } from '@/components/common/logo';
import { cn } from '@/lib/utils';

export type LoginRole = 'student' | 'admin' | 'counselor';

interface LoginShellProps {
  role: LoginRole;
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const ROLE_STYLES: Record<
  LoginRole,
  {
    page: string;
    panel: string;
    iconWrap: string;
    icon: string;
    title: string;
    subtitle: string;
    image?: { src: string; alt: string };
  }
> = {
  student: {
    page: 'mesh-hero',
    panel: 'glass-dark border-white/15',
    iconWrap: 'bg-accent/25 border-accent/40',
    icon: 'text-accent',
    title: 'text-white',
    subtitle: 'text-white/65',
    image: {
      src: '/images/hero-campus-walking.jpg',
      alt: 'Students walking on a university campus',
    },
  },
  admin: {
    page: 'bg-primary',
    panel: 'bg-white border-border shadow-premium-xl',
    iconWrap: 'bg-red-500/15 border-red-500/30',
    icon: 'text-red-600',
    title: 'text-primary',
    subtitle: 'text-muted-foreground',
    image: {
      src: '/images/campus-walking-uk.jpg',
      alt: 'Students at a UK university campus',
    },
  },
  counselor: {
    page: 'bg-gradient-to-br from-emerald-950 via-primary to-primary',
    panel: 'bg-white/95 border-emerald-200/50 shadow-premium-xl backdrop-blur-sm',
    iconWrap: 'bg-emerald-500/15 border-emerald-500/35',
    icon: 'text-emerald-600',
    title: 'text-primary',
    subtitle: 'text-muted-foreground',
    image: {
      src: '/images/campus-walking-path.jpg',
      alt: 'Students walking on a college campus path',
    },
  },
};

const ROLE_LABELS: Record<LoginRole, string> = {
  student: 'Student',
  admin: 'Admin',
  counselor: 'Counselor',
};

export function LoginShell({
  role,
  icon: Icon,
  title,
  subtitle,
  badge,
  children,
  footer,
}: LoginShellProps) {
  const styles = ROLE_STYLES[role];
  const isStudent = role === 'student';

  if (isStudent) {
    return (
      <div className={cn('min-h-screen relative overflow-hidden', styles.page)}>
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative min-h-screen grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-12 lg:px-12">
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <RoleHeader
                role={role}
                icon={Icon}
                title={title}
                subtitle={subtitle}
                badge={badge}
                styles={styles}
              />
              <div className={cn('rounded-2xl p-8 mt-8', styles.panel)}>{children}</div>
              {footer}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center p-12 relative">
            {styles.image && (
              <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden shadow-premium-xl border border-white/20">
                <Image src={styles.image.src} alt={styles.image.alt} fill className="object-cover" sizes="500px" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display text-2xl font-bold">Walk into your future</p>
                  <p className="text-white/70 text-sm mt-2">Campus tours · Applications · Counseling</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen relative overflow-hidden', styles.page)}>
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
      {role === 'counselor' && (
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-3xl" />
      )}

      <div className="relative min-h-screen grid lg:grid-cols-2">
        <div
          className={cn(
            'hidden lg:flex flex-col justify-between p-12 text-white',
            role === 'admin' ? 'bg-primary' : 'bg-emerald-900/40'
          )}
        >
          <Logo size="sm" href="/" inverted className="mb-5" />

          <div>
            <div className={cn('inline-flex h-16 w-16 items-center justify-center rounded-2xl border mb-6', styles.iconWrap)}>
              <Icon className={cn('h-8 w-8', styles.icon)} />
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight">{title}</h2>
            <p className="mt-4 text-white/70 text-lg max-w-sm">{subtitle}</p>
            {badge && (
              <span className="inline-block mt-6 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>

          {styles.image && (
            <div className="relative h-48 rounded-2xl overflow-hidden border border-white/15 mt-8">
              <Image src={styles.image.src} alt={styles.image.alt} fill className="object-cover opacity-80" sizes="400px" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8">
              <RoleHeader
                role={role}
                icon={Icon}
                title={title}
                subtitle={subtitle}
                badge={badge}
                styles={styles}
              />
            </div>

            <div className={cn('rounded-2xl p-8 border', styles.panel)}>
              <div className="hidden lg:block mb-6 pb-6 border-b border-border/60">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {ROLE_LABELS[role]} Sign In
                </p>
                <h1 className="font-display text-2xl font-bold text-primary mt-1">{title}</h1>
              </div>
              {children}
            </div>
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleHeader({
  role,
  icon: Icon,
  title,
  subtitle,
  badge,
  styles,
}: {
  role: LoginRole;
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  badge?: string;
  styles: (typeof ROLE_STYLES)[LoginRole];
}) {
  return (
    <div className="text-center lg:text-left">
      <div className="inline-block mb-5">
        <Logo size="sm" href={null} />
      </div>
      <div
        className={cn(
          'inline-flex h-14 w-14 items-center justify-center rounded-2xl border mb-4',
          styles.iconWrap
        )}
      >
        <Icon className={cn('h-7 w-7', styles.icon)} />
      </div>
      <h1 className={cn('font-display text-3xl font-bold', styles.title)}>{title}</h1>
      <p className={cn('mt-2 text-sm', styles.subtitle)}>{subtitle}</p>
      {badge && (
        <span
          className={cn(
            'inline-block mt-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
            role === 'student'
              ? 'bg-accent/20 text-accent border border-accent/30'
              : role === 'admin'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

export const LOGIN_LINKS = [
  { role: 'student' as const, href: '/login/student', label: 'Student' },
  { role: 'counselor' as const, href: '/login/counselor', label: 'Counselor' },
  { role: 'admin' as const, href: '/login/admin', label: 'Admin' },
];

export function LoginRoleSwitcher({ current, dark }: { current: LoginRole; dark?: boolean }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
      {LOGIN_LINKS.filter((l) => l.role !== current).map((link) => (
        <Link
          key={link.role}
          href={link.href}
          className={cn(
            'rounded-lg px-3 py-1.5 font-medium transition-colors',
            dark && link.role === 'student' && 'text-accent hover:bg-accent/10',
            dark && link.role === 'admin' && 'text-white/80 hover:text-white hover:bg-white/10',
            dark && link.role === 'counselor' && 'text-emerald-300 hover:bg-white/10',
            !dark && link.role === 'student' && 'text-accent hover:bg-accent/10',
            !dark && link.role === 'admin' && 'text-primary hover:bg-primary/5',
            !dark && link.role === 'counselor' && 'text-emerald-600 hover:bg-emerald-50'
          )}
        >
          {link.label} Login
        </Link>
      ))}
      <span className={dark ? 'text-white/30' : 'text-muted-foreground/40'}>·</span>
      <Link
        href="/"
        className={cn(
          'transition-colors',
          dark ? 'text-white/50 hover:text-white' : 'text-muted-foreground hover:text-primary'
        )}
      >
        Home
      </Link>
    </div>
  );
}
