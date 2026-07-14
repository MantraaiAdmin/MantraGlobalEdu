'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Loader2 } from 'lucide-react';
import { getAccessToken, getStoredUser } from '@/lib/auth';
import { apiClient } from '@/lib/api';

import { APP_CONFIG } from '@mge/config';

export default function StudentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  } | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    const user = getStoredUser();
    if (!token) return;
    apiClient<{ data: typeof profile }>('/auth/profile', { token })
      .then((res) => setProfile(res.data || user))
      .catch(() => setProfile(user))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Profile</h2>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">{profile?.firstName} {profile?.lastName}</h3>
              <p className="text-sm text-muted-foreground">Student · {APP_CONFIG.name}</p>
            </div>
          </div>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-muted-foreground">Email</dt><dd className="font-medium text-primary">{profile?.email}</dd></div>
            {profile?.phone && <div><dt className="text-muted-foreground">Phone</dt><dd className="font-medium text-primary">{profile.phone}</dd></div>}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
