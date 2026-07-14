'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { Building2, Globe, Star, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@mge/utils';
import type { University } from '@/services/api.service';
import { toggleUniversityShortlist, isUniversityShortlisted } from '@/lib/shortlist';

interface UniversityCardProps {
  university: University;
}

function subscribe(cb: () => void) {
  window.addEventListener('gem-shortlist-change', cb);
  return () => window.removeEventListener('gem-shortlist-change', cb);
}

export function UniversityCard({ university }: UniversityCardProps) {
  const saved = useSyncExternalStore(
    subscribe,
    () => isUniversityShortlisted(university.id),
    () => false
  );

  const tuition =
    university.tuitionMin && university.tuitionMax
      ? `${formatCurrency(university.tuitionMin)} – ${formatCurrency(university.tuitionMax)}`
      : university.tuitionMin
        ? `From ${formatCurrency(university.tuitionMin)}`
        : 'Contact for pricing';

  const handleSave = () => {
    toggleUniversityShortlist({
      id: university.id,
      slug: university.slug,
      name: university.name,
      country: university.country?.name,
      flag: university.country?.flag || undefined,
    });
  };

  return (
    <div className="premium-card group p-6">
      <div className="flex items-start gap-5">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 shrink-0 group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
          <Building2 className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-500" />
          {university.country?.flag && (
            <span className="absolute -top-2 -right-2 text-lg">{university.country.flag}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
              {university.name}
            </h3>
            <button
              type="button"
              onClick={handleSave}
              className={`transition-colors shrink-0 ${saved ? 'text-accent' : 'text-muted-foreground/40 hover:text-accent'}`}
              aria-label={saved ? 'Remove from shortlist' : 'Add to shortlist'}
            >
              <Heart className={`h-4 w-4 ${saved ? 'fill-accent' : ''}`} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Globe className="h-3.5 w-3.5" /> {university.country?.name}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-muted/60 px-3 py-2">
              <div className="text-xs text-muted-foreground">Ranking</div>
              <div className="font-bold text-primary flex items-center gap-1 mt-0.5 text-sm">
                {university.worldRanking ? (
                  <><Star className="h-3 w-3 text-accent fill-accent" /> #{university.worldRanking}</>
                ) : 'N/A'}
              </div>
            </div>
            <div className="rounded-xl bg-muted/60 px-3 py-2">
              <div className="text-xs text-muted-foreground">Tuition</div>
              <div className="font-semibold text-primary mt-0.5 text-xs leading-tight">{tuition}</div>
            </div>
            <div className="rounded-xl bg-muted/60 px-3 py-2">
              <div className="text-xs text-muted-foreground">Acceptance</div>
              <div className="font-bold text-primary mt-0.5 text-sm">
                {university.acceptanceRate ? `${university.acceptanceRate}%` : 'N/A'}
              </div>
            </div>
          </div>
          {university.popularPrograms?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {university.popularPrograms.slice(0, 3).map((p) => (
                <span key={p} className="text-xs bg-primary/5 text-primary/70 px-2 py-0.5 rounded-full">{p}</span>
              ))}
            </div>
          )}
          <Button variant="ghost" className="mt-4 px-0 h-auto text-primary hover:text-accent group-hover:gap-2" asChild>
            <Link href={`/universities/${university.slug}`}>
              View Details <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function UniversityListSkeleton() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export function UniversityListEmpty() {
  return (
    <div className="text-center py-20">
      <Building2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-primary">No universities found</h3>
      <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
    </div>
  );
}
