import Link from 'next/link';
import { ArrowRight, Info, Mail, Phone } from 'lucide-react';
import { BUSINESS_CONTACT, OUTCOME_DISCLAIMER, POLICY_CHANGE_NOTICE, ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { reveal } from '@/lib/motion';

/** Server-rendered section heading (no entrance animation, so text is visible before hydration). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div {...reveal('fade-up')} className={cn('max-w-3xl mb-10', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="mb-3">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8a5f00]">
            {eyebrow}
          </span>
        </p>
      )}
      <Tag className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">{title}</Tag>
      {description && <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}

/** Accessible FAQ list using native <details>, so it works without JavaScript. */
export function FaqList({ items, headingLevel = 'h3' }: { items: { q: string; a: string }[]; headingLevel?: 'h3' | 'h4' }) {
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item) => (
        <details key={item.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            <Heading className="font-semibold text-primary text-base">{item.q}</Heading>
            <span aria-hidden="true" className="mt-0.5 text-xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PolicyNotice({ className, text = POLICY_CHANGE_NOTICE }: { className?: string; text?: string }) {
  return (
    <aside className={cn('flex gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm text-primary', className)}>
      <Info className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
      <p>{text}</p>
    </aside>
  );
}

export function OutcomeNotice({ className }: { className?: string }) {
  return <PolicyNotice className={className} text={OUTCOME_DISCLAIMER} />;
}

/** Final conversion band: counselling, phone and email. */
export function CounsellingCta({
  title = 'Talk to a counsellor about your plans',
  description = 'Book a counselling session — in Coimbatore, for Chennai students or online from anywhere in India. We will help you understand your options and next steps.',
  location,
}: {
  title?: string;
  description?: string;
  location: string;
}) {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        <div {...reveal('zoom-in')} className="relative overflow-hidden rounded-3xl mesh-hero px-6 py-12 sm:px-12 sm:py-14 text-center shadow-premium-xl">
          <div className="motion-blob motion-blob--gold -top-16 -left-10 h-56 w-56" aria-hidden="true" />
          <div className="motion-blob motion-blob--blue motion-blob--slow -bottom-16 -right-10 h-56 w-56" aria-hidden="true" />
          <h2 className="relative font-display text-2xl sm:text-3xl font-bold text-white">{title}</h2>
          <p className="relative mt-4 text-white/80 max-w-2xl mx-auto">{description}</p>
          <div className="relative mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <Button size="lg" variant="accent" asChild>
              <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location={location}>
                Book Free Counselling <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="premium" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
              <a href={BUSINESS_CONTACT.phoneHref} data-track-location={location}>
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {BUSINESS_CONTACT.phoneDisplay}
              </a>
            </Button>
          </div>
          <p className="relative mt-6 text-sm text-white/75">
            Or email{' '}
            <a href={BUSINESS_CONTACT.emailHref} data-track-location={location} className="font-semibold text-white underline underline-offset-2 break-all">
              <Mail className="inline h-4 w-4 mr-1 -mt-0.5" aria-hidden="true" />
              {BUSINESS_CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function BulletList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('space-y-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SourceList({ sources, reviewed }: { sources: { label: string; url: string }[]; reviewed?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-5">
      <h2 className="font-semibold text-primary">Official sources</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-accent break-words">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
      {reviewed && (
        <p className="mt-4 text-xs text-muted-foreground">
          Last reviewed: <time dateTime={reviewed}>{formatLongDate(reviewed)}</time>
        </p>
      )}
    </div>
  );
}

export function formatLongDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
