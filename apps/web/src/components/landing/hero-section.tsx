'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, BookOpen,
} from 'lucide-react';
import { APP_CONFIG, ROUTES, STUDENTS_PLACED_STAT } from '@mge/config';
import { Button } from '@/components/ui/button';
import { STUDENT_IMAGES } from '@/lib/student-images';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-hero">
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-[0.04]" />

      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#4A9FD4]/10 blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm mb-8"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span>{APP_CONFIG.name}</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-accent font-medium">19+ Countries Worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight"
            >
              {APP_CONFIG.tagline.split('. ').slice(0, 2).join('. ')}.{' '}
              <span className="text-gradient-gold">{APP_CONFIG.tagline.split('. ').slice(2).join('. ')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-white/75 leading-relaxed max-w-xl"
            >
              {APP_CONFIG.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" variant="accent" asChild>
                <Link href={ROUTES.bookCounseling}>
                  Book Free Counseling
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="premium"
                className="bg-white/10 text-white border-white/25 hover:bg-white/20 backdrop-blur-sm"
                asChild
              >
                <Link href={ROUTES.findACourse}>
                  <BookOpen className="h-4 w-4" />
                  Find a Course
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center gap-8"
            >
              {[
                { value: '3', label: 'Focus Countries' },
                { value: STUDENTS_PLACED_STAT, label: 'Students Guided' },
                { value: '15+', label: 'Partner Universities' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -top-6 right-12 h-56 w-56 rounded-full bg-accent/25 blur-2xl" />
            <div className="absolute bottom-16 -left-6 h-44 w-44 rounded-full bg-[#4A9FD4]/30 blur-xl" />
            <div className="absolute top-1/2 -right-4 h-28 w-28 rounded-full bg-accent/40" />

            <div className="relative z-10">
              <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-[2rem] shadow-premium-xl border-4 border-white/20">
                <Image
                  src={STUDENT_IMAGES.hero.src}
                  alt={STUDENT_IMAGES.hero.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-8 -right-4 h-44 w-36 overflow-hidden rounded-2xl border-4 border-white shadow-premium-lg"
              >
                <Image
                  src={STUDENT_IMAGES.heroSecondary.src}
                  alt={STUDENT_IMAGES.heroSecondary.alt}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -top-4 -left-6 glass rounded-2xl px-4 py-3 shadow-premium-lg"
              >
                <p className="text-xs text-muted-foreground">Students placed</p>
                <p className="text-xl font-bold text-primary">{STUDENTS_PLACED_STAT}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-1/3 -right-8 glass rounded-2xl px-4 py-3 shadow-premium-lg"
              >
                <p className="text-xs text-muted-foreground">Visa success rate</p>
                <p className="text-xl font-bold text-accent">94%</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
