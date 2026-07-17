'use client';

import { useState } from 'react';
import { AdminLookupPage, IdCell } from '@/components/admin/admin-lookup-page';

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  source: string | null;
  countryOfInterest: string | null;
  createdAt: string;
};

const STATUS_OPTIONS = ['', 'NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'];

export default function AdminCrmPage() {
  const [status, setStatus] = useState('');

  return (
    <AdminLookupPage<LeadRow>
      title="CRM / Leads"
      description="Inquiry and lead pipeline with search, status filter, and lead IDs."
      endpoint="leads"
      searchPlaceholder="Search by name, email, phone, or country…"
      extraQuery={{ filterStatus: status || undefined }}
      filters={
        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.filter(Boolean).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      }
      columns={[
        { key: 'id', label: 'Lead ID', sortable: true, render: (r) => <IdCell id={r.id} /> },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone', render: (r) => r.phone || '—' },
        { key: 'countryOfInterest', label: 'Country', render: (r) => r.countryOfInterest || '—' },
        { key: 'source', label: 'Source', render: (r) => r.source || '—' },
        { key: 'status', label: 'Status' },
        {
          key: 'createdAt',
          label: 'Created',
          sortable: true,
          render: (r) => new Date(r.createdAt).toLocaleDateString(),
        },
      ]}
    />
  );
}
