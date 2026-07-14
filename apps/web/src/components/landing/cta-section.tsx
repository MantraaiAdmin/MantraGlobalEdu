'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl mesh-hero px-8 py-20 sm:px-16 sm:py-24 text-center shadow-premium-xl"
        >
          <div className="absolute inset-0 noise pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_78%_52%/0.2),transparent_65%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              Free consultation — no commitment
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Start Your{' '}
              <span className="text-gradient-gold">Journey?</span>
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Book a free counseling session with our expert advisors and take the first step toward your global education dream.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
