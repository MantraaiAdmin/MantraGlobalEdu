'use client';

import { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react';

export interface LookupColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => ReactNode;
}

interface LookupTableProps<T extends Record<string, unknown>> {
  title: string;
  description?: string;
  columns: LookupColumn<T>[];
  rows: T[];
  loading?: boolean;
  error?: string;
  searchPlaceholder?: string;
  search: string;
  onSearchChange: (value: string) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
  emptyMessage?: string;
  meta?: {
    total: number;
    page: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}

function SortIcon({ active, order }: { active: boolean; order: 'asc' | 'desc' }) {
  if (!active) return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />;
  return order === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />;
}

export function LookupTable<T extends Record<string, unknown>>({
  title,
  description,
  columns,
  rows,
  loading,
  error,
  searchPlaceholder = 'Search by name, email, or ID…',
  search,
  onSearchChange,
  sortBy,
  sortOrder = 'desc',
  onSort,
  filters,
  actions,
  emptyMessage = 'No records found.',
  meta,
  onPageChange,
}: LookupTableProps<T>) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-primary">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>

      {actions}

      <div className="premium-card overflow-hidden">
        <div className="border-b border-border/60 px-6 py-4 space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            {filters && <div className="flex flex-wrap items-center gap-2">{filters}</div>}
          </div>
          {meta && (
            <p className="text-xs text-muted-foreground">
              Showing {rows.length} of {meta.total} records
            </p>
          )}
        </div>

        {error && <p className="px-6 py-3 text-sm text-red-600">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-muted-foreground">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={`px-6 py-3 font-medium ${col.className || ''}`}>
                    {col.sortable && onSort ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 hover:text-primary"
                        onClick={() => onSort(col.key)}
                      >
                        {col.label}
                        <SortIcon active={sortBy === col.key} order={sortOrder} />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-6 py-8 text-muted-foreground" colSpan={columns.length}>
                    Loading records…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-muted-foreground" colSpan={columns.length}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={String(row.id)} className="border-t border-border/40 hover:bg-muted/20">
                    {columns.map((col) => (
                      <td key={col.key} className={`px-6 py-4 ${col.className || ''}`}>
                        {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta && onPageChange && meta.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
            <span className="text-xs text-muted-foreground">
              Page {meta.page} of {meta.totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={meta.page <= 1}
                onClick={() => onPageChange(meta.page - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={meta.page >= meta.totalPages}
                onClick={() => onPageChange(meta.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
