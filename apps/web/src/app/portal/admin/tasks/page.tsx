'use client';

import { useState } from 'react';
import { AdminLookupPage, IdCell } from '@/components/admin/admin-lookup-page';

type TaskRow = {
  id: string;
  title: string;
  counselor: string;
  priority: string;
  isCompleted: boolean;
  dueDate: string | null;
};

export default function AdminTasksPage() {
  const [status, setStatus] = useState('');

  return (
    <AdminLookupPage<TaskRow>
      title="Tasks"
      description="Counselor task queue with priority, due dates, and completion status."
      endpoint="tasks"
      searchPlaceholder="Search by task title…"
      extraQuery={{ filterStatus: status || undefined }}
      filters={
        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      }
      columns={[
        { key: 'id', label: 'Task ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'title', label: 'Title' },
        { key: 'counselor', label: 'Counselor' },
        { key: 'priority', label: 'Priority' },
        {
          key: 'isCompleted',
          label: 'Status',
          render: (r) => (r.isCompleted ? 'Completed' : 'Pending'),
        },
        {
          key: 'dueDate',
          label: 'Due',
          sortable: true,
          render: (r) => (r.dueDate ? new Date(r.dueDate).toLocaleDateString() : '—'),
        },
      ]}
    />
  );
}
