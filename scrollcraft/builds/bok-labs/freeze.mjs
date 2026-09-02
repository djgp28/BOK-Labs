// Scroll through the whole page, come back into the middle of the peak, and check the pipeline is still built.
import { chromium } from 'playwright-core';
const url = process.argv[2] || 'http://localhost:4500'; const w = +(process.argv[3] || 1440), h = +(process.argv[4] || 900);
const browser = await chromium.launch({ channel: 'chrome' }); const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(800);
const state = () => page.evaluate(() => { const a4 = document.getElementById('a4'); const s4 = a4.querySelector('[data-sc-stage]');
  const st = s4.getBoundingClientRect(); const chips = [...document.querySelectorAll(".chip")].filter(c => getComputedStyle(c).display !== "none").map(c => { const r = c.getBoundingClientRect(); return [Math.round(r.x - st.x), Math.round(r.y - st.y)]; });
  const nodes = [...document.querySelectorAll(".node")].map(n => getComputedStyle(n).opacity);
  return { y: scrollY, p4: +parseFloat(a4.style.getPropertyValue('--sc-p')).toFixed(2), split: getComputedStyle(document.documentElement).getPropertyValue('--split').trim(), built: s4.classList.contains('is-built'), running: s4.classList.contains('is-running'), tangle: getComputedStyle(document.querySelector('.tangle path')).strokeDashoffset, spine: getComputedStyle(document.querySelector('.spine .draw')).strokeDashoffset, nodeOp: nodes.join(" "), chips, verify: s4.getAttribute('data-sc-verify-state') }; });
const docH = await page.evaluate(() => document.documentElement.scrollHeight);
const a4top = await page.evaluate(() => document.getElementById('a4').offsetTop), a4h = await page.evaluate(() => document.getElementById('a4').offsetHeight);
for (let y = 0; y <= docH - h; y += 80) { await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(25); }
await page.waitForTimeout(300); const end = await state();
const endChips = JSON.stringify(end.chips);
// back into the peak at about a third of its travel
const mid = Math.round(a4top + (a4h - h) * 0.3);
for (let y = docH - h; y >= mid; y -= 120) { await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(25); }
await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), mid); await page.waitForTimeout(500); const back = await state();
await page.screenshot({ path: process.argv[5] || 'freeze.png' });
await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(500); const top = await state();
console.log('end   ', JSON.stringify({ p4: end.p4, split: end.split, built: end.built, running: end.running }));
console.log('back  ', JSON.stringify({ p4: back.p4, split: back.split, built: back.built, running: back.running, tangle: back.tangle, spine: back.spine, nodeOp: back.nodeOp, chipsSame: JSON.stringify(back.chips) === endChips, verify: back.verify }));
console.log('top   ', JSON.stringify({ p4: top.p4, split: top.split, built: top.built }));
await browser.close();
