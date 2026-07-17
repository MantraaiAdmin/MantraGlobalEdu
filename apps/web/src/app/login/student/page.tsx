'use client';

import { useState } from 'react';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginShell, LoginRoleSwitcher } from '@/components/auth/login-shell';
import { login } from '@/services/api.service';
import { redirectAfterLogin, setAuth } from '@/lib/auth';

const EXPECTED_ROLE = 'STUDENT';
const PORTAL_PATH = '/portal/student';

export default function StudentLoginPage() {
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
        setError('This account does not have student access. Please use the correct login portal.');
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
      role="student"
      icon={GraduationCap}
      title="Student Portal"
      subtitle="Track applications, documents, and counseling sessions"
      badge="For enrolled students"
      footer={
        <>
          <LoginRoleSwitcher current="student" dark />
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
            <Sparkles className="h-3 w-3 text-accent" />
            Secure JWT authentication
          </div>
        </>
      }
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-white/80">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white/80">Password</label>
            <Link href="/login/forgot-password?portal=student" className="text-xs text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" variant="accent" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : (
            <>Sign In to Student Portal <ArrowRight className="h-4 w-4" /></>
          )}
        </Button>
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
      </form>
    </LoginShell>
  );
}
