'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Heart, BookOpen, Trash2, ArrowRight, GitCompare } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { APP_CONFIG, ROUTES } from '@mge/config';
import {
  getUniversityShortlist, getCourseShortlist, removeFromShortlist,
} from '@/lib/shortlist';
import { formatCurrency } from '@mge/utils';

function subscribe(cb: () => void) {
  window.addEventListener('gem-shortlist-change', cb);
  return () => window.removeEventListener('gem-shortlist-change', cb);
}

export default function ShortlistPage() {
  const universities = useSyncExternalStore(subscribe, getUniversityShortlist, () => []);
  const courses = useSyncExternalStore(subscribe, getCourseShortlist, () => []);

  const compareUrl = courses.length >= 2
    ? `${ROUTES.compareCourses}?${courses.map((c) => `slug=${c.slug}`).join('&')}`
    : ROUTES.compareCourses;

  return (
    <>
      <Header />
      <main className="bg-background pt-24 pb-24 lg:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl font-bold text-primary">My Shortlist</h1>
          <p className="mt-2 text-muted-foreground">Saved universities and courses — share with your {APP_CONFIG.shortName} counselor during booking.</p>

          <section className="mt-10">
            <h2 className="font-semibold text-primary flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Courses ({courses.length})
            </h2>
            {courses.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No courses saved yet. <Link href={ROUTES.findACourse} className="text-accent hover:underline">Find a course</Link></p>
            ) : (
              <div className="mt-4 space-y-3">
                {courses.map((c) => (
                  <div key={c.id} className="premium-card p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-primary">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.universityName} · {c.tuition ? formatCurrency(c.tuition, c.currency) : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/courses/${c.slug}`}>View</Link>
                      </Button>
                      <button type="button" onClick={() => removeFromShortlist('course', c.id)} className="text-muted-foreground hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {courses.length >= 2 && (
                  <Button variant="outline" asChild>
                    <Link href={compareUrl}><GitCompare className="h-4 w-4" /> Compare Courses</Link>
                  </Button>
                )}
              </div>
            )}
          </section>

          <section className="mt-10">
            <h2 className="font-semibold text-primary flex items-center gap-2">
              <Heart className="h-5 w-5" /> Universities ({universities.length})
            </h2>
            {universities.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No universities saved yet. <Link href="/universities" className="text-accent hover:underline">Explore universities</Link></p>
            ) : (
              <div className="mt-4 space-y-3">
                {universities.map((u) => (
                  <div key={u.id} className="premium-card p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-primary">{u.flag} {u.name}</p>
                      <p className="text-sm text-muted-foreground">{u.country}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/universities/${u.slug}`}>View</Link>
                      </Button>
                      <button type="button" onClick={() => removeFromShortlist('university', u.id)} className="text-muted-foreground hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mt-12 premium-card p-6 text-center bg-primary text-white">
            <p className="font-semibold">Ready to discuss your shortlist?</p>
            <p className="text-white/70 text-sm mt-1">Book a free session and our counselor will review your saved options.</p>
            <Button variant="accent" className="mt-4" asChild>
              <Link href={ROUTES.bookCounseling}>Book Free Counseling <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
