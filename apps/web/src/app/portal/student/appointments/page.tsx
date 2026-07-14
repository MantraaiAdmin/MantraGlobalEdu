'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Loader2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';
import { fetchStudentAppointments } from '@/services/api.service';
import { formatDate } from '@mge/utils';

export default function StudentAppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Array<{
    id: string;
    title: string;
    description: string | null;
    scheduledAt: string;
    status: string;
    duration: number;
    counselor: { user: { firstName: string; lastName: string } };
  }>>([]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetchStudentAppointments(token)
      .then(setAppointments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Appointments</h2>
      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No upcoming appointments.</p>
            <a href="/book-counseling" className="text-accent hover:underline text-sm mt-2 inline-block">Book a counseling session</a>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <Card key={appt.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{appt.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      with {appt.counselor.user.firstName} {appt.counselor.user.lastName}
                    </p>
                    <p className="text-sm font-medium text-primary mt-2">{formatDate(appt.scheduledAt)} · {appt.duration} min</p>
                    <span className="inline-block mt-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full capitalize">
                      {appt.status.toLowerCase()}
                    </span>
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
