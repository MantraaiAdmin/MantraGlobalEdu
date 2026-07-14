'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DESTINATIONS, ROUTES, PRODUCT_NAMES } from '@mge/config';
import { evaluateProfile, type ProfileCheckInput } from '@/lib/profile-check';

const STEPS = ['Destination', 'Profile', 'Budget', 'Results'];

export default function ProfileCheckPage() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<Partial<ProfileCheckInput>>({
    degreeLevel: 'MASTERS',
    field: 'Computer Science',
  });
  const [result, setResult] = useState<ReturnType<typeof evaluateProfile> | null>(null);

  const next = () => {
    if (step === 2 && input.destination && input.academicScore && input.budget) {
      setResult(evaluateProfile({
        destination: input.destination,
        degreeLevel: input.degreeLevel || 'MASTERS',
        academicScore: input.academicScore,
        englishScore: input.englishScore,
        budget: input.budget,
        workExperience: input.workExperience,
        field: input.field || 'General',
      }));
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  return (
    <>
      <Header />
      <main className="bg-background pt-24 pb-24 lg:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              {PRODUCT_NAMES.profileCheck}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Check your study abroad readiness
            </h1>
            <p className="mt-3 text-muted-foreground">4 quick steps · Takes under 2 minutes</p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={`h-2 rounded-full transition-all ${i <= step ? 'w-12 bg-accent' : 'w-8 bg-muted'}`}
              />
            ))}
          </div>

          <div className="premium-card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-semibold text-primary text-lg mb-4">Where do you want to study?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {DESTINATIONS.map((d) => (
                      <button
                        key={d.code}
                        type="button"
                        onClick={() => setInput({ ...input, destination: d.code as ProfileCheckInput['destination'] })}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${input.destination === d.code ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40'}`}
                      >
                        <span className="text-2xl">{d.flag}</span>
                        <p className="mt-2 font-semibold text-primary text-sm">{d.name}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Study Level</label>
                    <select
                      value={input.degreeLevel}
                      onChange={(e) => setInput({ ...input, degreeLevel: e.target.value as ProfileCheckInput['degreeLevel'] })}
                      className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                    >
                      <option value="BACHELORS">Undergraduate</option>
                      <option value="MASTERS">Postgraduate</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="font-semibold text-primary text-lg">Tell us about your profile</h2>
                  <div>
                    <label className="text-sm font-medium">Field of Study</label>
                    <Input value={input.field || ''} onChange={(e) => setInput({ ...input, field: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Academic Score (% or CGPA × 10)</label>
                    <Input type="number" min={0} max={100} value={input.academicScore || ''} onChange={(e) => setInput({ ...input, academicScore: Number(e.target.value) })} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">IELTS / PTE Score (optional)</label>
                    <Input type="number" step={0.5} min={0} max={9} value={input.englishScore || ''} onChange={(e) => setInput({ ...input, englishScore: e.target.value ? Number(e.target.value) : undefined })} className="mt-1" placeholder="e.g. 6.5" />
                  </div>
                  {input.degreeLevel === 'MASTERS' && (
                    <div>
                      <label className="text-sm font-medium">Work Experience (years)</label>
                      <Input type="number" min={0} value={input.workExperience || ''} onChange={(e) => setInput({ ...input, workExperience: Number(e.target.value) })} className="mt-1" />
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-semibold text-primary text-lg">Annual study budget (USD)</h2>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">Tuition + living expenses per year</p>
                  <Input type="number" min={5000} value={input.budget || ''} onChange={(e) => setInput({ ...input, budget: Number(e.target.value) })} className="mt-1" placeholder="e.g. 35000" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[25000, 35000, 50000, 70000].map((b) => (
                      <button key={b} type="button" onClick={() => setInput({ ...input, budget: b })} className="rounded-full border border-border px-3 py-1 text-xs hover:border-accent">
                        ${(b / 1000)}k/yr
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && result && (
                <motion.div key="s3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="text-center mb-6">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-3xl font-bold text-accent">
                      {result.score}
                    </div>
                    <p className="mt-3 font-display text-xl font-bold text-primary">{result.readiness} Profile</p>
                    <p className="mt-2 text-muted-foreground text-sm">{result.summary}</p>
                  </div>
                  <ul className="space-y-2">
                    {result.recommendations.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="accent" asChild>
                      <Link href={ROUTES.bookCounseling}>Book Free Counseling <ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={ROUTES.findACourse}>Explore Courses</Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 3 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  variant="accent"
                  onClick={next}
                  disabled={
                    (step === 0 && !input.destination) ||
                    (step === 1 && !input.academicScore) ||
                    (step === 2 && !input.budget)
                  }
                >
                  {step === 2 ? 'See Results' : 'Continue'} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
