'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Building2, Calendar, Clock, MapPin, ArrowUpRight, BookmarkPlus } from 'lucide-react';
import { formatCurrency } from '@mge/utils';
import { ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import type { Course } from '@/services/api.service';
import { getCourseCardImage, COURSE_FINDER_IMAGES } from '@/lib/course-images';
import { toggleCourseShortlist, isCourseShortlisted } from '@/lib/shortlist';
import { useSyncExternalStore } from 'react';

function subscribe(cb: () => void) {
  window.addEventListener('gem-shortlist-change', cb);
  return () => window.removeEventListener('gem-shortlist-change', cb);
}

function formatDegree(level: string) {
  return level.charAt(0) + level.slice(1).toLowerCase().replace('_', ' ');
}

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const country = course.university?.country;
  const hasScholarship = (course.scholarships?.length ?? 0) > 0;
  const saved = useSyncExternalStore(subscribe, () => isCourseShortlisted(course.id), () => false);
  const imageSrc = course.university?.campusImage || getCourseCardImage(
    course.degreeLevel,
    country?.code
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group premium-card overflow-hidden flex flex-col h-full"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imageSrc}
          alt={course.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary">
            {formatDegree(course.degreeLevel)}
          </span>
          {hasScholarship && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
              <Award className="h-3 w-3" /> Scholarship
            </span>
          )}
        </div>
        {country?.flag && (
          <span className="absolute top-3 right-3 text-2xl drop-shadow">{country.flag}</span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-lg font-bold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {course.name}
        </h3>

        {course.university && (
          <Link
            href={`/universities/${course.university.slug}`}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{course.university.name}</span>
          </Link>
        )}

        {country && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {country.name}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-muted/50 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tuition</p>
            <p className="font-semibold text-primary mt-0.5">{formatCurrency(course.tuition, course.currency)}</p>
          </div>
          <div className="rounded-xl bg-muted/50 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</p>
            <p className="font-semibold text-primary mt-0.5 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {course.duration}
            </p>
          </div>
        </div>

        {course.intakePeriods?.length > 0 && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Next intake: {course.intakePeriods.join(', ')}
          </p>
        )}

        <div className="mt-auto pt-5 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={saved ? 'text-accent' : ''}
            onClick={() => toggleCourseShortlist({
              id: course.id,
              slug: course.slug,
              name: course.name,
              universityName: course.university?.name,
              degreeLevel: course.degreeLevel,
              tuition: course.tuition,
              currency: course.currency,
            })}
          >
            <BookmarkPlus className="h-4 w-4" /> {saved ? 'Saved' : 'Save'}
          </Button>
          <Button variant="outline" className="flex-1 group-hover:border-accent group-hover:text-accent" asChild>
            <Link href={`/courses/${course.slug}`}>
              View Details <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function CourseListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="premium-card overflow-hidden animate-pulse">
          <div className="aspect-[16/9] bg-muted" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 bg-muted rounded-xl" />
              <div className="h-14 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CourseListEmpty() {
  return (
    <div className="premium-card p-10 text-center max-w-lg mx-auto">
      <div className="relative mx-auto h-40 w-full max-w-xs rounded-2xl overflow-hidden mb-6">
        <Image
          src={COURSE_FINDER_IMAGES.empty.src}
          alt={COURSE_FINDER_IMAGES.empty.alt}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>
      <h3 className="font-display text-xl font-bold text-primary">No courses match your filters</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Try adjusting your search criteria or explore all available programs.
      </p>
      <Button variant="accent" className="mt-6" asChild>
        <Link href={ROUTES.findACourse}>Reset Filters</Link>
      </Button>
    </div>
  );
}
