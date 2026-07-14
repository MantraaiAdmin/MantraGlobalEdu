/**
 * Mantra Global Education — Professional Company Profile Deck Builder
 * Run: node docs/company/generate-company-deck.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PptxGenJS from 'pptxgenjs';
import { buildPdf } from '../shared/deck-engine.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, 'assets');
const LOGO = path.join(ASSETS, 'gem-logo-sm.png');
const FOUNDER_IMG = path.join(ASSETS, 'founder-vinodhini.png');
const OUT = __dirname;
const YEAR = new Date().getFullYear();
const DECK_LABEL = `Company Profile ${YEAR}`;

const C = {
  navy: '00234E', navyMid: '003D7A', gold: 'C89116', goldLt: 'E8B84A',
  white: 'FFFFFF', slate: '334155', muted: '64748B', light: 'F1F5F9', border: 'CBD5E1',
};
const SLIDE = { w: 10, h: 5.625 };
const M = { l: 0.4, r: 0.4, t: 0.18, hdr: 0.88, foot: 5.3, bot: 5.02 };
const CW = SLIDE.w - M.l - M.r;

const BRAND = {
  name: 'Mantra Global Education', tagline: 'Your Journey. Our Guidance. Global Success.',
  founder: 'Vinodhini Y.', founderRole: 'Founder & Chief Counselor',
  email: 'support@mantraglobaleducation.com', phone: '+91 98765 43210', web: 'www.mantraglobaleducation.com',
  focus: 'USA · United Kingdom · Australia',
};

const LEADERSHIP = [
  { name: 'Vinodhini Y.', role: 'Founder & Chief Counselor', photo: FOUNDER_IMG, bullets: ['10+ years international education', 'Ex-IDP · British Council Certified', 'Top 17 Pan-India · 700+ students placed', 'Sets counseling quality standards'] },
  { name: 'HR Leadership', role: 'Head of Human Resources', initials: 'HR', color: C.navyMid, bullets: ['Talent acquisition & counselor onboarding', 'Training, SOPs & performance reviews', 'Culture, compliance & employee welfare', 'Partner & vendor HR coordination'] },
  { name: 'Technology Leadership', role: 'Chief Technology Officer (CTO)', initials: 'CTO', color: C.gold, bullets: ['Platform architecture & student portal', 'CRM, data security & integrations', 'Product roadmap & digital experience', 'Analytics, automation & AI readiness'] },
];

let pageNum = 0;

function slide(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  return s;
}

function logo(s, x = M.l, y = M.t, w = 1.7) {
  if (fs.existsSync(LOGO)) s.addImage({ path: LOGO, x, y, w, h: w * 0.33 });
}

function footer(s) {
  s.addShape('rect', { x: 0, y: M.foot, w: SLIDE.w, h: 0.06, fill: { color: C.gold } });
  s.addText(`${BRAND.name}  |  ${DECK_LABEL}`, { x: M.l, y: M.foot - 0.2, w: CW, h: 0.16, fontSize: 6.5, color: C.muted, fontFace: 'Calibri' });
}

function header(s, title) {
  logo(s);
  pageNum++;
  s.addShape('rect', { x: M.l, y: M.hdr - 0.06, w: 0.9, h: 0.04, fill: { color: C.gold } });
  s.addText(title, { x: M.l, y: M.hdr, w: CW - 0.35, h: 0.36, fontSize: 18, bold: true, color: C.navy, fontFace: 'Calibri' });
  s.addText(String(pageNum).padStart(2, '0'), { x: SLIDE.w - M.r - 0.35, y: M.t + 0.12, w: 0.35, h: 0.25, fontSize: 9, color: C.muted, align: 'right', fontFace: 'Calibri' });
  footer(s);
}

function section(pptx, num, title, sub) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.05, fill: { color: C.gold } });
  if (fs.existsSync(LOGO)) s.addImage({ path: LOGO, x: SLIDE.w - M.r - 1.7, y: M.t, w: 1.7, h: 0.56 });
  s.addText(num, { x: M.l, y: 1.1, w: 2, h: 0.9, fontSize: 50, bold: true, color: C.gold, fontFace: 'Calibri' });
  s.addText(title, { x: M.l, y: 2.05, w: 7, h: 0.55, fontSize: 26, bold: true, color: C.white, fontFace: 'Calibri' });
  s.addText(sub, { x: M.l, y: 2.65, w: 6.5, h: 0.35, fontSize: 12, color: 'B8C5D6', fontFace: 'Calibri' });
}

function arrow(s, x1, y1, x2, y2) {
  s.addShape('line', { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color: C.gold, width: 1.5, endArrowType: 'triangle' } });
}

function cover(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: 0.08, h: SLIDE.h, fill: { color: C.gold } });
  s.addShape('rect', { x: 6.8, y: 0, w: 3.2, h: SLIDE.h, fill: { color: C.navyMid } });
  if (fs.existsSync(LOGO)) s.addImage({ path: LOGO, x: M.l, y: 0.45, w: 2.4, h: 0.79 });
  if (fs.existsSync(FOUNDER_IMG)) {
    s.addImage({ path: FOUNDER_IMG, x: 7.0, y: 0.35, w: 2.6, h: 3.5, sizing: { type: 'cover', w: 2.6, h: 3.5 } });
    s.addShape('rect', { x: 7.0, y: 3.5, w: 2.6, h: 0.55, fill: { color: C.gold } });
    s.addText(`${BRAND.founder}\n${BRAND.founderRole}`, { x: 7.05, y: 3.55, w: 2.5, h: 0.45, fontSize: 8, bold: true, color: C.white, fontFace: 'Calibri' });
  }
  s.addText('Company Profile', { x: M.l, y: 1.45, w: 6, h: 0.55, fontSize: 30, bold: true, color: C.white, fontFace: 'Calibri' });
  s.addText('Premium Study Abroad Advisory', { x: M.l, y: 2.05, w: 6, h: 0.35, fontSize: 14, color: C.goldLt, fontFace: 'Calibri' });
  s.addText(BRAND.focus, { x: M.l, y: 2.45, w: 6, h: 0.3, fontSize: 11, color: 'A8BDD4', fontFace: 'Calibri' });
  s.addText(BRAND.tagline, { x: M.l, y: 3.0, w: 5, h: 0.25, fontSize: 10, color: '8FA3BC', italic: true, fontFace: 'Calibri' });
  const meta = [`Founded by ${BRAND.founder}`, 'British Council Certified Advisory', `Corporate Standard Presentation · ${YEAR}`];
  s.addText(meta.map((t) => ({ text: t, options: { bullet: true, breakLine: true } })), { x: M.l, y: 3.55, w: 5.5, h: 1.0, fontSize: 9, color: 'C5D3E3', fontFace: 'Calibri' });
}

function agenda(pptx) {
  const s = slide(pptx);
  header(s, 'Presentation Agenda');
  const items = [
    ['01', 'About Mantra', 'Overview, operating framework, vision & strategic goals'],
    ['02', 'What We Deliver', 'Service framework, destinations, packages & delivery model'],
    ['03', 'Leadership Team', 'Founder, HR, CTO & organizational structure'],
    ['04', 'How We Work', 'Student journey workflow, counseling pipeline & technology'],
    ['05', 'Why Mantra', 'Differentiation, quality framework & ethics charter'],
    ['06', 'Connect', 'Contact details & how to begin your journey'],
  ];
  const colW = (CW - 0.2) / 2;
  items.forEach(([n, t, d], i) => {
    const col = i < 3 ? 0 : 1;
    const row = i < 3 ? i : i - 3;
    const x = M.l + col * (colW + 0.2);
    const y = 1.35 + row * 1.15;
    s.addShape('rect', { x, y, w: colW, h: 1.0, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addShape('rect', { x, y, w: 0.45, h: 1.0, fill: { color: C.navy } });
    s.addText(n, { x, y: y + 0.32, w: 0.45, h: 0.35, fontSize: 11, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    s.addText(t, { x: x + 0.55, y: y + 0.12, w: colW - 0.65, h: 0.3, fontSize: 11, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(d, { x: x + 0.55, y: y + 0.42, w: colW - 0.65, h: 0.52, fontSize: 8, color: C.muted, fontFace: 'Calibri' });
  });
}

function execSummary(pptx) {
  const s = slide(pptx);
  header(s, 'Executive Summary');
  s.addShape('rect', { x: M.l, y: 1.32, w: CW * 0.58, h: 3.55, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
  s.addText('Who We Are', { x: M.l + 0.12, y: 1.4, w: 2, h: 0.25, fontSize: 10, bold: true, color: C.gold, fontFace: 'Calibri' });
  const bullets = [
    'Mantra Global Education is a founder-led premium boutique advisory for USA, UK & Australia',
    'Combines certified counseling (British Council, ex-IDP) with enterprise digital platform',
    'End-to-end journey: assessment → shortlist → application → visa → pre-departure',
    'Not a mass-market agent — quality-first, profile-based, ethically governed',
    'Leadership: Founder & Chief Counselor, HR, and CTO driving counseling + technology',
  ];
  s.addText(bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), {
    x: M.l + 0.12, y: 1.68, w: CW * 0.54, h: 3.0, fontSize: 9, color: C.slate, fontFace: 'Calibri', paraSpaceAfter: 5,
  });
  const stats = [['700+', 'Students Placed'], ['10+', 'Years Exp.'], ['3', 'Countries'], ['15+', 'Universities']];
  const sx = M.l + CW * 0.6 + 0.1;
  const sw = CW * 0.38;
  stats.forEach(([v, l], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = sx + col * (sw / 2 + 0.05);
    const y = 1.35 + row * 1.15;
    s.addShape('rect', { x, y, w: sw / 2 - 0.05, h: 1.0, fill: { color: C.navy } });
    s.addText(v, { x, y: y + 0.15, w: sw / 2 - 0.05, h: 0.45, fontSize: 22, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
    s.addText(l, { x: x + 0.05, y: y + 0.62, w: sw / 2 - 0.15, h: 0.3, fontSize: 8, color: C.white, align: 'center', fontFace: 'Calibri' });
  });
  s.addShape('rect', { x: sx, y: 3.65, w: sw, h: 1.2, fill: { color: C.gold } });
  s.addText('Positioning', { x: sx + 0.1, y: 3.72, w: 1, h: 0.2, fontSize: 8, bold: true, color: C.white, fontFace: 'Calibri' });
  s.addText('Boutique · Certified · Tech-Enabled · Ethical · USA/UK/Australia Specialist', {
    x: sx + 0.1, y: 3.95, w: sw - 0.2, h: 0.8, fontSize: 9.5, bold: true, color: C.white, fontFace: 'Calibri', valign: 'top',
  });
}

function operatingFramework(pptx) {
  const s = slide(pptx);
  header(s, 'Mantra Operating Framework');
  const layers = [
    { title: 'LAYER 4 — OUTCOMES', desc: 'Enrollments · Visa success · Student satisfaction · Alumni referrals', color: C.gold, y: 1.32 },
    { title: 'LAYER 3 — TECHNOLOGY', desc: 'Website · Student portal · Counselor tools · CRM & analytics (CTO-led)', color: C.navyMid, y: 2.02 },
    { title: 'LAYER 2 — COUNSELING OPS', desc: 'Profile check · Shortlisting · Applications · Visa · Packages (Counselor-led)', color: C.navy, y: 2.72 },
    { title: 'LAYER 1 — BRAND & TRUST', desc: 'Founder credibility · British Council standards · Ethics charter · HR governance', color: '001A38', y: 3.42 },
  ];
  layers.forEach((l) => {
    s.addShape('rect', { x: M.l + 0.5, y: l.y, w: CW - 1.0, h: 0.58, fill: { color: l.color } });
    s.addText(l.title, { x: M.l + 0.65, y: l.y + 0.05, w: 3, h: 0.22, fontSize: 9, bold: true, color: C.goldLt, fontFace: 'Calibri' });
    s.addText(l.desc, { x: M.l + 0.65, y: l.y + 0.28, w: CW - 1.3, h: 0.25, fontSize: 8.5, color: C.white, fontFace: 'Calibri' });
  });
  s.addText('▲', { x: M.l + 0.15, y: 2.5, w: 0.3, h: 0.5, fontSize: 18, color: C.gold, fontFace: 'Calibri' });
  s.addText('Value flows upward: Trust → Operations → Technology → Student Outcomes', {
    x: M.l, y: 4.15, w: CW, h: 0.3, fontSize: 8, italic: true, color: C.muted, fontFace: 'Calibri',
  });
}

function visionMission(pptx) {
  const s = slide(pptx);
  header(s, 'Vision, Mission & 2026 Strategic Goal');
  const rows = [
    { k: 'VISION', t: 'India\'s most trusted boutique study-abroad advisory — founder-quality guidance backed by technology.', c: C.navy },
    { k: 'MISSION', t: 'Empower students with certified counseling, transparent processes & structured support for global education outcomes.', c: C.gold },
    { k: '2026 GOAL', t: '1,000+ annual placements across USA, UK & Australia with premium service quality & zero ethical compromise.', c: C.navy },
  ];
  rows.forEach((r, i) => {
    const y = 1.35 + i * 1.15;
    s.addShape('rect', { x: M.l, y, w: 1.15, h: 0.95, fill: { color: r.c } });
    s.addText(r.k, { x: M.l, y: y + 0.3, w: 1.15, h: 0.35, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    s.addShape('rect', { x: M.l + 1.15, y, w: CW - 1.15, h: 0.95, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addText(r.t, { x: M.l + 1.3, y: y + 0.15, w: CW - 1.45, h: 0.65, fontSize: 9.5, color: C.slate, fontFace: 'Calibri', valign: 'middle' });
  });
}

function serviceFramework(pptx) {
  const s = slide(pptx);
  header(s, 'Service Delivery Framework');
  const stages = [
    { n: '01', t: 'Discover', d: 'Profile Check\nWebsite · Events' },
    { n: '02', t: 'Counsel', d: '1:1 Sessions\nCountry & course fit' },
    { n: '03', t: 'Shortlist', d: '3–5 universities\nBudget & intake plan' },
    { n: '04', t: 'Apply', d: 'SOP/LOR · Documents\nDeadline tracking' },
    { n: '05', t: 'Visa & Fly', d: 'Visa filing\nPre-departure briefing' },
  ];
  const boxW = (CW - 0.5) / 5;
  stages.forEach((st, i) => {
    const x = M.l + i * (boxW + 0.1);
    const y = 1.55;
    s.addShape('rect', { x, y, w: boxW, h: 1.35, fill: { color: i % 2 === 0 ? C.navy : C.navyMid } });
    s.addText(st.n, { x, y: y + 0.08, w: boxW, h: 0.25, fontSize: 14, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
    s.addText(st.t, { x: x + 0.05, y: y + 0.35, w: boxW - 0.1, h: 0.28, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    s.addText(st.d, { x: x + 0.05, y: y + 0.65, w: boxW - 0.1, h: 0.65, fontSize: 7.5, color: 'C5D3E3', align: 'center', fontFace: 'Calibri' });
    if (i < 4) arrow(s, x + boxW + 0.02, y + 0.67, x + boxW + 0.1, y + 0.67);
  });
  const services = [
    'Study Abroad Counseling', 'University Admissions', 'Scholarship Assistance', 'Visa Documentation',
    'Pre-Departure Support', 'Career Guidance', 'SOP & LOR Support', 'Education Loan Assistance',
  ];
  s.addText('Core Service Lines', { x: M.l, y: 3.1, w: 2, h: 0.22, fontSize: 9, bold: true, color: C.navy, fontFace: 'Calibri' });
  services.forEach((svc, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    s.addShape('rect', { x: M.l + col * 2.25, y: 3.38 + row * 0.55, w: 2.15, h: 0.45, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addText(svc, { x: M.l + col * 2.25 + 0.08, y: 3.45 + row * 0.55, w: 2.0, h: 0.32, fontSize: 7.5, color: C.slate, fontFace: 'Calibri', valign: 'middle' });
  });
}

function destinations(pptx) {
  const s = slide(pptx);
  header(s, 'Focus Destinations & Market Positioning');
  const dests = [
    { flag: '🇺🇸', name: 'United States', pts: ['UG & PG · STEM pathways', 'Scholarships & assistantships', 'OPT & career opportunities', 'F-1 visa guidance'] },
    { flag: '🇬🇧', name: 'United Kingdom', pts: ['Russell Group universities', '1-year Masters programs', 'Graduate Route visa (2yr)', 'Post-study work options'] },
    { flag: '🇦🇺', name: 'Australia', pts: ['Group of Eight institutions', 'PR pathway counseling', 'Post-study work rights', 'Regional study advantages'] },
  ];
  const w = (CW - 0.3) / 3;
  dests.forEach((d, i) => {
    const x = M.l + i * (w + 0.15);
    s.addShape('rect', { x, y: 1.35, w, h: 3.5, fill: { color: C.white }, line: { color: C.border, width: 0.75 } });
    s.addShape('rect', { x, y: 1.35, w, h: 0.55, fill: { color: i === 1 ? C.gold : C.navy } });
    s.addText(`${d.flag}  ${d.name}`, { x: x + 0.1, y: 1.45, w: w - 0.2, h: 0.35, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri' });
    d.pts.forEach((p, j) => {
      s.addText(`▸ ${p}`, { x: x + 0.12, y: 2.05 + j * 0.55, w: w - 0.24, h: 0.45, fontSize: 8.5, color: C.slate, fontFace: 'Calibri' });
    });
  });
}

function packages(pptx) {
  const s = slide(pptx);
  header(s, 'Mantra Student Packages');
  const rows = [
    ['Profile Check', 'FREE', 'Readiness assessment, country direction, academic fit overview', 'Lead qualification'],
    ['Mantra Pathfinder', 'Paid', '3–5 university shortlist, budget plan, intake timeline', 'Early conversion'],
    ['Application Pro', 'Paid', 'Full applications, SOP/LOR, document management & tracking', 'Core revenue service'],
    ['Visa & Fly', 'Paid', 'Visa filing support, pre-departure checklist & briefing', 'Post-offer stage'],
    ['Mantra Premium', 'Paid', 'Dedicated counselor, priority SLA, full journey management', 'High-value students'],
  ];
  const tableRows = [
    [{ text: 'Package', options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 8 } },
     { text: 'Type', options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 8 } },
     { text: 'Deliverables', options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 8 } },
     { text: 'Stage', options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 8 } }],
    ...rows.map((r, ri) => r.map((cell) => ({ text: cell, options: { fontSize: 7.5, color: C.slate, fill: { color: ri % 2 === 0 ? C.white : C.light } } }))),
  ];
  s.addTable(tableRows, { x: M.l, y: 1.38, w: CW, colW: [1.5, 0.7, 4.2, 1.9], rowH: 0.34, border: { type: 'solid', color: C.border, pt: 0.5 } });
}

function orgStructure(pptx) {
  const s = slide(pptx);
  header(s, 'Organizational Structure');
  const cx = SLIDE.w / 2;
  // Top: Founder
  s.addShape('rect', { x: cx - 1.4, y: 1.4, w: 2.8, h: 0.7, fill: { color: C.gold } });
  s.addText(`${BRAND.founder}\n${BRAND.founderRole}`, { x: cx - 1.35, y: 1.48, w: 2.7, h: 0.55, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
  s.addShape('line', { x: cx, y: 2.1, w: 0, h: 0.35, line: { color: C.navy, width: 1.5 } });
  s.addShape('line', { x: cx - 1.8, y: 2.45, w: 3.6, h: 0, line: { color: C.navy, width: 1.5 } });
  s.addShape('line', { x: cx - 1.8, y: 2.45, w: 0, h: 0.35, line: { color: C.navy, width: 1.5 } });
  s.addShape('line', { x: cx, y: 2.45, w: 0, h: 0.35, line: { color: C.navy, width: 1.5 } });
  s.addShape('line', { x: cx + 1.8, y: 2.45, w: 0, h: 0.35, line: { color: C.navy, width: 1.5 } });
  const roles = [
    { x: cx - 2.55, title: 'HR Leadership', sub: 'People · Training · Compliance', color: C.navy },
    { x: cx - 0.85, title: 'Counseling Team', sub: 'Student advisors · Applications', color: C.navyMid },
    { x: cx + 0.85, title: 'CTO', sub: 'Platform · CRM · Digital', color: C.navyMid },
  ];
  roles.forEach((r) => {
    s.addShape('rect', { x: r.x, y: 2.8, w: 1.7, h: 0.75, fill: { color: r.color } });
    s.addText(`${r.title}\n${r.sub}`, { x: r.x + 0.05, y: 2.88, w: 1.6, h: 0.6, fontSize: 7.5, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
  });
  s.addShape('line', { x: cx - 0.85 + 0.85, y: 3.55, w: 0, h: 0.3, line: { color: C.border, width: 1 } });
  const teams = ['Counselors', 'Operations', 'Platform / Dev', 'Marketing'];
  teams.forEach((t, i) => {
    s.addShape('rect', { x: M.l + i * 2.25, y: 4.0, w: 2.1, h: 0.5, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addText(t, { x: M.l + i * 2.25, y: 4.1, w: 2.1, h: 0.3, fontSize: 8, color: C.slate, align: 'center', fontFace: 'Calibri' });
  });
  s.addText('Founder-led quality assurance across all functions', { x: M.l, y: 4.65, w: CW, h: 0.2, fontSize: 7.5, italic: true, color: C.muted, align: 'center', fontFace: 'Calibri' });
}

function leadershipTeam(pptx) {
  const s = slide(pptx);
  header(s, 'Leadership Team');
  const cardW = (CW - 0.3) / 3;
  LEADERSHIP.forEach((person, i) => {
    const x = M.l + i * (cardW + 0.15);
    const y = 1.35;
    s.addShape('rect', { x, y, w: cardW, h: 3.55, fill: { color: C.white }, line: { color: C.border, width: 0.75 } });
    if (person.photo && fs.existsSync(person.photo)) {
      s.addImage({ path: person.photo, x: x + 0.15, y: y + 0.15, w: cardW - 0.3, h: 1.45, sizing: { type: 'cover', w: cardW - 0.3, h: 1.45 } });
    } else {
      s.addShape('rect', { x: x + 0.15, y: y + 0.15, w: cardW - 0.3, h: 1.45, fill: { color: person.color || C.navy } });
      s.addText(person.initials, { x: x + 0.15, y: y + 0.55, w: cardW - 0.3, h: 0.65, fontSize: 28, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    }
    s.addShape('rect', { x: x + 0.15, y: y + 1.55, w: cardW - 0.3, h: 0.42, fill: { color: i === 0 ? C.gold : C.navy } });
    s.addText(`${person.name}\n${person.role}`, { x: x + 0.2, y: y + 1.58, w: cardW - 0.4, h: 0.38, fontSize: 7.5, bold: true, color: C.white, fontFace: 'Calibri' });
    person.bullets.forEach((b, j) => {
      s.addText(`• ${b}`, { x: x + 0.15, y: y + 2.1 + j * 0.38, w: cardW - 0.3, h: 0.35, fontSize: 6.8, color: C.slate, fontFace: 'Calibri' });
    });
  });
}

function founderSpotlight(pptx) {
  const s = slide(pptx);
  header(s, 'Founder Spotlight — Vinodhini Y.');
  if (fs.existsSync(FOUNDER_IMG)) {
    s.addImage({ path: FOUNDER_IMG, x: M.l, y: 1.35, w: 2.5, h: 3.5, sizing: { type: 'cover', w: 2.5, h: 3.5 } });
    s.addShape('rect', { x: M.l, y: 4.55, w: 2.5, h: 0.3, fill: { color: C.gold } });
    s.addText('British Council Certified', { x: M.l, y: 4.58, w: 2.5, h: 0.24, fontSize: 7.5, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
  }
  const badges = [['10+', 'Years'], ['700+', 'Students'], ['Top 17', 'Pan-India'], ['Silver', 'Award']];
  badges.forEach(([v, l], i) => {
    const x = M.l + 2.7 + (i % 2) * 1.35;
    const y = 1.35 + Math.floor(i / 2) * 0.85;
    s.addShape('rect', { x, y, w: 1.25, h: 0.72, fill: { color: C.navy } });
    s.addText(v, { x, y: y + 0.08, w: 1.25, h: 0.35, fontSize: 16, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
    s.addText(l, { x, y: y + 0.42, w: 1.25, h: 0.25, fontSize: 7, color: C.white, align: 'center', fontFace: 'Calibri' });
  });
  const bio = [
    'Vinodhini Y. founded Mantra Global Education to deliver the personal, expert guidance every ambitious student deserves.',
    'Former IDP Counselor with around 700+ successful placements across USA, UK, Australia & beyond.',
    'Pan-India Top 17 advisor · Best Counselor — Silver Category · British Council Certified.',
    'Personally oversees counseling standards, complex cases, and quality assurance across Mantra operations.',
  ];
  s.addText(bio.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), {
    x: M.l + 2.7, y: 2.85, w: CW - 2.5, h: 2.0, fontSize: 9, color: C.slate, fontFace: 'Calibri', paraSpaceAfter: 6,
  });
}

function studentWorkflow(pptx) {
  const s = slide(pptx);
  header(s, 'Student Journey Workflow');
  const steps = [
    { n: '01', t: 'Profile Assessment', d: 'Mantra Profile Check\nBudget · academics · timeline' },
    { n: '02', t: 'Counseling', d: '1:1 session\nPackage recommendation' },
    { n: '03', t: 'Shortlisting', d: '3–5 universities\nFit & intake plan' },
    { n: '04', t: 'Application', d: 'SOP/LOR · docs\nPortal tracking' },
    { n: '05', t: 'Offer & Visa', d: 'Offer comparison\nVisa checklist' },
    { n: '06', t: 'Departure', d: 'Pre-departure\nAlumni connect' },
  ];
  const bw = (CW - 0.55) / 6;
  steps.forEach((st, i) => {
    const x = M.l + i * (bw + 0.1);
    const y = 1.65;
    s.addShape('ellipse', { x: x + bw / 2 - 0.2, y: y - 0.35, w: 0.4, h: 0.4, fill: { color: C.gold } });
    s.addText(st.n, { x: x + bw / 2 - 0.2, y: y - 0.3, w: 0.4, h: 0.32, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    s.addShape('rect', { x, y: y + 0.15, w: bw, h: 1.5, fill: { color: C.light }, line: { color: C.navy, width: 0.75 } });
    s.addText(st.t, { x: x + 0.05, y: y + 0.25, w: bw - 0.1, h: 0.3, fontSize: 8, bold: true, color: C.navy, align: 'center', fontFace: 'Calibri' });
    s.addText(st.d, { x: x + 0.05, y: y + 0.58, w: bw - 0.1, h: 1.0, fontSize: 7, color: C.muted, align: 'center', fontFace: 'Calibri' });
    if (i < 5) {
      s.addShape('line', { x: x + bw + 0.02, y: y + 0.75, w: 0.08, h: 0, line: { color: C.gold, width: 2, endArrowType: 'triangle' } });
    }
  });
  s.addShape('rect', { x: M.l, y: 3.55, w: CW, h: 1.25, fill: { color: C.navy } });
  s.addText('Student Portal Visibility at Every Stage: Applications · Documents · Appointments · Notifications · Milestone Tracking', {
    x: M.l + 0.15, y: 3.75, w: CW - 0.3, h: 0.85, fontSize: 9.5, color: C.white, align: 'center', valign: 'middle', fontFace: 'Calibri',
  });
}

function counselingPipeline(pptx) {
  const s = slide(pptx);
  header(s, 'Counseling Operations Pipeline');
  const pipeline = [
    ['New Lead', '15 min response', 'Partner / Ops'],
    ['Qualified', 'Same day', 'Counselor'],
    ['Counseling Done', '24 hours', 'Counselor'],
    ['Proposal Sent', '48 hours', 'Counselor'],
    ['Won (Paid)', 'Same day onboarding', 'Admin'],
    ['Enrolled', 'Commission logged', 'Counselor + Ops'],
  ];
  pipeline.forEach((row, i) => {
    const y = 1.38 + i * 0.58;
    s.addShape('rect', { x: M.l, y, w: 1.8, h: 0.48, fill: { color: C.navy } });
    s.addText(row[0], { x: M.l + 0.08, y: y + 0.1, w: 1.65, h: 0.3, fontSize: 8, bold: true, color: C.white, fontFace: 'Calibri' });
    s.addShape('rect', { x: M.l + 1.85, y, w: 2.0, h: 0.48, fill: { color: C.gold } });
    s.addText(`SLA: ${row[1]}`, { x: M.l + 1.93, y: y + 0.1, w: 1.85, h: 0.3, fontSize: 8, bold: true, color: C.white, fontFace: 'Calibri' });
    s.addShape('rect', { x: M.l + 3.9, y, w: CW - 3.9, h: 0.48, fill: { color: i % 2 === 0 ? C.light : C.white }, line: { color: C.border, width: 0.5 } });
    s.addText(`Owner: ${row[2]}`, { x: M.l + 4.0, y: y + 0.1, w: CW - 4.2, h: 0.3, fontSize: 8, color: C.slate, fontFace: 'Calibri' });
    if (i < 5) s.addText('▼', { x: M.l + 0.75, y: y + 0.44, w: 0.3, h: 0.15, fontSize: 8, color: C.gold, fontFace: 'Calibri' });
  });
}

function techArchitecture(pptx) {
  const s = slide(pptx);
  header(s, 'Mantra Technology Architecture (CTO-Led)');
  const layers = [
    { t: 'Experience Layer', d: 'Public Website · Profile Check · Book Counseling · Course Compare · Shortlist', c: C.gold },
    { t: 'Portal Layer', d: 'Student Portal · Counselor Portal · Admin Dashboard · Document Upload', c: C.navyMid },
    { t: 'API & Data Layer', d: 'REST API · JWT Auth · PostgreSQL · Role-based access · File storage', c: C.navy },
    { t: 'Roadmap Layer', d: 'CRM pipeline · WhatsApp integration · Payments · Partner portal · Analytics', c: '001A38' },
  ];
  layers.forEach((l, i) => {
    const y = 1.35 + i * 0.88;
    s.addShape('rect', { x: M.l, y, w: 2.2, h: 0.75, fill: { color: l.c } });
    s.addText(l.t, { x: M.l + 0.1, y: y + 0.22, w: 2.0, h: 0.32, fontSize: 8.5, bold: true, color: C.white, fontFace: 'Calibri' });
    s.addShape('rect', { x: M.l + 2.25, y, w: CW - 2.25, h: 0.75, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
    s.addText(l.d, { x: M.l + 2.4, y: y + 0.18, w: CW - 2.55, h: 0.4, fontSize: 8, color: C.slate, fontFace: 'Calibri', valign: 'middle' });
    if (i < 3) s.addText('▼', { x: M.l + 0.95, y: y + 0.72, w: 0.3, h: 0.15, fontSize: 9, color: C.gold, fontFace: 'Calibri' });
  });
}

function qualityFramework(pptx) {
  const s = slide(pptx);
  header(s, 'Quality Assurance & Ethics Framework');
  const cols = [
    { h: 'Counseling QA', items: ['British Council–aligned methodology', 'Founder review on complex cases', 'Weekly student status updates', 'Document authenticity checks'] },
    { h: 'Ethics Charter', items: ['No guaranteed admission/visa claims', 'Transparent fees before payment', 'Written scope per package', 'Zero tolerance for fraud'] },
    { h: 'HR Governance', items: ['Counselor onboarding & training', 'SOP compliance monitoring', 'Performance & SLA reviews', 'Partner quality standards'] },
  ];
  const w = (CW - 0.25) / 3;
  cols.forEach((col, i) => {
    const x = M.l + i * (w + 0.125);
    s.addShape('rect', { x, y: 1.35, w, h: 0.4, fill: { color: i === 1 ? C.gold : C.navy } });
    s.addText(col.h, { x: x + 0.1, y: 1.42, w: w - 0.2, h: 0.28, fontSize: 9.5, bold: true, color: C.white, fontFace: 'Calibri' });
    col.items.forEach((item, j) => {
      s.addShape('rect', { x, y: 1.82 + j * 0.72, w, h: 0.65, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
      s.addText(`✓  ${item}`, { x: x + 0.1, y: 1.92 + j * 0.72, w: w - 0.2, h: 0.45, fontSize: 8, color: C.slate, fontFace: 'Calibri', valign: 'middle' });
    });
  });
}

function whyGem(pptx) {
  const s = slide(pptx);
  header(s, 'Why Students & Families Choose Mantra');
  const items = [
    ['Founder-Led Trust', '10+ yrs · ex-IDP · British Council certified · 700+ placed'],
    ['Specialist Focus', 'USA, UK & Australia only — deep expertise per destination'],
    ['Tech-Enabled Journey', 'Student portal with real-time tracking — not a brochure site'],
    ['Transparent Process', 'Milestone visibility · honest outcomes · documented fees'],
    ['Ethical Standards', 'No false promises · verified university data · QA framework'],
    ['End-to-End Support', 'Assessment through pre-departure — one trusted partner'],
  ];
  items.forEach(([t, d], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M.l + col * (CW / 2 + 0.05);
    const y = 1.35 + row * 1.15;
    s.addShape('rect', { x, y, w: CW / 2 - 0.05, h: 1.0, fill: { color: C.white }, line: { color: C.border, width: 0.75 } });
    s.addShape('rect', { x, y, w: 0.08, h: 1.0, fill: { color: row % 2 === 0 ? C.gold : C.navy } });
    s.addText(t, { x: x + 0.2, y: y + 0.12, w: CW / 2 - 0.3, h: 0.28, fontSize: 10, bold: true, color: C.navy, fontFace: 'Calibri' });
    s.addText(d, { x: x + 0.2, y: y + 0.42, w: CW / 2 - 0.3, h: 0.5, fontSize: 8, color: C.muted, fontFace: 'Calibri' });
  });
}

function contact(pptx) {
  const s = slide(pptx);
  header(s, 'Connect With Mantra Global Education');
  s.addShape('rect', { x: M.l, y: 1.35, w: CW * 0.45, h: 3.5, fill: { color: C.navy } });
  s.addText('Contact', { x: M.l + 0.15, y: 1.45, w: 2, h: 0.25, fontSize: 10, bold: true, color: C.gold, fontFace: 'Calibri' });
  const info = [`${BRAND.founder} — ${BRAND.founderRole}`, BRAND.email, BRAND.phone, BRAND.web, `Focus: ${BRAND.focus}`];
  info.forEach((line, i) => {
    s.addText(line, { x: M.l + 0.15, y: 1.85 + i * 0.45, w: CW * 0.42, h: 0.35, fontSize: 9.5, color: C.white, fontFace: 'Calibri' });
  });
  s.addShape('rect', { x: M.l + CW * 0.47, y: 1.35, w: CW * 0.53, h: 3.5, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
  s.addText('Start Your Journey', { x: M.l + CW * 0.47 + 0.15, y: 1.45, w: 3, h: 0.25, fontSize: 10, bold: true, color: C.navy, fontFace: 'Calibri' });
  const steps = ['Visit mantraglobaleducation.com', 'Take Mantra Profile Check (free)', 'Book free counseling session', 'Explore courses & scholarships', 'Track journey in student portal'];
  steps.forEach((st, i) => {
    s.addShape('ellipse', { x: M.l + CW * 0.47 + 0.2, y: 1.9 + i * 0.58, w: 0.3, h: 0.3, fill: { color: C.gold } });
    s.addText(String(i + 1), { x: M.l + CW * 0.47 + 0.2, y: 1.95 + i * 0.58, w: 0.3, h: 0.22, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
    s.addText(st, { x: M.l + CW * 0.47 + 0.58, y: 1.93 + i * 0.58, w: CW * 0.4, h: 0.3, fontSize: 9, color: C.slate, fontFace: 'Calibri' });
  });
}

function closing(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.05, fill: { color: C.gold } });
  if (fs.existsSync(LOGO)) s.addImage({ path: LOGO, x: (SLIDE.w - 2.6) / 2, y: 0.4, w: 2.6, h: 0.86 });
  s.addText('Your Journey. Our Guidance. Global Success.', { x: M.l, y: 1.55, w: CW, h: 0.5, fontSize: 24, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
  s.addText('Your trusted partner for USA · UK · Australia', { x: M.l, y: 2.1, w: CW, h: 0.3, fontSize: 12, color: C.goldLt, align: 'center', fontFace: 'Calibri' });
  if (fs.existsSync(FOUNDER_IMG)) s.addImage({ path: FOUNDER_IMG, x: (SLIDE.w - 1.2) / 2, y: 2.55, w: 1.2, h: 1.5, sizing: { type: 'cover', w: 1.2, h: 1.5 } });
  s.addText(`${BRAND.founder} · ${BRAND.email} · ${BRAND.phone}`, { x: M.l, y: 4.25, w: CW, h: 0.3, fontSize: 10, color: 'C5D3E3', align: 'center', fontFace: 'Calibri' });
}

function buildPptx() {
  pageNum = 0;
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = BRAND.name;
  pptx.title = `${BRAND.name} — Company Profile`;
  cover(pptx);
  agenda(pptx);
  section(pptx, '01', 'About Mantra', 'Company overview, operating framework & strategic direction');
  execSummary(pptx);
  operatingFramework(pptx);
  visionMission(pptx);
  section(pptx, '02', 'What We Deliver', 'Services, destinations, packages & delivery framework');
  serviceFramework(pptx);
  destinations(pptx);
  packages(pptx);
  section(pptx, '03', 'Leadership Team', 'Founder, HR, CTO & organizational structure');
  orgStructure(pptx);
  leadershipTeam(pptx);
  founderSpotlight(pptx);
  section(pptx, '04', 'How We Work', 'Student workflow, counseling pipeline & technology');
  studentWorkflow(pptx);
  counselingPipeline(pptx);
  techArchitecture(pptx);
  section(pptx, '05', 'Why Mantra', 'Differentiation, quality framework & ethics');
  whyGem(pptx);
  qualityFramework(pptx);
  section(pptx, '06', 'Connect', 'Contact information & next steps');
  contact(pptx);
  closing(pptx);
  return pptx;
}

export { buildPptx, BRAND, DECK_LABEL, OUT, ASSETS, FOUNDER_IMG, LOGO };
