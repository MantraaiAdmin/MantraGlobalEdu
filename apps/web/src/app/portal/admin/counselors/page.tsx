'use client';

import { AdminLookupPage, IdCell, StatusBadge } from '@/components/admin/admin-lookup-page';

type CounselorRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string | null;
  studentCount: number;
  appointmentCount: number;
  isActive: boolean;
  isAvailable: boolean;
};

export default function AdminCounselorsPage() {
  return (
    <AdminLookupPage<CounselorRow>
      title="Counselors"
      description="Manage counselor accounts, caseloads, and availability."
      endpoint="counselors"
      searchPlaceholder="Search by name, email, or department…"
      columns={[
        { key: 'id', label: 'Counselor ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        {
          key: 'firstName',
          label: 'Name',
          render: (r) => `${r.firstName} ${r.lastName}`,
        },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department', render: (r) => r.department || '—' },
        { key: 'studentCount', label: 'Students' },
        { key: 'appointmentCount', label: 'Appointments' },
        {
          key: 'isAvailable',
          label: 'Availability',
          render: (r) => (r.isAvailable ? 'Available' : 'Unavailable'),
        },
        { key: 'isActive', label: 'Status', render: (r) => <StatusBadge active={r.isActive} /> },
      ]}
    />
  );
}
