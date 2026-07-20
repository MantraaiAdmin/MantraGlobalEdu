'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Briefcase, Code2, Rocket, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/common/section-header';

const USP_CARDS = [
  {
    icon: Building2,
    title: 'Not Just a Consultancy',
    desc: 'Backed by Mantra.Ai, an IT services software company — not a paperwork agency',
  },
  {
    icon: Code2,
    title: 'Tech-Standard Profile',
    desc: 'Student profiles built and benchmarked to real industry tech standards',
  },
  {
    icon: Briefcase,
    title: 'Guided Internships',
    desc: 'Structured internships during the Masters program to build real experience',
  },
  {
    icon: Rocket,
    title: 'Job-Ready Portfolio',
    desc: 'Own portfolio built before graduation — for fast job placement post-study',
  },
] as const;

export function UspSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-muted/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,hsl(42_70%_50%/0.08),transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Powered by Mantra.Ai"
          title="Our USP"
          description="Mantra Global Education is not another study abroad consultancy — it's the international vertical of Mantra.Ai, an IT services software company. From day one, we take each student's profile to real industry tech standards, place them in guided internships, and help them build their own portfolio through the course of their Masters program — so they graduate with a strong, job-ready portfolio and land roles fast."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USP_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="premium-card p-6 h-full"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-primary leading-snug">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Continuous in-program support — not a one-time pre-departure add-on
          </span>
        </motion.div>
      </div>
    </section>
  );
}
