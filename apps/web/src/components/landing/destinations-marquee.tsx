import Link from 'next/link';
import { DESTINATIONS } from '@mge/config';
import { COUNTRY_GUIDES } from '@/data/country-guides';

const GUIDE_SLUGS = new Set(COUNTRY_GUIDES.map((g) => g.slug));

function Item({ slug, flag, name, hidden }: { slug: string; flag: string; name: string; hidden?: boolean }) {
  const className =
    'mx-2 inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:border-accent/40';
  return (
    <li>
      <Link href={`/countries/${slug}`} className={className} tabIndex={hidden ? -1 : undefined}>
        <span aria-hidden="true">{flag}</span> {name}
      </Link>
    </li>
  );
}

/**
 * Continuously scrolling strip of study destinations (pauses on hover/focus).
 * The list is rendered twice for a seamless loop; the copy is hidden from
 * assistive technology and keyboard focus.
 */
export function DestinationsMarquee() {
  const items = [
    ...DESTINATIONS.filter((d) => GUIDE_SLUGS.has(d.slug)),
    ...DESTINATIONS.filter((d) => !GUIDE_SLUGS.has(d.slug)),
  ];
  return (
    <section aria-label="Study destinations" className="border-b border-border/60 bg-muted/30 py-5">
      <div className="motion-marquee">
        <div className="motion-marquee__track">
          <ul className="flex">
            {items.map((d) => <Item key={d.code} slug={d.slug} flag={d.flag} name={d.name} />)}
          </ul>
          <ul className="flex" aria-hidden="true">
            {items.map((d) => <Item key={`${d.code}-copy`} slug={d.slug} flag={d.flag} name={d.name} hidden />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
