import { chromium, devices } from 'playwright-core';
const [url, lang, out] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage(); await page.goto(url + '?lang=' + lang, { waitUntil: 'load' }); await page.waitForTimeout(1200);
const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
let y = 0; while (y < max + 400) { await page.mouse.move(200, 400); await page.mouse.wheel(0, 200); y += 200; await page.waitForTimeout(16); }
await page.waitForTimeout(3000);
console.log(JSON.stringify(await page.evaluate(() => { const d = document.querySelector('.divider'); const r = d.getBoundingClientRect(); const cs = getComputedStyle(d); const f = document.querySelector('.foot__tag').getBoundingClientRect(); return { y: Math.round(scrollY), max: document.documentElement.scrollHeight - innerHeight, split: getComputedStyle(document.documentElement).getPropertyValue('--split').trim(), dividerLeft: Math.round(r.left), dividerOpacity: cs.opacity, dividerDisplay: cs.display, bodyClass: document.body.className, tagBottom: Math.round(f.bottom), vh: innerHeight }; })));
await page.screenshot({ path: out }); await browser.close();
