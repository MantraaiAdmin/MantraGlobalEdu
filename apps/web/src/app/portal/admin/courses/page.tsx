'use client';

import { AdminLookupPage, IdCell, StatusBadge } from '@/components/admin/admin-lookup-page';

type CourseRow = {
  id: string;
  slug: string;
  name: string;
  degreeLevel: string;
  tuition: number;
  currency: string;
  university: string;
  applicationCount: number;
  isActive: boolean;
};

export default function AdminCoursesPage() {
  return (
    <AdminLookupPage<CourseRow>
      title="Courses"
      description="Programs catalog with degree level, tuition, and linked university."
      endpoint="courses"
      searchPlaceholder="Search by course name or slug…"
      columns={[
        { key: 'id', label: 'Course ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'name', label: 'Course', sortable: true },
        { key: 'degreeLevel', label: 'Level' },
        { key: 'university', label: 'University' },
        {
          key: 'tuition',
          label: 'Tuition',
          render: (r) => `${r.currency} ${r.tuition.toLocaleString()}`,
        },
        { key: 'applicationCount', label: 'Applications' },
        { key: 'isActive', label: 'Status', render: (r) => <StatusBadge active={r.isActive} /> },
      ]}
    />
  );
}
