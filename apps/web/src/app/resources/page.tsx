import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { CounsellingCta, SectionHeading } from '@/components/content/blocks';
import { ARTICLES, RESOURCE_CATEGORY_PAGES, articlePath, getArticlesByCategory } from '@/data/articles';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Resources & Guides | Mantra Global Education',
  description:
    'Practical study abroad guides for Indian students: choosing a country, shortlisting universities, SOPs and LORs, scholarships, student visa documents and career planning.',
  path: '/resources',
});

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Knowledge Centre"
          title="Study Abroad Resources and Guides"
          description="Clear, practical guides to help students and parents plan each step of studying abroad."
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Resources', path: '/resources' },
          ]}
        />

        <section className="section-padding">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Browse by topic" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RESOURCE_CATEGORY_PAGES.map((category) => {
                const count = getArticlesByCategory(category.id).length;
                return (
                  <li key={category.id}>
                    <Link href={`/resources/${category.id}`} className="premium-card group block h-full p-6">
                      <h2 className="text-lg font-semibold text-primary group-hover:underline underline-offset-4">{category.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                      <p className="mt-3 text-xs font-semibold text-[#8a5f00]">
                        {count} {count === 1 ? 'guide' : 'guides'}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <SectionHeading title="All guides" />
            <ul className="space-y-4">
              {ARTICLES.map((article) => (
                <li key={article.slug}>
                  <Link href={articlePath(article)} className="premium-card group flex items-start justify-between gap-4 p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#8a5f00]">
                        {RESOURCE_CATEGORY_PAGES.find((c) => c.id === article.category)?.title}
                      </p>
                      <h3 className="mt-1 font-semibold text-primary group-hover:underline underline-offset-4">{article.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{article.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground mt-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CounsellingCta location="resources_hub" />
      </main>
      <Footer />
    </>
  );
}
