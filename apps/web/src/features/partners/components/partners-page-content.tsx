'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Building2, Handshake, Briefcase, ArrowRight, Sparkles, Globe2,
  Users, TrendingUp, Shield, CheckCircle2, ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/section-header';
import { APP_CONFIG, STUDENTS_PLACED_STAT } from '@mge/config';
import { STUDENT_IMAGES } from '@/lib/student-images';

const partnerships = [
  {
    id: 'university',
    title: 'University Partnership',
    description:
      'Connect your institution with qualified international students across India and South Asia. Co-branded recruitment, agent support, and enrolment pipeline management.',
    cta: 'Become a University Partner',
    icon: Building2,
    highlights: ['Student pipeline', 'Co-marketing', 'Enrolment support'],
    image: '/images/campus-walking-usa.jpg',
  },
  {
    id: 'college',
    title: 'Engineering College Partnership',
    description:
      'Bridge your engineering graduates to top MS and postgraduate programs worldwide with dedicated pathway counseling and application support.',
    cta: 'Partner Your College',
    icon: Handshake,
    highlights: ['Graduate pathways', 'Faculty workshops', 'Alumni network'],
    image: '/images/hero-campus-group.jpg',
  },
  {
    id: 'placement',
    title: 'Placement Partnership',
    description:
      'Collaborate on global career outcomes — help students transition from education abroad to internships and full-time roles with employer networks.',
    cta: 'Become a Placement Partner',
    icon: Briefcase,
    highlights: ['Career fairs', 'Employer connects', 'Visa-ready talent'],
    image: '/images/campus-walking-uk.jpg',
  },
];

const benefits = [
  { icon: Globe2, title: 'Global Reach', desc: 'Access students targeting 19+ study destinations worldwide' },
  { icon: Users, title: `${STUDENTS_PLACED_STAT} Students`, desc: 'Successfully guided to universities worldwide' },
  { icon: TrendingUp, title: 'Higher Enrolments', desc: 'Proven conversion from inquiry to offer' },
  { icon: Shield, title: 'Trusted Brand', desc: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}` },
];

const partnerSteps = [
  { step: '01', title: 'Initial Discussion', desc: 'Share your institution goals and target student profile.' },
  { step: '02', title: 'MOU & Onboarding', desc: 'Formalise partnership terms and integration setup.' },
  { step: '03', title: 'Co-Marketing Launch', desc: 'Joint campaigns, webinars, and campus events.' },
  { step: '04', title: 'Ongoing Growth', desc: 'Quarterly reviews, pipeline reports, and optimisation.' },
];

const networkStats = [
  { value: '15+', label: 'Partner Universities' },
  { value: '19+', label: 'Study Destinations' },
  { value: STUDENTS_PLACED_STAT, label: 'Students Placed' },
  { value: '94%', label: 'Partner Satisfaction' },
];

export function PartnersPageContent() {
  const cardsRef = useRef(null);
  const stepsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' });
  const stepsInView = useInView(stepsRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(212_100%_15%/0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(42_80%_44%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
                <Handshake className="h-3.5 w-3.5" />
                Partnerships
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary leading-tight">
                Partner with{' '}
                <span className="text-gradient">{APP_CONFIG.name}</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Join our network of universities, colleges, and placement partners.
                Together we connect talented students to world-class education across 19+ countries worldwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/contact?type=partnership">
                    Start a Partnership <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">About {APP_CONFIG.shortName}</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -bottom-4 -right-4 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-premium-xl border border-border/40">
                <Image
                  src="/images/hero-campus-walking.jpg"
                  alt="Students walking on a partner university campus"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/45 via-transparent to-accent/10" />
              </div>
              <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-4 shadow-premium-lg">
                <p className="text-xs text-muted-foreground">Partner network</p>
                <p className="text-2xl font-bold text-primary">15+ Unis</p>
              </div>
              <div className="absolute -top-3 -right-3 glass rounded-2xl px-5 py-4 shadow-premium-lg">
                <p className="text-xs text-muted-foreground">Countries</p>
                <p className="text-2xl font-bold text-accent">19+ Countries</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {networkStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership cards */}
      <section ref={cardsRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Partnership Types"
            title="Three Ways to Collaborate"
            description="Whether you're a university, college, or placement agency — we have a partnership model built for you."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {partnerships.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 28 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="premium-card overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-primary shadow-premium">
                    <partner.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-primary">{partner.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {partner.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {partner.highlights.map((h) => (
                      <li
                        key={h}
                        className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full group-hover:bg-primary/90" asChild>
                    <Link href="/contact?type=partnership">
                      {partner.cta} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow={`Why ${APP_CONFIG.shortName}`}
                title="Why Institutions Choose Us"
                description="A trusted bridge between ambitious students and world-class universities."
                align="left"
                className="mb-8"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="premium-card p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-primary text-sm">{b.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-premium-xl">
              <Image
                src={STUDENT_IMAGES.gallery[0].src}
                alt="Students on a partner university campus"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-display text-2xl font-bold">
                  Shape the future of global education
                </p>
                <p className="text-white/70 text-sm mt-2">
                  Partner with {APP_CONFIG.shortName} to reach the next generation of international students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={stepsRef} className="section-padding relative overflow-hidden mesh-hero">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Getting Started"
            title="How Partnership Works"
            description="A straightforward onboarding process — from first call to live student pipeline in weeks."
            className="[&_h2]:text-white [&_p]:text-white/65 [&_span]:border-white/20 [&_span]:bg-white/10 [&_span]:text-accent"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="glass-dark rounded-2xl p-6 h-full">
                  <span className="text-3xl font-bold text-accent">{item.step}</span>
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 sm:px-16 text-center shadow-premium-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(42_80%_44%/0.2),transparent_60%)]" />
            <div className="absolute inset-0 noise pointer-events-none" />
            <div className="relative">
              <Sparkles className="h-8 w-8 text-accent mx-auto mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Let&apos;s build something together
              </h2>
              <p className="mt-4 text-white/70 max-w-lg mx-auto">
                Reach out to our partnerships team and discover how {APP_CONFIG.shortName} can amplify your global reach.
              </p>
              <Button size="lg" variant="accent" className="mt-8" asChild>
                <Link href="/contact?type=partnership">
                  Contact Partnerships Team <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
