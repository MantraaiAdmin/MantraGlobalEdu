'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Users, FileText, Calendar, CheckSquare, BarChart3,
  Building2, Globe, GraduationCap, Award, Settings, UserCog, Menu, X,
} from 'lucide-react';
import { PortalHeader } from '@/components/portal/portal-header';
import { hydrateAuthSession, getAccessToken } from '@/lib/auth';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/portal/admin', icon: LayoutDashboard, exact: true },
  { label: 'User Management', href: '/portal/admin/users', icon: UserCog },
  { label: 'CRM / Leads', href: '/portal/admin/crm', icon: Users },
  { label: 'Students', href: '/portal/admin/students', icon: Users },
  { label: 'Counselors', href: '/portal/admin/counselors', icon: Users },
  { label: 'Applications', href: '/portal/admin/applications', icon: FileText },
  { label: 'Universities', href: '/portal/admin/universities', icon: Building2 },
  { label: 'Countries', href: '/portal/admin/countries', icon: Globe },
  { label: 'Courses', href: '/portal/admin/courses', icon: GraduationCap },
  { label: 'Scholarships', href: '/portal/admin/scholarships', icon: Award },
  { label: 'Appointments', href: '/portal/admin/appointments', icon: Calendar },
  { label: 'Tasks', href: '/portal/admin/tasks', icon: CheckSquare },
  { label: 'Reports', href: '/portal/admin/reports', icon: BarChart3 },
  { label: 'Settings', href: '/portal/admin/settings', icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              active
                ? 'bg-white/15 text-white font-medium ring-1 ring-accent/60'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

function DatabaseStatusBanner() {
  const [status, setStatus] = useState<{
    databaseConnected: boolean;
    smtpConfigured: boolean;
  } | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetch('/api/v1/admin/settings', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => {
        if (json.data) setStatus(json.data);
      })
      .catch(() => {});
  }, []);

  if (!status || status.databaseConnected) return null;

  return (
    <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <strong>Database not connected.</strong> User creation, students, applications, and all lookup modules require{' '}
      <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> on Vercel. Open{' '}
      <Link href="/portal/admin/settings" className="font-medium underline">Settings</Link> for setup steps.
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrateAuthSession().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-sm text-muted-foreground">Loading admin portal…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary text-white shrink-0 hidden lg:block overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="font-display text-lg font-semibold">Admin Portal</Link>
        </div>
        <nav className="px-3 space-y-1 pb-6">
          <NavLinks />
        </nav>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] h-full bg-primary text-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-display font-semibold">Admin Portal</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="px-3 py-4 space-y-1">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </nav>
          </aside>
        </div>
      )}

      <main className="flex-1 bg-muted/30 min-w-0">
        <PortalHeader title="Admin Portal" loginPath="/login/admin" />
        <div className="lg:hidden px-4 pt-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-primary"
          >
            <Menu className="h-4 w-4" />
            Admin Menu
          </button>
        </div>
        <div className="p-6">
          <DatabaseStatusBanner />
          {children}
        </div>
      </main>
    </div>
  );
}
