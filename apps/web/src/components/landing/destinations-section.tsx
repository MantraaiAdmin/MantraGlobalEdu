'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { DESTINATIONS } from '@mge/config';
import { getUniversityCountByCountryCode } from '@/lib/catalog';
import { SectionHeader } from '@/components/common/section-header';

const destinationGradients: Record<string, string> = {
  US: 'from-blue-600/20 to-red-500/10',
  GB: 'from-blue-700/20 to-red-600/10',
  AU: 'from-green-500/20 to-yellow-400/10',
  CA: 'from-red-500/20 to-white/10',
  DE: 'from-yellow-500/20 to-red-600/10',
  FR: 'from-blue-600/20 to-red-500/10',
  IE: 'from-green-500/20 to-orange-400/10',
  NZ: 'from-blue-500/20 to-green-400/10',
  SG: 'from-red-500/20 to-white/10',
  NL: 'from-orange-500/20 to-blue-500/10',
};

export function DestinationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-muted/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
          <SectionHeader
            eyebrow="Destinations"
            title="Study Destinations"
            description="Explore 19+ study destinations worldwide — official university data, visa guides, and career pathways"
            align="left"
            className="mb-0"
          />
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-premium hover:shadow-premium-lg hover:-translate-y-0.5 transition-all shrink-0"
          >
            View All Countries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {DESTINATIONS.map((dest, i) => {
            const uniCount = getUniversityCountByCountryCode(dest.code);
            const gradient = destinationGradients[dest.code] || 'from-primary/10 to-accent/5';
            return (
              <motion.div
                key={dest.code}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/countries/${dest.code}`}>
                  <div className={`premium-card group cursor-pointer overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-6">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">
                        {dest.flag}
                      </div>
                      <h3 className="font-semibold text-primary text-lg">{dest.name}</h3>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {uniCount > 0 ? `${uniCount} universities` : 'Programs available'}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
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
