import Link from 'next/link';
import { PortalHeader } from '@/components/portal/portal-header';
import {
  LayoutDashboard, Users, FileText, Calendar, CheckSquare, BarChart3,
  Building2, Globe, GraduationCap, Award, Settings, UserCog,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/portal/admin', icon: LayoutDashboard },
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

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary text-white shrink-0 hidden lg:block overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="font-display text-lg font-semibold">Admin Portal</Link>
        </div>
        <nav className="px-3 space-y-1 pb-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-muted/30">
        <PortalHeader title="Admin Portal" loginPath="/login/admin" />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
