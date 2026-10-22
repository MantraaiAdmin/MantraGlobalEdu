'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { BUSINESS_CONTACT, ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { contactEnquirySchema } from '@/lib/counselling-form';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const TOPICS = [
  { value: 'general', label: 'General enquiry' },
  { value: 'counselling', label: 'Counselling' },
  { value: 'partnership', label: 'Partnership' },
] as const;

type Topic = (typeof TOPICS)[number]['value'];
type FieldName = 'name' | 'email' | 'phone' | 'message' | 'privacyConsent';

const inputClass =
  'mt-1.5 block w-full rounded-lg border border-input bg-white px-3 py-2.5 text-base sm:text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 aria-[invalid=true]:border-red-600';

export function ContactForm() {
  const searchParams = useSearchParams();
  const initial = searchParams.get('type');
  const [topic, setTopic] = useState<Topic>(initial === 'partnership' || initial === 'counselling' || initial === 'counseling' ? (initial === 'partnership' ? 'partnership' : 'counselling') : 'general');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [serverError, setServerError] = useState('');
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError('');
    const data = new FormData(event.currentTarget);
    const subjectPrefix = TOPICS.find((t) => t.value === topic)?.label ?? 'General enquiry';
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      subject: String(data.get('subject') ?? '').trim() ? `${subjectPrefix}: ${String(data.get('subject')).trim()}` : subjectPrefix,
      message: String(data.get('message') ?? ''),
      privacyConsent: data.get('privacyConsent') === 'on',
    };
    const result = contactEnquirySchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message])) as Partial<Record<FieldName, string>>;
      setErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus('submitting');
    try {
      const response = await fetch('/api/v1/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, website: String(data.get('website') ?? ''), startedAt: startedAt.current }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        throw new Error(json.error || 'Request failed');
      }
      trackEvent(topic === 'partnership' ? 'partner_enquiry' : 'contact_form_submit', { topic });
      setStatus('success');
    } catch (error) {
      setStatus('idle');
      setServerError(error instanceof Error && error.message !== 'Request failed' ? error.message : 'We could not send your message right now.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <h2 className="text-xl font-semibold text-primary">Thank you — your message has been sent</h2>
        <p className="mt-2 text-muted-foreground">We will reply by email or phone.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      <fieldset>
        <legend className="text-sm font-medium text-primary">What is your enquiry about?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label key={t.value} className="cursor-pointer rounded-lg border border-input px-4 py-2 text-sm text-primary has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2">
              <input type="radio" name="topic" value={t.value} checked={topic === t.value} onChange={() => setTopic(t.value)} className="sr-only" />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      {topic === 'counselling' && (
        <p className="rounded-xl bg-accent/10 border border-accent/20 p-4 text-sm text-primary">
          For the quickest response, use our{' '}
          <Link href={ROUTES.bookCounseling} className="font-semibold underline">counselling booking form</Link>.
        </p>
      )}

      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-primary">Name <span className="text-red-700">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
          {errors.name && <p id="contact-name-error" className="mt-1 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-primary">Phone <span className="font-normal text-muted-foreground">(optional)</span></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} />
          {errors.phone && <p id="contact-phone-error" className="mt-1 text-sm text-red-700">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-primary">Email <span className="text-red-700">*</span></label>
        <input id="contact-email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
        {errors.email && <p id="contact-email-error" className="mt-1 text-sm text-red-700">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-primary">Subject <span className="font-normal text-muted-foreground">(optional)</span></label>
        <input id="contact-subject" name="subject" className={inputClass} />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-primary">Message <span className="text-red-700">*</span></label>
        <textarea id="contact-message" name="message" rows={5} className={cn(inputClass, 'min-h-[120px]')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
        {errors.message && <p id="contact-message-error" className="mt-1 text-sm text-red-700">{errors.message}</p>}
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-primary">
          <input type="checkbox" name="privacyConsent" className="mt-1 h-4 w-4" aria-invalid={!!errors.privacyConsent} aria-describedby={errors.privacyConsent ? 'contact-consent-error' : undefined} />
          <span>
            I agree that Mantra Global Education may use these details to reply to my message, as described in the{' '}
            <Link href="/privacy-policy" className="font-semibold underline underline-offset-2">privacy policy</Link>. <span className="text-red-700">*</span>
          </span>
        </label>
        {errors.privacyConsent && <p id="contact-consent-error" className="mt-1 text-sm text-red-700">{errors.privacyConsent}</p>}
      </div>
      {serverError && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {serverError} You can also call <a href={BUSINESS_CONTACT.phoneHref} className="font-semibold underline">{BUSINESS_CONTACT.phoneDisplay}</a>.
        </p>
      )}
      <Button type="submit" className="w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
