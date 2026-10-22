import Link from 'next/link';
import { ArrowRight, Search, Calculator, Award, Sparkles, ClipboardCheck, FileCheck } from 'lucide-react';
import { ROUTES, PRODUCT_NAMES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/section-header';
import { reveal } from '@/lib/motion';

const tools = [
  {
    title: PRODUCT_NAMES.profileCheck,
    description: '4-step readiness assessment for your target country — get your score and personalised recommendations.',
    icon: ClipboardCheck,
    href: ROUTES.profileCheck,
    cta: 'Check Eligibility',
    featured: true,
  },
  {
    title: 'Course Discovery',
    description: 'Search programmes by country, university, study level and tuition range.',
    icon: Search,
    href: ROUTES.findACourse,
    cta: 'Find a Course',
    featured: false,
  },
  {
    title: 'Scholarship Finder',
    description: 'Browse government and university scholarship programmes by destination, with official links.',
    icon: Award,
    href: '/scholarships',
    cta: 'Find Scholarships',
    featured: false,
  },
  {
    title: 'Cost Estimator',
    description: 'Estimate total costs including tuition, living expenses, visa and insurance.',
    icon: Calculator,
    href: '/cost-estimator',
    cta: 'Estimate Costs',
    featured: false,
  },
  {
    title: 'Document Checklist',
    description: 'Country-specific application and visa document lists for undergraduate and postgraduate programs.',
    icon: FileCheck,
    href: ROUTES.documentChecklist,
    cta: 'View Checklist',
    featured: false,
  },
];

export function ToolsSection() {

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Smart Tools"
          title="Find a Course and Plan Your Budget"
          description="Free tools to search courses, compare costs and check what documents you will need."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <div key={tool.title} {...reveal('fade-up', i * 100)}>
              <div className={`premium-card h-full flex flex-col p-8 group ${tool.featured ? 'gradient-border' : ''}`}>
                {tool.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                    <Sparkles className="h-3 w-3" aria-hidden="true" /> Free
                  </div>
                )}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-white shadow-premium group-hover:shadow-glow-sm transition-shadow duration-500">
                  <tool.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-primary font-display">{tool.title}</h3>
                <p className="mt-3 text-muted-foreground flex-1 leading-relaxed text-sm">{tool.description}</p>
                <Button variant="ghost" className="mt-6 self-start px-0 text-primary hover:text-accent group-hover:gap-3 transition-all" asChild>
                  <Link href={tool.href}>
                    {tool.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
