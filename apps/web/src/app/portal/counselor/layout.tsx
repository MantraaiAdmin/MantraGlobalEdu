import Link from 'next/link';
import { PortalHeader } from '@/components/portal/portal-header';
import {
  LayoutDashboard, Users, FileText, Calendar, CheckSquare, StickyNote,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/portal/counselor', icon: LayoutDashboard },
  { label: 'Assigned Students', href: '/portal/counselor/students', icon: Users },
  { label: 'Application Reviews', href: '/portal/counselor/applications', icon: FileText },
  { label: 'Calendar', href: '/portal/counselor/calendar', icon: Calendar },
  { label: 'Tasks', href: '/portal/counselor/tasks', icon: CheckSquare },
  { label: 'Student Notes', href: '/portal/counselor/notes', icon: StickyNote },
];

export default function CounselorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary text-white shrink-0 hidden lg:block">
        <div className="p-6">
          <Link href="/" className="font-display text-lg font-semibold">Counselor Portal</Link>
        </div>
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-muted/30">
        <PortalHeader title="Counselor Portal" loginPath="/login/counselor" />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
