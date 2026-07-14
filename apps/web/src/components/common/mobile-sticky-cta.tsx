'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, MessageCircle, ClipboardList } from 'lucide-react';
import { CONTACT, ROUTES } from '@mge/config';
import { useShortlistCount } from '@/hooks/use-auth';

const HIDDEN_PREFIXES = ['/portal', '/login'];

export function MobileStickyCta() {
  const pathname = usePathname();
  const shortlistCount = useShortlistCount();

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-border/60 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,35,78,0.08)]">
      <div className="flex items-center gap-2 px-3 py-2.5 max-w-lg mx-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white py-3 text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          href={ROUTES.bookCounseling}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-white py-3 text-sm font-semibold"
        >
          <Calendar className="h-4 w-4" />
          Book Free
        </Link>
        <Link
          href={ROUTES.shortlist}
          className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-primary shrink-0"
          aria-label="View shortlist"
        >
          <ClipboardList className="h-5 w-5" />
          {shortlistCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              {shortlistCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
