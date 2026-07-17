'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APPLICATION_STATUS_LABELS, VISA_STATUS_LABELS } from '@mge/config';
import { Globe2, GraduationCap, Plane } from 'lucide-react';

type CountryRef = { code: string; name: string; flag?: string | null };
type ApplicationRow = {
  id: string;
  status: string;
  visaStatus: string;
  university: { name: string };
  course: { name: string };
  country: CountryRef;
  documentCount: number;
  submittedAt: string | null;
  offerReceivedAt: string | null;
};

const STATUS_CLASS: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-700',
  SUBMITTED: 'bg-blue-100 text-blue-700',
  UNDER_REVIEW: 'bg-amber-100 text-amber-800',
  DOCUMENTS_PENDING: 'bg-orange-100 text-orange-800',
  OFFER_RECEIVED: 'bg-emerald-100 text-emerald-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-700',
  WITHDRAWN: 'bg-gray-100 text-gray-600',
};

const VISA_CLASS: Record<string, string> = {
  NOT_STARTED: 'bg-slate-100 text-slate-700',
  DOCUMENTS_PREPARING: 'bg-orange-100 text-orange-800',
  APPLIED: 'bg-blue-100 text-blue-700',
  BIOMETRICS: 'bg-indigo-100 text-indigo-700',
  INTERVIEW_SCHEDULED: 'bg-purple-100 text-purple-700',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-700',
};

export function ApplicationJourneyPanel({
  preferredCountries,
  appliedCountries,
  applications,
}: {
  preferredCountries: CountryRef[];
  appliedCountries: CountryRef[];
  applications: ApplicationRow[];
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="premium-card xl:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-accent" /> Country Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Preferred Destinations</p>
            {preferredCountries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No preferences saved yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {preferredCountries.map((c) => (
                  <span key={c.code} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {c.flag} {c.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Applied Countries</p>
            {appliedCountries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active applications yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {appliedCountries.map((c) => (
                  <span key={c.code} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {c.flag || '🌍'} {c.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="premium-card xl:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-accent" /> Applications & Visa Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-sm text-muted-foreground">Start an application to track university, offer, and visa progress here.</p>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div>
                      <div className="font-semibold text-primary">{app.university.name}</div>
                      <div className="text-sm text-muted-foreground">{app.course.name}</div>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        {app.country.flag || '🌍'} {app.country.name} · {app.documentCount} linked documents
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_CLASS[app.status] || STATUS_CLASS.DRAFT}`}>
                        {APPLICATION_STATUS_LABELS[app.status as keyof typeof APPLICATION_STATUS_LABELS] || app.status.replace(/_/g, ' ')}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${VISA_CLASS[app.visaStatus] || VISA_CLASS.NOT_STARTED}`}>
                        <Plane className="h-3 w-3" />
                        {VISA_STATUS_LABELS[app.visaStatus as keyof typeof VISA_STATUS_LABELS] || app.visaStatus.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
