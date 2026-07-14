'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { APP_CONFIG, CONTACT, ROUTES, FOUNDER } from '@mge/config';
import { submitContact } from '@/services/api.service';
import { Phone, Mail, MessageCircle, Calendar, MapPin } from 'lucide-react';

function ContactForm() {
  const searchParams = useSearchParams();
  const defaultType = searchParams.get('type') || 'general';
  const [tab, setTab] = useState<'general' | 'counseling' | 'partnership'>(defaultType === 'counseling' ? 'counseling' : defaultType === 'partnership' ? 'partnership' : 'general');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  useEffect(() => {
    if (defaultType === 'counseling') setTab('counseling');
    if (defaultType === 'partnership') setTab('partnership');
  }, [defaultType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await submitContact({
        ...form,
        subject: form.subject || (tab === 'counseling' ? 'Counseling Inquiry' : tab === 'partnership' ? 'Partnership Inquiry' : 'General Inquiry'),
      });
      setSubmitted(true);
    } catch {
      setError('Failed to send message. Please try WhatsApp or call us.');
    }
  };

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <>
      <section className="relative pt-28 pb-12 overflow-hidden bg-background">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-bold text-primary">Contact {APP_CONFIG.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Questions about USA, UK, or Australia? Reach our team — we respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="premium-card p-6">
                <h3 className="font-semibold text-primary">Quick Connect</h3>
                <div className="mt-4 space-y-3">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-primary hover:text-accent">
                    <MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp Us
                  </a>
                  <a href={`tel:${CONTACT.supportPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-primary hover:text-accent">
                    <Phone className="h-5 w-5 text-accent" /> {CONTACT.supportPhone}
                  </a>
                  <a href={`mailto:${CONTACT.supportEmail}`} className="flex items-center gap-3 text-sm text-primary hover:text-accent">
                    <Mail className="h-5 w-5 text-accent" /> {CONTACT.supportEmail}
                  </a>
                </div>
              </div>
              <div className="premium-card p-6 bg-primary text-white">
                <Calendar className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-semibold">Book Free Counseling</h3>
                <p className="text-sm text-white/70 mt-2">Schedule a session with {FOUNDER.name} and the {APP_CONFIG.shortName} team.</p>
                <Button variant="accent" className="mt-4 w-full" asChild>
                  <Link href={ROUTES.bookCounseling}>Book Now</Link>
                </Button>
              </div>
              <div className="premium-card p-6">
                <MapPin className="h-5 w-5 text-accent mb-2" />
                <p className="text-sm text-muted-foreground">{APP_CONFIG.name} — Online & in-person counseling available.</p>
              </div>
            </div>

            <div className="lg:col-span-3 premium-card p-6">
              <div className="flex gap-2 mb-6">
                {(['general', 'counseling', 'partnership'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-primary'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {tab === 'counseling' && (
                <div className="mb-4 p-4 rounded-xl bg-accent/10 border border-accent/20 text-sm text-primary">
                  For fastest booking, use our <Link href={ROUTES.bookCounseling} className="text-accent font-semibold hover:underline">counseling scheduler</Link> to pick a date and time.
                </div>
              )}

              {submitted ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold text-primary">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">We&apos;ll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name *</label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email *</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1" placeholder={tab === 'counseling' ? 'Counseling for USA Masters' : ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1 flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[120px]"
                      required
                      minLength={10}
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense>
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
