import { Suspense } from 'react';
import Link from 'next/link';
import { Calendar, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_CONTACT, FOUNDER, ROUTES } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/features/counselling/components/contact-form';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Mantra Global Education | Study Abroad Counselling',
  description:
    'Contact Mantra Global Education by phone on +91 99401 13077 or email vinodhini@mantraglobaledu.com for study abroad counselling, applications and partnership enquiries.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
            <h1 className="mt-6 font-display text-3xl sm:text-4xl font-bold text-primary">Contact Mantra Global Education</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Questions about studying abroad, our services or partnerships? Call, email or send us a message.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="premium-card p-6">
                <h2 className="font-semibold text-primary">Contact details</h2>
                <ul className="mt-4 space-y-4 text-sm">
                  <li>
                    <a href={BUSINESS_CONTACT.phoneHref} data-track-location="contact_page" className="flex items-center gap-3 font-semibold text-primary hover:text-accent">
                      <Phone className="h-5 w-5 text-accent" aria-hidden="true" /> {BUSINESS_CONTACT.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={BUSINESS_CONTACT.emailHref} data-track-location="contact_page" className="flex items-center gap-3 font-semibold text-primary hover:text-accent break-all">
                      <Mail className="h-5 w-5 text-accent shrink-0" aria-hidden="true" /> {BUSINESS_CONTACT.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-primary">
                    <MapPin className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                    <span>
                      {BUSINESS_CONTACT.city}, {BUSINESS_CONTACT.region}, India
                      <span className="block text-muted-foreground">Online counselling available across India</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="premium-card p-6 bg-primary text-white">
                <Calendar className="h-6 w-6 text-accent mb-3" aria-hidden="true" />
                <h2 className="font-semibold">Book free counselling</h2>
                <p className="text-sm text-white/80 mt-2">Request a session with {FOUNDER.name} and the team.</p>
                <Button variant="accent" className="mt-4 w-full" asChild>
                  <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="contact_page">Book now</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3 premium-card p-5 sm:p-6 relative">
              <h2 className="font-semibold text-primary text-lg mb-4">Send us a message</h2>
              <Suspense>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
