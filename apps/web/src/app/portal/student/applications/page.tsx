'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';
import { fetchStudentApplications } from '@/services/api.service';
import { formatDate } from '@mge/utils';

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  UNDER_REVIEW: 'bg-amber-100 text-amber-700',
  SUBMITTED: 'bg-blue-100 text-blue-700',
  ACCEPTED: 'bg-green-100 text-green-700',
};

export default function StudentApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Awaited<ReturnType<typeof fetchStudentApplications>>>([]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetchStudentApplications(token)
      .then(setApplications)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">My Applications</h2>
      {applications.length === 0 ? (
        <p className="text-muted-foreground">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-6">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-primary">{app.university.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{app.course.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {app.university.country?.flag} {app.university.country?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[app.status] || 'bg-gray-100'}`}>
                      {app.status.replace(/_/g, ' ')}
                    </span>
                    {app.submittedAt && (
                      <p className="text-xs text-muted-foreground mt-2">Submitted {formatDate(app.submittedAt)}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
