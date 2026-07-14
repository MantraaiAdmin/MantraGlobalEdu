'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Award, BadgeCheck, GraduationCap, ArrowRight, Sparkles, Trophy, Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_CONFIG, FOUNDER, STUDENTS_PLACED_STAT } from '@mge/config';

const credentials = [
  {
    icon: GraduationCap,
    title: '10+ Years of Experience',
    desc: 'A decade of guiding students through global admissions, visas, and university pathways.',
  },
  {
    icon: Users,
    title: `${STUDENTS_PLACED_STAT} Students Placed`,
    desc: 'Former IDP Counselor with a proven track record of successful placements worldwide.',
  },
  {
    icon: Trophy,
    title: 'Pan-India Top 17',
    desc: 'Recognised as Best Counselor — Silver Category among India\'s leading study abroad advisors.',
  },
  {
    icon: BadgeCheck,
    title: 'British Council Certified',
    desc: 'Certified British Council Counselor with credentials trusted by universities and families alike.',
  },
];

const recognitions = [
  'Best Counselor — Silver Category',
  'Pan-India Top 17',
  'British Council Certified',
  'Former IDP Counselor',
];

export function ExpertCounselorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-muted/30">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/6 blur-3xl" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -bottom-6 -right-6 h-56 w-56 rounded-full bg-accent/15 blur-2xl" />
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-premium-xl border border-border/40">
              <Image
                src="/images/founder-counselor.png"
                alt={`${FOUNDER.name}, ${FOUNDER.title} — certified British Council counselor`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-2xl font-bold text-white">{FOUNDER.name}</p>
                <p className="text-sm text-white/80 mt-0.5">{FOUNDER.title}</p>
              </div>
            </div>

            <div className="absolute top-6 -left-3 sm:left-4 glass rounded-2xl px-4 py-3 shadow-premium-lg">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Certified</p>
                  <p className="text-sm font-bold text-primary">British Council</p>
                </div>
              </div>
            </div>

            <div className="absolute top-6 -right-3 sm:right-4 glass rounded-2xl px-4 py-3 shadow-premium-lg">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Students placed</p>
              <p className="text-2xl font-bold text-primary">{STUDENTS_PLACED_STAT}</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Meet Our Founder
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-primary leading-tight">
              <span className="text-gradient">{FOUNDER.name}</span>, {FOUNDER.title}
            </h2>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {FOUNDER.name} founded {APP_CONFIG.name} to give every student the kind of personal, expert
              guidance she wished more families had access to. Today, {APP_CONFIG.shortName} helps ambitious students pursue
              degrees in the USA, UK, and Australia — from profile assessment and university shortlisting
              to applications, scholarships, visas, and pre-departure planning.
            </p>

            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              With over <strong className="text-primary font-semibold">10 years</strong> in international
              education, {FOUNDER.name} is a <strong className="text-primary font-semibold">former IDP
              Counselor</strong> who has successfully placed <strong className="text-primary font-semibold">{STUDENTS_PLACED_STAT.toLowerCase()}
              students</strong> abroad. Recognised among the{' '}
              <strong className="text-primary font-semibold">Top 17 counselors Pan-India</strong> and awarded{' '}
              <strong className="text-primary font-semibold">Best Counselor — Silver Category</strong>, with
              additional industry accolades and a{' '}
              <strong className="text-primary font-semibold">Certified British Council Counselor</strong>{' '}
              certificate.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {recognitions.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs font-medium text-primary shadow-sm"
                >
                  <Award className="h-3 w-3 text-accent" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="premium-card p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="accent" size="lg" asChild>
                <Link href="/book-counseling">
                  Book Free Counseling <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn About {APP_CONFIG.shortName}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
