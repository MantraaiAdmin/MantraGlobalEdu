function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken') || readCookie('mge_token');
}

/** Restore localStorage session from auth cookies (e.g. after hard refresh edge cases). */
export async function hydrateAuthSession(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (localStorage.getItem('accessToken') && localStorage.getItem('user')) {
    return true;
  }

  const token = readCookie('mge_token');
  const role = readCookie('mge_role');
  if (!token || !role) return false;

  try {
    const res = await fetch('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok || !json.data) return false;

    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(json.data));
    if (!localStorage.getItem('refreshToken')) {
      localStorage.setItem('refreshToken', '');
    }
    invalidateUserCache();
    notifyAuthChange();
    return true;
  } catch {
    return false;
  }
}

export type StoredUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

let cachedUserRaw: string | null | undefined;
let cachedUser: StoredUser | null | undefined;

function invalidateUserCache() {
  cachedUserRaw = undefined;
  cachedUser = undefined;
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (cachedUserRaw !== undefined && raw === cachedUserRaw) {
    return cachedUser ?? null;
  }
  cachedUserRaw = raw;
  if (!raw) {
    cachedUser = null;
    return null;
  }
  try {
    cachedUser = JSON.parse(raw) as StoredUser;
    return cachedUser;
  } catch {
    cachedUser = null;
    return null;
  }
}

export function subscribeAuth(callback: () => void) {
  const handler = () => callback();
  window.addEventListener('storage', handler);
  window.addEventListener('gem-auth-change', handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('gem-auth-change', handler);
  };
}

function notifyAuthChange() {
  window.dispatchEvent(new Event('gem-auth-change'));
}

export function setAuth(accessToken: string, refreshToken: string, user: StoredUser & object) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
  invalidateUserCache();
  document.cookie = `mge_token=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  document.cookie = `mge_role=${user.role}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  notifyAuthChange();
}

export function clearAuth() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  invalidateUserCache();
  document.cookie = 'mge_token=; path=/; max-age=0';
  document.cookie = 'mge_role=; path=/; max-age=0';
  notifyAuthChange();
}

/** Full navigation ensures middleware sees the auth cookie immediately. */
export function redirectAfterLogin(path: string) {
  window.location.href = path;
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
