'use client';

import { useState } from 'react';
import { AdminLookupPage, IdCell } from '@/components/admin/admin-lookup-page';

type AppointmentRow = {
  id: string;
  title: string;
  student: string;
  counselor: string;
  scheduledAt: string;
  status: string;
  duration: number;
};

const STATUS_OPTIONS = ['', 'SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];

export default function AdminAppointmentsPage() {
  const [status, setStatus] = useState('');

  return (
    <AdminLookupPage<AppointmentRow>
      title="Appointments"
      description="View and monitor counseling appointments across all counselors."
      endpoint="appointments"
      searchPlaceholder="Search by student, counselor, or title…"
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
        { key: 'id', label: 'Appointment ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'title', label: 'Title' },
        { key: 'student', label: 'Student' },
        { key: 'counselor', label: 'Counselor' },
        {
          key: 'scheduledAt',
          label: 'Scheduled',
          sortable: true,
          render: (r) => new Date(r.scheduledAt).toLocaleString(),
        },
        { key: 'duration', label: 'Duration', render: (r) => `${r.duration} min` },
        { key: 'status', label: 'Status', render: (r) => r.status.replace(/_/g, ' ') },
      ]}
    />
  );
}
