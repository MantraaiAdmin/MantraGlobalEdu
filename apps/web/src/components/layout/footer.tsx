import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { APP_CONFIG, NAVIGATION } from '@mge/config';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { NavLink } from '@/components/common/nav-link';

export function Footer() {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(42_80%_44%/0.14),transparent_50%)]" />
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl section-padding pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 mb-12 border-b border-white/10">
          <div>
            <h3 className="font-display text-2xl font-bold">Start your study abroad journey today</h3>
            <p className="mt-2 text-white/60 text-sm">Free counseling session with expert advisors</p>
          </div>
          <Button variant="accent" size="lg" asChild>
            <Link href="/book-counseling">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo size="md" href="/" inverted />
            </div>
            <p className="text-accent/90 text-xs font-semibold uppercase tracking-widest mb-3">
              {APP_CONFIG.tagline}
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              {APP_CONFIG.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-white/40">Explore</h4>
            <ul className="space-y-3">
              {NAVIGATION.public.slice(1, 6).map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className="text-sm text-white/65 hover:text-accent transition-colors duration-200">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-white/40">Services</h4>
            <ul className="space-y-3">
              {['Study Abroad Counseling', 'University Admissions', 'Scholarship Assistance', 'Visa Documentation'].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-white/65 hover:text-accent transition-colors duration-200">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-white/40">Contact</h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="hover:text-white transition-colors">{APP_CONFIG.supportEmail}</li>
              <li className="hover:text-white transition-colors">{APP_CONFIG.supportPhone}</li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">Get in Touch</Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-accent transition-colors">Partner With Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/login/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
