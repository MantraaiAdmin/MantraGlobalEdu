'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import type { ComponentType } from 'react';
import {
  Compass, GraduationCap, Award, FileCheck, Plane, Briefcase, FileText, Landmark, Laptop, ArrowUpRight,
} from 'lucide-react';
import { SERVICES } from '@mge/config';
import { SectionHeader } from '@/components/common/section-header';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Compass, GraduationCap, Award, FileCheck, Plane, Briefcase, FileText, Landmark, Laptop,
};

const descriptions: Record<string, string> = {
  counseling: 'One-to-one guidance on countries, courses and universities',
  admissions: 'Shortlisting, applications, documents and deadlines',
  scholarships: 'Find scholarships that fit your profile and plan applications',
  visa: 'Document checklists and interview preparation',
  'pre-departure': 'Accommodation, travel, money and arrival planning',
  career: 'Connect your course choice to your career goals',
  'mantra-ai': 'Projects, skills and a professional profile with Mantra.Ai',
  'sop-lor': 'Structure and feedback for your SOP and references',
  loan: 'Understand loan options, documents and timelines',
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Services"
          title="Study Abroad Services"
          description="Support for each stage of your international education journey, from first enquiry to departure."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || Compass;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/services/${service.slug}`} className="premium-card group block h-full p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-white transition-all duration-500 shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                  <h3 className="mt-5 font-semibold text-primary text-base leading-snug group-hover:underline underline-offset-4">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {descriptions[service.id] || 'Expert support tailored to your goals'}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
