import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  GraduationCap,
  FileText,
  Plane,
  MapPin,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/content/blocks';

interface FrameworkStage {
  letter: string;
  word: string;
  title: string;
  description: string;
  services: string[];
  outcome: string;
  icon: LucideIcon;
  gradient: string;
}

const FRAMEWORK_STAGES: FrameworkStage[] = [
  {
    letter: 'M',
    word: 'Mentor',
    title: 'Discover Your Future',
    description:
      'Every successful international journey begins with understanding your goals. Our expert counselors evaluate your academic profile, career aspirations, interests, strengths, and financial preferences to create a personalized roadmap for studying abroad.',
    services: ['Career Counseling', 'Profile Evaluation', 'Goal Planning', 'Budget Assessment', 'Destination Guidance'],
    outcome: 'Personalized Study Plan',
    icon: Compass,
    gradient: 'from-[#0B2341] to-[#1a4a7a]',
  },
  {
    letter: 'A',
    word: 'Assess',
    title: 'Choose the Right University',
    description:
      'We carefully shortlist universities, countries, and programs based on your academic profile, career objectives, budget, and scholarship opportunities, ensuring you make informed decisions with confidence.',
    services: ['University Shortlisting', 'Course Selection', 'Country Selection', 'Scholarship Matching', 'Admission Strategy'],
    outcome: 'A balanced university shortlist',
    icon: GraduationCap,
    gradient: 'from-[#0B2341] to-[#2d5a8a]',
  },
  {
    letter: 'N',
    word: 'Navigate',
    title: 'Build a Winning Application',
    description:
      'We help you prepare each application carefully — SOP, LORs, CV, documents and submission — so it is complete, consistent and submitted on time.',
    services: ['SOP Assistance', 'LOR Guidance', 'Resume Enhancement', 'Documentation Review', 'Application Submission'],
    outcome: 'Complete, well-prepared applications',
    icon: FileText,
    gradient: 'from-[#1a3d6b] to-[#0B2341]',
  },
  {
    letter: 'T',
    word: 'Transition',
    title: 'Prepare for Global Success',
    description:
      'From visa documentation to financial planning, education loans, travel arrangements, and interview preparation, we simplify every step before departure.',
    services: ['Visa Documentation', 'Visa Interview Preparation', 'Education Loans', 'Financial Planning', 'Travel Assistance'],
    outcome: 'Visa file and travel plan prepared',
    icon: Plane,
    gradient: 'from-[#0B2341] to-[#3d6a9a]',
  },
  {
    letter: 'R',
    word: 'Relocate',
    title: 'Move Abroad with Confidence',
    description:
      'We help you plan the move — accommodation guidance, airport arrival, forex, a local SIM and orientation — so your first weeks are easier.',
    services: ['Accommodation Assistance', 'Airport Guidance', 'Forex Assistance', 'Local Orientation', 'Pre-Departure Briefing'],
    outcome: 'Ready for life abroad',
    icon: MapPin,
    gradient: 'from-[#2a4f7c] to-[#0B2341]',
  },
  {
    letter: 'A',
    word: 'Arrive',
    title: 'Thrive Beyond Admission',
    description:
      'Guidance can continue after you reach your destination, including orientation and Mantra.Ai portfolio support.',
    services: ['Student Orientation', 'Ongoing Mentorship', 'Mantra.Ai portfolio guidance'],
    outcome: 'Continued guidance after arrival',
    icon: Rocket,
    gradient: 'from-[#0B2341] to-[#D4AF37]/40',
  },
];

/**
 * The MANTRA process. A single responsive list (no separate mobile and desktop
 * content trees), server-rendered so every stage is visible to all users and
 * crawlers without interaction.
 */
export function MantraFrameworkSection() {
  return (
    <section id="mantra-framework" className="relative section-padding overflow-hidden bg-[#FAFBFC]">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title="The MANTRA Process"
          description="Six stages that take you from career planning to settling in abroad. You can join at any stage — many students start with counselling and add support as they need it."
          align="center"
        />

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMEWORK_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <li key={stage.word} className="relative flex flex-col rounded-[24px] border border-white/80 bg-white p-6 shadow-[0_8px_40px_rgba(11,35,65,0.08)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${stage.gradient}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a5f00]">
                    Step {index + 1} · <span className="text-[#0B2341]">{stage.letter}</span> — {stage.word}
                  </p>
                </div>
                <h3 className="font-display text-lg font-bold text-[#0B2341] leading-snug">{stage.title}</h3>
                <p className="mt-3 text-sm text-[#0B2341]/75 leading-relaxed">{stage.description}</p>
                <ul className="mt-4 space-y-1.5 border-t border-[#0B2341]/10 pt-4">
                  {stage.services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-sm text-[#0B2341]/80">
                      <span className="h-1 w-1 rounded-full bg-[#C89116] shrink-0" aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs font-semibold text-[#0B2341]/70">Outcome: {stage.outcome}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" variant="accent" asChild>
            <Link href={ROUTES.bookCounseling} data-track="book_counselling_click" data-track-location="home_process">
              Book Free Counselling <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">Explore our services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
