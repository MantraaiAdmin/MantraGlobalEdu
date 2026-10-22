import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { CounsellingCta } from '@/components/content/blocks';
import {
  RESOURCE_CATEGORY_PAGES, articlePath, getArticlesByCategory, getResourceCategory,
} from '@/data/articles';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCE_CATEGORY_PAGES.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: id } = await params;
  const category = getResourceCategory(id);
  if (!category) return {};
  return pageMetadata({ title: category.seoTitle, description: category.description, path: `/resources/${category.id}` });
}

export default async function ResourceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: id } = await params;
  const category = getResourceCategory(id);
  if (!category) notFound();
  const articles = getArticlesByCategory(category.id);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Resources"
          title={category.title}
          description={category.description}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Resources', path: '/resources' },
            { name: category.title, path: `/resources/${category.id}` },
          ]}
        />
        <section className="section-padding">
          <div className="mx-auto max-w-4xl">
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link href={articlePath(article)} className="premium-card group flex items-start justify-between gap-4 p-6">
                    <div>
                      <h2 className="font-semibold text-lg text-primary group-hover:underline underline-offset-4">{article.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{article.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{article.readingMinutes} min read</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground mt-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <nav aria-label="Other topics" className="mt-12">
              <h2 className="font-semibold text-primary">Other topics</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {RESOURCE_CATEGORY_PAGES.filter((c) => c.id !== category.id).map((c) => (
                  <li key={c.id}>
                    <Link href={`/resources/${c.id}`} className="inline-block rounded-full border border-primary/15 px-4 py-1.5 text-sm text-primary hover:border-accent/40">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
        <CounsellingCta location={`resources_${category.id}`} />
      </main>
      <Footer />
    </>
  );
}
