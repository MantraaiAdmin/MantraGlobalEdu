/**
 * Mantra Global Education — KC Consultancy Partnership Pitch Deck
 * McKinsey/Bain/BCG-style premium PPTX, 16:9, navy/gold/white theme.
 * Run: node docs/generate-kc-consultancy-deck.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PptxGenJS from 'pptxgenjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;
const ASSETS = path.join(__dirname, 'kc-deck-assets');
const IMG = {
  hero: path.join(ASSETS, 'students-campus-hero.png'),
  campus1: path.join(ASSETS, 'university-campus-1.png'),
  campus2: path.join(ASSETS, 'university-campus-2.png'),
  graduate: path.join(ASSETS, 'student-graduate-portrait.png'),
  collab: path.join(ASSETS, 'students-collaboration.png'),
};

const SLIDE = { w: 10, h: 5.625 };
const M = { l: 0.45, r: 0.45, t: 0.2, content: 0.85, bottom: 5.15, footer: 5.3 };
const CW = SLIDE.w - M.l - M.r;

const C = {
  navy: '00234E', navyLight: '0D3A6E', gold: 'C89116', goldLight: 'E8B84A',
  white: 'FFFFFF', slate: '334155', muted: '5A6B7D', light: 'F1F5F9', border: 'CBD5E1',
  success: '1A7A4A', successLight: 'EDF7F0',
};

const BRAND = {
  name: 'Mantra Global Education',
  tagline: 'Your Journey. Our Guidance. Global Success.',
  founder: 'Vinodhini Y.',
  founderTitle: 'Founder, Mantra Global Education',
  web: 'mantraglobaledu.com',
  hq: 'Coimbatore, Tamil Nadu, India',
  partner: 'KC Consultancy',
};

let slideCounter = 0;
const TOTAL_SLIDES = 17;

function freshSlide(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  return s;
}

function addFooter(s) {
  s.addShape('rect', { x: 0, y: M.footer, w: SLIDE.w, h: 0.05, fill: { color: C.gold } });
  s.addText(`${BRAND.name}  |  Strategic Partnership Proposal for ${BRAND.partner}`, {
    x: M.l, y: M.footer - 0.2, w: CW - 0.6, h: 0.18, fontSize: 7, color: C.muted, fontFace: 'Calibri',
  });
}

function addPageNum(s) {
  slideCounter++;
  s.addText(`${String(slideCounter).padStart(2, '0')} / ${TOTAL_SLIDES}`, {
    x: SLIDE.w - M.r - 0.6, y: M.footer - 0.2, w: 0.6, h: 0.18,
    fontSize: 7, color: C.muted, align: 'right', fontFace: 'Calibri',
  });
}

function addHeader(s, title, label, summary) {
  s.addShape('rect', { x: M.l, y: M.content - 0.06, w: 0.7, h: 0.045, fill: { color: C.gold } });
  if (label) {
    s.addText(label.toUpperCase(), {
      x: M.l, y: M.t + 0.02, w: CW, h: 0.22, fontSize: 9.5, bold: true, color: C.gold,
      fontFace: 'Calibri', charSpacing: 1.2,
    });
  }
  s.addText(title, {
    x: M.l, y: M.content, w: CW - 0.6, h: 0.42, fontSize: 21, bold: true, color: C.navy,
    fontFace: 'Calibri', valign: 'top',
  });
  if (summary) {
    s.addText(summary, {
      x: M.l, y: M.content + 0.4, w: CW - 0.3, h: 0.32, fontSize: 9.5, italic: true,
      color: C.muted, fontFace: 'Calibri', valign: 'top',
    });
  }
  addFooter(s);
  addPageNum(s);
}

function contentTop(hasSummary) { return hasSummary ? 1.65 : 1.45; }

// ─── 01 COVER ──────────────────────────────────────────────────────
function slideCover(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: 0.1, h: SLIDE.h, fill: { color: C.gold } });

  // Right-side hero image panel
  if (fs.existsSync(IMG.hero)) {
    s.addImage({ path: IMG.hero, x: 6.15, y: 0, w: 3.85, h: SLIDE.h, sizing: { type: 'cover', w: 3.85, h: SLIDE.h } });
    s.addShape('rect', { x: 6.15, y: 0, w: 3.85, h: SLIDE.h, fill: { color: C.navy, transparency: 55 } });
  }

  s.addText('CONFIDENTIAL · PARTNERSHIP PROPOSAL · 2026', {
    x: M.l, y: 0.55, w: 5.4, h: 0.3, fontSize: 10, bold: true, color: C.goldLight,
    fontFace: 'Calibri', charSpacing: 1.5,
  });
  s.addText('Mantra Global Education', {
    x: M.l, y: 0.95, w: 5.6, h: 0.75, fontSize: 34, bold: true, color: C.white, fontFace: 'Calibri',
  });
  s.addText(BRAND.tagline, {
    x: M.l, y: 1.62, w: 5.4, h: 0.3, fontSize: 12.5, italic: true, color: '8FA3BC', fontFace: 'Calibri',
  });

  s.addShape('rect', { x: M.l, y: 2.25, w: 0.55, h: 0.04, fill: { color: C.gold } });
  s.addText('Strategic Partnership Proposal', {
    x: M.l, y: 2.4, w: 5.5, h: 0.5, fontSize: 22, bold: true, color: C.gold, fontFace: 'Calibri',
  });
  s.addText(`Presented to ${BRAND.partner}`, {
    x: M.l, y: 2.88, w: 5.4, h: 0.35, fontSize: 16, color: C.white, fontFace: 'Calibri',
  });
  s.addText('An established leader in student recruitment consultancy', {
    x: M.l, y: 3.24, w: 5.3, h: 0.35, fontSize: 11, italic: true, color: '8FA3BC', fontFace: 'Calibri',
  });

  const meta = [
    `Prepared for: Regional Manager, ${BRAND.partner}`,
    `Presenter: ${BRAND.founder}, Founder`,
    `${BRAND.web}  ·  ${BRAND.hq}`,
  ];
  s.addText(meta.map((t) => ({ text: t, options: { breakLine: true } })), {
    x: M.l, y: 4.35, w: 5.5, h: 0.9, fontSize: 9.5, color: 'B8C5D6', fontFace: 'Calibri', lineSpacing: 16,
  });
}

// ─── 02 AGENDA ─────────────────────────────────────────────────────
function slideAgenda(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Agenda', 'Executive Overview', 'A structured review of Mantra\u2019s capabilities, operating model, and partnership value proposition.');

  const items = [
    ['01', 'Who We Are', 'Leadership, mission, values & track record', C.navy],
    ['02', 'What We Deliver', 'Full service stack incl. education loan assistance', C.gold],
    ['03', 'How We Operate', 'Technology platform & student journey workflow', C.navy],
    ['04', 'Operational Excellence', 'SOPs, quality assurance & compliance', C.gold],
    ['05', 'Growth & Global Reach', '19+ destinations & 3-year roadmap', C.navy],
    ['06', 'Partnership Proposal', 'What Mantra brings to KC Consultancy', C.gold],
  ];

  const cardW = (CW - 0.3) / 3;
  const cardH = 1.55;
  items.forEach((item, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M.l + col * (cardW + 0.15);
    const y = contentTop(true) + row * (cardH + 0.18);
    s.addShape('rect', { x, y, w: cardW, h: cardH, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addShape('rect', { x, y, w: cardW, h: 0.06, fill: { color: item[3] } });
    s.addText(item[0], { x: x + 0.12, y: y + 0.14, w: 0.6, h: 0.4, fontSize: 20, bold: true, color: item[3], fontFace: 'Calibri' });
    s.addText(item[1], { x: x + 0.12, y: y + 0.55, w: cardW - 0.24, h: 0.3, fontSize: 10.5, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(item[2], { x: x + 0.12, y: y + 0.85, w: cardW - 0.24, h: 0.6, fontSize: 8, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

// ─── 03 LEADERSHIP & CREDENTIALS ───────────────────────────────────
function slideLeadership(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Leadership & Credentials', 'Company Profile', 'Founder-led organisation combining international education expertise with technology and AI innovation.');

  const top = contentTop(true);
  const kpis = [
    ['10+', 'Years in Intl. Education'],
    ['700+', 'Students Guided'],
    ['19+', 'Study Destinations'],
    ['42+', 'Partner Universities'],
  ];
  const kw = (6.0 - 0.3) / 4;
  kpis.forEach((k, i) => {
    const x = M.l + i * (kw + 0.1);
    s.addShape('rect', { x, y: top, w: kw, h: 0.85, fill: { color: C.navy } });
    s.addText(k[0], { x, y: top + 0.08, w: kw, h: 0.4, fontSize: 20, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
    s.addText(k[1], { x: x + 0.04, y: top + 0.5, w: kw - 0.08, h: 0.32, fontSize: 7, color: C.white, align: 'center', fontFace: 'Calibri' });
  });

  const boxY = top + 1.05;
  s.addShape('rect', { x: M.l, y: boxY, w: 6.0, h: 2.1, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
  s.addText(`Founder — ${BRAND.founder}`, { x: M.l + 0.15, y: boxY + 0.12, w: 5.7, h: 0.3, fontSize: 12, bold: true, color: C.navy, fontFace: 'Calibri' });
  const bullets = [
    'Former IDP Education professional',
    'Student recruitment & university admissions',
    'Visa guidance & student counselling',
    'Technology & AI background',
    'Process-driven, ethical operations',
  ];
  s.addText(bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), {
    x: M.l + 0.15, y: boxY + 0.5, w: 5.7, h: 1.5, fontSize: 9.5, color: C.slate, fontFace: 'Calibri', paraSpaceAfter: 4, valign: 'top',
  });

  // Right-side portrait image
  if (fs.existsSync(IMG.graduate)) {
    const px = 6.65, py = top, pw = 2.9, ph = 2.75;
    s.addImage({ path: IMG.graduate, x: px, y: py, w: pw, h: ph, sizing: { type: 'cover', w: pw, h: ph } });
    s.addShape('rect', { x: px, y: py, w: pw, h: ph, line: { color: C.gold, width: 1.5 } });
  }

  s.addShape('rect', { x: M.l, y: boxY + 2.3, w: 9.1, h: 0.6, fill: { color: C.navy } });
  s.addText('Why This Matters for KC Consultancy:', {
    x: M.l + 0.15, y: boxY + 2.36, w: 2.3, h: 0.48, fontSize: 9, bold: true, color: C.gold, fontFace: 'Calibri', valign: 'middle',
  });
  s.addText('This leadership brings global execution depth designed to plug into KC Consultancy\u2019s already-established regional operations and client relationships \u2014 not replace them.', {
    x: M.l + 2.5, y: boxY + 2.36, w: 6.6, h: 0.48, fontSize: 9, color: C.white, fontFace: 'Calibri', valign: 'middle',
  });
}

// ─── 04 MISSION VISION VALUES ──────────────────────────────────────
function slideMVV(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Mission, Vision & Values', 'Strategic Foundation');

  const top = contentTop(false);
  const colW = (CW - 0.2) / 2;
  s.addShape('rect', { x: M.l, y: top, w: colW, h: 0.95, fill: { color: 'FBF3E0' }, line: { color: C.gold, width: 0.75 } });
  s.addText('MISSION', { x: M.l + 0.12, y: top + 0.08, w: colW - 0.24, h: 0.2, fontSize: 8.5, bold: true, color: C.gold, fontFace: 'Calibri' });
  s.addText('Empowering students to achieve global education aspirations through transparent counselling, personalised guidance, and technology-driven services.', {
    x: M.l + 0.12, y: top + 0.28, w: colW - 0.24, h: 0.62, fontSize: 8.5, color: C.slate, fontFace: 'Calibri', valign: 'top',
  });

  const x2 = M.l + colW + 0.2;
  s.addShape('rect', { x: x2, y: top, w: colW, h: 0.95, fill: { color: 'FBF3E0' }, line: { color: C.gold, width: 0.75 } });
  s.addText('VISION', { x: x2 + 0.12, y: top + 0.08, w: colW - 0.24, h: 0.2, fontSize: 8.5, bold: true, color: C.gold, fontFace: 'Calibri' });
  s.addText('To become one of India\u2019s most trusted and technology-enabled international education partners.', {
    x: x2 + 0.12, y: top + 0.28, w: colW - 0.24, h: 0.62, fontSize: 8.5, color: C.slate, fontFace: 'Calibri', valign: 'top',
  });

  const values = [
    ['Student First', 'Outcomes over volume'],
    ['Integrity', 'Ethical counselling always'],
    ['Transparency', 'Clear fees & processes'],
    ['Professionalism', 'Executive-grade delivery'],
    ['Innovation', 'AI & digital workflows'],
    ['Long-term Partnerships', 'Mutual growth mindset'],
  ];
  const vTop = top + 1.15;
  const vw = (CW - 0.5) / 3;
  values.forEach((v, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M.l + col * (vw + 0.25);
    const y = vTop + row * 1.05;
    s.addShape('rect', { x, y, w: vw, h: 0.9, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addShape('ellipse', { x: x + 0.12, y: y + 0.12, w: 0.28, h: 0.28, fill: { color: C.navy } });
    s.addText(String(i + 1), { x: x + 0.12, y: y + 0.14, w: 0.28, h: 0.24, fontSize: 9, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
    s.addText(v[0], { x: x + 0.48, y: y + 0.1, w: vw - 0.6, h: 0.28, fontSize: 9.5, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(v[1], { x: x + 0.12, y: y + 0.48, w: vw - 0.24, h: 0.35, fontSize: 7.5, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

// ─── 05 SERVICES ────────────────────────────────────────────────────
function slideServices(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'End-to-End Student Services', 'Service Portfolio', 'Comprehensive delivery from first counselling session through post-arrival support — including financial services.');

  const services = [
    ['Career Counselling', 'Profile & pathway planning', false],
    ['University Selection', 'Data-driven shortlisting', false],
    ['Application Processing', 'End-to-end submissions', false],
    ['SOP & LOR Guidance', 'Quality documentation', false],
    ['Scholarship Assistance', 'Funding optimisation', false],
    ['Education Loan Support', 'Bank coordination & disbursement', true],
    ['Visa Documentation', 'Checklist & verification', false],
    ['Visa Filing', 'Submission & tracking', false],
    ['Accommodation Assistance', 'Housing support abroad', false],
    ['Overseas Health Insurance', 'OSHC coordination', false],
    ['Forex Assistance', 'Remittance support', false],
    ['Pre-Departure Briefing', 'Travel readiness sessions', false],
  ];

  const top = contentTop(true);
  const cols = 4;
  const gap = 0.1;
  const cw = (CW - (cols - 1) * gap) / cols;
  const ch = 0.98;
  services.forEach((svc, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = M.l + col * (cw + gap);
    const y = top + row * (ch + gap);
    const isLoan = svc[2];
    s.addShape('rect', {
      x, y, w: cw, h: ch,
      fill: { color: isLoan ? C.successLight : C.light },
      line: { color: isLoan ? C.success : C.border, width: isLoan ? 1.25 : 0.5 },
    });
    if (isLoan) {
      s.addShape('rect', { x, y, w: cw, h: 0.05, fill: { color: C.success } });
      s.addText('KEY SERVICE', { x: x + 0.08, y: y + 0.08, w: cw - 0.16, h: 0.16, fontSize: 6, bold: true, color: C.success, fontFace: 'Calibri' });
    }
    s.addText(svc[0], { x: x + 0.08, y: y + (isLoan ? 0.26 : 0.1), w: cw - 0.16, h: 0.36, fontSize: 8.5, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'top' });
    s.addText(svc[1], { x: x + 0.08, y: y + (isLoan ? 0.62 : 0.48), w: cw - 0.16, h: 0.35, fontSize: 7, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });

  s.addText('Also included: Visa Filing \u00B7 Forex Assistance \u00B7 Accommodation \u00B7 Overseas Health Insurance \u00B7 Post-Arrival Support', {
    x: M.l, y: M.bottom - 0.1, w: CW, h: 0.2, fontSize: 7, italic: true, color: C.muted, fontFace: 'Calibri',
  });
}

// ─── 06 TECHNOLOGY ──────────────────────────────────────────────────
function slideTechnology(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Digital-First Operations Platform', 'Technology Advantage', 'Enterprise-grade technology enabling transparency, speed, and scalable partnership management.');

  const items = [
    ['CRM & Lifecycle', 'Lead-to-alumni student lifecycle management', false],
    ['Student Portal', 'Applications, documents & notifications hub', false],
    ['Application Dashboard', 'Real-time tracking across universities', false],
    ['AI University Engine', 'Profile-based recommendations, 19+ destinations', true],
    ['Secure Document Mgmt', 'Verified, version-controlled student files', false],
    ['Automated Notifications', 'Deadline alerts & status updates', false],
    ['Counsellor Dashboard', 'Task management & performance metrics', false],
    ['Partner Dashboard', 'Shared visibility: pipeline, conversions, commissions', true],
    ['Analytics & Automation', 'Reporting, KPIs & workflow automation', false],
  ];

  const top = contentTop(true);
  const cols = 3;
  const gap = 0.15;
  const cw = (CW - (cols - 1) * gap) / cols;
  const ch = 1.05;
  items.forEach((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = M.l + col * (cw + gap);
    const y = top + row * (ch + 0.1);
    const featured = it[2];
    s.addShape('rect', {
      x, y, w: cw, h: ch,
      fill: { color: featured ? C.navy : C.light },
      line: { color: featured ? C.gold : C.border, width: featured ? 1 : 0.5 },
    });
    s.addText(it[0], { x: x + 0.12, y: y + 0.12, w: cw - 0.24, h: 0.35, fontSize: 10, bold: true, color: featured ? C.gold : C.navy, fontFace: 'Calibri' });
    s.addText(it[1], { x: x + 0.12, y: y + 0.48, w: cw - 0.24, h: 0.5, fontSize: 7.5, color: featured ? 'D1DDE9' : C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

// ─── 07 STUDENT JOURNEY ─────────────────────────────────────────────
function slideJourney(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Student Journey Workflow', 'Process Architecture', 'Standardised, auditable process covering every touchpoint from lead to alumni.');

  const stepsL = [
    'Lead Generation', 'CRM Registration', 'Counsellor Assignment', 'Career Counselling',
    'Profile Evaluation', 'University Shortlisting', 'Document Collection', 'Application Submission',
    'Offer Letter', 'Scholarship Guidance',
  ];
  const stepsR = [
    'Education Loan Assistance', 'Visa Documentation & Filing', 'Accommodation Assistance', 'Forex Assistance',
    'Flight Booking Guidance', 'Pre-Departure Session', 'Arrival Support', 'Alumni Engagement',
  ];

  const top = contentTop(true);
  const colW = 4.55;
  let y = top;
  const rowH = 0.29;
  stepsL.forEach((step, i) => {
    s.addShape('ellipse', { x: M.l, y: y + 0.04, w: 0.09, h: 0.09, fill: { color: C.gold } });
    s.addText(`${i + 1}. ${step}`, { x: M.l + 0.18, y, w: colW - 0.18, h: rowH, fontSize: 9, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'middle' });
    y += rowH;
  });

  y = top;
  const x2 = M.l + colW + 0.25;
  const rw = 2.55;
  stepsR.forEach((step, i) => {
    const isLoan = step.includes('Loan');
    s.addShape('ellipse', { x: x2, y: y + 0.04, w: 0.09, h: 0.09, fill: { color: isLoan ? C.success : C.gold } });
    s.addText(`${i + 11}. ${step}`, {
      x: x2 + 0.18, y, w: rw - 0.18, h: rowH, fontSize: 9, bold: true,
      color: isLoan ? C.success : C.navy, fontFace: 'Calibri', valign: 'middle',
    });
    y += rowH;
  });

  // Right image + loan detail callout
  const ix = x2 + rw + 0.2;
  const iw = SLIDE.w - M.r - ix;
  if (fs.existsSync(IMG.collab)) {
    const ih = 1.55;
    s.addImage({ path: IMG.collab, x: ix, y: top, w: iw, h: ih, sizing: { type: 'cover', w: iw, h: ih } });
    s.addShape('rect', { x: ix, y: top, w: iw, h: ih, line: { color: C.gold, width: 1 } });
  }
  s.addShape('rect', { x: ix, y: top + 1.7, w: iw, h: rowH * 8 - 1.7 + (rowH * 0), fill: { color: C.successLight }, line: { color: C.success, width: 0.75 } });
  s.addText('Loan Assistance', { x: ix + 0.1, y: top + 1.78, w: iw - 0.2, h: 0.22, fontSize: 8, bold: true, color: C.success, fontFace: 'Calibri' });
  s.addText('Bank/NBFC coordination \u00B7 Financial planning \u00B7 Co-applicant docs \u00B7 Sanction follow-up \u00B7 Disbursement aligned with visa timeline', {
    x: ix + 0.1, y: top + 2.0, w: iw - 0.2, h: 1.0, fontSize: 7, color: C.slate, fontFace: 'Calibri', valign: 'top',
  });
}

// ─── 08 WHY PARTNER ─────────────────────────────────────────────────
function slideWhyPartner(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Why Partner With Mantra', 'Value Proposition');

  const items = [
    ['Experienced Leadership', 'Founder-led accountability'],
    ['Former IDP Expertise', 'Global-standard practices'],
    ['Technology-First', 'CRM, portals, AI, dashboard'],
    ['Standardised Processes', 'SOPs at every stage'],
    ['Transparent Communication', 'Real-time partner reporting'],
    ['Fast Turnaround Time', 'SLA-driven application cycles'],
    ['Dedicated Counsellors', 'Named counsellor per student'],
    ['Quality Documentation', 'Verified SOP, LOR, visa files'],
    ['Education Loan Assistance', 'Full financial services support'],
    ['Student-Centric Approach', 'Outcomes-first philosophy'],
    ['Scalable Business Model', 'Grows with partner volume'],
    ['Long-Term Orientation', 'Building a channel, not a one-off'],
  ];

  const top = contentTop(false);
  const cols = 3;
  const gap = 0.12;
  const cw = (CW - (cols - 1) * gap) / cols;
  const ch = 0.9;
  items.forEach((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = M.l + col * (cw + gap);
    const y = top + row * (ch + 0.1);
    const isLoan = it[0].includes('Loan');
    s.addShape('rect', { x, y, w: cw, h: ch, fill: { color: isLoan ? C.successLight : C.light }, line: { color: isLoan ? C.success : C.border, width: isLoan ? 1 : 0.5 } });
    s.addShape('rect', { x, y, w: 0.05, h: ch, fill: { color: isLoan ? C.success : C.gold } });
    s.addText(it[0], { x: x + 0.16, y: y + 0.1, w: cw - 0.28, h: 0.32, fontSize: 8.5, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'top' });
    s.addText(it[1], { x: x + 0.16, y: y + 0.44, w: cw - 0.28, h: 0.4, fontSize: 7, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

// ─── 09 COMPARISON TABLE ────────────────────────────────────────────
function slideComparison(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Partnership Comparison', 'Competitive Positioning', 'An objective benchmark of execution capability across the international recruitment industry.');

  const headers = ['Capability', 'Typical Execution Partner', 'Mantra Global Education'];
  const rows = [
    ['CRM & Pipeline Visibility', 'Spreadsheets / WhatsApp', '\u2713 Partner Dashboard'],
    ['Former IDP-Level Processes', 'Rare', '\u2713 Founder-Led'],
    ['AI University Shortlisting', 'Manual guesswork', '\u2713 AI Engine'],
    ['Education Loan Assistance', 'Referral only', '\u2713 Full Coordination'],
    ['Document Verification', 'Basic check', '\u2713 QA Workflow'],
    ['Visa Filing Support', 'Partial', '\u2713 End-to-End'],
    ['Post-Arrival Support', 'None', '\u2713 Structured Programme'],
    ['Partner Reporting', 'Ad hoc', '\u2713 Analytics & KPIs'],
  ];

  const top = contentTop(true);
  const tableRows = [
    headers.map((h, i) => ({ text: h, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 10, align: i === 0 ? 'left' : 'center' } })),
    ...rows.map((row) => row.map((cell, ci) => ({
      text: cell,
      options: {
        color: ci === 2 ? C.success : C.slate,
        bold: ci === 2,
        fill: { color: ci === 2 ? C.successLight : C.white },
        fontSize: 9.5,
        align: ci === 0 ? 'left' : 'center',
      },
    }))),
  ];

  s.addTable(tableRows, {
    x: M.l, y: top, w: CW, colW: [3.6, 2.6, 2.9],
    fontFace: 'Calibri', border: { type: 'solid', color: C.border, pt: 0.5 },
    autoPage: false, rowH: 0.36, valign: 'middle',
  });
}

// ─── 10 PARTNERSHIP MODEL ───────────────────────────────────────────
function slidePartnershipModel(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Partnership Workflow & Responsibilities', 'Partnership Architecture');

  const flow = ['Student Lead', 'Qualification', 'Counselling', 'Application', 'Offer', 'Loan & Visa', 'Enrollment', 'Commission'];
  const top = contentTop(false);
  const fw = (CW - (flow.length - 1) * 0.06) / flow.length;
  flow.forEach((step, i) => {
    const x = M.l + i * (fw + 0.06);
    s.addShape('rect', { x, y: top, w: fw, h: 0.4, fill: { color: C.navy } });
    s.addText(step, { x: x + 0.02, y: top, w: fw - 0.04, h: 0.4, fontSize: 6.8, bold: true, color: C.white, align: 'center', fontFace: 'Calibri', valign: 'middle' });
    if (i < flow.length - 1) {
      s.addText('\u2192', { x: x + fw - 0.02, y: top, w: 0.12, h: 0.4, fontSize: 10, bold: true, color: C.gold, align: 'center', valign: 'middle' });
    }
  });

  const respTop = top + 0.65;
  const colW = (CW - 0.2) / 2;

  s.addShape('rect', { x: M.l, y: respTop, w: colW, h: 0.34, fill: { color: '0D5C8C' } });
  s.addText([
    { text: 'KC CONSULTANCY  ', options: { bold: true, color: C.white } },
    { text: '(Established Partner)', options: { italic: true, color: 'D6E4F0', fontSize: 8 } },
  ], { x: M.l + 0.12, y: respTop, w: colW - 0.24, h: 0.34, fontSize: 10.5, fontFace: 'Calibri', valign: 'middle' });
  const kcItems = [
    ['Brand & Trust', 'Established regional reputation & credibility'],
    ['Student Base', 'Existing pipeline of aspiring international students'],
    ['Local Counselling', 'On-ground presence & first point of contact'],
    ['Market Reach', 'Community ties, events & referral network'],
  ];
  let ky = respTop + 0.42;
  kcItems.forEach((item) => {
    s.addText([{ text: `${item[0]}: `, options: { bold: true, color: C.navy } }, { text: item[1], options: { color: C.muted } }], {
      x: M.l, y: ky, w: colW, h: 0.32, fontSize: 8, fontFace: 'Calibri', valign: 'top',
    });
    ky += 0.34;
  });

  const x2 = M.l + colW + 0.2;
  s.addShape('rect', { x: x2, y: respTop, w: colW, h: 0.34, fill: { color: C.gold } });
  s.addText([
    { text: 'MANTRA GLOBAL EDUCATION  ', options: { bold: true, color: C.white } },
    { text: '(Delivery Partner)', options: { italic: true, color: 'FCEFCB', fontSize: 8 } },
  ], { x: x2 + 0.12, y: respTop, w: colW - 0.24, h: 0.34, fontSize: 10.5, fontFace: 'Calibri', valign: 'middle' });
  const mgeItems = [
    ['Global Network', '19+ destinations & 42+ university tie-ups'],
    ['Technology', 'CRM, AI shortlisting & shared partner dashboard'],
    ['Financial', 'Scholarship search + education loan coordination'],
    ['Applications & Visa', 'Documentation, SOP/LOR, filing & QA'],
    ['Pre/Post Arrival', 'Forex, accommodation, orientation'],
  ];
  let my = respTop + 0.42;
  mgeItems.forEach((item) => {
    const isLoan = item[0] === 'Financial';
    s.addText([{ text: `${item[0]}: `, options: { bold: true, color: isLoan ? C.success : C.navy } }, { text: item[1], options: { color: C.muted } }], {
      x: x2, y: my, w: colW, h: 0.3, fontSize: 8, fontFace: 'Calibri', valign: 'top',
    });
    my += 0.34;
  });

  const footY = respTop + 2.2;
  s.addShape('rect', { x: M.l, y: footY, w: CW, h: 0.42, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
  s.addText('KC Consultancy retains the client relationship and brand throughout \u2014 Mantra plugs in as the specialised technology, network, and execution layer.', {
    x: M.l + 0.15, y: footY, w: CW - 0.3, h: 0.42, fontSize: 8.5, italic: true, color: C.slate, fontFace: 'Calibri', valign: 'middle', align: 'center',
  });
}

// ─── 11 OPERATIONAL EXCELLENCE ──────────────────────────────────────
function slideOpsExcellence(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Operational Excellence', 'Operating Model');

  const top = contentTop(false);
  const leftW = 5.5;
  const sops = [
    'Lead Management', 'Counselling', 'Document Verification', 'Application Processing',
    'Loan & Visa Support', 'Student Communication', 'Escalation Matrix', 'Quality Assurance',
  ];
  const cw = (leftW - 0.1) / 2;
  const ch = 0.75;
  sops.forEach((sop, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M.l + col * (cw + 0.1);
    const y = top + row * (ch + 0.08);
    const highlight = sop.includes('Loan');
    s.addShape('rect', { x, y, w: cw, h: ch, fill: { color: highlight ? C.successLight : C.light }, line: { color: highlight ? C.success : C.border, width: highlight ? 1 : 0.5 } });
    s.addText(sop, { x: x + 0.1, y, w: cw - 0.2, h: ch, fontSize: 9, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'middle' });
  });

  const rx = M.l + leftW + 0.25;
  const rw = CW - leftW - 0.25;
  s.addShape('rect', { x: rx, y: top, w: rw, h: 3.15, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
  s.addText('Process Maturity Model', { x: rx + 0.12, y: top + 0.1, w: rw - 0.24, h: 0.25, fontSize: 10, bold: true, color: C.navy, fontFace: 'Calibri' });

  const levels = [
    ['1', 'Ad Hoc', 0.35],
    ['2', 'Defined', 0.5],
    ['3', 'Managed', 0.75],
    ['4', 'Optimising', 0.95],
  ];
  const barBaseY = top + 2.2;
  const barMaxH = 1.55;
  const barW = (rw - 0.6) / 4;
  levels.forEach((lvl, i) => {
    const bh = barMaxH * lvl[2];
    const bx = rx + 0.3 + i * (barW + 0.1);
    const by = barBaseY - bh;
    s.addShape('rect', { x: bx, y: by, w: barW, h: bh, fill: { color: i === 3 ? C.success : C.gold } });
    s.addText(lvl[0], { x: bx, y: by - 0.22, w: barW, h: 0.2, fontSize: 9, bold: true, color: C.navy, align: 'center', fontFace: 'Calibri' });
    s.addText(lvl[1], { x: bx - 0.05, y: barBaseY + 0.04, w: barW + 0.1, h: 0.3, fontSize: 6.5, bold: true, color: C.muted, align: 'center', fontFace: 'Calibri' });
  });

  s.addText('Mantra operates at Level 3\u20134 across core processes, with technology enabling continuous improvement.', {
    x: rx + 0.12, y: barBaseY + 0.4, w: rw - 0.24, h: 0.55, fontSize: 7.5, color: C.muted, fontFace: 'Calibri', valign: 'top',
  });
}

// ─── 12 QUALITY & COMPLIANCE ────────────────────────────────────────
function slideCompliance(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Quality & Compliance', 'Risk & Governance');

  const items = [
    ['Ethical Counselling', 'No misleading claims; student-first advice only'],
    ['Data Privacy', 'Secure portal, access controls, encrypted storage'],
    ['Document Verification', 'Multi-point QA before submission'],
    ['Process Transparency', 'Visible stages for students and partners'],
    ['Timely Communication', 'SLA-backed response times'],
    ['Record Management', 'Complete audit trail per student'],
  ];
  const top = contentTop(false);
  const cols = 3;
  const gap = 0.15;
  const cw = (CW - (cols - 1) * gap) / cols;
  const ch = 0.95;
  items.forEach((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = M.l + col * (cw + gap);
    const y = top + row * (ch + 0.12);
    s.addShape('rect', { x, y, w: cw, h: ch, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addShape('rect', { x, y, w: cw, h: 0.05, fill: { color: C.gold } });
    s.addText(it[0], { x: x + 0.1, y: y + 0.12, w: cw - 0.2, h: 0.3, fontSize: 9.5, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(it[1], { x: x + 0.1, y: y + 0.44, w: cw - 0.2, h: 0.45, fontSize: 7.5, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });

  const noteY = top + 2 * (ch + 0.12) + 0.05;
  s.addShape('rect', { x: M.l, y: noteY, w: CW, h: 0.6, fill: { color: C.navy } });
  s.addText('Partnership Implication for KC Consultancy:', { x: M.l + 0.12, y: noteY + 0.05, w: 2.6, h: 0.5, fontSize: 8.5, bold: true, color: C.gold, fontFace: 'Calibri', valign: 'middle' });
  s.addText('Mantra\u2019s documented, audit-ready processes integrate smoothly alongside KC Consultancy\u2019s existing standards — reinforcing the trust KC has already built with its student community.', {
    x: M.l + 2.8, y: noteY + 0.05, w: CW - 2.9, h: 0.5, fontSize: 8.5, color: C.white, fontFace: 'Calibri', valign: 'middle',
  });
}

// ─── 13 GLOBAL DESTINATIONS ─────────────────────────────────────────
function slideDestinations(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Global Study Destinations', 'Market Coverage', '19+ countries with university, course, scholarship, and loan pathway support.');

  const top = contentTop(true);
  const destinations = [
    'USA', 'UK', 'Australia', 'Canada', 'Germany', 'France', 'Ireland', 'New Zealand',
    'Singapore', 'Netherlands', 'Italy', 'Switzerland', 'UAE', 'Japan', 'South Korea',
    'Malaysia', 'Sweden', 'Spain', 'Finland',
  ];
  const chipW = 0.98, chipH = 0.28, gap = 0.06;
  const perRow = 7;
  destinations.forEach((d, i) => {
    const col = i % perRow;
    const row = Math.floor(i / perRow);
    const x = M.l + col * (chipW + gap);
    const y = top + row * (chipH + gap);
    s.addShape('roundRect', { x, y, w: chipW, h: chipH, fill: { color: C.navy }, rectRadius: 0.06 });
    s.addText(d, { x, y, w: chipW, h: chipH, fontSize: 7.5, bold: true, color: C.white, align: 'center', fontFace: 'Calibri', valign: 'middle' });
  });

  // University images row
  const imgY = top + 3 * (chipH + gap) + 0.12;
  const imgH = 1.05;
  const imgW = (CW - 0.15) / 2;
  if (fs.existsSync(IMG.campus1)) {
    s.addImage({ path: IMG.campus1, x: M.l, y: imgY, w: imgW, h: imgH, sizing: { type: 'cover', w: imgW, h: imgH } });
    s.addShape('rect', { x: M.l, y: imgY, w: imgW, h: imgH, line: { color: C.gold, width: 1 } });
  }
  if (fs.existsSync(IMG.campus2)) {
    s.addImage({ path: IMG.campus2, x: M.l + imgW + 0.15, y: imgY, w: imgW, h: imgH, sizing: { type: 'cover', w: imgW, h: imgH } });
    s.addShape('rect', { x: M.l + imgW + 0.15, y: imgY, w: imgW, h: imgH, line: { color: C.gold, width: 1 } });
  }

  const kpiY = imgY + imgH + 0.12;
  const kpis = [['19+', 'Countries'], ['42+', 'Universities'], ['65+', 'Courses'], ['Full', 'Loan Pathway Support']];
  const kw = (CW - 0.3) / 4;
  kpis.forEach((k, i) => {
    const x = M.l + i * (kw + 0.1);
    s.addText([{ text: k[0] + '  ', options: { bold: true, color: C.gold, fontSize: 13 } }, { text: k[1], options: { color: C.muted, fontSize: 8 } }], {
      x, y: kpiY, w: kw, h: 0.3, align: 'left', fontFace: 'Calibri', valign: 'middle',
    });
  });
}

// ─── 14 GROWTH ROADMAP ──────────────────────────────────────────────
function slideRoadmap(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'Growth Roadmap', 'Strategic Roadmap');

  const top = contentTop(false);
  const phases = [
    { yr: 'YEAR 1 \u00B7 2026', title: 'Foundation & Partners', items: ['KC Consultancy partnership go-live', 'Full CRM implementation', 'AI-enabled counselling engine', 'Education loan desk operational'] },
    { yr: 'YEAR 2 \u00B7 2027', title: 'Scale & Automation', items: ['Direct university partnerships', 'Student mobile application', 'Workflow automation platform', 'Enhanced partner analytics'] },
    { yr: 'YEAR 3 \u00B7 2028', title: 'Expansion & Leadership', items: ['Multi-city India operations', 'International office presence', 'AI-powered admissions platform', 'Global alumni network'] },
  ];
  const colW = (CW - 0.3) / 3;
  phases.forEach((p, i) => {
    const x = M.l + i * (colW + 0.15);
    s.addShape('rect', { x, y: top, w: colW, h: 0.06, fill: { color: C.gold } });
    s.addShape('rect', { x, y: top + 0.06, w: colW, h: 2.9, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addText(p.yr, { x: x + 0.14, y: top + 0.2, w: colW - 0.28, h: 0.22, fontSize: 8.5, bold: true, color: C.gold, fontFace: 'Calibri' });
    s.addText(p.title, { x: x + 0.14, y: top + 0.44, w: colW - 0.28, h: 0.35, fontSize: 11.5, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(p.items.map((it) => ({ text: it, options: { bullet: true, breakLine: true } })), {
      x: x + 0.14, y: top + 0.85, w: colW - 0.28, h: 2.0, fontSize: 8, color: C.slate, fontFace: 'Calibri', paraSpaceAfter: 5, valign: 'top',
    });
  });
}

// ─── 15 WHY KC SHOULD PARTNER ───────────────────────────────────────
function slideWhyKC(pptx) {
  const s = freshSlide(pptx);
  addHeader(s, 'What Mantra Brings to the Partnership', 'Value Add for KC Consultancy', 'Specialised capabilities designed to complement — not compete with — KC Consultancy\u2019s established business.');

  const items = [
    ['Extended Global Reach', '19+ destinations & 42+ universities beyond current network'],
    ['Education Loan Support', 'Financial blockers removed pre-visa, via bank/NBFC coordination'],
    ['Technology Platform', 'Shared partner dashboard for live pipeline visibility'],
    ['Added Execution Capacity', 'Dedicated bandwidth for applications & visa processing'],
    ['Scholarship Access', 'Structured funding search on every eligible application'],
    ['Specialised Visa Expertise', 'Country-specific filing support across all destinations'],
    ['Dedicated Delivery Team', 'Named team aligned to KC-referred students'],
    ['Transparent Reporting', 'Shared visibility on conversion & outcomes'],
    ['Shared Growth Upside', 'More destinations & services benefit both partners'],
  ];
  const top = contentTop(true);
  const cols = 3;
  const gap = 0.12;
  const cw = (CW - (cols - 1) * gap) / cols;
  const ch = 0.85;
  items.forEach((it, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = M.l + col * (cw + gap);
    const y = top + row * (ch + 0.1);
    const isLoan = it[0].includes('Loan');
    s.addShape('rect', { x, y, w: cw, h: ch, fill: { color: isLoan ? C.successLight : (i < 3 ? 'FBF3E0' : C.light) }, line: { color: isLoan ? C.success : C.border, width: isLoan ? 1 : 0.5 } });
    s.addText('\u2713 ' + it[0], { x: x + 0.12, y: y + 0.1, w: cw - 0.24, h: 0.32, fontSize: 9, bold: true, color: isLoan ? C.success : C.navy, fontFace: 'Calibri', valign: 'top' });
    s.addText(it[1], { x: x + 0.12, y: y + 0.44, w: cw - 0.24, h: 0.45, fontSize: 7.5, color: C.muted, fontFace: 'Calibri', valign: 'top' });
  });
}

// ─── 16 SECTION TRANSITION ──────────────────────────────────────────
function slideTransition(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.06, fill: { color: C.gold } });
  addFooter(s);
  addPageNum(s);

  s.addText('\u2192', { x: M.l, y: 1.6, w: 1.5, h: 1.0, fontSize: 60, bold: true, color: 'C89116', fontFace: 'Calibri', transparency: 25 });
  s.addText('Partnership Next Steps', { x: M.l, y: 2.6, w: 7.5, h: 0.6, fontSize: 30, bold: true, color: C.white, fontFace: 'Calibri' });
  s.addText('MOU Framework  \u00B7  Pilot Cohort  \u00B7  Partner Onboarding  \u00B7  Co-Marketing Launch  \u00B7  Quarterly Business Reviews', {
    x: M.l, y: 3.3, w: 7.8, h: 0.45, fontSize: 12.5, color: 'B8C5D6', fontFace: 'Calibri',
  });
}

// ─── 17 CLOSING ──────────────────────────────────────────────────────
function slideClosing(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.06, fill: { color: C.gold } });

  if (fs.existsSync(IMG.hero)) {
    s.addImage({ path: IMG.hero, x: 0, y: 0, w: SLIDE.w, h: SLIDE.h, sizing: { type: 'cover', w: SLIDE.w, h: SLIDE.h } });
    s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: SLIDE.h, fill: { color: C.navy, transparency: 22 } });
  }

  s.addText('STRATEGIC PARTNERSHIP INVITATION', {
    x: 0, y: 1.15, w: SLIDE.w, h: 0.3, fontSize: 10, bold: true, color: C.goldLight, align: 'center', fontFace: 'Calibri', charSpacing: 1.5,
  });
  s.addText('Let\u2019s Build the Future of\nGlobal Education Together', {
    x: 0.8, y: 1.55, w: SLIDE.w - 1.6, h: 1.0, fontSize: 28, bold: true, color: C.white, align: 'center', fontFace: 'Calibri', valign: 'top',
  });
  s.addText('Mantra Global Education seeks to partner with KC Consultancy — combining your established market leadership and trusted student relationships with our specialised technology, global university network, and education loan execution capabilities.', {
    x: 1.3, y: 2.75, w: SLIDE.w - 2.6, h: 0.55, fontSize: 10, color: 'E2E8F0', align: 'center', fontFace: 'Calibri', valign: 'top',
  });

  const boxW = 5.6, boxX = (SLIDE.w - boxW) / 2, boxY = 3.55;
  s.addShape('rect', { x: boxX, y: boxY, w: boxW, h: 1.55, fill: { color: C.navy, transparency: 8 }, line: { color: C.gold, width: 1 } });
  s.addText('Proposed Next Step: 30-Day Pilot Partnership', { x: boxX, y: boxY + 0.15, w: boxW, h: 0.28, fontSize: 11, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
  const contact = [BRAND.web, BRAND.hq, `${BRAND.founder}, Founder`];
  s.addText(contact.map((t) => ({ text: t, options: { align: 'center', breakLine: true } })), {
    x: boxX, y: boxY + 0.55, w: boxW, h: 0.95, fontSize: 10.5, color: C.white, fontFace: 'Calibri', lineSpacing: 18,
  });
}

// ─── Speaker Notes ───────────────────────────────────────────────────
const NOTES = [
  'Open with respect and partnership framing — Mantra is requesting this meeting. Address the KC Consultancy Regional Manager by name and acknowledge KC\u2019s established position in the market. Set tone: McKinsey-level rigour, education-sector depth, humble confidence rather than a sales pitch. TIP: Pause after the title before speaking.',
  'Walk through the 6 agenda blocks in 60 seconds. Frame this as "how Mantra can complement KC\u2019s existing strengths," not a vendor pitch. Mention loan assistance as a differentiated capability within the student journey. TIP: Set expectations — 20-25 min presentation, 10 min Q&A.',
  'Lead with founder credibility: 10+ years, former IDP professional. Reference 700+ students guided and 19+ destinations. Position Mantra as a boutique, technology-enabled specialist seeking to plug into KC\u2019s established operation — not compete with it. TIP: Share one brief IDP-era anecdote demonstrating operational rigour.',
  'Connect values to what a durable partnership looks like: Integrity and Transparency mean no hidden commissions on either side. Long-term Partnerships signals Mantra wants a lasting relationship with KC, not a one-off vendor arrangement. TIP: Ask what qualities KC values most in an execution partner.',
  'Walk the service grid. Pause on Education Loan Support — Mantra coordinates with partner banks/NBFCs, handling documentation and financial planning alongside scholarships. Position this as extending KC\u2019s existing service depth, handled by Mantra so KC\u2019s team doesn\u2019t have to build it in-house. TIP: Highlight loan assistance when asked "what happens after offer letter?"',
  'This is the technology differentiation slide. Offer KC full shared visibility — partner dashboard, pipeline reporting — as a tool that plugs into their existing operation. Emphasise CRM-driven lifecycle, not spreadsheets. AI recommendation engine improves shortlisting quality. TIP: Demo the live platform at mantraglobaledu.com if possible.',
  'Walk the flow top-to-bottom. Highlight Education Loan Assistance between Scholarship and Visa — students often stall here. Mantra\u2019s loan desk coordinates with lending partners while KC\u2019s counselling relationship with the student continues throughout. TIP: Use a pointer on loan + visa stages — where Mantra adds the most specialised value.',
  'This is the "why Mantra" slide. Hit three themes: (1) Leadership credibility, (2) Shared technology visibility, (3) Loan + visa execution extends KC\u2019s service depth without adding headcount. TIP: Use the comparison table next if challenged on price or commission.',
  'Let the table speak — this benchmarks Mantra against typical execution partners in the industry generally, not KC itself. Focus on operational facts, not disparagement. Emphasise Partner Dashboard and Loan Assistance rows. TIP: If time is short, highlight only the green Mantra column.',
  'The most important operational slide. Walk each stage and be explicit: KC Consultancy retains the client relationship, brand, and existing strengths (trust, student base, local presence). Mantra plugs in as the specialised technology, global network, and execution layer. Loan Assistance is Mantra-owned — KC is not expected to coordinate banks. TIP: Bring a draft MOU one-pager to show partnership readiness.',
  'Position the maturity diagram: Mantra operates at Managed/Optimising stage, not startup chaos — a credible standard to plug into KC\u2019s established operations. Cover escalation matrix: L1 counsellor to L2 senior to L3 founder within defined SLAs. TIP: Give a concrete example — visa delay resolved within 48hr SLA.',
  'Reassure KC that their brand and existing trust are safe and reinforced, not put at risk. Data privacy: student records in secure portal, not shared drives. Ethical counselling: no false promises, no pressure selling. TIP: Reference GDPR-aligned data practices for global-standard signalling.',
  'Briefly note global coverage. KC can extend its offering to USA, UK, Canada, Australia, Germany, and 14+ more destinations via Mantra\u2019s network. Technology platform has catalogued universities, courses, and scholarships. TIP: Tie destinations to KC\u2019s regional student demand patterns.',
  'Show KC that Mantra is a growing, well-capitalised platform investing in the partnership, not a static vendor. Year 1 CRM + AI benefits KC immediately via the shared partner dashboard. Year 2 mobile app improves student experience. Year 3 scale means more volume and revenue for both sides. TIP: Frame as "this partnership gets stronger every year."',
  'Summarise the value Mantra adds to an already-strong KC operation: extended global reach, loan support, shared technology, added execution capacity, transparent reporting. This is the close-before-the-close slide. TIP: Ask which of these would matter most for KC\u2019s region this year.',
  'Brief interstitial. Signal moving from "what Mantra offers" to "let\u2019s discuss next steps." Pause for questions before the final CTA. TIP: This is your checkpoint slide — invite questions here.',
  'End with respect and confidence, not entitlement. Acknowledge KC Consultancy\u2019s established market position and invite them to explore how Mantra\u2019s capabilities can complement their business. Propose a low-risk 30-day pilot with 10-20 students to demonstrate value. Provide mantraglobaledu.com and Coimbatore HQ. TIP: Leave the deck open on this slide during discussion.',
];

// ─── Build ────────────────────────────────────────────────────────────
function createDeck() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = BRAND.name;
  pptx.company = BRAND.name;
  pptx.subject = 'KC Consultancy Partnership Proposal';
  pptx.title = `${BRAND.name} — Partnership Proposal for ${BRAND.partner}`;
  slideCounter = 0;

  const builders = [
    slideCover, slideAgenda, slideLeadership, slideMVV, slideServices, slideTechnology,
    slideJourney, slideWhyPartner, slideComparison, slidePartnershipModel, slideOpsExcellence,
    slideCompliance, slideDestinations, slideRoadmap, slideWhyKC, slideTransition, slideClosing,
  ];

  builders.forEach((builder, i) => {
    builder(pptx);
    const slide = pptx.slides[pptx.slides.length - 1];
    if (NOTES[i]) slide.addNotes(NOTES[i]);
  });

  return pptx;
}

const pptx = createDeck();
const outPath = path.join(OUT_DIR, 'Mantra-KC-Consultancy-Partnership-Deck.pptx');
await pptx.writeFile({ fileName: outPath });

console.log('\n\u2705 KC Consultancy Partnership Deck generated:\n');
console.log(`   PPTX : ${outPath}`);
console.log(`   Slides: ${pptx.slides.length}\n`);
