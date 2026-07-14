'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { useArticles } from '@/hooks/use-api';
import { formatDate } from '@mge/utils';
import { Loader2 } from 'lucide-react';
import { RESOURCE_CATEGORIES } from '@mge/config';

export default function ResourcesPage() {
  const [category, setCategory] = useState<string | undefined>();
  const { data: articles, isLoading, isError } = useArticles(category);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Knowledge Centre"
          title="Resources & Guides"
          description="Guides, visa updates, scholarship news, and career articles to support your journey."
        />

        <section className="section-padding">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setCategory(undefined)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-primary text-white' : 'bg-muted text-primary hover:bg-primary/10'}`}
              >
                All
              </button>
              {RESOURCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.id ? 'bg-primary text-white' : 'bg-muted text-primary hover:bg-primary/10'}`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {isLoading && <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {isError && <p className="text-center text-red-600">Failed to load articles.</p>}

            {articles && (
              <div className="space-y-4">
                {articles.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No articles in this category yet.</p>
                ) : (
                  articles.map((article) => (
                    <Link key={article.id} href={`/resources/${article.slug}`}>
                      <div className="premium-card p-6 flex justify-between items-center hover:cursor-pointer">
                        <div>
                          <h3 className="font-semibold text-primary">{article.title}</h3>
                          {article.excerpt && <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>}
                          <p className="text-xs text-muted-foreground mt-2">
                            {article.publishedAt ? formatDate(article.publishedAt) : ''}
                            {article.author && ` · ${article.author}`}
                          </p>
                        </div>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full capitalize shrink-0 ml-4">
                          {article.category}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
