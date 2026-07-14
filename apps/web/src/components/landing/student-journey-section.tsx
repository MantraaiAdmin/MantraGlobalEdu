'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { STUDENT_JOURNEY_STEPS } from '@mge/config';
import { SectionHeader } from '@/components/common/section-header';

export function StudentJourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden mesh-hero">
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(42_78%_52%/0.15),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Your Path"
          title="The Student Journey"
          description="A guided path from career assessment to alumni success — we walk every step with you"
          className="[&_h2]:text-white [&_p]:text-white/65 [&_span]:border-white/20 [&_span]:bg-white/10 [&_span]:text-accent"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STUDENT_JOURNEY_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="glass-dark rounded-2xl p-6 h-full group hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent font-bold text-sm shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="font-semibold text-white text-base">{step.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
