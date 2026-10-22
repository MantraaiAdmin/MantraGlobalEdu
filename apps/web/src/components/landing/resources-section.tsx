'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, FileCheck, FileText, Award, Building2, Briefcase } from 'lucide-react';
import { RESOURCE_CATEGORIES } from '@mge/config';
import { SectionHeader } from '@/components/common/section-header';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  BookOpen, FileCheck, FileText, Award, Building2, Briefcase,
};

interface ResourcesSectionProps {
  articleCounts: Record<string, number>;
}

export function ResourcesSection({ articleCounts }: ResourcesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-muted/40 relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <SectionHeader
            eyebrow="Knowledge Centre"
            title="Resources & Guides"
            description="Practical guides on choosing a destination, applications, scholarships, visas and careers."
            align="left"
            className="mb-0"
          />
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-premium hover:shadow-premium-lg hover:-translate-y-0.5 transition-all shrink-0"
          >
            Browse All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {RESOURCE_CATEGORIES.map((cat, i) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const count = articleCounts[cat.id] ?? 0;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link href={`/resources/${cat.id}`} className="block h-full">
                  <div className="premium-card group cursor-pointer p-5 text-center h-full">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-white transition-all duration-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-primary leading-snug">{cat.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{count} {count === 1 ? 'guide' : 'guides'}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
