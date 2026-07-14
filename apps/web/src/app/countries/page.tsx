'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { useCountries } from '@/hooks/use-api';
import { ArrowRight, Users, Loader2 } from 'lucide-react';

export default function CountriesPage() {
  const { data, isLoading, isError } = useCountries();

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Destinations"
          title="Study Destinations"
          description="Explore detailed guides for each destination — universities, costs, visa requirements, and career opportunities."
        />

        <section className="section-padding bg-muted/30">
          <div className="mx-auto max-w-7xl">
            {isLoading && (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {isError && (
              <p className="text-center text-red-600 py-20">Failed to load countries. Is the API running?</p>
            )}
            {data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {data.data.map((dest) => (
                  <Link key={dest.code} href={`/countries/${dest.code}`}>
                    <div className="premium-card group cursor-pointer p-8 text-center h-full">
                      <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-500">
                        {dest.flag}
                      </div>
                      <h3 className="text-xl font-semibold text-primary font-display">{dest.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{dest.description}</p>
                      <div className="mt-5 flex items-center justify-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        <Users className="h-3 w-3" /> Explore <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
