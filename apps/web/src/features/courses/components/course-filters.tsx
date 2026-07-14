'use client';

import { useCallback, useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { DEGREE_LEVELS, INTAKE_PERIODS } from '@mge/config';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCountries, useUniversities } from '@/hooks/use-api';
import type { CourseFilters } from '@/services/api.service';
import { cn } from '@/lib/utils';

interface CourseFiltersPanelProps {
  filters: CourseFilters;
  onChange: (filters: CourseFilters) => void;
  className?: string;
  onClose?: () => void;
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const selectClass =
  'flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

export function CourseFiltersPanel({
  filters,
  onChange,
  className,
  onClose,
}: CourseFiltersPanelProps) {
  const [queryInput, setQueryInput] = useState(filters.query || '');
  const { data: countries } = useCountries();
  const { data: universities } = useUniversities({ page: 1, limit: 50 });

  const applyQuery = useCallback(() => {
    onChange({ ...filters, query: queryInput || undefined, page: 1 });
  }, [filters, queryInput, onChange]);

  const clearFilters = () => {
    setQueryInput('');
    onChange({ page: 1, limit: filters.limit || 12, sortBy: 'tuition', sortOrder: 'asc' });
    onClose?.();
  };

  const activeCount = [
    filters.query,
    filters.countryId,
    filters.universityId,
    filters.degreeLevel,
    filters.intake,
    filters.tuitionMin,
    filters.tuitionMax,
  ].filter(Boolean).length;

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-primary">Filters</h2>
          {activeCount > 0 && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      <FilterField label="Search courses">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g. Computer Science, MBA..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyQuery()}
              className="pl-10 rounded-xl"
            />
          </div>
          <Button size="sm" onClick={applyQuery} className="shrink-0">Go</Button>
        </div>
      </FilterField>

      <FilterField label="Study destination">
        <select
          value={filters.countryId || ''}
          onChange={(e) => onChange({ ...filters, countryId: e.target.value || undefined, page: 1 })}
          className={selectClass}
        >
          <option value="">All destinations</option>
          {countries?.data.map((c) => (
            <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Study level">
        <select
          value={filters.degreeLevel || ''}
          onChange={(e) => onChange({ ...filters, degreeLevel: e.target.value || undefined, page: 1 })}
          className={selectClass}
        >
          <option value="">All levels</option>
          {DEGREE_LEVELS.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Institution">
        <select
          value={filters.universityId || ''}
          onChange={(e) => onChange({ ...filters, universityId: e.target.value || undefined, page: 1 })}
          className={selectClass}
        >
          <option value="">All universities</option>
          {universities?.data.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Intake period">
        <select
          value={filters.intake || ''}
          onChange={(e) => onChange({ ...filters, intake: e.target.value || undefined, page: 1 })}
          className={selectClass}
        >
          <option value="">Any intake</option>
          {INTAKE_PERIODS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Budget (annual tuition)">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min $"
            value={filters.tuitionMin ?? ''}
            onChange={(e) =>
              onChange({
                ...filters,
                tuitionMin: e.target.value ? Number(e.target.value) : undefined,
                page: 1,
              })
            }
            className="rounded-xl"
          />
          <Input
            type="number"
            placeholder="Max $"
            value={filters.tuitionMax ?? ''}
            onChange={(e) =>
              onChange({
                ...filters,
                tuitionMax: e.target.value ? Number(e.target.value) : undefined,
                page: 1,
              })
            }
            className="rounded-xl"
          />
        </div>
      </FilterField>

      {onClose && (
        <Button className="w-full lg:hidden" onClick={onClose}>
          Apply Filters
        </Button>
      )}
    </div>
  );
}

export function ActiveFilterPills({
  filters,
  onChange,
  countries,
  universities,
}: {
  filters: CourseFilters;
  onChange: (filters: CourseFilters) => void;
  countries?: { id: string; name: string; flag: string | null }[];
  universities?: { id: string; name: string }[];
}) {
  const pills: { key: string; label: string; clear: () => void }[] = [];

  if (filters.query) {
    pills.push({
      key: 'query',
      label: `"${filters.query}"`,
      clear: () => onChange({ ...filters, query: undefined, page: 1 }),
    });
  }
  if (filters.countryId) {
    const country = countries?.find((c) => c.id === filters.countryId);
    pills.push({
      key: 'country',
      label: country ? `${country.flag} ${country.name}` : 'Country',
      clear: () => onChange({ ...filters, countryId: undefined, page: 1 }),
    });
  }
  if (filters.degreeLevel) {
    const level = DEGREE_LEVELS.find((l) => l.value === filters.degreeLevel);
    pills.push({
      key: 'level',
      label: level?.label || filters.degreeLevel,
      clear: () => onChange({ ...filters, degreeLevel: undefined, page: 1 }),
    });
  }
  if (filters.universityId) {
    const uni = universities?.find((u) => u.id === filters.universityId);
    pills.push({
      key: 'uni',
      label: uni?.name || 'University',
      clear: () => onChange({ ...filters, universityId: undefined, page: 1 }),
    });
  }
  if (filters.tuitionMax) {
    pills.push({
      key: 'budget',
      label: `Under $${filters.tuitionMax.toLocaleString()}`,
      clear: () => onChange({ ...filters, tuitionMax: undefined, page: 1 }),
    });
  }

  if (!pills.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((pill) => (
        <button
          key={pill.key}
          type="button"
          onClick={pill.clear}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          {pill.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
