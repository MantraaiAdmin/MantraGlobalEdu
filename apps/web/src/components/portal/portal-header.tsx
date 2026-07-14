'use client';

import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clearAuth, getStoredUser, subscribeAuth } from '@/lib/auth';
import { apiClient } from '@/lib/api';

interface PortalHeaderProps {
  title: string;
  loginPath: string;
}

export function PortalHeader({ title, loginPath }: PortalHeaderProps) {
  const router = useRouter();
  const user = useSyncExternalStore(subscribeAuth, getStoredUser, () => null);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      if (refreshToken) {
        await apiClient('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
      // Continue logout even if API call fails
    }
    clearAuth();
    router.push(loginPath);
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
      <h1 className="font-semibold text-primary lg:hidden">{title}</h1>
      <div className="flex items-center gap-4 ml-auto">
        {user && (
          <span className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {user.firstName} {user.lastName}
          </span>
        )}
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          Back to Website
        </Link>
        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
