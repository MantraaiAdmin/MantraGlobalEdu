'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Globe2, GraduationCap } from 'lucide-react';
import { APP_CONFIG } from '@mge/config';
import { COURSE_FINDER_IMAGES } from '@/lib/course-images';

export function CourseFinderHero() {
  return (
    <section className="relative pt-28 pb-12 lg:pb-16 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(42_80%_44%/0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(212_100%_15%/0.06),transparent_50%)]" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Course Finder
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl font-bold text-primary leading-tight"
            >
              Find courses to{' '}
              <span className="text-gradient">study abroad</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Discover programs from top universities worldwide. Filter by destination,
              study level, budget, and intake — then shortlist courses with expert {APP_CONFIG.shortName} counselors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {[
                { icon: Globe2, label: '3 Focus Destinations' },
                { icon: GraduationCap, label: 'All Study Levels' },
                { icon: BookOpen, label: 'Scholarship Ready' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm"
                >
                  <item.icon className="h-4 w-4 text-accent" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mt-10 lg:mt-0"
          >
            <div className="absolute -top-4 -left-4 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute bottom-8 -right-4 h-36 w-36 rounded-full bg-primary/10 blur-xl" />

            <div className="relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-premium-xl border border-border/40 bg-muted">
              <Image
                src={COURSE_FINDER_IMAGES.hero.src}
                alt={COURSE_FINDER_IMAGES.hero.alt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/10" />
            </div>

            <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-4 shadow-premium-lg">
              <p className="text-xs text-muted-foreground">Programs available</p>
              <p className="text-2xl font-bold text-primary">500+</p>
            </div>

            <div className="absolute -top-3 -right-3 glass rounded-2xl px-5 py-4 shadow-premium-lg">
              <p className="text-xs text-muted-foreground">Avg. counselor rating</p>
              <p className="text-2xl font-bold text-accent">4.9★</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
