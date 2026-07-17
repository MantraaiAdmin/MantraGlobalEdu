'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, FolderOpen, Bell, Loader2, CheckCircle2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';
import { fetchStudentDashboard, fetchStudentApplications, fetchStudentDocumentWorkspace } from '@/services/api.service';

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  SUBMITTED: 'bg-blue-100 text-blue-700',
  UNDER_REVIEW: 'bg-amber-100 text-amber-700',
  DOCUMENTS_PENDING: 'bg-orange-100 text-orange-700',
  OFFER_RECEIVED: 'bg-emerald-100 text-emerald-700',
  ACCEPTED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [checklistSummary, setChecklistSummary] = useState<{
    pending: number;
    uploaded: number;
    verified: number;
    completionPercent: number;
  } | null>(null);
  const [applications, setApplications] = useState<Array<{
    id: string;
    status: string;
    university: { name: string };
    course: { name: string };
  }>>([]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    Promise.all([
      fetchStudentDashboard(token),
      fetchStudentApplications(token),
      fetchStudentDocumentWorkspace(token).catch(() => null),
    ])
      .then(([dash, apps, workspace]) => {
        setStats(dash.stats);
        setApplications(apps.slice(0, 5));
        if (workspace) setChecklistSummary(workspace.summary);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const statItems = [
    { label: 'Active Applications', value: String(stats?.activeApplications ?? 0), icon: FileText },
    { label: 'Upcoming Appointments', value: String(stats?.upcomingAppointments ?? 0), icon: Calendar },
    { label: 'Documents Verified', value: String(checklistSummary?.verified ?? stats?.documentsUploaded ?? 0), icon: CheckCircle2 },
    { label: 'Unread Notifications', value: String(stats?.unreadNotifications ?? 0), icon: Bell },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statItems.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {checklistSummary && (
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-accent" />
              MGE-DOC-02 Checklist Progress
            </CardTitle>
            <Link href="/portal/student/documents" className="text-sm text-accent hover:underline">Manage documents</Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="rounded-lg bg-amber-50 p-4 text-center">
                <div className="text-2xl font-bold text-amber-800">{checklistSummary.pending}</div>
                <div className="text-sm text-amber-700">Pending upload</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <div className="text-2xl font-bold text-blue-800">{checklistSummary.uploaded}</div>
                <div className="text-sm text-blue-700">Awaiting verification</div>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 text-center">
                <div className="text-2xl font-bold text-emerald-800">{checklistSummary.verified}</div>
                <div className="text-sm text-emerald-700">Verified</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall completion</span>
                <span className="font-medium text-primary">{checklistSummary.completionPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${checklistSummary.completionPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Application Tracking</CardTitle>
          <Link href="/portal/student/applications" className="text-sm text-accent hover:underline">View all</Link>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applications yet. <Link href="/find-a-course" className="text-accent">Explore courses</Link></p>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div>
                    <div className="font-medium">{app.university.name}</div>
                    <div className="text-sm text-muted-foreground">{app.course.name}</div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[app.status] || 'bg-gray-100 text-gray-700'}`}>
                    {app.status.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
