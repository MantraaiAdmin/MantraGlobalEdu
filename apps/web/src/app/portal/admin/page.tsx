'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';

type DashboardData = {
  stats: {
    totalStudents: number;
    totalCounselors: number;
    activeApplications: number;
    appointmentsToday: number;
    newLeads: number;
    conversionRate: number;
  };
  pipeline: Array<{ status: string; count: number }>;
  recentLeads: Array<{
    id: string;
    name: string;
    status: string;
    countryOfInterest: string | null;
  }>;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetch('/api/v1/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to load dashboard');
        setData(json.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-primary mb-4">Admin Dashboard</h2>
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error || 'Dashboard data unavailable. Connect DATABASE_URL and run database seed to see live metrics.'}
        </p>
      </div>
    );
  }

  const stats = [
    { label: 'Total Students', value: String(data.stats.totalStudents), icon: Users },
    { label: 'Active Applications', value: String(data.stats.activeApplications), icon: FileText },
    { label: 'Appointments Today', value: String(data.stats.appointmentsToday), icon: Calendar },
    { label: 'Lead Conversion', value: `${data.stats.conversionRate}%`, icon: TrendingUp },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-4">Recent Leads ({data.stats.newLeads} new)</h3>
            <div className="space-y-3">
              {data.recentLeads.length === 0 ? (
                <p className="text-sm text-muted-foreground">No leads yet.</p>
              ) : (
                data.recentLeads.map((lead) => (
                  <div key={lead.id} className="flex justify-between items-center p-3 rounded-lg bg-muted text-sm">
                    <span>{lead.name}{lead.countryOfInterest ? ` — ${lead.countryOfInterest}` : ''}</span>
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {lead.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-4">Application Pipeline</h3>
            <div className="space-y-3">
              {data.pipeline.map((item) => (
                <div key={item.status} className="flex justify-between items-center text-sm">
                  <span>{item.status.replace(/_/g, ' ')}</span>
                  <span className="font-semibold text-primary">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
