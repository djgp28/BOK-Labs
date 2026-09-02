// Scroll down in small steps, record every text that reached full opacity, scroll back to the top, and report any that hid again.
import { chromium } from 'playwright-core';
const url = process.argv[2] || 'http://localhost:4500';
const w = +(process.argv[3] || 1440), h = +(process.argv[4] || 900);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(800);
const sel = '[data-sc-cue], .node, .offer';
const snap = () => page.evaluate((sel) => [...document.querySelectorAll(sel)].map(el => {
  const units = el.querySelectorAll('.sc-split__i');
  let o = units.length ? Math.min(...[...units].map(u => parseFloat(getComputedStyle(u).opacity))) : parseFloat(getComputedStyle(el).opacity);
  return { t: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 34), o: +o.toFixed(2), latched: el.classList.contains('is-latched') };
}), sel);
const docH = await page.evaluate(() => document.documentElement.scrollHeight);
const seen = new Map();
for (let y = 0; y <= docH - h; y += 60) { await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(40); (await snap()).forEach(s => { if (s.o >= 0.99) seen.set(s.t, true); }); }
await page.waitForTimeout(300);
for (let y = docH - h; y >= 0; y -= 120) { await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(30); }
await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(600);
const back = await snap();
const hidden = back.filter(s => seen.has(s.t) && s.o < 0.99);
console.log('texts that appeared:', seen.size, '| latched now:', back.filter(s => s.latched).length, '| hidden again after scrolling back:', hidden.length);
hidden.forEach(s => console.log('  HIDDEN', JSON.stringify(s)));
console.log('sample back at top:', JSON.stringify(back.filter(s => /order 1042|Monthly|One pipeline|Reports and|Workflows, aut|Or keep/.test(s.t)).map(s => [s.t.slice(0, 20), s.o, s.latched])));
await browser.close();
