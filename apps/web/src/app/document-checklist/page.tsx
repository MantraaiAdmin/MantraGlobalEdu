'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileCheck, Download, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { DOCUMENT_CHECKLISTS } from '@/lib/document-checklists';
import { ROUTES } from '@mge/config';

type CountryCode = keyof typeof DOCUMENT_CHECKLISTS;
type Level = 'undergraduate' | 'postgraduate';

export default function DocumentChecklistPage() {
  const [country, setCountry] = useState<CountryCode>('US');
  const [level, setLevel] = useState<Level>('postgraduate');

  const checklist = DOCUMENT_CHECKLISTS[country][level];

  const handlePrint = () => window.print();

  return (
    <>
      <Header />
      <main className="bg-background pt-24 pb-24 lg:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            <FileCheck className="h-3.5 w-3.5" />
            Document Checklist
          </span>
          <h1 className="font-display text-3xl font-bold text-primary">Application Document Checklist</h1>
          <p className="mt-2 text-muted-foreground">Everything you need to prepare for applications to universities worldwide.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Destination</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
              >
                {(Object.keys(DOCUMENT_CHECKLISTS) as CountryCode[]).map((c) => (
                  <option key={c} value={c}>{DOCUMENT_CHECKLISTS[c].flag} {DOCUMENT_CHECKLISTS[c].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Study Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
                className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
              >
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          <div className="mt-8 premium-card p-6">
            <h2 className="font-semibold text-primary text-lg mb-4">
              {DOCUMENT_CHECKLISTS[country].flag} {DOCUMENT_CHECKLISTS[country].label} — {level === 'undergraduate' ? 'UG' : 'PG'} Documents
            </h2>
            <ul className="space-y-3">
              {checklist.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">{i + 1}</span>
                  <span className="text-muted-foreground pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" onClick={handlePrint}>
                <Download className="h-4 w-4" /> Print / Save PDF
              </Button>
              <Button variant="accent" asChild>
                <Link href={ROUTES.bookCounseling}>Get Document Review <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
