'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Database, Mail, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';

type SettingsData = {
  databaseConnected: boolean;
  smtpConfigured: boolean;
  smtpHost: string | null;
  embeddedApi: boolean;
  appUrl: string;
  tableCounts: Record<string, number> | null;
};

export default function AdminSettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetch('/api/v1/admin/settings', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to load settings');
        setData(json.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-primary">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform health, integrations, and production setup checklist.
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Database</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <StatusRow
              ok={data?.databaseConnected ?? false}
              label={data?.databaseConnected ? 'Connected' : 'Not connected'}
            />
            {!data?.databaseConnected && (
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Create a free PostgreSQL database at <strong>neon.tech</strong> or Supabase.</li>
                <li>Copy the connection string (must include <code>?sslmode=require</code> for Neon).</li>
                <li>In Vercel → <strong>mantra-global-edu</strong> → Settings → Environment Variables, add <code>DATABASE_URL</code>.</li>
                <li>Redeploy production, then run: <code>npm run db:push && npm run db:seed</code> against that URL.</li>
              </ol>
            )}
            {data?.tableCounts && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {Object.entries(data.tableCounts).map(([key, count]) => (
                  <div key={key} className="rounded-lg bg-muted px-3 py-2">
                    <div className="text-lg font-bold text-primary">{count}</div>
                    <div className="text-xs capitalize text-muted-foreground">{key}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Email (Outlook SMTP)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <StatusRow ok={data?.smtpConfigured ?? false} label={data?.smtpConfigured ? 'SMTP ready' : 'SMTP_PASS missing'} />
            <p className="text-muted-foreground">Host: {data?.smtpHost || '—'}</p>
            {!data?.smtpConfigured && (
              <p className="text-muted-foreground">Add <code>SMTP_PASS</code> (Outlook app password) in Vercel for forgot-password OTP.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Production URL: <strong>{data?.appUrl}</strong></p>
            <p>Embedded API: <strong>{data?.embeddedApi ? 'Enabled' : 'Disabled'}</strong></p>
            <p>Admin portal modules: Dashboard, Users, CRM, Students, Counselors, Applications, Catalog, Appointments, Tasks, Reports.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <a href="/portal/admin/users">User Management</a>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <a href="/portal/admin/crm">CRM / Leads</a>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <a href="https://vercel.com/praveen71995-5630s-projects/mantra-global-edu/settings/environment-variables" target="_blank" rel="noopener noreferrer">
                Open Vercel Environment Variables
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {ok ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      ) : (
        <AlertCircle className="h-4 w-4 text-amber-600" />
      )}
      <span className={ok ? 'text-emerald-800' : 'text-amber-800'}>{label}</span>
    </div>
  );
}
