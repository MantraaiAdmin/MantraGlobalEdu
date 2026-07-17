'use client';

import { AdminLookupPage, IdCell, StatusBadge } from '@/components/admin/admin-lookup-page';

type CountryRow = {
  id: string;
  code: string;
  name: string;
  flag: string | null;
  universityCount: number;
  scholarshipCount: number;
  isActive: boolean;
};

export default function AdminCountriesPage() {
  return (
    <AdminLookupPage<CountryRow>
      title="Countries"
      description="Destination countries catalog with codes, flags, and linked content counts."
      endpoint="countries"
      searchPlaceholder="Search by country name or code…"
      columns={[
        { key: 'id', label: 'Country ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name', sortable: true, render: (r) => `${r.flag || '🌍'} ${r.name}` },
        { key: 'universityCount', label: 'Universities' },
        { key: 'scholarshipCount', label: 'Scholarships' },
        { key: 'isActive', label: 'Status', render: (r) => <StatusBadge active={r.isActive} /> },
      ]}
    />
  );
}
