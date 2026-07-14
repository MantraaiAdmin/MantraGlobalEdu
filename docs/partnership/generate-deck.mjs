/**
 * Mantra Global Education — Partnership Program Deck (v3)
 * Fixed 16:9 layout grid + official Mantra logo
 * Run: node docs/partnership/generate-deck.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PptxGenJS from 'pptxgenjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;
const LOGO_PATH = path.join(__dirname, 'assets', 'gem-logo-sm.png');

// 16:9 slide = 10" × 5.625"
const SLIDE = { w: 10, h: 5.625 };
const M = { l: 0.45, r: 0.45, t: 0.2, content: 0.95, bottom: 5.05, footer: 5.28 };
const CW = SLIDE.w - M.l - M.r; // 9.1 content width
const LOGO = { w: 0.62, h: 0.62 }; // horizontal lockup in square PNG

const C = {
  navy: '00234E', navyLight: '003D7A', gold: 'C89116', goldLight: 'E8B84A',
  white: 'FFFFFF', slate: '334155', muted: '64748B', light: 'F1F5F9', border: 'CBD5E1',
};

const BRAND = {
  name: 'Mantra Global Education', tagline: 'Your Journey. Our Guidance. Global Success.',
  founder: 'Vinodhini Y.', email: 'support@mantraglobaleducation.com',
  phone: '+91 98765 43210', web: 'www.mantraglobaleducation.com',
};

const DECK = [
  { type: 'cover' },
  { type: 'agenda' },
  { type: 'section', num: '01', title: 'Program Foundation', subtitle: 'Objective, goals & success criteria' },
  {
    type: 'objective',
    headline: 'Build a trusted, scalable partner network that delivers premium study-abroad outcomes',
    objectives: [
      { title: 'Expand Quality Reach', desc: 'Partner with ethical consultancies to serve more USA, UK & Australia aspirants without compromising standards.' },
      { title: 'Standardize the Journey', desc: 'Deploy a repeatable lead-to-enrollment framework with SLAs, documentation, and platform visibility.' },
      { title: 'Grow Mutual Revenue', desc: 'Create win-win commercial models where partners earn through ethical placements and structured delivery.' },
    ],
  },
  {
    type: 'goals',
    title: '12-Month Partnership Goals',
    goals: [
      { metric: '15+', label: 'Active partner consultancies onboarded' },
      { metric: '500+', label: 'Qualified leads processed through Mantra framework' },
      { metric: '200+', label: 'Paid counseling engagements closed' },
      { metric: '80+', label: 'Confirmed enrollments (USA / UK / Australia)' },
    ],
    footnote: 'Targets adjusted per partner tier during onboarding. Reviewed quarterly.',
  },
  {
    type: 'bullets',
    title: 'What Success Looks Like',
    highlight: 'A successful Mantra partnership = trusted brand + disciplined operations + measurable enrollments',
    bullets: [
      'Students receive transparent, milestone-based counseling with visible progress',
      'Partners earn predictable revenue through documented referral & co-delivery models',
      'Mantra maintains founder-led quality assurance and British Council–aligned standards',
      'Both parties operate from a single pipeline view: lead → counseling → paid → enrolled',
      'Zero tolerance for false promises, document fraud, or undisclosed fees',
    ],
  },
  { type: 'section', num: '02', title: 'Who We Are', subtitle: 'Credibility, focus & differentiation' },
  {
    type: 'stats',
    title: 'Mantra at a Glance',
    stats: [
      { value: '700+', label: 'Students Placed' },
      { value: '10+', label: 'Years Experience' },
      { value: '3', label: 'Focus Countries' },
      { value: 'Top 17', label: 'Pan-India Rank' },
    ],
    bullets: [
      'Premium boutique advisory — USA, United Kingdom, Australia',
      'Founder-led | British Council Certified | Former IDP Counselor',
      'Enterprise digital platform: discovery, counseling, student & counselor portals',
    ],
  },
  {
    type: 'cards',
    title: 'Founder Credibility — Vinodhini Y.',
    cards: [
      { title: '10+ Years', desc: 'International education counseling across admissions, visas & university pathways', accent: C.gold },
      { title: 'Ex-IDP Counselor', desc: 'Around 700+ students placed with proven global placement expertise', accent: C.navy },
      { title: 'Top 17 India', desc: 'Recognised among India\'s leading study-abroad advisors nationally', accent: C.gold },
      { title: 'British Council', desc: 'Certified counselor — credentials trusted by universities & families', accent: C.navy },
    ],
  },
  {
    type: 'two-col',
    title: 'Market Opportunity',
    left: { heading: 'Student Demand', items: ['USA, UK & Australia remain top destinations for Indian students', 'Families demand certified counselors + digital journey tracking', '6–18 month intake cycles require disciplined pipeline management', 'Parents evaluate ROI, visa reality & career outcomes'] },
    right: { heading: 'Partner Gap', items: ['Local consultancies have reach but lack scalable process & tech', 'Inconsistent SLAs erode trust and reduce conversion rates', 'No shared CRM = leads lost after initial contact', 'Partners need brand credibility to compete with aggregators'] },
  },
  {
    type: 'cards',
    title: 'Why Partner with Mantra?',
    cards: [
      { title: 'Brand Trust', desc: 'Founder credibility, certifications & ethical positioning families respect', accent: C.navy },
      { title: 'Proven Process', desc: 'Documented lead-to-enrollment workflow with SLAs at every stage', accent: C.gold },
      { title: 'Technology', desc: 'Student portal, counselor tools & CRM roadmap — not a static website', accent: C.navy },
      { title: 'Commercial Clarity', desc: 'Structured packages, revenue-share models & transparent MOU terms', accent: C.gold },
    ],
  },
  { type: 'section', num: '03', title: 'Partnership Models', subtitle: 'Choose the structure that fits your business' },
  {
    type: 'table',
    title: 'Four Partnership Pathways',
    headers: ['Model', 'Ideal Partner', 'How It Works', 'Commercial Basis'],
    rows: [
      ['Referral Partner', 'Agents with lead flow', 'Refer qualified leads → Mantra counsels & delivers', 'Commission on enrollment'],
      ['Co-Delivery Partner', 'Counseling firms', 'Joint counseling; Mantra handles apps & platform', 'Service fee revenue share'],
      ['Regional Partner', 'City / state leaders', 'Semi-exclusive territory + co-branding', 'Retainer + performance bonus'],
      ['Institutional Partner', 'Schools & colleges', 'Workshops, career talks, pipeline', 'Per-enrollment + annual fee'],
    ],
    colW: [1.45, 1.65, 3.2, 2.8],
    fontSize: 7.5,
  },
  {
    type: 'bullets',
    title: 'Ideal Partner Profile',
    highlight: 'We partner with quality-first consultancies — not volume-at-any-cost operators',
    bullets: [
      'Ethical study-abroad practice with verifiable placement history',
      'Counselors familiar with USA / UK / Australia admission pathways',
      'Capacity to respond to leads within 15 minutes during business hours',
      'Willingness to adopt Mantra stage definitions, SLAs & documentation standards',
      'Commitment to transparent fees — no hidden charges to students or families',
    ],
  },
  { type: 'section', num: '04', title: 'Deliverables & Expectations', subtitle: 'What each party commits to' },
  {
    type: 'deliver',
    title: 'What Mantra Delivers to Partners',
    groups: [
      { title: 'Brand & Credibility', items: ['Mantra brand association & founder-backed QA', 'Co-branded marketing assets & webinars', 'British Council–aligned counseling methodology'] },
      { title: 'Lead Management', items: ['Central CRM pipeline with stage tracking', 'Lead assignment, SLA monitoring & escalation', 'WhatsApp / email nurture templates & scripts'] },
      { title: 'Counseling Operations', items: ['Packages: Profile Check → Pathfinder → Application Pro → Visa & Fly', 'University shortlisting for USA, UK, Australia', 'SOP/LOR guidance, checklists & deadline tracking'] },
      { title: 'Technology Platform', items: ['Student portal: apps, documents, appointments', 'Counselor portal: tasks, notes, calendar', 'Admin dashboard: metrics & partner reporting'] },
      { title: 'Commercial Support', items: ['Documented MOU with revenue-share schedule', 'Commission tracking per enrollment', 'Quarterly business review with KPI dashboard'] },
    ],
  },
  {
    type: 'expect',
    title: 'What Mantra Expects from Partners',
    groups: [
      { title: 'Ethical Practice', items: ['No guaranteed admission or visa promises', 'Zero tolerance for fraudulent documents', 'Transparent fee disclosure before payment'] },
      { title: 'Operational Discipline', items: ['15-minute first response SLA on leads', 'CRM stage updates within 24 hours', 'Complete student profile before applications'] },
      { title: 'Counseling Standards', items: ['Sessions follow Mantra methodology & notes format', 'Weekly student updates during application phase', 'Escalation of complex cases to senior counselor'] },
      { title: 'Brand Compliance', items: ['Approved Mantra branding in all marketing', 'No claims contradicting Mantra policies', 'Onboarding training & monthly pipeline reviews'] },
      { title: 'Reporting & Transparency', items: ['Monthly lead, conversion & enrollment reports', 'Honest loss-reason coding for non-converts', 'Open data sharing for joint KPI review'] },
    ],
  },
  {
    type: 'table',
    title: 'Deliverables by Partnership Phase',
    headers: ['Phase', 'Timeline', 'Mantra Provides', 'Partner Provides'],
    rows: [
      ['Discovery', 'Week 1–2', 'Program deck, MOU draft, commercial schedule', 'Company profile, team CVs, placement data'],
      ['Onboarding', 'Week 3–4', 'CRM access, training, scripts, brand kit', 'Training attendance, SLA sign-off'],
      ['Pilot', 'Month 2–3', 'Lead routing, counseling support, platform', '10–20 sessions, pipeline updates'],
      ['Scale', 'Month 4–12', 'Co-marketing, KPI reviews, expansion', 'Monthly reports, quality adherence'],
    ],
    colW: [1.2, 1.1, 3.4, 3.4],
    fontSize: 7.5,
  },
  { type: 'section', num: '05', title: 'Operations Framework', subtitle: 'Student journey, pipeline & packages' },
  {
    type: 'process',
    title: 'End-to-End Student Journey',
    steps: [
      { num: '01', title: 'Profile Assessment', desc: 'Mantra Profile Check → qualify budget, academics, timeline' },
      { num: '02', title: 'Counseling Session', desc: 'Country/course direction → package recommendation' },
      { num: '03', title: 'University Shortlist', desc: '3–5 fit-based options with budget & intake plan' },
      { num: '04', title: 'Application Phase', desc: 'Documents, SOP/LOR, submissions in portal' },
      { num: '05', title: 'Offer & Decision', desc: 'Offer comparison matrix → informed acceptance' },
      { num: '06', title: 'Visa & Departure', desc: 'Visa checklist, pre-departure briefing, alumni connect' },
    ],
    cols: 3,
  },
  {
    type: 'table',
    title: 'Lead-to-Enrollment Pipeline & SLAs',
    headers: ['Stage', 'Owner', 'Entry Criteria', 'SLA'],
    rows: [
      ['New Lead', 'Partner / Ops', 'Form, WhatsApp, referral, event', 'Response: 15 min'],
      ['Qualified', 'Counselor', 'Budget + timeline + academics', 'Same business day'],
      ['Counseling Done', 'Counselor', 'Session notes + next step logged', 'Within 24 hours'],
      ['Proposal Sent', 'Counselor', 'Package & fee shared', 'Within 48 hours'],
      ['Won (Paid)', 'Admin', 'Agreement + payment received', 'Portal onboarding same day'],
      ['Enrolled', 'Counselor + Ops', 'Deposit paid / seat confirmed', 'Commission logged'],
    ],
    colW: [1.35, 1.2, 3.3, 1.65],
    fontSize: 7.5,
  },
  {
    type: 'table',
    title: 'Mantra Service Packages',
    headers: ['Package', 'Scope', 'Target Stage', 'Partner Role'],
    rows: [
      ['Profile Check (Free)', 'Readiness assessment, country direction', 'Lead qualification', 'Refer & schedule'],
      ['Mantra Pathfinder', 'Shortlist 3–5 universities + budget plan', 'Early conversion', 'Co-counsel or refer'],
      ['Mantra Application Pro', 'Full applications, SOP/LOR, documents', 'Core revenue', 'Profile intake + follow-up'],
      ['Mantra Visa & Fly', 'Visa filing + pre-departure support', 'Post-offer upsell', 'Doc collection support'],
      ['Mantra Premium', 'Dedicated counselor, priority SLA', 'High-value students', 'Premium referral partner'],
    ],
    colW: [1.65, 2.9, 1.45, 2.1],
    fontSize: 7.5,
  },
  { type: 'section', num: '06', title: 'Commercial Framework', subtitle: 'Revenue models & governance' },
  {
    type: 'two-col',
    title: 'Commercial Principles',
    left: { heading: 'Revenue Streams', items: ['Service fees: counseling, application & visa (₹25K–₹1.5L+)', 'University commissions on confirmed enrollments', 'Partner referral fees: loans, test prep, accommodation', 'All terms documented in Partnership MOU'] },
    right: { heading: 'Revenue Share (Indicative)', items: ['Referral Partner: 15–25% of service fee or commission share', 'Co-Delivery Partner: 30–50% of service fees by role split', 'Regional Partner: retainer + performance bonus on enrollments', 'Final schedule customized per tier, volume & territory'] },
  },
  {
    type: 'bullets',
    title: 'Quality & Compliance Charter',
    highlight: 'Trust is our primary product. One bad practice damages the entire network.',
    bullets: [
      'No guaranteed admission, visa, or scholarship promises under any circumstance',
      'Written service scope per package — explicit inclusions and exclusions',
      'Student document authenticity verified before any application submission',
      'Data privacy: role-based access to student PII and financial documents',
      'Partner termination clause for repeated SLA breaches or ethical violations',
    ],
  },
  { type: 'section', num: '07', title: 'Technology & Reporting', subtitle: 'Platform capabilities & KPIs' },
  {
    type: 'cards',
    title: 'Mantra Digital Platform',
    cards: [
      { title: 'Public Website', desc: 'Course discovery, scholarships, profile check, counseling booking', accent: C.navy },
      { title: 'Student Portal', desc: 'Applications, documents, appointments, notifications & tracking', accent: C.gold },
      { title: 'Counselor Portal', desc: 'Assigned students, tasks, calendar, notes & checklists', accent: C.navy },
      { title: 'Admin & CRM', desc: 'Lead pipeline, partner tracking, enrollment metrics & dashboards', accent: C.gold },
    ],
  },
  {
    type: 'table',
    title: 'KPIs We Track Together',
    headers: ['Category', 'Metric', 'Review Frequency'],
    rows: [
      ['Acquisition', 'Leads referred, cost per lead, source mix', 'Weekly'],
      ['Conversion', 'Lead → counseling %, counseling → paid %', 'Weekly'],
      ['Delivery', 'Avg days to shortlist, applications per student', 'Monthly'],
      ['Revenue', 'Service fee revenue, commission forecast, ARPU', 'Monthly'],
      ['Quality', 'SLA adherence %, student NPS, complaint rate', 'Monthly'],
      ['Outcome', 'Offers received, enrollments confirmed, visa success', 'Quarterly'],
    ],
    colW: [1.6, 4.5, 1.5],
    fontSize: 8,
  },
  {
    type: 'process',
    title: '90-Day Partner Onboarding Roadmap',
    steps: [
      { num: '30', title: 'Foundation', desc: 'MOU signed → CRM setup → team training → SLA alignment' },
      { num: '60', title: 'Pilot', desc: '10–20 counseling sessions → first paid conversions' },
      { num: '90', title: 'Scale Decision', desc: 'KPI review → referral codes live → long-term agreement' },
    ],
    cols: 3,
  },
  {
    type: 'bullets',
    title: 'Governance & Review Cadence',
    bullets: [
      'Weekly: Pipeline standup — hot leads, stuck deals, today\'s appointments',
      'Monthly: KPI review — conversions, SLA adherence, revenue & quality metrics',
      'Quarterly: Strategic review — territory expansion, commercial renegotiation',
      'Annual: Network summit — best practices, university updates, joint planning',
    ],
  },
  { type: 'section', num: '08', title: 'Next Steps', subtitle: 'How to begin the partnership' },
  {
    type: 'process',
    title: 'Partnership Activation — 5 Steps',
    steps: [
      { num: '01', title: 'Discovery Call', desc: '60-min alignment on model, territory & expectations' },
      { num: '02', title: 'Due Diligence', desc: 'Exchange profiles, placement data & references' },
      { num: '03', title: 'MOU & Commercials', desc: 'Review agreement, revenue schedule & SLAs' },
      { num: '04', title: '90-Day Pilot', desc: 'Onboarding, training, first leads & targets' },
      { num: '05', title: 'Scale Agreement', desc: 'Quarterly review → long-term partnership' },
    ],
    cols: 5,
  },
  { type: 'closing' },
];

// ─── Layout helpers ────────────────────────────────────────────────
let slideCounter = 0;

function freshSlide(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  return s;
}

function addLogo(s, x = M.l, y = M.t, w = LOGO.w) {
  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({ path: LOGO_PATH, x, y, w, h: LOGO.h });
  }
}

function addSlideHeader(s, title, num) {
  addLogo(s);
  s.addShape('rect', { x: M.l, y: M.content - 0.08, w: 1.0, h: 0.05, fill: { color: C.gold } });
  s.addText(title, {
    x: M.l, y: M.content, w: CW - 0.5, h: 0.42,
    fontSize: 20, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'top',
  });
  if (num != null) {
    slideCounter++;
    s.addText(String(slideCounter).padStart(2, '0'), {
      x: SLIDE.w - M.r - 0.4, y: M.t + 0.15, w: 0.4, h: 0.3,
      fontSize: 10, color: C.muted, align: 'right', fontFace: 'Calibri',
    });
  }
  addFooter(s);
}

function addFooter(s) {
  s.addShape('rect', { x: 0, y: M.footer, w: SLIDE.w, h: 0.07, fill: { color: C.gold } });
  s.addText(`${BRAND.name}  |  Partnership Program 2026`, {
    x: M.l, y: M.footer - 0.22, w: CW, h: 0.18,
    fontSize: 7, color: C.muted, fontFace: 'Calibri',
  });
}

// ─── Slide builders ────────────────────────────────────────────────
function addCover(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: 0.1, h: SLIDE.h, fill: { color: C.gold } });

  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({ path: LOGO_PATH, x: M.l + 0.1, y: 0.55, w: 2.6, h: 0.87 });
  }

  s.addText('Partnership Program', {
    x: M.l, y: 1.65, w: 7, h: 0.65, fontSize: 32, bold: true, color: C.white, fontFace: 'Calibri',
  });
  s.addText('Structured Collaboration for USA · UK · Australia', {
    x: M.l, y: 2.35, w: 6.5, h: 0.4, fontSize: 15, color: C.goldLight, fontFace: 'Calibri',
  });
  s.addText(BRAND.tagline, {
    x: M.l, y: 2.9, w: 5, h: 0.3, fontSize: 11, color: '8FA3BC', italic: true, fontFace: 'Calibri',
  });

  const meta = [`Founder: ${BRAND.founder}`, 'Focus: USA · United Kingdom · Australia', 'Confidential — For partnership discussions only'];
  s.addText(meta.map((t) => ({ text: t, options: { bullet: { code: '25CF' }, breakLine: true } })), {
    x: M.l, y: 3.5, w: 5.5, h: 1.2, fontSize: 9.5, color: 'B8C5D6', fontFace: 'Calibri',
  });

  s.addText(String(new Date().getFullYear()), {
    x: 8.2, y: 4.6, w: 1.2, h: 0.45, fontSize: 22, bold: true, color: C.gold, align: 'right', fontFace: 'Calibri',
  });
}

function addAgenda(pptx) {
  const s = freshSlide(pptx);
  addSlideHeader(s, 'Agenda', 1);

  const items = [
    ['01', 'Program Foundation', 'Objective, 12-month goals & success criteria'],
    ['02', 'Who We Are', 'Mantra credibility, market opportunity & value proposition'],
    ['03', 'Partnership Models', 'Four pathways & ideal partner profile'],
    ['04', 'Deliverables & Expectations', 'What Mantra delivers · What Mantra expects'],
    ['05', 'Operations Framework', 'Student journey, pipeline SLAs & packages'],
    ['06', 'Commercial Framework', 'Revenue models, compliance & governance'],
    ['07', 'Technology & Reporting', 'Platform, KPIs & 90-day onboarding'],
    ['08', 'Next Steps', '5-step partnership activation process'],
  ];

  const colW = (CW - 0.3) / 2;
  items.forEach((item, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M.l + col * (colW + 0.3);
    const y = 1.55 + row * 0.82;

    s.addShape('ellipse', { x, y: y + 0.04, w: 0.32, h: 0.32, fill: { color: C.navy } });
    s.addText(item[0], { x, y: y + 0.07, w: 0.32, h: 0.26, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    s.addText(item[1], { x: x + 0.4, y, w: colW - 0.4, h: 0.28, fontSize: 11, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(item[2], { x: x + 0.4, y: y + 0.28, w: colW - 0.4, h: 0.35, fontSize: 8.5, color: C.muted, fontFace: 'Calibri' });
  });
}

function addSection(pptx, data) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.06, fill: { color: C.gold } });

  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({ path: LOGO_PATH, x: SLIDE.w - M.r - LOGO.w, y: M.t, w: LOGO.w, h: LOGO.h });
  }

  s.addText(data.num, { x: M.l, y: 1.2, w: 2.5, h: 1.0, fontSize: 56, bold: true, color: C.gold, fontFace: 'Calibri' });
  s.addText(data.title, { x: M.l, y: 2.3, w: 7.5, h: 0.65, fontSize: 28, bold: true, color: C.white, fontFace: 'Calibri' });
  s.addText(data.subtitle, { x: M.l, y: 3.0, w: 7, h: 0.4, fontSize: 14, color: 'B8C5D6', fontFace: 'Calibri' });
}

function addObjective(pptx, data) {
  const s = freshSlide(pptx);
  addSlideHeader(s, 'Program Objective', true);

  s.addShape('rect', { x: M.l, y: 1.48, w: CW, h: 0.48, fill: { color: C.light } });
  s.addText(data.headline, {
    x: M.l + 0.12, y: 1.52, w: CW - 0.24, h: 0.4,
    fontSize: 10.5, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'middle',
  });

  const cardW = (CW - 0.3) / 3;
  data.objectives.forEach((obj, i) => {
    const x = M.l + i * (cardW + 0.15);
    const y = 2.15;
    s.addShape('rect', { x, y, w: cardW, h: 2.55, fill: { color: C.white }, line: { color: C.border, width: 0.75 } });
    s.addShape('rect', { x, y, w: cardW, h: 0.06, fill: { color: i % 2 === 0 ? C.gold : C.navy } });
    s.addText(String(i + 1), { x: x + 0.1, y: y + 0.15, w: 0.4, h: 0.35, fontSize: 18, bold: true, color: C.gold, fontFace: 'Calibri' });
    s.addText(obj.title, { x: x + 0.1, y: y + 0.5, w: cardW - 0.2, h: 0.35, fontSize: 10.5, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(obj.desc, { x: x + 0.1, y: y + 0.9, w: cardW - 0.2, h: 1.5, fontSize: 8.5, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

function addGoals(pptx, data) {
  const s = freshSlide(pptx);
  addSlideHeader(s, data.title, true);

  const cardW = (CW - 0.25) / 2;
  data.goals.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M.l + col * (cardW + 0.25);
    const y = 1.55 + row * 1.55;

    s.addShape('rect', { x, y, w: cardW, h: 1.35, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addText(g.metric, { x: x + 0.15, y: y + 0.12, w: 1.5, h: 0.55, fontSize: 28, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(g.label, { x: x + 0.15, y: y + 0.7, w: cardW - 0.3, h: 0.55, fontSize: 9.5, color: C.slate, fontFace: 'Calibri', valign: 'top' });
  });

  if (data.footnote) {
    s.addText(data.footnote, { x: M.l, y: M.bottom - 0.15, w: CW, h: 0.2, fontSize: 7.5, color: C.muted, italic: true, fontFace: 'Calibri' });
  }
}

function addStats(pptx, data) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  addFooter(s);

  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({ path: LOGO_PATH, x: M.l, y: M.t, w: LOGO.w, h: LOGO.h });
  }

  s.addText(data.title, { x: M.l, y: 0.95, w: CW, h: 0.4, fontSize: 22, bold: true, color: C.white, fontFace: 'Calibri' });

  const statW = (CW - 0.45) / 4;
  data.stats.forEach((st, i) => {
    const x = M.l + i * (statW + 0.15);
    s.addShape('rect', { x, y: 1.55, w: statW, h: 1.25, fill: { color: C.navyLight }, line: { color: C.gold, width: 0.75 } });
    s.addText(st.value, { x, y: 1.65, w: statW, h: 0.55, fontSize: 26, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
    s.addText(st.label, { x: x + 0.05, y: 2.25, w: statW - 0.1, h: 0.4, fontSize: 8.5, color: C.white, align: 'center', fontFace: 'Calibri' });
  });

  if (data.bullets) {
    s.addText(data.bullets.map((b) => ({ text: b, options: { bullet: { code: '25CF' }, breakLine: true } })), {
      x: M.l + 0.1, y: 3.1, w: CW - 0.2, h: 1.7, fontSize: 10.5, color: 'D1DDE9', fontFace: 'Calibri',
    });
  }
}

function addCards(pptx, data) {
  const s = freshSlide(pptx);
  addSlideHeader(s, data.title, true);

  const n = data.cards.length;
  const cardW = (CW - (n - 1) * 0.15) / n;
  const cardH = M.bottom - 1.6;

  data.cards.forEach((card, i) => {
    const x = M.l + i * (cardW + 0.15);
    const y = 1.55;
    s.addShape('rect', { x, y, w: cardW, h: cardH, fill: { color: C.white }, line: { color: C.border, width: 0.75 } });
    s.addShape('rect', { x, y, w: cardW, h: 0.07, fill: { color: card.accent || C.gold } });
    s.addText(card.title, { x: x + 0.1, y: y + 0.18, w: cardW - 0.2, h: 0.35, fontSize: 10, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(card.desc, { x: x + 0.1, y: y + 0.55, w: cardW - 0.2, h: cardH - 0.65, fontSize: 8.5, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

function addTwoCol(pptx, data) {
  const s = freshSlide(pptx);
  addSlideHeader(s, data.title, true);

  const colW = (CW - 0.25) / 2;
  const boxH = M.bottom - 1.55;

  [{ col: data.left, x: M.l, accent: C.navy }, { col: data.right, x: M.l + colW + 0.25, accent: C.gold }].forEach(({ col, x, accent }) => {
    s.addShape('rect', { x, y: 1.55, w: colW, h: boxH, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addShape('rect', { x, y: 1.55, w: colW, h: 0.38, fill: { color: accent } });
    s.addText(col.heading, { x: x + 0.1, y: 1.6, w: colW - 0.2, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri' });
    s.addText(col.items.map((t) => ({ text: t, options: { bullet: true, breakLine: true } })), {
      x: x + 0.12, y: 2.05, w: colW - 0.24, h: boxH - 0.55, fontSize: 9, color: C.slate, fontFace: 'Calibri', valign: 'top',
    });
  });
}

function addDeliverOrExpect(pptx, data, accent) {
  const s = freshSlide(pptx);
  addSlideHeader(s, data.title, true);

  const colW = (CW - 0.2) / 2;
  let y = 1.55;
  const maxY = M.bottom - 0.05;

  data.groups.forEach((group, gi) => {
    const col = gi % 2;
    const x = M.l + col * (colW + 0.2);
    if (col === 0 && gi > 0 && y > 1.55) y = 1.55;
    if (gi === 2) y = 1.55;
    if (gi >= 2) {
      const row = Math.floor((gi - 2) / 2) + (gi < 2 ? 0 : 1);
      if (gi >= 2) {
        // layout: 2 columns, groups flow top-to-bottom in each column
      }
    }
  });

  // Clean 2-column layout: first 3 left, last 2 right (or split evenly)
  const leftGroups = data.groups.slice(0, Math.ceil(data.groups.length / 2));
  const rightGroups = data.groups.slice(Math.ceil(data.groups.length / 2));

  [{ groups: leftGroups, x: M.l }, { groups: rightGroups, x: M.l + colW + 0.2 }].forEach((side) => {
    let gy = 1.55;
    side.groups.forEach((group) => {
      s.addText(group.title, { x: side.x, y: gy, w: colW, h: 0.22, fontSize: 9, bold: true, color: accent, fontFace: 'Calibri' });
      gy += 0.24;
      group.items.forEach((item) => {
        s.addText(`• ${item}`, { x: side.x + 0.05, y: gy, w: colW - 0.1, h: 0.2, fontSize: 7.5, color: C.slate, fontFace: 'Calibri' });
        gy += 0.22;
      });
      gy += 0.1;
    });
  });
}

function addProcess(pptx, data) {
  const s = freshSlide(pptx);
  addSlideHeader(s, data.title, true);

  const cols = data.cols || 3;
  const rows = Math.ceil(data.steps.length / cols);
  const gapX = 0.12;
  const gapY = 0.15;
  const cardW = (CW - (cols - 1) * gapX) / cols;
  const availH = M.bottom - 1.6;
  const cardH = (availH - (rows - 1) * gapY) / rows;

  data.steps.forEach((step, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = M.l + col * (cardW + gapX);
    const y = 1.55 + row * (cardH + gapY);

    s.addShape('rect', { x, y, w: cardW, h: cardH, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addShape('ellipse', { x: x + 0.1, y: y + 0.1, w: 0.35, h: 0.35, fill: { color: C.navy } });
    s.addText(step.num, { x: x + 0.1, y: y + 0.13, w: 0.35, h: 0.3, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    s.addText(step.title, { x: x + 0.1, y: y + 0.5, w: cardW - 0.2, h: 0.28, fontSize: 8.5, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(step.desc, { x: x + 0.1, y: y + 0.78, w: cardW - 0.2, h: cardH - 0.85, fontSize: 7.5, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

function addTable(pptx, data) {
  const s = freshSlide(pptx);
  addSlideHeader(s, data.title, true);

  const fs = data.fontSize || 8;
  const tableRows = [
    data.headers.map((h) => ({ text: h, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: fs } })),
    ...data.rows.map((row, ri) =>
      row.map((cell) => ({
        text: cell,
        options: { color: C.slate, fontSize: fs, fill: { color: ri % 2 === 0 ? C.white : C.light } },
      }))
    ),
  ];

  s.addTable(tableRows, {
    x: M.l, y: 1.52, w: CW,
    fontFace: 'Calibri',
    border: { type: 'solid', color: C.border, pt: 0.5 },
    colW: data.colW || data.headers.map(() => CW / data.headers.length),
    autoPage: false,
    rowH: 0.32,
  });
}

function addBullets(pptx, data) {
  const s = freshSlide(pptx);
  addSlideHeader(s, data.title, true);

  let contentY = 1.55;
  if (data.highlight) {
    s.addShape('rect', { x: M.l, y: contentY, w: CW, h: 0.38, fill: { color: C.gold } });
    s.addText(data.highlight, {
      x: M.l + 0.1, y: contentY + 0.04, w: CW - 0.2, h: 0.3,
      fontSize: 9.5, bold: true, color: C.white, fontFace: 'Calibri', valign: 'middle',
    });
    contentY += 0.48;
  }

  s.addText(data.bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), {
    x: M.l + 0.1, y: contentY, w: CW - 0.2, h: M.bottom - contentY,
    fontSize: 10, color: C.slate, fontFace: 'Calibri', paraSpaceAfter: 6, valign: 'top',
  });
}

function addClosing(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.06, fill: { color: C.gold } });

  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({ path: LOGO_PATH, x: (SLIDE.w - 2.8) / 2, y: 0.45, w: 2.8, h: 0.93 });
  }

  s.addText('Let\'s Build the Future Together', {
    x: M.l, y: 1.65, w: CW, h: 0.55, fontSize: 26, bold: true, color: C.white, align: 'center', fontFace: 'Calibri',
  });
  s.addText('Partner with Mantra Global Education', {
    x: M.l, y: 2.25, w: CW, h: 0.35, fontSize: 14, color: C.goldLight, align: 'center', fontFace: 'Calibri',
  });

  const contact = [`${BRAND.founder} — Founder`, BRAND.email, BRAND.phone, BRAND.web, 'Focus: USA · United Kingdom · Australia'];
  s.addText(contact.map((t) => ({ text: t, options: { breakLine: true, align: 'center' } })), {
    x: 1.5, y: 2.85, w: 7, h: 1.5, fontSize: 11, color: 'D1DDE9', fontFace: 'Calibri',
  });

  s.addText(BRAND.tagline, {
    x: M.l, y: 4.7, w: CW, h: 0.3, fontSize: 11, color: C.gold, align: 'center', italic: true, fontFace: 'Calibri',
  });
}

// ─── Build ─────────────────────────────────────────────────────────
function createDeck() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = BRAND.name;
  pptx.company = BRAND.name;
  pptx.subject = 'Partnership Program';
  pptx.title = `${BRAND.name} — Partnership Program`;
  slideCounter = 0;

  for (const slide of DECK) {
    switch (slide.type) {
      case 'cover': addCover(pptx); break;
      case 'agenda': addAgenda(pptx); break;
      case 'section': addSection(pptx, slide); break;
      case 'objective': addObjective(pptx, slide); break;
      case 'goals': addGoals(pptx, slide); break;
      case 'stats': addStats(pptx, slide); break;
      case 'cards': addCards(pptx, slide); break;
      case 'two-col': addTwoCol(pptx, slide); break;
      case 'deliver': addDeliverOrExpect(pptx, slide, C.navy); break;
      case 'expect': addDeliverOrExpect(pptx, slide, C.gold); break;
      case 'process': addProcess(pptx, slide); break;
      case 'table': addTable(pptx, slide); break;
      case 'bullets': addBullets(pptx, slide); break;
      case 'closing': addClosing(pptx); break;
    }
  }
  return pptx;
}

// ─── HTML / PDF (aligned to 16:9) ─────────────────────────────────
function buildHtml() {
  const css = `
    @page{size:13.333in 7.5in;margin:0}*{box-sizing:border-box}
    body{margin:0;font-family:'Segoe UI',Calibri,Arial,sans-serif}
    .slide{width:13.333in;height:7.5in;page-break-after:always;position:relative;overflow:hidden;padding:36px 44px}
    .cover{background:linear-gradient(135deg,#00234E,#003d7a);color:#fff;display:flex;flex-direction:column;justify-content:center}
    .cover .logo{width:320px;margin-bottom:20px}.cover .eyebrow{color:#C89116;text-transform:uppercase;letter-spacing:.12em;font-size:11px;font-weight:600}
    .cover h1{font-size:42px;margin:10px 0 6px}.cover .sub{font-size:18px;color:#E8B84A;margin:0 0 16px}
    .cover .tagline{font-size:14px;color:#b8c5d6;font-style:italic}.cover .meta{margin-top:24px;font-size:11px;color:#8FA3BC}
    .section{background:#00234E;color:#fff;display:flex;flex-direction:column;justify-content:center;padding-left:56px}
    .section .logo-pos{position:absolute;top:28px;right:44px;width:200px}
    .section .sec-num{font-size:72px;font-weight:800;color:#C89116;line-height:1}
    .section h1{font-size:36px;margin:6px 0}.section p{font-size:16px;color:#b8c5d6}
    .content{border-top:5px solid #00234E}
    .content .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #E2E8F0}
    .logo-sm{height:42px;width:auto}.content h1{font-size:24px;color:#00234E;margin:0 0 12px}
    .callout,.highlight{background:#F1F5F9;border-left:4px solid #C89116;padding:10px 14px;font-size:12px;font-weight:600;color:#00234E;margin-bottom:12px}
    .highlight{background:#C89116;color:#fff;border:none}
    .obj-grid,.goal-grid,.card-grid{display:grid;gap:10px;margin:10px 0}
    .obj-grid{grid-template-columns:repeat(3,1fr)}.goal-grid{grid-template-columns:repeat(2,1fr)}.card-grid{grid-template-columns:repeat(4,1fr)}
    .obj-card,.goal-card,.card{border:1px solid #CBD5E1;padding:12px;border-radius:3px}
    .obj-card .num{font-size:24px;font-weight:800;color:#C89116}.obj-card h3,.card h3{font-size:12px;color:#00234E;margin:4px 0}
    .goal-card .metric{font-size:30px;font-weight:800;color:#00234E;display:block}.stat-row{display:flex;gap:10px;margin:12px 0}
    .stat{flex:1;background:#00234E;color:#fff;padding:14px;text-align:center;border:2px solid #C89116}
    .stat .val{font-size:28px;font-weight:800;color:#C89116;display:block}
    .cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .col{padding:14px;background:#F1F5F9}.col.navy h3,.col.gold h3{color:#fff;padding:8px;margin:-14px -14px 10px;font-size:13px}
    .col.navy h3{background:#00234E}.col.gold h3{background:#C89116}
    .de-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:10px}
    .grp strong{color:#00234E;display:block;margin-top:8px;font-size:11px}.grp ul{margin:4px 0;padding-left:16px}
    .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.steps.five{grid-template-columns:repeat(5,1fr)}
    .step{background:#F1F5F9;padding:10px;border:1px solid #CBD5E1}
    .step .n{display:inline-block;background:#00234E;color:#fff;width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700}
    .step h3{font-size:10px;color:#00234E;margin:6px 0 3px}.step p{font-size:9px;color:#64748B;margin:0}
    table{width:100%;border-collapse:collapse;font-size:9px;margin-top:6px}
    th{background:#00234E;color:#fff;text-align:left;padding:7px}td{border:1px solid #CBD5E1;padding:6px;color:#334155}
    tr:nth-child(even) td{background:#F8FAFC}.bl{font-size:12px;line-height:1.5;color:#334155}.bl li{margin-bottom:6px}
    .fn{font-size:9px;color:#64748B;font-style:italic;margin-top:8px}
    .closing{background:#00234E;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .logo-center{width:280px;margin-bottom:16px}.closing h1{font-size:32px}.closing .sub{color:#E8B84A;font-size:16px}
    .contact{font-size:13px;color:#D1DDE9;margin:16px 0}.closing .tagline{color:#C89116;font-style:italic}
    .footer{position:absolute;bottom:16px;left:44px;right:44px;font-size:8px;color:#94A3B8;border-top:3px solid #C89116;padding-top:6px}
    @media print{.slide{page-break-after:always;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  `;

  const sections = DECK.map((slide, i) => {
    if (slide.type === 'cover') return `<section class="slide cover"><img src="assets/gem-logo-sm.png" class="logo" alt="Mantra"/><p class="eyebrow">Confidential · ${new Date().getFullYear()}</p><h1>Partnership Program</h1><p class="sub">Structured Collaboration for USA · UK · Australia</p><p class="tagline">${BRAND.tagline}</p><div class="meta"><p>Founder: ${BRAND.founder}</p></div></section>`;
    if (slide.type === 'section') return `<section class="slide section"><img src="assets/gem-logo-sm.png" class="logo-pos" alt="Mantra"/><span class="sec-num">${slide.num}</span><h1>${slide.title}</h1><p>${slide.subtitle}</p></section>`;
    if (slide.type === 'closing') return `<section class="slide closing"><img src="assets/gem-logo-sm.png" class="logo-center" alt="Mantra"/><h1>Let's Build the Future Together</h1><p class="sub">Partner with Mantra Global Education</p><div class="contact"><p>${BRAND.founder} — Founder</p><p>${BRAND.email} · ${BRAND.phone}</p><p>${BRAND.web}</p></div><p class="tagline">${BRAND.tagline}</p></section>`;

    let body = slide.title ? `<h1>${slide.title}</h1>` : '';
    if (slide.headline) body += `<div class="callout">${slide.headline}</div>`;
    if (slide.highlight) body += `<div class="highlight">${slide.highlight}</div>`;
    if (slide.objectives) body += '<div class="obj-grid">' + slide.objectives.map((o,j)=>`<div class="obj-card"><span class="num">${j+1}</span><h3>${o.title}</h3><p>${o.desc}</p></div>`).join('') + '</div>';
    if (slide.goals) body += '<div class="goal-grid">' + slide.goals.map(g=>`<div class="goal-card"><span class="metric">${g.metric}</span><span>${g.label}</span></div>`).join('') + '</div>' + (slide.footnote?`<p class="fn">${slide.footnote}</p>`:'');
    if (slide.stats) body += '<div class="stat-row">' + slide.stats.map(st=>`<div class="stat"><span class="val">${st.value}</span><span>${st.label}</span></div>`).join('') + '</div>';
    if (slide.cards) body += '<div class="card-grid">' + slide.cards.map(c=>`<div class="card"><h3>${c.title}</h3><p>${c.desc}</p></div>`).join('') + '</div>';
    if (slide.left) body += `<div class="cols"><div class="col navy"><h3>${slide.left.heading}</h3><ul>${slide.left.items.map(i=>`<li>${i}</li>`).join('')}</ul></div><div class="col gold"><h3>${slide.right.heading}</h3><ul>${slide.right.items.map(i=>`<li>${i}</li>`).join('')}</ul></div></div>`;
    if (slide.groups) body += '<div class="de-grid">' + [{g:slide.groups.slice(0,Math.ceil(slide.groups.length/2))},{g:slide.groups.slice(Math.ceil(slide.groups.length/2))}].map(col=>`<div>${col.g.map(grp=>`<div class="grp"><strong>${grp.title}</strong><ul>${grp.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>`).join('') + '</div>';
    if (slide.steps) body += `<div class="steps${slide.cols===5?' five':''}">` + slide.steps.map(st=>`<div class="step"><span class="n">${st.num}</span><h3>${st.title}</h3><p>${st.desc}</p></div>`).join('') + '</div>';
    if (slide.bullets) body += `<ul class="bl">${slide.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`;
    if (slide.headers) body += `<table><thead><tr>${slide.headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${slide.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

    return `<section class="slide content"><div class="top"><img src="assets/gem-logo-sm.png" class="logo-sm" alt="Mantra"/><span>${String(i).padStart(2,'0')}</span></div>${body}<div class="footer">${BRAND.name} | Partnership Program 2026</div></section>`;
  }).join('');

  const out = path.join(OUT_DIR, 'Mantra-Global-Education-Partnership-Program.html');
  fs.writeFileSync(out, `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Mantra Partnership Program</title><style>${css}</style></head><body>${sections}</body></html>`, 'utf8');
  return out;
}

async function buildPdf(htmlPath) {
  const pdfPath = path.join(OUT_DIR, 'Mantra-Global-Education-Partnership-Program.pdf');
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const { execSync } = await import('child_process');
  try {
    execSync(`"${chrome}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "file://${htmlPath}"`, { stdio: 'pipe' });
    return pdfPath;
  } catch { return null; }
}

const pptx = createDeck();
const pptxPath = path.join(OUT_DIR, 'Mantra-Global-Education-Partnership-Program.pptx');
await pptx.writeFile({ fileName: pptxPath });
const htmlPath = buildHtml();
const pdfPath = await buildPdf(htmlPath);

console.log('\n✅ Mantra Partnership Deck v3 generated (aligned layout + official logo):\n');
console.log(`   PPTX : ${pptxPath}`);
console.log(`   PDF  : ${pdfPath || '(open HTML → Print → Save as PDF)'}`);
console.log(`   HTML : ${htmlPath}`);
console.log(`   LOGO : ${LOGO_PATH}\n`);
