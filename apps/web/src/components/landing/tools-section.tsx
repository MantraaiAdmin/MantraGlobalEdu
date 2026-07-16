'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Calculator, Award, Sparkles, ClipboardCheck, FileCheck } from 'lucide-react';
import { ROUTES, PRODUCT_NAMES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/section-header';

const tools = [
  {
    title: PRODUCT_NAMES.profileCheck,
    description: '4-step readiness assessment for your target country — get your score and personalised recommendations.',
    icon: ClipboardCheck,
    href: ROUTES.profileCheck,
    cta: 'Check Eligibility',
    featured: true,
  },
  {
    title: 'Course Discovery',
    description: 'Search programs with intelligent filtering by country, university, degree level, and tuition range.',
    icon: Search,
    href: ROUTES.findACourse,
    cta: 'Find a Course',
    featured: false,
  },
  {
    title: 'Scholarship Finder',
    description: 'Discover scholarships matching your academic profile, budget, and destination preferences.',
    icon: Award,
    href: '/scholarships',
    cta: 'Find Scholarships',
    featured: false,
  },
  {
    title: 'Cost Estimator',
    description: 'Calculate total education costs including tuition, living expenses, visa, and insurance.',
    icon: Calculator,
    href: '/cost-estimator',
    cta: 'Estimate Costs',
    featured: false,
  },
  {
    title: 'Document Checklist',
    description: 'Country-specific application and visa document lists for undergraduate and postgraduate programs.',
    icon: FileCheck,
    href: ROUTES.documentChecklist,
    cta: 'View Checklist',
    featured: false,
  },
];

export function ToolsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Smart Tools"
          title="Intelligent Discovery Tools"
          description="Make informed decisions with our powerful search and planning tools"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={tool.featured ? 'md:col-span-1' : ''}
            >
              <div className={`premium-card h-full flex flex-col p-8 group ${tool.featured ? 'gradient-border' : ''}`}>
                {tool.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                    <Sparkles className="h-3 w-3" /> Popular
                  </div>
                )}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-white shadow-premium group-hover:shadow-glow-sm transition-shadow duration-500">
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-primary font-display">{tool.title}</h3>
                <p className="mt-3 text-muted-foreground flex-1 leading-relaxed text-sm">{tool.description}</p>
                <Button variant="ghost" className="mt-6 self-start px-0 text-primary hover:text-accent group-hover:gap-3 transition-all" asChild>
                  <Link href={tool.href}>
                    {tool.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
