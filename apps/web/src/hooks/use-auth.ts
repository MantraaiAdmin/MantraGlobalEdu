import { useSyncExternalStore } from 'react';
import { getAccessToken, getStoredUser } from '@/lib/auth';
import { getShortlistCount } from '@/lib/shortlist';

function subscribeShortlist(cb: () => void) {
  window.addEventListener('gem-shortlist-change', cb);
  return () => window.removeEventListener('gem-shortlist-change', cb);
}

export function useAuth() {
  const token = typeof window !== 'undefined' ? getAccessToken() : null;
  const user = typeof window !== 'undefined' ? getStoredUser() : null;
  return { token, user, isAuthenticated: !!token };
}

export function useShortlistCount() {
  return useSyncExternalStore(
    subscribeShortlist,
    getShortlistCount,
    () => 0
  );
}
