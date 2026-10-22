import Link from 'next/link';
import { Building2, Briefcase, Code2, Rocket, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/common/section-header';
import { reveal } from '@/lib/motion';

const USP_CARDS = [
  {
    icon: Building2,
    title: 'Backed by a Technology Company',
    desc: 'Mantra Global Education is the education vertical of Mantra.Ai, an IT services company',
  },
  {
    icon: Code2,
    title: 'Industry-Aware Profile',
    desc: 'Guidance on the skills and projects technology employers commonly look for',
  },
  {
    icon: Briefcase,
    title: 'Practical Project Work',
    desc: 'Structured project guidance to help you build real experience during your studies',
  },
  {
    icon: Rocket,
    title: 'Your Own Portfolio',
    desc: 'A documented portfolio of your work to share with universities and employers',
  },
] as const;

export function UspSection() {

  return (
    <section className="section-padding relative overflow-hidden bg-muted/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,hsl(42_70%_50%/0.08),transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Powered by Mantra.Ai"
          title="The Mantra.Ai Difference"
          description="Alongside admissions guidance, students can get help building a technology portfolio — projects, skills and a professional profile — with support from Mantra.Ai, our IT services company. A strong portfolio gives you concrete evidence of your abilities; it does not guarantee admission or employment."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USP_CARDS.map((card, i) => (
            <div key={card.title} {...reveal('fade-up', i * 80)} className="premium-card p-6 h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-primary leading-snug">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div {...reveal('fade-up', 350)} className="mt-10 flex justify-center">
          <Link href="/services/tech-portfolio" className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#8a5f00] hover:bg-accent/20">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Learn about Mantra.Ai tech portfolio support
          </Link>
        </div>
      </div>
    </section>
  );
}
