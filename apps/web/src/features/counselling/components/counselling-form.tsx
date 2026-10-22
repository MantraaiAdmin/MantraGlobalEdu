'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONTACT } from '@mge/config';
import { Button } from '@/components/ui/button';
import {
  COUNSELLING_MODES,
  COUNTRY_OPTIONS,
  ENGLISH_TEST_STATUSES,
  FUNDING_PREFERENCES,
  STUDY_LEVELS,
  counsellingEnquirySchema,
  upcomingIntakes,
} from '@/lib/counselling-form';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type FieldName =
  | 'name' | 'phone' | 'email' | 'mode' | 'country' | 'studyLevel' | 'intake' | 'privacyConsent'
  | 'marketingConsent' | 'qualification' | 'academicResult' | 'englishTest' | 'funding' | 'preferredDate' | 'message';

const inputClass =
  'mt-1.5 block w-full rounded-lg border border-input bg-white px-3 py-2.5 text-base sm:text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 aria-[invalid=true]:border-red-600';

function Field({
  id, label, required, error, hint, children,
}: {
  id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
        {required ? <span className="text-red-700"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export function CounsellingForm({ defaultCountry }: { defaultCountry?: string }) {
  const intakes = useMemo(() => upcomingIntakes(), []);
  const startedAt = useRef<number>(Date.now());
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    startedAt.current = Date.now();
    trackEvent('counselling_form_start');
  };

  const describedBy = (id: FieldName, hasHint = false) =>
    errors[id] ? `${id}-error` : hasHint ? `${id}-hint` : undefined;

  const focusFirstError = (fieldErrors: Partial<Record<FieldName, string>>) => {
    const first = Object.keys(fieldErrors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError('');
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      mode: String(data.get('mode') ?? ''),
      country: String(data.get('country') ?? ''),
      studyLevel: String(data.get('studyLevel') ?? ''),
      intake: String(data.get('intake') ?? ''),
      privacyConsent: data.get('privacyConsent') === 'on',
      marketingConsent: data.get('marketingConsent') === 'on',
      qualification: String(data.get('qualification') ?? ''),
      academicResult: String(data.get('academicResult') ?? ''),
      englishTest: String(data.get('englishTest') ?? ''),
      funding: String(data.get('funding') ?? ''),
      preferredDate: String(data.get('preferredDate') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const result = counsellingEnquirySchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message])) as Partial<Record<FieldName, string>>;
      setErrors(fieldErrors);
      focusFirstError(fieldErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/v1/public/counseling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, website: String(data.get('website') ?? ''), startedAt: startedAt.current }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (json.fieldErrors) {
          setErrors(json.fieldErrors);
          focusFirstError(json.fieldErrors);
        }
        throw new Error(json.error || 'Request failed');
      }
      trackEvent('counselling_form_submit', { country: result.data.country, study_level: result.data.studyLevel });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setServerError(
        error instanceof Error && error.message !== 'Request failed' && !error.message.includes('fetch')
          ? error.message
          : 'We could not send your request right now.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <CheckCircle2 className="h-14 w-14 text-success mx-auto mb-4" aria-hidden="true" />
        <h2 className="font-display text-2xl font-bold text-primary">Thank you — we have your request</h2>
        <p className="mt-3 text-muted-foreground">
          Our team will contact you by phone or email to arrange your free counselling session.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Need to talk sooner? Call{' '}
          <a href={BUSINESS_CONTACT.phoneHref} className="font-semibold text-primary underline">{BUSINESS_CONTACT.phoneDisplay}</a>.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/resources">Read our study abroad guides <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} onInput={onFirstInput} noValidate className="space-y-5">
      <h2 className="font-semibold text-primary text-lg">Request your free counselling session</h2>
      <p className="text-sm text-muted-foreground">Fields marked * are required. We only ask for what we need to prepare for your session.</p>

      {/* Honeypot: hidden from people, often filled by bots */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="name" label="Full name" required error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} />
        </Field>
        <Field id="phone" label="Phone" required error={errors.phone} hint="Include country code if outside India">
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={describedBy('phone', true)} />
        </Field>
      </div>

      <Field id="email" label="Email" required error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={describedBy('email')} />
      </Field>

      <fieldset>
        <legend className="text-sm font-medium text-primary">
          Preferred counselling mode <span className="text-red-700">*</span>
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {COUNSELLING_MODES.map((mode) => (
            <label key={mode.value} className="flex items-start gap-2 rounded-lg border border-input p-3 text-sm text-primary cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input type="radio" name="mode" value={mode.value} className="mt-0.5" aria-describedby={describedBy('mode')} defaultChecked={mode.value === 'online'} />
              {mode.label}
            </label>
          ))}
        </div>
        {errors.mode && <p id="mode-error" className="mt-1 text-sm text-red-700">{errors.mode}</p>}
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field id="country" label="Country or region of interest" required error={errors.country}>
          <select id="country" name="country" defaultValue={defaultCountry ?? ''} className={inputClass} aria-invalid={!!errors.country} aria-describedby={describedBy('country')}>
            <option value="">Select</option>
            {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field id="studyLevel" label="Intended study level" required error={errors.studyLevel}>
          <select id="studyLevel" name="studyLevel" defaultValue="" className={inputClass} aria-invalid={!!errors.studyLevel} aria-describedby={describedBy('studyLevel')}>
            <option value="">Select</option>
            {STUDY_LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </Field>
        <Field id="intake" label="Intended intake" required error={errors.intake}>
          <select id="intake" name="intake" defaultValue="" className={inputClass} aria-invalid={!!errors.intake} aria-describedby={describedBy('intake')}>
            <option value="">Select</option>
            {intakes.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </Field>
      </div>

      <details className="rounded-xl border border-border p-4 group">
        <summary className="cursor-pointer text-sm font-semibold text-primary">Add more details (optional)</summary>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="qualification" label="Current or highest qualification" error={errors.qualification}>
              <input id="qualification" name="qualification" placeholder="e.g. B.E. Mechanical, final year" className={inputClass} />
            </Field>
            <Field id="academicResult" label="Academic result" error={errors.academicResult}>
              <input id="academicResult" name="academicResult" placeholder="e.g. 8.1 CGPA or 78%" className={inputClass} />
            </Field>
            <Field id="englishTest" label="English test status" error={errors.englishTest}>
              <select id="englishTest" name="englishTest" defaultValue="" className={inputClass}>
                {ENGLISH_TEST_STATUSES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field id="funding" label="Funding preference" error={errors.funding}>
              <select id="funding" name="funding" defaultValue="" className={inputClass}>
                {FUNDING_PREFERENCES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field id="preferredDate" label="Preferred date for the session" error={errors.preferredDate}>
              <input id="preferredDate" name="preferredDate" type="date" className={inputClass} />
            </Field>
          </div>
          <Field id="message" label="Anything else we should know?" error={errors.message}>
            <textarea id="message" name="message" rows={3} className={cn(inputClass, 'min-h-[90px]')} />
          </Field>
        </div>
      </details>

      <div className="space-y-3">
        <div>
          <label className="flex items-start gap-3 text-sm text-primary">
            <input type="checkbox" name="privacyConsent" className="mt-1 h-4 w-4" aria-invalid={!!errors.privacyConsent} aria-describedby={describedBy('privacyConsent')} />
            <span>
              I agree that Mantra Global Education may use these details to contact me about my enquiry, as described in the{' '}
              <Link href="/privacy-policy" className="font-semibold underline underline-offset-2">privacy policy</Link>. <span className="text-red-700">*</span>
            </span>
          </label>
          {errors.privacyConsent && <p id="privacyConsent-error" className="mt-1 text-sm text-red-700">{errors.privacyConsent}</p>}
        </div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" name="marketingConsent" className="mt-1 h-4 w-4" />
          <span>Send me occasional updates about study abroad events and guides (optional).</span>
        </label>
      </div>

      {serverError && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {serverError} Please try again, or call{' '}
          <a href={BUSINESS_CONTACT.phoneHref} className="font-semibold underline">{BUSINESS_CONTACT.phoneDisplay}</a> or email{' '}
          <a href={BUSINESS_CONTACT.emailHref} className="font-semibold underline break-all">{BUSINESS_CONTACT.email}</a>.
        </p>
      )}

      <Button type="submit" variant="accent" className="w-full" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : <>Book Free Counselling <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
      </Button>
      <p className="text-xs text-muted-foreground">
        Please do not send passport, Aadhaar, bank or other sensitive documents through this form.
      </p>
    </form>
  );
}
