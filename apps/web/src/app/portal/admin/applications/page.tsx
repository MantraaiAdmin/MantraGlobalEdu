'use client';

import { useState } from 'react';
import { AdminLookupPage, IdCell } from '@/components/admin/admin-lookup-page';

type ApplicationRow = {
  id: string;
  status: string;
  visaStatus: string;
  student: { name: string; email: string };
  university: string;
  country: string;
  course: string;
  submittedAt: string | null;
};

const STATUS_OPTIONS = [
  '', 'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'DOCUMENTS_PENDING',
  'OFFER_RECEIVED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN',
];

export default function AdminApplicationsPage() {
  const [status, setStatus] = useState('');

  return (
    <AdminLookupPage<ApplicationRow>
      title="Applications"
      description="Track student applications by status, university, and visa stage."
      endpoint="applications"
      searchPlaceholder="Search by student, university, or course…"
      extraQuery={{ filterStatus: status || undefined }}
      filters={
        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.filter(Boolean).map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </select>
      }
      columns={[
        { key: 'id', label: 'Application ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'student', label: 'Student', render: (r) => (
          <div>
            <div className="font-medium">{r.student.name}</div>
            <div className="text-xs text-muted-foreground">{r.student.email}</div>
          </div>
        )},
        { key: 'university', label: 'University' },
        { key: 'course', label: 'Course' },
        { key: 'country', label: 'Country' },
        { key: 'status', label: 'Status', render: (r) => r.status.replace(/_/g, ' ') },
        { key: 'visaStatus', label: 'Visa', render: (r) => r.visaStatus.replace(/_/g, ' ') },
        {
          key: 'submittedAt',
          label: 'Submitted',
          render: (r) => (r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : '—'),
        },
      ]}
    />
  );
}
