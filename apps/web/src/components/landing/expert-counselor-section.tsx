import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_CONFIG, FOUNDER, ROUTES } from '@mge/config';

export function ExpertCounselorSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-muted/30">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-premium-xl border border-border/40">
              <Image
                src="/images/founder-counselor.png"
                alt={`${FOUNDER.name}, ${FOUNDER.title}`}
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-2xl font-bold text-white">{FOUNDER.name}</p>
                <p className="text-sm text-white/85 mt-0.5">{FOUNDER.title}</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="mb-5">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8a5f00]">
                Meet our founder
              </span>
            </p>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary leading-tight">
              Guidance led by {FOUNDER.name}
            </h2>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {FOUNDER.name} founded {APP_CONFIG.name} to give students and families personal, expert guidance
              through every stage of studying abroad — from profile assessment and university shortlisting to
              applications, scholarships, visas and pre-departure planning.
            </p>

            <h3 className="mt-8 font-semibold text-primary">Experience and credentials</h3>
            <ul className="mt-4 space-y-3">
              {FOUNDER.credentials.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <BadgeCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="home_founder">
                  Book Free Counselling <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">About {APP_CONFIG.name}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
