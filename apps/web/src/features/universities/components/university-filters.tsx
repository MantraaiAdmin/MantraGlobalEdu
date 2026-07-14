'use client';

import { useCallback, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCountries } from '@/hooks/use-api';
import type { UniversityFilters } from '@/services/api.service';

interface UniversityFiltersBarProps {
  filters: UniversityFilters;
  onChange: (filters: UniversityFilters) => void;
}

export function UniversityFiltersBar({ filters, onChange }: UniversityFiltersBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const { data: countriesData } = useCountries();

  const applySearch = useCallback(() => {
    onChange({ ...filters, search: searchInput || undefined, page: 1 });
  }, [filters, searchInput, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') applySearch();
  };

  const clearFilters = () => {
    setSearchInput('');
    onChange({ page: 1, limit: filters.limit, sortBy: 'worldRanking', sortOrder: 'asc' });
  };

  const hasActiveFilters = !!(filters.search || filters.countryId || filters.tuitionMin || filters.tuitionMax);

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities, programs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 h-11"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={applySearch} className="h-11">Search</Button>
          <Button
            variant="outline"
            className="h-11"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" className="h-11" onClick={clearFilters}>
              <X className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </div>

      {showAdvanced && (
        <div className="premium-card p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Country</label>
            <select
              value={filters.countryId || ''}
              onChange={(e) => onChange({ ...filters, countryId: e.target.value || undefined, page: 1 })}
              className="mt-1.5 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="">All Countries</option>
              {countriesData?.data.map((c) => (
                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min Tuition ($)</label>
            <Input
              type="number"
              placeholder="0"
              value={filters.tuitionMin ?? ''}
              onChange={(e) => onChange({ ...filters, tuitionMin: e.target.value ? Number(e.target.value) : undefined, page: 1 })}
              className="mt-1.5"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max Tuition ($)</label>
            <Input
              type="number"
              placeholder="100000"
              value={filters.tuitionMax ?? ''}
              onChange={(e) => onChange({ ...filters, tuitionMax: e.target.value ? Number(e.target.value) : undefined, page: 1 })}
              className="mt-1.5"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sort By</label>
            <select
              value={filters.sortBy || 'worldRanking'}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value, page: 1 })}
              className="mt-1.5 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="worldRanking">World Ranking</option>
              <option value="tuitionMin">Tuition (Low to High)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
