'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';

export default function AdminReportsPage() {
  const [pipeline, setPipeline] = useState<Array<{ status: string; count: number }>>([]);
  const [stats, setStats] = useState<{ totalStudents: number; activeApplications: number; conversionRate: number } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetch('/api/v1/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to load reports');
        setPipeline(json.data.pipeline);
        setStats(json.data.stats);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load reports'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-primary">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">Application pipeline and enrollment metrics from live data.</p>
      </div>

      {error && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{error}</p>
      )}

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-primary">{stats.totalStudents}</div><div className="text-sm text-muted-foreground">Total Students</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-primary">{stats.activeApplications}</div><div className="text-sm text-muted-foreground">Active Applications</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-primary">{stats.conversionRate}%</div><div className="text-sm text-muted-foreground">Lead Conversion</div></CardContent></Card>
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-primary mb-4">Applications by Status</h3>
          <div className="space-y-2">
            {pipeline.map((row) => (
              <div key={row.status} className="flex items-center gap-3 text-sm">
                <span className="w-40">{row.status.replace(/_/g, ' ')}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${Math.min(100, row.count * 5)}%` }}
                  />
                </div>
                <span className="w-8 text-right font-semibold">{row.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
