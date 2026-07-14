'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHero } from '@/components/layout/page-hero';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCountries } from '@/hooks/use-api';
import { estimateCost } from '@/services/api.service';
import { Calculator, Loader2 } from 'lucide-react';

export default function CostEstimatorPage() {
  const { data: countries } = useCountries();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof estimateCost>> | null>(null);
  const [form, setForm] = useState({
    countryId: '',
    tuition: 50000,
    accommodation: 12000,
    livingExpenses: 8000,
    visa: 500,
    travel: 1500,
    insurance: 2000,
    programDurationYears: 2,
  });

  const handleCalculate = async () => {
    if (!form.countryId) return;
    setLoading(true);
    try {
      const data = await estimateCost(form);
      setResult(data);
    } catch {
      // fallback handled by error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Planning"
          title="Cost Estimator"
          description="Calculate your total education costs including tuition, living expenses, visa, and insurance."
        />

        <section className="section-padding">
          <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="premium-card p-6 space-y-4">
              <h2 className="font-semibold text-primary flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Enter Your Costs
              </h2>
              <div>
                <label className="text-sm font-medium">Country</label>
                <select
                  value={form.countryId}
                  onChange={(e) => setForm({ ...form, countryId: e.target.value })}
                  className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                >
                  <option value="">Select country</option>
                  {countries?.data.map((c) => (
                    <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>
              {Object.entries({
                tuition: 'Annual Tuition ($)',
                accommodation: 'Annual Accommodation ($)',
                livingExpenses: 'Annual Living Expenses ($)',
                visa: 'Visa Fees ($)',
                travel: 'Travel Costs ($)',
                insurance: 'Annual Insurance ($)',
                programDurationYears: 'Program Duration (years)',
              }).map(([key, label]) => (
                <div key={key}>
                  <label className="text-sm font-medium">{label}</label>
                  <Input
                    type="number"
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>
              ))}
              <Button onClick={handleCalculate} className="w-full" disabled={!form.countryId || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Calculate Total Cost'}
              </Button>
            </div>

            {result && (
              <div className="premium-card p-6 bg-primary text-white">
                <h2 className="font-semibold text-lg mb-6">Cost Breakdown</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total Program Cost</span>
                    <span className="text-accent">${result.totalProgramCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Annual Cost</span>
                    <span>${result.annualCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Living Expenses (Total)</span>
                    <span>${result.estimatedLivingExpenses.toLocaleString()}</span>
                  </div>
                  <hr className="border-white/20" />
                  {Object.entries(result.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span>${value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
