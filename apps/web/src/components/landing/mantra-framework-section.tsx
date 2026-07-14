'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Compass,
  GraduationCap,
  FileText,
  Plane,
  MapPin,
  Rocket,
  Check,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FrameworkStage {
  letter: string;
  word: string;
  title: string;
  description: string;
  services: string[];
  outcome: string;
  outcomeEmoji: string;
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
    outcomeEmoji: '🎯',
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
    outcome: 'Best-Fit Universities Identified',
    outcomeEmoji: '🏛️',
    icon: GraduationCap,
    gradient: 'from-[#0B2341] to-[#2d5a8a]',
  },
  {
    letter: 'N',
    word: 'Navigate',
    title: 'Build a Winning Application',
    description:
      'Our specialists help prepare every application with precision, including SOPs, LORs, resumes, documentation, and application submissions, maximizing your admission success.',
    services: ['SOP Assistance', 'LOR Guidance', 'Resume Enhancement', 'Documentation Review', 'Application Submission'],
    outcome: 'Competitive University Applications',
    outcomeEmoji: '📄',
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
    outcome: 'Visa Approved & Travel Ready',
    outcomeEmoji: '🛂',
    icon: Plane,
    gradient: 'from-[#0B2341] to-[#3d6a9a]',
  },
  {
    letter: 'R',
    word: 'Relocate',
    title: 'Move Abroad with Confidence',
    description:
      'We ensure a seamless transition by helping students with accommodation guidance, airport arrival support, forex assistance, SIM cards, and local orientation.',
    services: ['Accommodation Assistance', 'Airport Guidance', 'Forex Assistance', 'Local Orientation', 'Pre-Departure Briefing'],
    outcome: 'Successfully Settled Abroad',
    outcomeEmoji: '🌍',
    icon: MapPin,
    gradient: 'from-[#2a4f7c] to-[#0B2341]',
  },
  {
    letter: 'A',
    word: 'Arrive',
    title: 'Thrive Beyond Admission',
    description:
      'Our commitment continues after you reach your destination through orientation and alumni connections.',
    services: ['Student Orientation', 'Alumni Network', 'Ongoing Mentorship'],
    outcome: 'Academic & Career Success',
    outcomeEmoji: '🚀',
    icon: Rocket,
    gradient: 'from-[#0B2341] to-[#D4AF37]/40',
  },
];

const TRUST_INDICATORS = [
  'Personalized One-to-One Guidance',
  'End-to-End Student Support',
  'University Admission Expertise',
  'Visa & Relocation Assistance',
];

function FrameworkCard({
  stage,
  index,
  isActive,
  isExpanded,
  onHover,
  onLeave,
  compact,
}: {
  stage: FrameworkStage;
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  compact?: boolean;
}) {
  const Icon = stage.icon;

  return (
    <motion.article
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        'group relative flex flex-col rounded-[24px] border transition-all duration-500 ease-out',
        'bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_rgba(11,35,65,0.08)]',
        isExpanded
          ? 'border-[#D4AF37]/40 shadow-[0_24px_80px_rgba(11,35,65,0.14)] ring-1 ring-[#D4AF37]/20 scale-[1.02] z-10'
          : 'border-white/80 hover:border-[#D4AF37]/25 hover:shadow-[0_16px_48px_rgba(11,35,65,0.1)]',
        compact ? 'min-w-[300px] max-w-[300px] snap-center' : 'w-full'
      )}
    >
      {/* Letter watermark */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-2 -top-4 font-display font-bold leading-none select-none transition-all duration-500',
          'text-[#0B2341]/[0.04] group-hover:text-[#D4AF37]/[0.08]',
          isExpanded ? 'text-8xl' : 'text-7xl',
          compact ? 'text-6xl' : ''
        )}
      >
        {stage.letter}
      </span>

      <div className={cn('relative p-6', isExpanded && !compact && 'p-7', compact && 'p-5')}>
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500',
              stage.gradient,
              isExpanded && 'scale-110 shadow-[0_8px_24px_rgba(212,175,55,0.25)]'
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              {String(index + 1).padStart(2, '0')} · {stage.word}
            </p>
            <p className="text-xs font-semibold text-[#0B2341]/50">
              <span className="font-display text-sm font-bold text-[#0B2341]">{stage.letter}</span>
              {' — '}{stage.word}
            </p>
          </div>
        </div>

        <h3 className="font-display text-lg font-bold text-[#0B2341] leading-snug pr-8">
          {stage.title}
        </h3>

        <p
          className={cn(
            'mt-3 text-sm text-[#0B2341]/65 leading-relaxed transition-all duration-500',
            isExpanded ? 'line-clamp-none' : 'line-clamp-3'
          )}
        >
          {stage.description}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-[#0B2341]/8 pt-4">
                {stage.services.map((service) => (
                  <li key={service} className="flex items-center gap-2 text-xs text-[#0B2341]/75">
                    <span className="h-1 w-1 rounded-full bg-[#D4AF37] shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            'mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold',
            isActive
              ? 'border-[#16A34A]/30 bg-[#16A34A]/8 text-[#16A34A]'
              : 'border-[#0B2341]/10 bg-[#0B2341]/[0.03] text-[#0B2341]/70'
          )}
        >
          <span>{stage.outcomeEmoji}</span>
          {stage.outcome}
        </div>
      </div>
    </motion.article>
  );
}

