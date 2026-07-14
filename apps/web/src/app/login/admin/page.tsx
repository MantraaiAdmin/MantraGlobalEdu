'use client';

import { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginShell, LoginRoleSwitcher } from '@/components/auth/login-shell';
import { login } from '@/services/api.service';
import { redirectAfterLogin, setAuth } from '@/lib/auth';
import { DEMO_ACCOUNTS } from '@mge/config';

const EXPECTED_ROLE = 'ADMIN';
const PORTAL_PATH = '/portal/admin';

export default function AdminLoginPage() {
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
        setError(`This account is not an admin account. Please use the ${data.user.role.toLowerCase()} login.`);
        return;
      }
      setAuth(data.accessToken, data.refreshToken, data.user);
      redirectAfterLogin(PORTAL_PATH);
    } catch {
      setError(`Invalid credentials. Try ${DEMO_ACCOUNTS.admin} / ${DEMO_ACCOUNTS.password}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginShell
      role="admin"
      icon={Shield}
      title="Admin Console"
      subtitle="Manage universities, courses, counselors, and platform settings"
      badge="Authorized personnel only"
      footer={<LoginRoleSwitcher current="admin" />}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-primary">Admin Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={DEMO_ACCOUNTS.admin}
            className="mt-1.5"
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
            className="mt-1.5"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? 'Signing in...' : (
            <>Access Admin Console <ArrowRight className="h-4 w-4" /></>
          )}
        </Button>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      </form>
    </LoginShell>
  );
}
