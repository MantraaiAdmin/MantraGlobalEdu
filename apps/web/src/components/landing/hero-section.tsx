import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Phone } from 'lucide-react';
import { BUSINESS_CONTACT, ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { STUDENT_IMAGES } from '@/lib/student-images';

/**
 * Server-rendered hero. No entrance animation on the H1 or intro copy, so the
 * largest contentful paint is not delayed waiting for JavaScript.
 */
export function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden mesh-hero lg:min-h-[88vh]">
      <div className="absolute inset-0 noise pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern opacity-[0.04]" aria-hidden="true" />
      <div className="motion-aurora" aria-hidden="true" />
      <div className="motion-blob motion-blob--gold top-[12%] left-[8%] h-72 w-72 sm:h-96 sm:w-96" aria-hidden="true" />
      <div className="motion-blob motion-blob--blue motion-blob--slow bottom-[8%] right-[10%] h-64 w-64 sm:h-80 sm:w-80" aria-hidden="true" />
      <div className="motion-blob motion-blob--deep top-[45%] right-[35%] h-56 w-56" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 mb-7">
              <span className="motion-pulse-dot" aria-hidden="true" />
              <span>Study abroad consultants · Coimbatore, Chennai &amp; across India</span>
            </p>

            <h1 className="font-display text-[2.1rem] leading-[1.15] sm:text-5xl lg:text-[3.4rem] font-bold text-white tracking-tight">
              Study Abroad with Expert Guidance and a{' '}
              <span className="text-shimmer-gold">Career-Ready Profile</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
              Mantra Global Education offers personalised study abroad counselling and application support —
              from choosing a country and course to university applications, scholarship guidance and visa
              documentation — for students in Coimbatore, Chennai and across India. As the education vertical of
              Mantra.Ai, we also help students build a technology portfolio alongside their studies.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button size="lg" variant="accent" asChild>
                <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="home_hero">
                  Book Free Counselling
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="premium" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
                <Link href={ROUTES.findACourse}>
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Find a Course
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/80">
              Prefer to talk?{' '}
              <a href={BUSINESS_CONTACT.phoneHref} data-track-location="home_hero" className="inline-flex items-center gap-1.5 font-semibold text-white underline underline-offset-4 hover:text-accent">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {BUSINESS_CONTACT.phoneDisplay}
              </a>{' '}
              or email{' '}
              <a href={BUSINESS_CONTACT.emailHref} data-track-location="home_hero" className="font-semibold text-white underline underline-offset-4 hover:text-accent break-all">
                {BUSINESS_CONTACT.email}
              </a>
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-6 right-12 h-56 w-56 rounded-full bg-accent/25 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-[2rem] shadow-premium-xl border-4 border-white/20">
              <Image
                src={STUDENT_IMAGES.hero.src}
                alt={STUDENT_IMAGES.hero.alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 448px, 1px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="motion-float absolute -left-6 top-16 glass rounded-2xl px-4 py-3 shadow-premium-lg">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Destination guides</p>
              <p className="text-sm font-bold text-primary">UK · USA · Canada · Australia +6</p>
            </div>
            <div className="motion-float motion-float--delay absolute -right-4 bottom-20 glass rounded-2xl px-4 py-3 shadow-premium-lg">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Powered by</p>
              <p className="text-sm font-bold text-primary">Mantra.Ai portfolio support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
