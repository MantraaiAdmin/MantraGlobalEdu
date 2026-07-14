'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import { SectionHeader } from '@/components/common/section-header';
import { STUDENT_IMAGES } from '@/lib/student-images';

export function StudentsShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Real Students"
          title="Students Who Dreamed Global"
          description="Join thousands of ambitious students building their futures at top universities worldwide"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {STUDENT_IMAGES.gallery.map((student, i) => (
            <motion.div
              key={student.alt}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-premium h-full">
                <Image
                  src={student.src}
                  alt={student.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{student.label}</span>
                  </div>
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2">{student.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
