'use client';

import { useEffect, useMemo, useState } from 'react';
import { UserRole } from '@mge/types';
import { Button } from '@/components/ui/button';
import { LabeledInput, LabeledSelect } from '@/components/admin/form-field';
import { LookupTable, LookupColumn } from '@/components/admin/lookup-table';
import { IdCell, StatusBadge } from '@/components/admin/admin-lookup-page';
import { createAdminUser, updateAdminUser } from '@/services/api.service';
import { getAccessToken } from '@/lib/auth';

type ManagedUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
};

const ROLES = [
  { value: UserRole.ADMIN, label: 'Admin' },
  { value: UserRole.COUNSELOR, label: 'Counselor' },
  { value: UserRole.STUDENT, label: 'Student' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [meta, setMeta] = useState<{ total: number; page: number; totalPages: number; databaseConnected?: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: UserRole.COUNSELOR,
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadUsers = async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '20',
        sortBy,
        sortOrder,
      });
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (roleFilter) params.set('role', roleFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/v1/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load users');
      setUsers(json.data.data as ManagedUser[]);
      setMeta(json.data.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, debouncedSearch, roleFilter, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, roleFilter, statusFilter]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;
    setError('');
    setSuccess('');
    try {
      await createAdminUser(token, form);
      setSuccess('User created successfully.');
      setForm({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        role: UserRole.COUNSELOR,
      });
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const toggleActive = async (user: ManagedUser) => {
    const token = getAccessToken();
    if (!token) return;
    setError('');
    try {
      await updateAdminUser(token, user.id, { isActive: !user.isActive });
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const columns: LookupColumn<ManagedUser>[] = useMemo(
    () => [
      { key: 'id', label: 'User ID', sortable: true, render: (u) => <IdCell id={u.id} /> },
      {
        key: 'firstName',
        label: 'Name',
        sortable: true,
        render: (u) => <span className="font-medium">{u.firstName} {u.lastName}</span>,
      },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'phone', label: 'Phone', render: (u) => u.phone || '—' },
      { key: 'role', label: 'Role', sortable: true },
      {
        key: 'isActive',
        label: 'Status',
        render: (u) => <StatusBadge active={u.isActive} />,
      },
      {
        key: 'createdAt',
        label: 'Created',
        sortable: true,
        render: (u) => new Date(u.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (u) => (
          <Button size="sm" variant="outline" onClick={() => toggleActive(u)}>
            {u.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-primary">User Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create credentials for counselors, students, and admin users. Search, filter, and manage portal access.
        </p>
        {meta?.databaseConnected === false && (
          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Database is not connected on this server. You can sign in as bootstrap admin, but creating users requires DATABASE_URL.
          </p>
        )}
      </div>

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-primary">Create User</h2>
        <form onSubmit={handleCreate} className="mt-4 grid gap-4 md:grid-cols-2">
          <LabeledInput
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
          <LabeledInput
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />
          <LabeledInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <LabeledInput
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            hint="Optional — used for OTP password reset"
          />
          <LabeledInput
            label="Temporary password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            hint="Min 8 chars with upper, lower, and number"
          />
          <LabeledSelect
            label="Role"
            name="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
            options={ROLES}
            required
          />
          <div className="md:col-span-2">
            <Button type="submit">Create User</Button>
          </div>
        </form>
        {success && <p className="mt-3 text-sm text-emerald-700">{success}</p>}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <LookupTable
        title="Existing Users"
        columns={columns}
        rows={users}
        loading={loading}
        error={error && !success ? undefined : undefined}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, phone, or ID…"
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        meta={meta ? { total: meta.total, page: meta.page, totalPages: meta.totalPages } : undefined}
        onPageChange={setPage}
        filters={
          <>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All roles</option>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">All statuses</option>
              <option value="active">Active only</option>
              <option value="inactive">Inactive only</option>
            </select>
          </>
        }
      />
    </div>
  );
}
