import Image from 'next/image';
import { BookOpen, Globe2, GraduationCap } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { COURSE_FINDER_IMAGES } from '@/lib/course-images';
import { CATALOG_COUNTS } from '@/lib/catalog';

export function CourseFinderHero() {
  return (
    <section className="relative pt-28 pb-10 lg:pb-14 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(42_80%_44%/0.08),transparent_55%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Find a Course', path: '/find-a-course' },
          ]}
          className="mb-6"
        />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-primary leading-tight">
              Find Courses to <span className="text-gradient">Study Abroad</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Search {CATALOG_COUNTS.courses} programmes from {CATALOG_COUNTS.universities} universities across{' '}
              {CATALOG_COUNTS.countries} destinations. Filter by country, study level, budget and intake, then save a
              shortlist to discuss with a counsellor.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Globe2, label: `${CATALOG_COUNTS.countries} destinations` },
                { icon: GraduationCap, label: 'Undergraduate to PhD' },
                { icon: BookOpen, label: 'Links to official course pages' },
              ].map((item) => (
                <li
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm"
                >
                  <item.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Tuition and intake details are recorded from published sources and may have changed — confirm on the university’s website.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-[5/4] rounded-[2rem] overflow-hidden shadow-premium-xl border border-border/40 bg-muted">
              <Image
                src={COURSE_FINDER_IMAGES.hero.src}
                alt={COURSE_FINDER_IMAGES.hero.alt}
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 560px, 1px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
