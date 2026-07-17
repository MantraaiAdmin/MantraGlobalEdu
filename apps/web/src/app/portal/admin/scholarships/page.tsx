'use client';

import { AdminLookupPage, IdCell, StatusBadge } from '@/components/admin/admin-lookup-page';

type ScholarshipRow = {
  id: string;
  name: string;
  awardAmount: number;
  currency: string;
  deadline: string;
  university: string;
  country: string;
  isActive: boolean;
};

export default function AdminScholarshipsPage() {
  return (
    <AdminLookupPage<ScholarshipRow>
      title="Scholarships"
      description="Scholarship awards with deadlines, amounts, and linked destinations."
      endpoint="scholarships"
      searchPlaceholder="Search by scholarship name…"
      columns={[
        { key: 'id', label: 'Scholarship ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'name', label: 'Name', sortable: true },
        {
          key: 'awardAmount',
          label: 'Award',
          render: (r) => `${r.currency} ${r.awardAmount.toLocaleString()}`,
        },
        {
          key: 'deadline',
          label: 'Deadline',
          sortable: true,
          render: (r) => new Date(r.deadline).toLocaleDateString(),
        },
        { key: 'university', label: 'University' },
        { key: 'country', label: 'Country' },
        { key: 'isActive', label: 'Status', render: (r) => <StatusBadge active={r.isActive} /> },
      ]}
    />
  );
}
