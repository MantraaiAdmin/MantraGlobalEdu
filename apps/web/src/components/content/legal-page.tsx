import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { BulletList, formatLongDate } from '@/components/content/blocks';
import { getLegalPage } from '@/data/legal';
import { pageMetadata } from '@/lib/seo';

export function legalMetadata(slug: string) {
  const page = getLegalPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.seoTitle, description: page.description, path: `/${page.slug}` });
}

export function LegalPageView({ slug }: { slug: string }) {
  const page = getLegalPage(slug);
  if (!page) notFound();
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={page.title}
          description={page.description}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: page.title, path: `/${page.slug}` },
          ]}
        />
        <section className="section-padding">
          <div className="mx-auto max-w-3xl space-y-10">
            <p className="text-sm text-muted-foreground">
              Last updated: <time dateTime={page.updated}>{formatLongDate(page.updated)}</time>
            </p>
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-bold text-primary">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 text-muted-foreground leading-relaxed">{p}</p>
                ))}
                {section.list && <BulletList items={section.list} className="mt-4" />}
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
