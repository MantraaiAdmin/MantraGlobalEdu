import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { JsonLd } from '@/components/seo/json-ld';
import { BulletList, CounsellingCta, FaqList, PolicyNotice, SectionHeading } from '@/components/content/blocks';
import { SERVICE_PAGES, getServicePage } from '@/data/services';
import { getCountryGuide } from '@/data/country-guides';
import { getArticle, articlePath } from '@/data/articles';
import { pageMetadata, serviceSchema } from '@/lib/seo';
import { reveal } from '@/lib/motion';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.metaDescription, path: `/services/${service.slug}` });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const countries = service.countries.map(getCountryGuide).filter((g) => g !== null);
  const related = service.related.map(getServicePage).filter((s) => s !== null);
  const articles = service.relatedArticles.map(getArticle).filter((a) => a !== null);

  return (
    <>
      <Header />
      <main id="main-content">
        <JsonLd data={serviceSchema({ name: service.name, description: service.metaDescription, path })} />
        <PageHero
          eyebrow="Service"
          title={service.h1}
          description={service.summary}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path },
          ]}
        />

        <section className="section-padding">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                {service.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div>
                <SectionHeading title="Who this service is for" className="mb-5" />
                <BulletList items={service.whoFor} />
              </div>

              <div>
                <SectionHeading title="What we provide" className="mb-5" />
                <BulletList items={service.whatWeProvide} />
              </div>

              <div>
                <SectionHeading title="What we do not guarantee" className="mb-5" />
                <PolicyNotice text={service.notGuaranteed} />
              </div>

              <div>
                <SectionHeading title="How it works" className="mb-5" />
                <ol className="grid gap-4 sm:grid-cols-2">
                  {service.process.map((step, index) => (
                    <li key={step.title} {...reveal('fade-up', index * 80)} className="premium-card p-5">
                      <span className="text-sm font-bold text-[#8a5f00]">Step {index + 1}</span>
                      <h3 className="mt-1 font-semibold text-primary">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <SectionHeading title="Common questions" className="mb-5" />
                <FaqList items={service.faqs} />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 self-start">
              <div className="premium-card p-6">
                <h2 className="font-semibold text-primary">Relevant destinations</h2>
                <ul className="mt-3 space-y-2">
                  {countries.map((guide) => (
                    <li key={guide.slug}>
                      <Link href={`/countries/${guide.slug}`} className="text-sm text-primary underline-offset-4 hover:underline">
                        Study in {guide.inName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="premium-card p-6">
                <h2 className="font-semibold text-primary">Related services</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/services/${item.slug}`} className="text-sm text-primary underline-offset-4 hover:underline">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {articles.length > 0 && (
                <div className="premium-card p-6">
                  <h2 className="font-semibold text-primary">Helpful guides</h2>
                  <ul className="mt-3 space-y-2">
                    {articles.map((article) => (
                      <li key={article.slug}>
                        <Link href={articlePath(article)} className="text-sm text-primary underline-offset-4 hover:underline">
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
              >
                All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>

        <CounsellingCta location={`service_${service.slug}`} title={`Get help with ${service.name.toLowerCase()}`} />
      </main>
      <Footer />
    </>
  );
}
