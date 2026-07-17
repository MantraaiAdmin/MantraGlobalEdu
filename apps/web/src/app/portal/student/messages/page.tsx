'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getAccessToken } from '@/lib/auth';
import { fetchStudentNotifications } from '@/services/api.service';

export default function StudentMessagesPage() {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetchStudentNotifications(token)
      .then(setNotifications)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load messages'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-2">Communication Centre</h2>
      <p className="text-sm text-muted-foreground mb-6">Updates from your counselor and application workflow.</p>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">No messages yet.</CardContent></Card>
        ) : (
          notifications.map((n) => (
            <Card key={n.id} className={n.isRead ? 'opacity-80' : ''}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{n.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{n.message}</p>
                <p className="mt-2 text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
