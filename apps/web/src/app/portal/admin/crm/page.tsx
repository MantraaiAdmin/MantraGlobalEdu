'use client';

import { useEffect, useState } from 'react';
import { AdminLookupPage, IdCell } from '@/components/admin/admin-lookup-page';
import { getAccessToken } from '@/lib/auth';

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

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'];

function LeadStatusSelect({ lead, onUpdated }: { lead: LeadRow; onUpdated: () => void }) {
  const [saving, setSaving] = useState(false);

  const updateStatus = async (status: string) => {
    const token = getAccessToken();
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/v1/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Update failed');
      onUpdated();
    } catch {
      // parent table reloads on next navigation
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      className="h-8 rounded-md border border-input bg-background px-2 text-xs"
      value={lead.status}
      disabled={saving}
      onChange={(e) => updateStatus(e.target.value)}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

export default function AdminCrmPage() {
  const [status, setStatus] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <AdminLookupPage<LeadRow>
      key={`${status}-${reloadKey}`}
      title="CRM / Leads"
      description="Inquiry and lead pipeline with search, status filter, lead IDs, and inline status updates."
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
          {STATUS_OPTIONS.map((s) => (
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
        {
          key: 'status',
          label: 'Status',
          render: (r) => (
            <LeadStatusSelect lead={r} onUpdated={() => setReloadKey((k) => k + 1)} />
          ),
        },
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
