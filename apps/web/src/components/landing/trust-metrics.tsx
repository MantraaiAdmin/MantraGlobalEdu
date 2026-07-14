'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TRUST_METRICS } from '@mge/config';
import { Globe, Shield, Award, Users } from 'lucide-react';

const icons = [Globe, Shield, Award, Users, Globe, Award];

export function TrustMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_78%_52%/0.12),transparent_70%)]" />
      <div className="absolute inset-0 noise pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {TRUST_METRICS.map((metric, i) => {
            const Icon = icons[i] || Globe;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group text-center px-4 py-6 rounded-2xl hover:bg-white/5 transition-colors duration-300"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 group-hover:bg-accent/25 transition-colors">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {metric.value}
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-white/55 leading-snug">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
}