function TimelineNode({
  stage,
  index,
  isActive,
  isLast,
}: {
  stage: FrameworkStage;
  index: number;
  isActive: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center relative">
      {!isLast && (
        <div className="absolute top-5 left-[calc(50%+20px)] right-0 h-[2px] -translate-y-1/2">
          <div className="h-full w-full bg-[#0B2341]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#0B2341]/30 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: isActive ? 1 : 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>
        </div>
      )}
      <motion.div
        animate={{
          scale: isActive ? 1.15 : 1,
          boxShadow: isActive
            ? '0 0 0 4px rgba(212,175,55,0.2), 0 8px 24px rgba(11,35,65,0.15)'
            : '0 4px 12px rgba(11,35,65,0.08)',
        }}
        className={cn(
          'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-display font-bold text-sm transition-colors duration-300',
          isActive
            ? 'border-[#D4AF37] bg-gradient-to-br from-[#0B2341] to-[#1a4a7a] text-white'
            : 'border-white bg-white text-[#0B2341]/60'
        )}
      >
        {stage.letter}
      </motion.div>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#0B2341]/45 hidden xl:block">
        {stage.word}
      </span>
    </div>
  );
}

export function MantraFrameworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const cards = Array.from(container.children) as HTMLElement[];
      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mantra-framework"
      className="relative section-padding overflow-hidden bg-[#FAFBFC]"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,hsl(42_70%_50%/0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-[radial-gradient(ellipse,hsl(212_80%_15%/0.05),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-6"
        >
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0B2341]">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              Our Signature Framework
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0B2341] leading-tight tracking-tight">
            The MANTRA Framework
            <sup className="text-[#D4AF37] text-lg ml-0.5 font-sans">™</sup>
          </h2>
          <p className="mt-5 text-lg text-[#0B2341]/70 leading-relaxed">
            A proven six-step methodology that guides students from career planning to campus
            arrival, ensuring a smooth, transparent, and successful international education journey.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto text-center text-sm text-[#0B2341]/55 leading-relaxed mb-16 lg:mb-20"
        >
          Unlike traditional consultancies, we don&apos;t just help you apply to universities—we mentor,
          guide, and support you through every milestone until you confidently begin your life abroad.
        </motion.p>

        {/* ── Desktop: horizontal timeline + grid ── */}
        <div className="hidden lg:block">
          {/* Timeline nodes */}
          <div className="flex items-start justify-between mb-10 px-2 max-w-6xl mx-auto">
            {FRAMEWORK_STAGES.map((stage, i) => (
              <TimelineNode
                key={stage.letter + stage.word}
                stage={stage}
                index={i}
                isActive={hoveredIndex !== null ? hoveredIndex >= i : activeIndex >= i}
                isLast={i === FRAMEWORK_STAGES.length - 1}
              />
            ))}
          </div>

          {/* 6-column card grid with hover expand */}
          <div className="grid grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-5">
            {FRAMEWORK_STAGES.map((stage, i) => (
              <FrameworkCard
                key={stage.letter + stage.word}
                stage={stage}
                index={i}
                isActive={hoveredIndex === i || (hoveredIndex === null && activeIndex === i)}
                isExpanded={hoveredIndex === i}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile / Tablet: sticky progress + swipeable cards ── */}
        <div className="lg:hidden">
          {/* Sticky progress indicator */}
          <div className="sticky top-16 z-20 -mx-4 px-4 py-3 mb-6 bg-[#FAFBFC]/90 backdrop-blur-xl border-b border-[#0B2341]/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#0B2341]/50">
                Step {activeIndex + 1} of {FRAMEWORK_STAGES.length}
              </span>
              <span className="text-xs font-bold text-[#D4AF37]">
                {FRAMEWORK_STAGES[activeIndex].word}
              </span>
            </div>
            <div className="flex gap-1.5">
              {FRAMEWORK_STAGES.map((stage, i) => (
                <button
                  key={stage.word}
                  type="button"
                  aria-label={`Go to ${stage.word}`}
                  onClick={() => scrollToIndex(i)}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    i <= activeIndex
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#0B2341]/40'
                      : 'bg-[#0B2341]/10'
                  )}
                />
              ))}
            </div>
            <div className="flex justify-center gap-1 mt-3">
              {FRAMEWORK_STAGES.map((stage, i) => (
                <button
                  key={stage.letter + i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all',
                    i === activeIndex
                      ? 'bg-[#0B2341] text-white shadow-md scale-110'
                      : 'bg-white text-[#0B2341]/40 border border-[#0B2341]/10'
                  )}
                >
                  {stage.letter}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical timeline rail */}
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-[#0B2341]/10 rounded-full">
              <motion.div
                className="w-full bg-gradient-to-b from-[#D4AF37] to-[#0B2341]/30 rounded-full origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: (activeIndex + 1) / FRAMEWORK_STAGES.length }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%' }}
              />
            </div>

            {/* Swipeable horizontal cards */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {FRAMEWORK_STAGES.map((stage, i) => (
                <div key={stage.letter + stage.word} className="relative">
                  <div
                    className={cn(
                      'absolute -left-8 top-8 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold z-10',
                      i <= activeIndex
                        ? 'border-[#D4AF37] bg-[#0B2341] text-white'
                        : 'border-white bg-white text-[#0B2341]/40'
                    )}
                  >
                    {stage.letter}
                  </div>
                  <FrameworkCard
                    stage={stage}
                    index={i}
                    isActive={i === activeIndex}
                    isExpanded={i === activeIndex}
                    onHover={() => setActiveIndex(i)}
                    onLeave={() => {}}
                    compact
                  />
                </div>
              ))}
            </div>

            {/* Nav arrows */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                type="button"
                aria-label="Previous step"
                disabled={activeIndex === 0}
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B2341]/10 bg-white text-[#0B2341] disabled:opacity-30 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next step"
                disabled={activeIndex === FRAMEWORK_STAGES.length - 1}
                onClick={() => scrollToIndex(Math.min(FRAMEWORK_STAGES.length - 1, activeIndex + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B2341]/10 bg-white text-[#0B2341] disabled:opacity-30 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative mt-20 lg:mt-28 overflow-hidden rounded-[24px] border border-white/60 bg-white/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(11,35,65,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2341]/[0.03] via-transparent to-[#D4AF37]/[0.06] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          <div className="relative px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-center">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2341] leading-tight">
              Your Global Journey Starts Here.
            </h3>
            <p className="mt-4 text-[#0B2341]/65 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Join ambitious students who trust the MANTRA Framework™ to transform their
              international education dreams into reality.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="accent"
                className="bg-gradient-to-r from-[#D4AF37] to-[#c9a020] shadow-[0_8px_32px_rgba(212,175,55,0.3)]"
                asChild
              >
                <Link href={ROUTES.bookCounseling}>
                  Book Free Counseling
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#0B2341]/15 text-[#0B2341]" asChild>
                <Link href="/universities">Explore Universities</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {TRUST_INDICATORS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-[#0B2341]/70"
                >
                  <Check className="h-4 w-4 text-[#16A34A] shrink-0" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
