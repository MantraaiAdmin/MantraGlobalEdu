'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import { SectionHeader } from '@/components/common/section-header';
import { APP_CONFIG, FOUNDER } from '@mge/config';

const testimonials = [
  {
    name: 'Aditya M.',
    role: 'MS Data Science — University of Melbourne',
    content: 'Vinodhini helped me shortlist the right Australian universities within my budget. The visa guidance was thorough and stress-free.',
    rating: 5,
    type: 'Student',
  },
  {
    name: 'Lakshmi R.',
    role: 'Parent of UK Undergraduate Student',
    content: `As a parent, transparency mattered most. ${APP_CONFIG.shortName} walked us through every step — from applications to financial planning — with complete clarity.`,
    rating: 5,
    type: 'Parent',
  },
  {
    name: 'Karthik S.',
    role: 'MBA Admit — UK University',
    content: `From SOP review to visa documentation, the ${APP_CONFIG.shortName} team handled every detail. I received my UK student visa well before my intake date.`,
    rating: 5,
    type: 'Visa Success',
  },
];

export function SuccessStoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by Students & Parents"
          description={`Real outcomes guided by ${FOUNDER.name} — ${FOUNDER.title}`}
        />

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {['British Council Certified', 'Former IDP Counselor', 'Pan-India Top 17', 'Best Counselor — Silver'].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs font-medium text-primary shadow-sm">
              <BadgeCheck className="h-3 w-3 text-accent" />
              {badge}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="premium-card p-6 flex flex-col"
            >
              <Quote className="h-8 w-8 text-accent/30 mb-4" />
              <p className="text-muted-foreground leading-relaxed flex-1 text-sm">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 text-accent fill-accent" />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-semibold text-primary text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-accent font-semibold">{t.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
