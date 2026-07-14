/**
 * Mantra Global Education — Company Profile Deck
 * Run: npm run deck:company
 */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { buildPptx, BRAND, DECK_LABEL, OUT, LOGO, FOUNDER_IMG } from './company-deck-pro.mjs';
import { buildPdf } from '../shared/deck-engine.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function buildHtml() {
  const css = `@page{size:13.333in 7.5in;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Calibri,'Segoe UI',Arial,sans-serif}.slide{width:13.333in;height:7.5in;page-break-after:always;position:relative;overflow:hidden;padding:32px 40px}.cover{background:#00234E;color:#fff}.cover .logo{width:280px}.cover h1{font-size:36px;margin:12px 0 6px}.cover .sub{color:#E8B84A;font-size:16px}.section{background:#00234E;color:#fff;padding-left:48px;display:flex;flex-direction:column;justify-content:center}.section .num{font-size:64px;color:#C89116;font-weight:800}.section h1{font-size:32px}.hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #C89116;padding-bottom:6px;margin-bottom:10px}.hdr img{height:38px}.hdr h1{font-size:20px;color:#00234E;margin:0;flex:1;padding-left:10px}.content h2{font-size:16px;color:#00234E;margin:8px 0}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.card{border:1px solid #CBD5E1;padding:10px;background:#F8FAFC}.card img{width:100%;height:140px;object-fit:cover}.flow{display:flex;gap:6px;align-items:stretch}.flow .step{flex:1;background:#F1F5F9;border:1px solid #00234E;padding:8px;text-align:center;font-size:9px}.layer{background:#00234E;color:#fff;padding:10px 14px;margin-bottom:6px;font-size:11px}.footer{position:absolute;bottom:12px;left:40px;right:40px;border-top:3px solid #C89116;padding-top:4px;font-size:8px;color:#64748B}`;
  const slides = [
    `<section class="slide cover"><img src="assets/gem-logo-sm.png" class="logo"/><h1>Company Profile</h1><p class="sub">Premium Study Abroad Advisory · ${BRAND.focus}</p><p>${BRAND.tagline}</p></section>`,
    `<section class="slide section"><span class="num">01</span><h1>About Mantra</h1><p>Operating framework & strategic direction</p></section>`,
    `<section class="slide content"><div class="hdr"><img src="assets/gem-logo-sm.png"/><h1>Executive Summary</h1></div><p>Founder-led premium boutique advisory for USA, UK & Australia. Leadership: Founder & Chief Counselor, HR, CTO.</p></section>`,
    `<section class="slide section"><span class="num">03</span><h1>Leadership Team</h1><p>Founder, HR & CTO</p></section>`,
    `<section class="slide content"><div class="hdr"><img src="assets/gem-logo-sm.png"/><h1>Leadership Team</h1></div><div class="grid3">
      <div class="card"><img src="assets/founder-vinodhini.png"/><strong>${BRAND.founder}</strong><br/>${BRAND.founderRole}</div>
      <div class="card"><div style="height:140px;background:#003D7A;color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold">HR</div><strong>HR Leadership</strong><br/>Head of Human Resources</div>
      <div class="card"><div style="height:140px;background:#C89116;color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold">CTO</div><strong>Technology Leadership</strong><br/>Chief Technology Officer</div>
    </div></section>`,
    `<section class="slide content"><div class="hdr"><img src="assets/gem-logo-sm.png"/><h1>Student Journey Workflow</h1></div><div class="flow">
      ${['Profile Assessment','Counseling','Shortlisting','Application','Offer & Visa','Departure'].map(s=>`<div class="step"><strong>${s}</strong></div>`).join('')}
    </div></section>`,
    `<section class="slide content"><div class="footer">${BRAND.name} | ${DECK_LABEL}</div><div class="hdr"><img src="assets/gem-logo-sm.png"/><h1>Connect</h1></div><p>${BRAND.email} · ${BRAND.phone} · ${BRAND.web}</p></section>`,
  ].join('');
  const out = path.join(OUT, 'Mantra-Global-Education-Company-Profile.html');
  fs.writeFileSync(out, `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Mantra Company Profile</title><style>${css}</style></head><body>${slides}</body></html>`, 'utf8');
  return out;
}

const pptx = buildPptx();
const pptxPath = path.join(OUT, 'Mantra-Global-Education-Company-Profile.pptx');
await pptx.writeFile({ fileName: pptxPath });
const htmlPath = buildHtml();
const pdfPath = await buildPdf(htmlPath, path.join(OUT, 'Mantra-Global-Education-Company-Profile.pdf'));

console.log('\n✅ Mantra Company Profile (Professional) generated:\n');
console.log(`   PPTX   : ${pptxPath}`);
console.log(`   PDF    : ${pdfPath || 'Open HTML → Print → Save as PDF'}`);
console.log(`   HTML   : ${htmlPath}`);
console.log(`   Logo   : ${LOGO}`);
console.log(`   Founder: ${FOUNDER_IMG}`);
console.log(`   Slides : 24 (frameworks, workflows, leadership with photo)\n`);
