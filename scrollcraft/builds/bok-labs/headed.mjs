// Headed real Chrome (visible window, real wheel events): measure frames, reveals and take screenshots.
import { chromium, devices } from 'playwright-core';
const url = process.argv[2]; const mode = process.argv[3] || 'desktop'; const out = process.argv[4] || 'headed';
const browser = await chromium.launch({ channel: 'chrome', headless: false });
const ctx = await browser.newContext(mode === 'phone' ? { ...devices['iPhone 13'] } : { viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage(); await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(1500);
const probe = () => page.evaluate(async () => { const t0 = performance.now(); const raf = await Promise.race([new Promise(r => requestAnimationFrame(() => r(Math.round(performance.now() - t0)))), new Promise(r => setTimeout(() => r(-1), 3000))]);
  const op = s => { const e = document.querySelector(s); return e ? +getComputedStyle(e).opacity : null; };
  return { vis: document.visibilityState, raf, y: Math.round(scrollY), revealed: document.querySelectorAll('[data-sc-in].sc-in').length + '/' + document.querySelectorAll('[data-sc-in]').length, cost: op('.cost'), notif: op('.notif'), turn: op('.turn__line'), node: op('.node'), split: getComputedStyle(document.documentElement).getPropertyValue('--split').trim() }; });
console.log('load   ', JSON.stringify(await probe()));
const wheel = async (px, steps) => { for (let i = 0; i < steps; i++) { await page.mouse.move(300, 400); await page.mouse.wheel(0, px); await page.waitForTimeout(40); } };
await wheel(120, 12); await page.waitForTimeout(1500); console.log('tension', JSON.stringify(await probe())); await page.screenshot({ path: out + '-tension.png' });
await wheel(120, 14); await page.waitForTimeout(1500); console.log('peak   ', JSON.stringify(await probe())); await page.screenshot({ path: out + '-peak.png' });
await wheel(120, 14); await page.waitForTimeout(1500); console.log('after  ', JSON.stringify(await probe())); await page.screenshot({ path: out + '-after.png' });
await wheel(120, 20); await page.waitForTimeout(1500); console.log('end    ', JSON.stringify(await probe())); await page.screenshot({ path: out + '-end.png' });
await browser.close();
