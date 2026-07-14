'use client';

import { use } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { fetchArticles } from '@/services/api.service';
import { formatDate } from '@mge/utils';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => fetchArticles(),
  });

  const article = articles?.find((a) => a.slug === slug);

  return (
    <>
      <Header />
      <main className="pt-24">
        {isLoading && <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {!isLoading && !article && (
          <div className="text-center py-32">
            <h1 className="text-2xl font-bold">Article not found</h1>
            <Button className="mt-4" asChild><Link href="/resources">Back to Resources</Link></Button>
          </div>
        )}
        {article && (
          <article className="section-padding">
            <div className="mx-auto max-w-3xl">
              <Link href="/resources" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="h-4 w-4" /> Resources
              </Link>
              <span className="inline-block text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full capitalize mb-4">
                {article.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">{article.title}</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                {article.publishedAt && formatDate(article.publishedAt)}
                {article.author && ` · By ${article.author}`}
              </p>
              {article.excerpt && (
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed border-l-4 border-accent pl-4">
                  {article.excerpt}
                </p>
              )}
              <div className="mt-8 prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {article.content}
              </div>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}
