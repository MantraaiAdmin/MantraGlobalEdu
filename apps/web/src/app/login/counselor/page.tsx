'use client';

import { useState } from 'react';
import { Headphones, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginShell, LoginRoleSwitcher } from '@/components/auth/login-shell';
import { login } from '@/services/api.service';
import { redirectAfterLogin, setAuth } from '@/lib/auth';
import { APP_CONFIG, DEMO_ACCOUNTS } from '@mge/config';

const EXPECTED_ROLE = 'COUNSELOR';
const PORTAL_PATH = '/portal/counselor';

export default function CounselorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      if (data.user.role !== EXPECTED_ROLE) {
        setError(`This account is not a counselor account. Please use the ${data.user.role.toLowerCase()} login.`);
        return;
      }
      setAuth(data.accessToken, data.refreshToken, data.user);
      redirectAfterLogin(PORTAL_PATH);
    } catch {
      setError(`Invalid credentials. Try ${DEMO_ACCOUNTS.counselor} / ${DEMO_ACCOUNTS.password}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginShell
      role="counselor"
      icon={Headphones}
      title="Counselor Portal"
      subtitle="Manage assigned students, applications, and appointments"
      badge={`For ${APP_CONFIG.shortName} counselors`}
      footer={<LoginRoleSwitcher current="counselor" />}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-primary">Counselor Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={DEMO_ACCOUNTS.counselor}
            className="mt-1.5 border-emerald-200 focus-visible:ring-emerald-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-primary">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1.5 border-emerald-200 focus-visible:ring-emerald-500"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={loading}
        >
          {loading ? 'Signing in...' : (
            <>Sign In to Counselor Portal <ArrowRight className="h-4 w-4" /></>
          )}
        </Button>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      </form>
    </LoginShell>
  );
}
