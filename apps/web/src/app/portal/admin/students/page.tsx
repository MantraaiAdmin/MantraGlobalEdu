'use client';

import { AdminLookupPage, IdCell, StatusBadge } from '@/components/admin/admin-lookup-page';

type StudentRow = {
  id: string;
  registrationNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  isActive: boolean;
  applicationCount: number;
  documentCount: number;
  preferredCountries: string[];
};

export default function AdminStudentsPage() {
  return (
    <AdminLookupPage<StudentRow>
      title="Students"
      description="Lookup registered students with registration ID, contact details, and application progress."
      endpoint="students"
      searchPlaceholder="Search by name, email, phone, or student ID…"
      columns={[
        { key: 'id', label: 'Student ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'registrationNo', label: 'Reg. No.' },
        {
          key: 'firstName',
          label: 'Name',
          sortable: true,
          render: (r) => `${r.firstName} ${r.lastName}`,
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone', render: (r) => r.phone || '—' },
        { key: 'applicationCount', label: 'Applications' },
        { key: 'documentCount', label: 'Documents' },
        {
          key: 'preferredCountries',
          label: 'Preferred',
          render: (r) => r.preferredCountries.join(', ') || '—',
        },
        { key: 'isActive', label: 'Status', render: (r) => <StatusBadge active={r.isActive} /> },
      ]}
    />
  );
}
