/**
 * Shared Mantra deck layout engine — 16:9 aligned slides + official logo
 */
import fs from 'fs';
import path from 'path';
import PptxGenJS from 'pptxgenjs';

export const C = {
  navy: '00234E', navyLight: '003D7A', gold: 'C89116', goldLight: 'E8B84A',
  white: 'FFFFFF', slate: '334155', muted: '64748B', light: 'F1F5F9', border: 'CBD5E1',
};

export const BRAND = {
  name: 'Mantra Global Education',
  tagline: 'Your Journey. Our Guidance. Global Success.',
  founder: 'Vinodhini Y.',
  founderTitle: 'Founder, Mantra Global Education',
  email: 'support@mantraglobaleducation.com',
  phone: '+91 98765 43210',
  web: 'www.mantraglobaleducation.com',
  focus: 'USA · United Kingdom · Australia',
};

export const SLIDE = { w: 10, h: 5.625 };
export const M = { l: 0.45, r: 0.45, t: 0.2, content: 0.95, bottom: 5.05, footer: 5.28 };
export const CW = SLIDE.w - M.l - M.r;
export const LOGO = { w: 0.62, h: 0.62 };

export function createRenderer(logoPath, deckLabel) {
  let slideCounter = 0;

  function freshSlide(pptx) {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    return s;
  }

  function addLogo(s, x = M.l, y = M.t, w = LOGO.w) {
    if (fs.existsSync(logoPath)) {
      s.addImage({ path: logoPath, x, y, w, h: LOGO.h });
    }
  }

  function addFooter(s) {
    s.addShape('rect', { x: 0, y: M.footer, w: SLIDE.w, h: 0.07, fill: { color: C.gold } });
    s.addText(`${BRAND.name}  |  ${deckLabel}`, {
      x: M.l, y: M.footer - 0.22, w: CW, h: 0.18, fontSize: 7, color: C.muted, fontFace: 'Calibri',
    });
  }

  function addSlideHeader(s, title, num) {
    addLogo(s);
    s.addShape('rect', { x: M.l, y: M.content - 0.08, w: 1.0, h: 0.05, fill: { color: C.gold } });
    s.addText(title, { x: M.l, y: M.content, w: CW - 0.5, h: 0.42, fontSize: 20, bold: true, color: C.navy, fontFace: 'Calibri' });
    if (num) {
      slideCounter++;
      s.addText(String(slideCounter).padStart(2, '0'), {
        x: SLIDE.w - M.r - 0.4, y: M.t + 0.15, w: 0.4, h: 0.3, fontSize: 10, color: C.muted, align: 'right', fontFace: 'Calibri',
      });
    }
    addFooter(s);
  }

  return {
    resetCounter: () => { slideCounter = 0; },
    freshSlide,
    addLogo,
    addFooter,
    addSlideHeader,

    addCover(pptx, { title, subtitle, meta }) {
      const s = pptx.addSlide();
      s.background = { color: C.navy };
      s.addShape('rect', { x: 0, y: 0, w: 0.1, h: SLIDE.h, fill: { color: C.gold } });
      if (fs.existsSync(logoPath)) s.addImage({ path: logoPath, x: M.l + 0.1, y: 0.55, w: 2.6, h: 0.87 });
      s.addText(title, { x: M.l, y: 1.65, w: 7, h: 0.65, fontSize: 32, bold: true, color: C.white, fontFace: 'Calibri' });
      s.addText(subtitle, { x: M.l, y: 2.35, w: 6.5, h: 0.4, fontSize: 15, color: C.goldLight, fontFace: 'Calibri' });
      s.addText(BRAND.tagline, { x: M.l, y: 2.9, w: 5, h: 0.3, fontSize: 11, color: '8FA3BC', italic: true, fontFace: 'Calibri' });
      s.addText(meta.map((t) => ({ text: t, options: { bullet: { code: '25CF' }, breakLine: true } })), {
        x: M.l, y: 3.5, w: 5.5, h: 1.2, fontSize: 9.5, color: 'B8C5D6', fontFace: 'Calibri',
      });
      s.addText(String(new Date().getFullYear()), {
        x: 8.2, y: 4.6, w: 1.2, h: 0.45, fontSize: 22, bold: true, color: C.gold, align: 'right', fontFace: 'Calibri',
      });
    },

    addAgenda(pptx, items) {
      const s = freshSlide(pptx);
      addSlideHeader(s, 'Agenda', true);
      const colW = (CW - 0.3) / 2;
      const half = Math.ceil(items.length / 2);
      items.forEach((item, i) => {
        const col = i < half ? 0 : 1;
        const row = i < half ? i : i - half;
        const x = M.l + col * (colW + 0.3);
        const y = 1.55 + row * 0.82;
        s.addShape('ellipse', { x, y: y + 0.04, w: 0.32, h: 0.32, fill: { color: C.navy } });
        s.addText(item[0], { x, y: y + 0.07, w: 0.32, h: 0.26, fontSize: 9, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
        s.addText(item[1], { x: x + 0.4, y, w: colW - 0.4, h: 0.28, fontSize: 11, bold: true, color: C.navy, fontFace: 'Calibri' });
        s.addText(item[2], { x: x + 0.4, y: y + 0.28, w: colW - 0.4, h: 0.35, fontSize: 8.5, color: C.muted, fontFace: 'Calibri' });
      });
    },

    addSection(pptx, data) {
      const s = pptx.addSlide();
      s.background = { color: C.navy };
      s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.06, fill: { color: C.gold } });
      if (fs.existsSync(logoPath)) s.addImage({ path: logoPath, x: SLIDE.w - M.r - LOGO.w, y: M.t, w: LOGO.w, h: LOGO.h });
      s.addText(data.num, { x: M.l, y: 1.2, w: 2.5, h: 1.0, fontSize: 56, bold: true, color: C.gold, fontFace: 'Calibri' });
      s.addText(data.title, { x: M.l, y: 2.3, w: 7.5, h: 0.65, fontSize: 28, bold: true, color: C.white, fontFace: 'Calibri' });
      s.addText(data.subtitle, { x: M.l, y: 3.0, w: 7, h: 0.4, fontSize: 14, color: 'B8C5D6', fontFace: 'Calibri' });
    },

    addVisionMission(pptx, data) {
      const s = freshSlide(pptx);
      addSlideHeader(s, data.title, true);
      const items = [
        { label: 'Vision', text: data.vision, color: C.navy },
        { label: 'Mission', text: data.mission, color: C.gold },
        { label: 'Goal', text: data.goal, color: C.navy },
      ];
      items.forEach((item, i) => {
        const y = 1.55 + i * 1.15;
        s.addShape('rect', { x: M.l, y, w: 1.1, h: 0.95, fill: { color: item.color } });
        s.addText(item.label, { x: M.l, y: y + 0.3, w: 1.1, h: 0.35, fontSize: 11, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
        s.addShape('rect', { x: M.l + 1.1, y, w: CW - 1.1, h: 0.95, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
        s.addText(item.text, { x: M.l + 1.25, y: y + 0.12, w: CW - 1.4, h: 0.72, fontSize: 9.5, color: C.slate, fontFace: 'Calibri', valign: 'middle' });
      });
    },

    addObjective(pptx, data) {
      const s = freshSlide(pptx);
      addSlideHeader(s, data.title || 'Our Objectives', true);
      if (data.headline) {
        s.addShape('rect', { x: M.l, y: 1.48, w: CW, h: 0.42, fill: { color: C.light } });
        s.addText(data.headline, { x: M.l + 0.12, y: 1.52, w: CW - 0.24, h: 0.34, fontSize: 10, bold: true, color: C.navy, fontFace: 'Calibri', valign: 'middle' });
      }
      const cardW = (CW - 0.3) / 3;
      const startY = data.headline ? 2.05 : 1.55;
      data.objectives.forEach((obj, i) => {
        const x = M.l + i * (cardW + 0.15);
        s.addShape('rect', { x, y: startY, w: cardW, h: 2.65, fill: { color: C.white }, line: { color: C.border, width: 0.75 } });
        s.addShape('rect', { x, y: startY, w: cardW, h: 0.06, fill: { color: i % 2 === 0 ? C.gold : C.navy } });
        s.addText(String(i + 1), { x: x + 0.1, y: startY + 0.15, w: 0.4, h: 0.35, fontSize: 18, bold: true, color: C.gold, fontFace: 'Calibri' });
        s.addText(obj.title, { x: x + 0.1, y: startY + 0.5, w: cardW - 0.2, h: 0.35, fontSize: 10.5, bold: true, color: C.navy, fontFace: 'Calibri' });
        s.addText(obj.desc, { x: x + 0.1, y: startY + 0.9, w: cardW - 0.2, h: 1.6, fontSize: 8.5, color: C.muted, fontFace: 'Calibri', valign: 'top' });
      });
    },

    addStats(pptx, data) {
      const s = pptx.addSlide();
      s.background = { color: C.navy };
      addFooter(s);
      if (fs.existsSync(logoPath)) s.addImage({ path: logoPath, x: M.l, y: M.t, w: LOGO.w, h: LOGO.h });
      s.addText(data.title, { x: M.l, y: 0.95, w: CW, h: 0.4, fontSize: 22, bold: true, color: C.white, fontFace: 'Calibri' });
      const n = data.stats.length;
      const statW = (CW - (n - 1) * 0.15) / n;
      data.stats.forEach((st, i) => {
        const x = M.l + i * (statW + 0.15);
        s.addShape('rect', { x, y: 1.55, w: statW, h: 1.25, fill: { color: C.navyLight }, line: { color: C.gold, width: 0.75 } });
        s.addText(st.value, { x, y: 1.65, w: statW, h: 0.55, fontSize: n > 4 ? 22 : 26, bold: true, color: C.gold, align: 'center', fontFace: 'Calibri' });
        s.addText(st.label, { x: x + 0.05, y: 2.25, w: statW - 0.1, h: 0.4, fontSize: 8, color: C.white, align: 'center', fontFace: 'Calibri' });
      });
      if (data.bullets) {
        s.addText(data.bullets.map((b) => ({ text: b, options: { bullet: { code: '25CF' }, breakLine: true } })), {
          x: M.l + 0.1, y: 3.1, w: CW - 0.2, h: 1.7, fontSize: 10.5, color: 'D1DDE9', fontFace: 'Calibri',
        });
      }
    },

    addCards(pptx, data) {
      const s = freshSlide(pptx);
      addSlideHeader(s, data.title, true);
      const n = data.cards.length;
      const cols = data.cols || (n <= 4 ? n : 4);
      const rows = Math.ceil(n / cols);
      const gapX = 0.12;
      const gapY = 0.12;
      const cardW = (CW - (cols - 1) * gapX) / cols;
      const availH = M.bottom - 1.6;
      const cardH = (availH - (rows - 1) * gapY) / rows;
      data.cards.forEach((card, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = M.l + col * (cardW + gapX);
        const y = 1.55 + row * (cardH + gapY);
        s.addShape('rect', { x, y, w: cardW, h: cardH, fill: { color: C.white }, line: { color: C.border, width: 0.75 } });
        s.addShape('rect', { x, y, w: cardW, h: 0.07, fill: { color: card.accent || C.gold } });
        s.addText(card.title, { x: x + 0.08, y: y + 0.15, w: cardW - 0.16, h: 0.32, fontSize: cols > 4 ? 8 : 9.5, bold: true, color: C.navy, fontFace: 'Calibri' });
        s.addText(card.desc, { x: x + 0.08, y: y + 0.48, w: cardW - 0.16, h: cardH - 0.55, fontSize: cols > 4 ? 7 : 8, color: C.muted, fontFace: 'Calibri', valign: 'top' });
      });
    },

    addTwoCol(pptx, data) {
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
    },

    addProcess(pptx, data) {
      const s = freshSlide(pptx);
      addSlideHeader(s, data.title, true);
      const cols = data.cols || 3;
      const rows = Math.ceil(data.steps.length / cols);
      const gapX = 0.12;
      const gapY = 0.12;
      const cardW = (CW - (cols - 1) * gapX) / cols;
      const availH = M.bottom - 1.6;
      const cardH = (availH - (rows - 1) * gapY) / rows;
      data.steps.forEach((step, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = M.l + col * (cardW + gapX);
        const y = 1.55 + row * (cardH + gapY);
        s.addShape('rect', { x, y, w: cardW, h: cardH, fill: { color: C.light }, line: { color: C.border, width: 0.5 } });
        s.addShape('ellipse', { x: x + 0.1, y: y + 0.1, w: 0.32, h: 0.32, fill: { color: C.navy } });
        s.addText(step.num, { x: x + 0.1, y: y + 0.12, w: 0.32, h: 0.28, fontSize: 8.5, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
        s.addText(step.title, { x: x + 0.1, y: y + 0.48, w: cardW - 0.2, h: 0.28, fontSize: 8, bold: true, color: C.navy, fontFace: 'Calibri' });
        s.addText(step.desc, { x: x + 0.1, y: y + 0.76, w: cardW - 0.2, h: cardH - 0.82, fontSize: 7.2, color: C.muted, fontFace: 'Calibri', valign: 'top' });
      });
    },

    addTable(pptx, data) {
      const s = freshSlide(pptx);
      addSlideHeader(s, data.title, true);
      const fs = data.fontSize || 8;
      const tableRows = [
        data.headers.map((h) => ({ text: h, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: fs } })),
        ...data.rows.map((row, ri) => row.map((cell) => ({ text: cell, options: { color: C.slate, fontSize: fs, fill: { color: ri % 2 === 0 ? C.white : C.light } } }))),
      ];
      s.addTable(tableRows, {
        x: M.l, y: 1.52, w: CW, fontFace: 'Calibri',
        border: { type: 'solid', color: C.border, pt: 0.5 },
        colW: data.colW || data.headers.map(() => CW / data.headers.length),
        autoPage: false, rowH: data.rowH || 0.32,
      });
    },

    addBullets(pptx, data) {
      const s = freshSlide(pptx);
      addSlideHeader(s, data.title, true);
      let contentY = 1.55;
      if (data.highlight) {
        s.addShape('rect', { x: M.l, y: contentY, w: CW, h: 0.38, fill: { color: C.gold } });
        s.addText(data.highlight, { x: M.l + 0.1, y: contentY + 0.04, w: CW - 0.2, h: 0.3, fontSize: 9.5, bold: true, color: C.white, fontFace: 'Calibri', valign: 'middle' });
        contentY += 0.48;
      }
      s.addText(data.bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), {
        x: M.l + 0.1, y: contentY, w: CW - 0.2, h: M.bottom - contentY,
        fontSize: 10, color: C.slate, fontFace: 'Calibri', paraSpaceAfter: 6, valign: 'top',
      });
    },

    addFounder(pptx, data) {
      const s = freshSlide(pptx);
      addSlideHeader(s, data.title, true);
      s.addShape('rect', { x: M.l, y: 1.55, w: 2.8, h: M.bottom - 1.6, fill: { color: C.navy } });
      s.addText(BRAND.founder, { x: M.l + 0.15, y: 1.75, w: 2.5, h: 0.45, fontSize: 18, bold: true, color: C.white, fontFace: 'Calibri' });
      s.addText(BRAND.founderTitle, { x: M.l + 0.15, y: 2.2, w: 2.5, h: 0.3, fontSize: 10, color: C.goldLight, fontFace: 'Calibri' });
      const badges = ['British Council Certified', 'Former IDP Counselor', 'Top 17 Pan-India', 'Best Counselor — Silver'];
      badges.forEach((b, i) => {
        s.addText(b, { x: M.l + 0.15, y: 2.7 + i * 0.38, w: 2.5, h: 0.32, fontSize: 8, color: 'D1DDE9', fontFace: 'Calibri' });
      });
      s.addText(data.bio, { x: M.l + 3.05, y: 1.6, w: CW - 3.1, h: M.bottom - 1.65, fontSize: 9.5, color: C.slate, fontFace: 'Calibri', valign: 'top' });
    },

    addClosing(pptx, { headline, subline }) {
      const s = pptx.addSlide();
      s.background = { color: C.navy };
      s.addShape('rect', { x: 0, y: 0, w: SLIDE.w, h: 0.06, fill: { color: C.gold } });
      if (fs.existsSync(logoPath)) s.addImage({ path: logoPath, x: (SLIDE.w - 2.8) / 2, y: 0.45, w: 2.8, h: 0.93 });
      s.addText(headline, { x: M.l, y: 1.65, w: CW, h: 0.55, fontSize: 26, bold: true, color: C.white, align: 'center', fontFace: 'Calibri' });
      s.addText(subline, { x: M.l, y: 2.25, w: CW, h: 0.35, fontSize: 14, color: C.goldLight, align: 'center', fontFace: 'Calibri' });
      const contact = [BRAND.founder, BRAND.email, BRAND.phone, BRAND.web, `Focus: ${BRAND.focus}`];
      s.addText(contact.map((t) => ({ text: t, options: { breakLine: true, align: 'center' } })), {
        x: 1.5, y: 2.85, w: 7, h: 1.5, fontSize: 11, color: 'D1DDE9', fontFace: 'Calibri',
      });
      s.addText(BRAND.tagline, { x: M.l, y: 4.7, w: CW, h: 0.3, fontSize: 11, color: C.gold, align: 'center', italic: true, fontFace: 'Calibri' });
    },
  };
}

export async function buildPdf(htmlPath, pdfPath) {
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const { execSync } = await import('child_process');
  try {
    execSync(`"${chrome}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "file://${htmlPath}"`, { stdio: 'pipe' });
    return pdfPath;
  } catch { return null; }
}
