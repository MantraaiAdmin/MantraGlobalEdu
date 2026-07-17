'use client';

import { useCallback, useEffect, useState } from 'react';
import { getAccessToken } from '@/lib/auth';
import { LookupTable, LookupColumn } from '@/components/admin/lookup-table';

type ListMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

interface AdminLookupPageProps<T extends Record<string, unknown>> {
  title: string;
  description: string;
  endpoint: string;
  columns: LookupColumn<T>[];
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  extraQuery?: Record<string, string | undefined>;
  actions?: React.ReactNode;
  emptyMessage?: string;
}

export function AdminLookupPage<T extends Record<string, unknown>>({
  title,
  description,
  endpoint,
  columns,
  searchPlaceholder,
  filters,
  extraQuery,
  actions,
  emptyMessage,
}: AdminLookupPageProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [meta, setMeta] = useState<ListMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '20',
      });
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (sortBy) params.set('sortBy', sortBy);
      if (sortOrder) params.set('sortOrder', sortOrder);
      Object.entries(extraQuery || {}).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      const res = await fetch(`/api/v1/admin/${endpoint}?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load records');
      setRows(json.data?.data || []);
      setMeta(json.data?.meta || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load records');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, debouncedSearch, sortBy, sortOrder, extraQuery]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, extraQuery]);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  return (
    <LookupTable
      title={title}
      description={description}
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder={searchPlaceholder}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSort={handleSort}
      filters={filters}
      actions={actions}
      emptyMessage={emptyMessage}
      meta={meta ? { total: meta.total, page: meta.page, totalPages: meta.totalPages } : undefined}
      onPageChange={setPage}
    />
  );
}

export function IdCell({ id, short = true }: { id: string; short?: boolean }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-primary">
      {short ? id.slice(0, 8) : id}
    </code>
  );
}

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}
