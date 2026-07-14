'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BadgeCheck, Users, Globe2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/section-header';
import { APP_CONFIG, FOUNDER, STUDENTS_PLACED_STAT, ROUTES, DESTINATIONS } from '@mge/config';

const values = [
  { icon: Users, title: 'Student-First', desc: 'Every decision starts with what is best for the student and their family.' },
  { icon: Globe2, title: 'Focused Excellence', desc: 'Deep expertise in USA, UK, and Australia — not scattered across dozens of countries.' },
  { icon: Award, title: 'Proven Results', desc: `${STUDENTS_PLACED_STAT} students guided with award-winning counseling credentials.` },
  { icon: BadgeCheck, title: 'Certified Guidance', desc: 'British Council certified counseling you can trust with your future.' },
];

export function AboutPageContent() {
  return (
    <>
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(42_80%_44%/0.08),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
                About {APP_CONFIG.shortName}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary leading-tight">
                {APP_CONFIG.tagline}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                {APP_CONFIG.name} is a boutique study abroad consultancy founded by {FOUNDER.name}.
                We help ambitious students pursue world-class education in the USA, UK, and Australia —
                with personal counseling, not call-center scripts.
              </p>
              <Button variant="accent" className="mt-8" asChild>
                <Link href={ROUTES.bookCounseling}>Book Free Counseling <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="relative aspect-[4/5] max-w-md mx-auto rounded-[2rem] overflow-hidden shadow-premium-xl">
              <Image src="/images/founder-counselor.png" alt={FOUNDER.name} fill className="object-cover object-top" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-display text-xl font-bold">{FOUNDER.name}</p>
                <p className="text-white/80 text-sm">{FOUNDER.title}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Our Mission" title="Making global education personal" description="We believe every student deserves expert, honest guidance — not a one-size-fits-all brochure." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="premium-card p-5">
                <v.icon className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-semibold text-primary">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-primary">Why students choose {APP_CONFIG.shortName}</h2>
          <ul className="mt-6 space-y-3">
            {[
              `Founded by ${FOUNDER.name} — 10+ years experience, former IDP Counselor`,
              `${STUDENTS_PLACED_STAT} students placed across USA, UK & Australia`,
              'Pan-India Top 17 · Best Counselor — Silver Category',
              'British Council Certified Counselor',
              '15+ partner universities with real course and fee data',
              'Free counseling, transparent process, end-to-end support',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            {DESTINATIONS.map((d) => (
              <span key={d.code} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-primary">{d.flag} {d.name}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
