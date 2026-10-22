import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { getIndexablePages, type SitePage } from '@/lib/site-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Site Map | Mantra Global Education',
  description: 'A list of all main pages on the Mantra Global Education website, grouped by section.',
  path: '/sitemap',
});

const GROUP_ORDER: SitePage['group'][] = ['Main', 'Destinations', 'Services', 'Resources', 'Tools', 'Company', 'Legal'];

export default function HtmlSitemapPage() {
  const pages = getIndexablePages();
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Site Map"
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Site Map', path: '/sitemap' },
          ]}
        />
        <section className="section-padding">
          <div className="mx-auto max-w-5xl grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {GROUP_ORDER.map((group) => (
              <div key={group}>
                <h2 className="font-display text-xl font-bold text-primary">{group}</h2>
                <ul className="mt-3 space-y-2">
                  {pages
                    .filter((page) => page.group === group)
                    .map((page) => (
                      <li key={page.path}>
                        <Link href={page.path} className="text-sm text-primary underline-offset-4 hover:underline">
                          {page.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
