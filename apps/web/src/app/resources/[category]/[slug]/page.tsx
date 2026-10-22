import Link from 'next/link';
import { notFound } from 'next/navigation';
import { APP_CONFIG } from '@mge/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { CounsellingCta, PolicyNotice, SourceList, formatLongDate } from '@/components/content/blocks';
import { ARTICLES, articlePath, getArticle, getResourceCategory } from '@/data/articles';
import { getCountryGuide } from '@/data/country-guides';
import { getServicePage } from '@/data/services';
import { articleSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.category !== category) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: articlePath(article),
    ogType: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categoryId, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.category !== categoryId) notFound();
  const category = getResourceCategory(article.category)!;
  const path = articlePath(article);
  const countries = article.relatedCountries.map(getCountryGuide).filter((g) => g !== null);
  const services = article.relatedServices.map(getServicePage).filter((s) => s !== null);
  const more = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-28">
        <JsonLd
          data={articleSchema({
            title: article.title,
            description: article.description,
            path,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            authorName: article.author,
          })}
        />
        <article className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'Resources', path: '/resources' },
                { name: category.title, path: `/resources/${category.id}` },
                { name: article.title, path },
              ]}
            />
            <header className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8a5f00]">{category.title}</p>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-primary leading-tight">{article.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{article.description}</p>
              <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground border-y border-border py-3">
                <div className="flex gap-1.5">
                  <dt>Written by</dt>
                  <dd className="font-medium text-primary">{article.author}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Published</dt>
                  <dd><time dateTime={article.publishedAt}>{formatLongDate(article.publishedAt)}</time></dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Last updated</dt>
                  <dd><time dateTime={article.updatedAt}>{formatLongDate(article.updatedAt)}</time></dd>
                </div>
                <div>{article.readingMinutes} min read</div>
              </dl>
            </header>

            <div className="mt-8 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl font-bold text-primary">{section.heading}</h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p} className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                  {section.list && (
                    <ul className="mt-4 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                          <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <PolicyNotice className="mt-10" />
            {article.sources && <div className="mt-6"><SourceList sources={article.sources} /></div>}

            <p className="mt-6 text-sm text-muted-foreground">
              This guide is general information from {APP_CONFIG.name} and is not legal, immigration or financial advice.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {countries.length > 0 && (
                <div className="premium-card p-5">
                  <h2 className="font-semibold text-primary">Destination guides</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {countries.map((guide) => (
                      <li key={guide.slug}>
                        <Link href={`/countries/${guide.slug}`} className="text-primary underline-offset-4 hover:underline">
                          Study in {guide.inName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {services.length > 0 && (
                <div className="premium-card p-5">
                  <h2 className="font-semibold text-primary">How we can help</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link href={`/services/${service.slug}`} className="text-primary underline-offset-4 hover:underline">
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {more.length > 0 && (
              <nav aria-label="More guides" className="mt-10">
                <h2 className="font-semibold text-primary">More {category.title.toLowerCase()}</h2>
                <ul className="mt-3 space-y-2">
                  {more.map((a) => (
                    <li key={a.slug}>
                      <Link href={articlePath(a)} className="text-primary underline-offset-4 hover:underline">{a.title}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </article>
        <CounsellingCta location={`article_${article.slug}`} />
      </main>
      <Footer />
    </>
  );
}
