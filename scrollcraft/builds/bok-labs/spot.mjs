import { chromium, devices } from 'playwright-core';
const [url, mode, out] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: false });
const ctx = await browser.newContext(mode === 'phone' ? { ...devices['iPhone 13'] } : { viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage(); await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(1200);
const target = await page.evaluate(() => document.getElementById('a2').offsetTop - Math.round(innerHeight * 0.2));
let y = 0; while (y < target) { await page.mouse.move(200, 400); await page.mouse.wheel(0, 120); y += 120; await page.waitForTimeout(30); }
await page.waitForTimeout(2500);
console.log(JSON.stringify(await page.evaluate(() => { const c = document.querySelector('.cost'); const r = c.getBoundingClientRect(); return { y: Math.round(scrollY), costTop: Math.round(r.top), costOpacity: getComputedStyle(c).opacity, latched: c.classList.contains('is-latched'), transform: getComputedStyle(c).transform }; })));
await page.screenshot({ path: out }); await browser.close();
