import { BadgeCheck, Globe, GraduationCap, Laptop, MapPin, MessageSquare } from 'lucide-react';
import { CATALOG_COUNTS } from '@/lib/catalog';

/**
 * Trust strip built only from verifiable facts: what the service is, how it is
 * delivered and what is in the site's own course database. Unverified business
 * statistics (students guided, success rates, partner counts) are deliberately
 * not shown — see BUSINESS_STATS in @mge/config.
 */
const ITEMS = [
  { icon: MessageSquare, title: 'Free first session', detail: 'No-obligation counselling' },
  { icon: BadgeCheck, title: 'Founder-led guidance', detail: 'Personal, one-to-one advice' },
  { icon: MapPin, title: 'Coimbatore & online', detail: 'Counselling across India' },
  {
    icon: GraduationCap,
    title: `${CATALOG_COUNTS.courses} courses listed`,
    detail: `Across ${CATALOG_COUNTS.universities} universities in our course finder`,
  },
  { icon: Globe, title: `${CATALOG_COUNTS.countries} destinations`, detail: 'In our course finder' },
  { icon: Laptop, title: 'Mantra.Ai portfolio support', detail: 'Tech projects & profile building' },
];

export function TrustMetrics() {
  return (
    <section aria-label="Why students contact us" className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_78%_52%/0.12),transparent_70%)]" aria-hidden="true" />
      <ul className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {ITEMS.map((item) => (
          <li key={item.title} className="text-center px-2">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
              <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-xs text-white/70 leading-snug">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
