import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2, Compass, MapPin, MonitorSmartphone, Scale, Users } from 'lucide-react';
import { BUSINESS_CONTACT, ROUTES } from '@mge/config';
import { Button } from '@/components/ui/button';
import { FaqList, SectionHeading } from '@/components/content/blocks';
import { reveal } from '@/lib/motion';

const WHY_ITEMS = [
  {
    icon: Users,
    title: 'Personal, one-to-one counselling',
    desc: 'You work directly with an experienced counsellor who gets to know your goals, rather than a call-centre script.',
  },
  {
    icon: Scale,
    title: 'Honest, balanced advice',
    desc: 'We explain trade-offs between countries, courses and costs, and we are clear that admission and visa decisions rest with universities and governments.',
  },
  {
    icon: Compass,
    title: 'End-to-end support',
    desc: 'From your first shortlist through applications, scholarships, visa documents and pre-departure planning.',
  },
  {
    icon: MonitorSmartphone,
    title: 'A technology advantage',
    desc: 'Through Mantra.Ai, students can get guidance on building projects and a professional profile alongside admissions.',
  },
];

export function WhyMantraSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
            eyebrow="Why Mantra"
            title="Why Students and Parents Choose Mantra Global Education"
            description="Studying abroad is a big decision for the whole family. Our approach is built around clear information and personal guidance."
          />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_ITEMS.map((item, i) => (
            <li key={item.title} {...reveal('fade-up', i * 90)} className="premium-card p-6">
              <item.icon className="h-6 w-6 text-accent mb-4" aria-hidden="true" />
              <h3 className="font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ScholarshipsTeaser() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHeading
            eyebrow="Funding"
            title="Study Abroad Scholarships for Indian Students"
            description="Browse government and university scholarship programmes by destination, with a link to each official source so you can check current eligibility, award value and deadlines."
            className="mb-6"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="accent" asChild>
              <Link href="/scholarships">
                Browse scholarships <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services/scholarship-assistance">Scholarship assistance</Link>
            </Button>
          </div>
        </div>
        <ul className="grid gap-3">
          {[
            'Government schemes such as Chevening (UK) and DAAD (Germany)',
            'University merit and international student awards',
            'Help matching scholarships to your profile and deadlines',
          ].map((item, i) => (
            <li key={item} {...reveal('fade-left', i * 100)} className="premium-card flex items-start gap-3 p-4">
              <Award className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-primary">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LocalSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3">
          <SectionHeading
            eyebrow="Coimbatore · Chennai · All India"
            title="Study Abroad Counselling in Coimbatore, Chennai and Across India"
            description="Mantra Global Education is based in Coimbatore, Tamil Nadu. We counsel students in Coimbatore in person by arrangement, and students in Chennai and every other part of India online."
            className="mb-6"
          />
          <ul className="space-y-3">
            {[
              'Country, course and university selection',
              'Application, SOP and LOR guidance',
              'Scholarship, education loan and visa documentation guidance',
              'Pre-departure planning and Mantra.Ai profile support',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-x-8 gap-y-3">
            <Link href={ROUTES.coimbatore} className="inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4 hover:text-accent">
              Study abroad counselling in Coimbatore <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={ROUTES.chennai} className="inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4 hover:text-accent">
              Counselling for Chennai students <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div {...reveal('fade-left', 120)} className="lg:col-span-2 premium-card p-6">
          <MapPin className="h-6 w-6 text-accent mb-3" aria-hidden="true" />
          <h3 className="font-semibold text-primary">Speak to us</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href={BUSINESS_CONTACT.phoneHref} data-track-location="home_local" className="font-semibold text-primary hover:text-accent">
                  {BUSINESS_CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href={BUSINESS_CONTACT.emailHref} data-track-location="home_local" className="font-semibold text-primary hover:text-accent break-all">
                  {BUSINESS_CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="text-primary">
                Based in {BUSINESS_CONTACT.city}, {BUSINESS_CONTACT.region} — online counselling across India
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export const HOME_FAQS = [
  {
    q: 'Can I get counselling online?',
    a: 'Yes. We offer online counselling, so students in Chennai, Bengaluru, Hyderabad, Mumbai, Delhi or anywhere else in India can work with us without travelling.',
  },
  {
    q: 'Which countries do you help with?',
    a: 'We have detailed guides for the UK, USA, Canada, Australia, Germany, Ireland, France, New Zealand, the Netherlands and Singapore, and our course finder lists universities in further destinations.',
  },
  {
    q: 'Do you guarantee admission or a visa?',
    a: 'No. Universities make admission decisions and governments decide visa applications. We help you prepare complete, well-planned applications, but no consultant can guarantee an outcome.',
  },
  {
    q: 'What is Mantra.Ai portfolio support?',
    a: 'Mantra Global Education is part of Mantra.Ai, an IT services company. Students can get guidance on building technology projects and a professional profile alongside their admissions journey.',
  },
  {
    q: 'When should I start planning?',
    a: 'Ideally 12 to 18 months before your intended start date, so there is time for tests, applications, scholarships and visa preparation.',
  },
];

export function HomeFaq() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Frequently Asked Questions" align="center" />
        <div {...reveal('fade-up', 100)}>
          <FaqList items={HOME_FAQS} />
        </div>
      </div>
    </section>
  );
}
