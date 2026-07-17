'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  forgotPassword,
  resetPasswordWithToken,
  verifyPasswordOtp,
} from '@/services/api.service';

type Step = 'request' | 'verify' | 'reset' | 'done';

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const portal = searchParams.get('portal') || 'admin';
  const loginHref = `/login/${portal}`;

  const [step, setStep] = useState<Step>('request');
  const [channel, setChannel] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const portalLabel = useMemo(() => {
    if (portal === 'student') return 'Student Portal';
    if (portal === 'counselor') return 'Counselor Portal';
    return 'Admin Console';
  }, [portal]);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');
    try {
      await forgotPassword(identifier, channel);
      setInfo('If an account exists, a verification code has been sent.');
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await verifyPasswordOtp(identifier, channel, otp);
      setResetToken(result.resetToken);
      setStep('reset');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await resetPasswordWithToken(resetToken, password);
      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-premium backdrop-blur">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Password Recovery</p>
            <h1 className="font-display text-xl font-bold text-primary">{portalLabel}</h1>
          </div>
        </div>

        {step === 'request' && (
          <form onSubmit={handleRequest} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your registered email or phone number. We will send a one-time verification code.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={channel === 'email' ? 'default' : 'outline'}
                onClick={() => setChannel('email')}
              >
                Email OTP
              </Button>
              <Button
                type="button"
                variant={channel === 'phone' ? 'default' : 'outline'}
                onClick={() => setChannel('phone')}
              >
                Phone OTP
              </Button>
            </div>
            <Input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={channel === 'email' ? 'you@mantraglobaledu.com' : '+91 98765 43210'}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : <>Send Verification Code <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerify} className="space-y-4">
            {info && <p className="text-sm text-emerald-700">{info}</p>}
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              inputMode="numeric"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleReset} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Reset Password'}
            </Button>
          </form>
        )}

        {step === 'done' && (
          <div className="space-y-4 text-center">
            <p className="text-sm text-emerald-700">Your password has been updated successfully.</p>
            <Button asChild className="w-full">
              <Link href={loginHref}>Back to Login</Link>
            </Button>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}

        {step !== 'done' && (
          <Link href={loginHref} className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:text-accent">
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen mesh-hero" />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
