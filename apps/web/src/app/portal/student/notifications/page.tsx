'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Loader2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';
import { fetchStudentNotifications } from '@/services/api.service';
import { formatDate } from '@mge/utils';
import Link from 'next/link';

export default function StudentNotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    link: string | null;
  }>>([]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetchStudentNotifications(token)
      .then(setNotifications)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-muted-foreground">No notifications yet.</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n.id} className={!n.isRead ? 'border-accent/30' : ''}>
              <CardContent className="p-4 flex items-start gap-3">
                <Bell className={`h-5 w-5 shrink-0 ${n.isRead ? 'text-muted-foreground' : 'text-accent'}`} />
                <div className="flex-1">
                  <p className="font-medium text-primary">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(n.createdAt)}</p>
                  {n.link && (
                    <Link href={n.link} className="text-xs text-accent hover:underline mt-1 inline-block">View details</Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
