'use client';

import { AdminLookupPage, IdCell, StatusBadge } from '@/components/admin/admin-lookup-page';

type UniversityRow = {
  id: string;
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  worldRanking: number | null;
  courseCount: number;
  applicationCount: number;
  isActive: boolean;
};

export default function AdminUniversitiesPage() {
  return (
    <AdminLookupPage<UniversityRow>
      title="Universities"
      description="Partner universities with rankings, slugs, and application volumes."
      endpoint="universities"
      searchPlaceholder="Search by university name or slug…"
      columns={[
        { key: 'id', label: 'University ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'slug', label: 'Slug' },
        { key: 'country', label: 'Country', render: (r) => `${r.country} (${r.countryCode})` },
        { key: 'worldRanking', label: 'Ranking', render: (r) => r.worldRanking ?? '—' },
        { key: 'courseCount', label: 'Courses' },
        { key: 'applicationCount', label: 'Applications' },
        { key: 'isActive', label: 'Status', render: (r) => <StatusBadge active={r.isActive} /> },
      ]}
    />
  );
}
