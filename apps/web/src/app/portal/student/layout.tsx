import Link from 'next/link';
import {
  LayoutDashboard, FileText, Calendar, FolderOpen, User, Bell, MessageSquare,
} from 'lucide-react';
import { PortalHeader } from '@/components/portal/portal-header';

const navItems = [
  { label: 'Dashboard', href: '/portal/student', icon: LayoutDashboard },
  { label: 'Applications', href: '/portal/student/applications', icon: FileText },
  { label: 'Documents', href: '/portal/student/documents', icon: FolderOpen },
  { label: 'Appointments', href: '/portal/student/appointments', icon: Calendar },
  { label: 'Profile', href: '/portal/student/profile', icon: User },
  { label: 'Notifications', href: '/portal/student/notifications', icon: Bell },
  { label: 'Messages', href: '/portal/student/messages', icon: MessageSquare },
];

export default function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary text-white shrink-0 hidden lg:block">
        <div className="p-6">
          <Link href="/" className="font-display text-lg font-semibold">Student Portal</Link>
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
        <PortalHeader title="Student Portal" loginPath="/login/student" />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
