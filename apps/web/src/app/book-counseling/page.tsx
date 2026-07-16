'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CONTACT, DESTINATIONS, FOUNDER } from '@mge/config';
import { bookCounseling } from '@/services/api.service';

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

export default function BookCounselingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    countryOfInterest: '',
    message: '',
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const preferredDate = form.date
        ? new Date(`${form.date}T${form.time || '10:00'}`).toISOString()
        : undefined;
      await bookCounseling({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredDate,
        countryOfInterest: form.countryOfInterest || undefined,
        message: form.time
          ? `Preferred time: ${form.time}. ${form.message || ''}`.trim()
          : form.message || undefined,
      });
      setSubmitted(true);
    } catch {
      setError('Unable to book right now. Please try WhatsApp or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-background pt-24 pb-24 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
                <Calendar className="h-3.5 w-3.5" />
                Free Counseling
              </span>
              <h1 className="font-display text-4xl font-bold text-primary leading-tight">
                Book your session with{' '}
                <span className="text-gradient">{FOUNDER.name}</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Get personalised guidance for your target country — university shortlisting,
                applications, scholarships, and visa planning. Sessions are free and conducted
                online or in-office.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  '45-minute personalised consultation',
                  'University & course shortlist recommendations',
                  'Scholarship and budget planning',
                  'Clear next-step roadmap',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4 text-sm">
                <a href={`tel:${CONTACT.supportPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-primary hover:text-accent">
                  <Phone className="h-4 w-4" /> {CONTACT.supportPhone}
                </a>
                <a href={`mailto:${CONTACT.supportEmail}`} className="flex items-center gap-2 text-primary hover:text-accent">
                  <Mail className="h-4 w-4" /> {CONTACT.supportEmail}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="premium-card p-6 sm:p-8"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-14 w-14 text-success mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold text-primary">Session Booked!</h2>
                  <p className="mt-3 text-muted-foreground">
                    Our team will confirm your counseling slot within 24 hours via email or phone.
                  </p>
                  <Button className="mt-6" asChild>
                    <Link href="/profile-check">Check Your Profile Fit <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-semibold text-primary text-lg mb-2">Choose your preferred slot</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone *</label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email *</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Preferred Date *</label>
                      <Input type="date" min={minDateStr} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Preferred Time *</label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                        required
                      >
                        <option value="">Select time</option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country of Interest</label>
                    <select
                      value={form.countryOfInterest}
                      onChange={(e) => setForm({ ...form, countryOfInterest: e.target.value })}
                      className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Select destination</option>
                      {DESTINATIONS.map((d) => (
                        <option key={d.code} value={d.name}>{d.flag} {d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Anything we should know?</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1 flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                      placeholder="Target course, intake, current academics..."
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <Button type="submit" variant="accent" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Booking...' : <>Confirm Free Counseling <ArrowRight className="h-4 w-4" /></>}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
