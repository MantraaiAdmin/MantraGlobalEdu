'use client';

import { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginShell, LoginRoleSwitcher } from '@/components/auth/login-shell';
import { login } from '@/services/api.service';
import { redirectAfterLogin, setAuth } from '@/lib/auth';

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
        setError('This account does not have admin access. Please use the correct login portal.');
        return;
      }
      setAuth(data.accessToken, data.refreshToken, data.user);
      redirectAfterLogin(PORTAL_PATH);
    } catch {
      setError('Invalid email or password. Please try again or use Forgot Password.');
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
            placeholder="Enter your admin email"
            className="mt-1.5"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-primary">Password</label>
            <Link href="/login/forgot-password?portal=admin" className="text-xs text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1.5"
            autoComplete="current-password"
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
