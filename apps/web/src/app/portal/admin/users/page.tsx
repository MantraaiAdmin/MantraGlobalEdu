'use client';

import { useEffect, useState } from 'react';
import { UserRole } from '@mge/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createAdminUser, fetchAdminUsers, updateAdminUser } from '@/services/api.service';
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
};

const ROLES = [
  { value: UserRole.ADMIN, label: 'Admin' },
  { value: UserRole.COUNSELOR, label: 'Counselor' },
  { value: UserRole.STUDENT, label: 'Student' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: UserRole.COUNSELOR,
  });

  const loadUsers = async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const result = await fetchAdminUsers(token);
      setUsers(result.data as ManagedUser[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-primary">User Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Only admins can create credentials for counselors, students, and additional admin users.
        </p>
      </div>

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-primary">Create User</h2>
        <form onSubmit={handleCreate} className="mt-4 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
          <Input
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Temporary password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
          >
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
          <div className="md:col-span-2">
            <Button type="submit">Create User</Button>
          </div>
        </form>
        {success && <p className="mt-3 text-sm text-emerald-700">{success}</p>}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <div className="premium-card overflow-hidden">
        <div className="border-b border-border/60 px-6 py-4">
          <h2 className="text-lg font-semibold text-primary">Existing Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="px-6 py-6" colSpan={5}>Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td className="px-6 py-6" colSpan={5}>No users found.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t border-border/40">
                    <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.isActive ? 'Active' : 'Inactive'}</td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleActive(user)}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
