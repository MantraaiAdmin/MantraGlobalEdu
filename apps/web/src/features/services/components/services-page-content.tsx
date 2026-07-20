'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import type { ComponentType } from 'react';
import {
  Compass, GraduationCap, Award, FileCheck, Plane, Briefcase, FileText, Landmark, Laptop,
  ArrowRight, ArrowUpRight, Sparkles, Users, Globe2, CheckCircle2,
} from 'lucide-react';
import { APP_CONFIG, SERVICES, TRUST_METRICS, ROUTES, STUDENTS_PLACED_STAT } from '@mge/config';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/section-header';
import { STUDENT_IMAGES } from '@/lib/student-images';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Compass, GraduationCap, Award, FileCheck, Plane, Briefcase, FileText, Landmark, Laptop,
};

const descriptions: Record<string, string> = {
  counseling: 'One-on-one sessions with certified counselors to map your global study plan across 19+ countries.',
  admissions: 'End-to-end application support — shortlisting, essays, deadlines, and offer evaluation.',
  scholarships: 'Discover merit and need-based scholarships matched to your profile and destination.',
  visa: 'Document checklists, financial proof guidance, and mock visa interview preparation.',
  'pre-departure': 'Accommodation, travel, banking, and cultural orientation before you fly.',
  career: 'Global career planning, networking, and post-study work route guidance.',
  'mantra-ai': 'Tech-standard profile, internships & portfolio via Mantra.Ai',
  'sop-lor': 'Professional Statement of Purpose and Letter of Recommendation crafting.',
  loan: 'Education loan comparison, documentation, and financial planning support.',
};

const processSteps = [
  { step: '01', title: 'Free Assessment', desc: 'Understand your goals, budget, and destination fit.' },
  { step: '02', title: 'Personalised Plan', desc: 'Shortlist universities and courses across your target countries worldwide.' },
  { step: '03', title: 'Application Support', desc: 'Submit strong applications with expert document review.' },
  { step: '04', title: 'Visa & Departure', desc: 'Secure your visa and prepare for campus arrival.' },
];

const showcaseImages = [
  { src: STUDENT_IMAGES.gallery[0].src, label: 'Campus Life', alt: STUDENT_IMAGES.gallery[0].alt },
  { src: STUDENT_IMAGES.gallery[2].src, label: 'USA Universities', alt: STUDENT_IMAGES.gallery[2].alt },
  { src: STUDENT_IMAGES.gallery[1].src, label: 'UK Campuses', alt: STUDENT_IMAGES.gallery[1].alt },
];

export function ServicesPageContent() {
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' });
  const processInView = useInView(processRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(42_80%_44%/0.1),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(212_100%_15%/0.06),transparent_50%)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Student Services
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary leading-tight">
                Your complete{' '}
                <span className="text-gradient">study abroad</span>{' '}
                support system
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
                From first counseling session to campus arrival — expert guidance for 19+ countries
                at every step of your journey.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/book-counseling">
                    Book Free Counseling <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={ROUTES.findACourse}>Explore Courses</Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { icon: Users, label: `${STUDENTS_PLACED_STAT} students placed` },
                  { icon: Globe2, label: '19+ Countries' },
                  { icon: CheckCircle2, label: '94% visa success' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4 text-accent shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-premium-xl border border-border/40">
                <Image
                  src={STUDENT_IMAGES.hero.src}
                  alt={STUDENT_IMAGES.hero.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-accent/10" />
              </div>
              <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-4 shadow-premium-lg">
                <p className="text-xs text-muted-foreground">Expert counselors</p>
                <p className="text-2xl font-bold text-primary">Dedicated</p>
              </div>
              <div className="absolute -top-3 -right-3 glass rounded-2xl px-5 py-4 shadow-premium-lg">
                <p className="text-xs text-muted-foreground">Destinations</p>
                <p className="text-2xl font-bold text-accent">19+ Countries</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust metrics */}
      <section className="border-y border-border/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-2xl font-bold text-primary">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section ref={servicesRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What We Offer"
            title="9 Services. One Seamless Journey."
            description="Every service is designed to remove friction and maximise your chances of admission, funding, and visa approval."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Compass;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <div className="premium-card group h-full p-6 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-white transition-all duration-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent transition-all" />
                    </div>
                    <h3 className="mt-5 font-semibold text-primary text-base leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                      {descriptions[service.id]}
                    </p>
                    <Link
                      href="/book-counseling"
                      className="mt-4 text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                    >
                      Get started <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image showcase */}
      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Student Life"
            title="Walk Into World-Class Campuses"
            description="Our students thrive at top universities across the globe"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {showcaseImages.map((img, i) => (
              <motion.div
                key={img.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {img.label}
                  </span>
                  <p className="text-white text-sm font-medium mt-1">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="section-padding relative overflow-hidden mesh-hero">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="How It Works"
            title={`Your Journey With ${APP_CONFIG.shortName}`}
            description="A proven four-step process trusted by thousands of international students"
            className="[&_h2]:text-white [&_p]:text-white/65 [&_span]:border-white/20 [&_span]:bg-white/10 [&_span]:text-accent"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
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
          <div className="relative overflow-hidden rounded-3xl mesh-hero px-8 py-16 sm:px-16 text-center shadow-premium-xl">
            <div className="absolute inset-0 noise pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_80%_44%/0.18),transparent_65%)]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Ready for expert guidance?
              </h2>
              <p className="mt-4 text-white/70 max-w-lg mx-auto">
                Book a free counseling session and get a personalised roadmap for your target country.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="accent" asChild>
                  <Link href="/book-counseling">
                    Book Free Counseling <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="premium"
                  className="bg-white/10 text-white border-white/25 hover:bg-white/20"
                  asChild
                >
                  <Link href="/scholarships">Find Scholarships</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
