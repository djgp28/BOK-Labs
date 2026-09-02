import { chromium, devices } from 'playwright-core';
const [url, mode, lang, out] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext(mode === 'phone' ? { ...devices['iPhone 13'] } : { viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage(); await page.goto(url + '?lang=' + lang, { waitUntil: 'load' }); await page.waitForTimeout(1200);
const target = await page.evaluate(() => document.getElementById('a3').offsetTop - innerHeight * 0.35);
let y = 0; while (y < target) { await page.mouse.move(200, 400); await page.mouse.wheel(0, 200); y += 200; await page.waitForTimeout(16); }
await page.waitForTimeout(1500);
console.log(mode, lang, JSON.stringify(await page.evaluate(() => { const t = document.querySelector('.turn__line'); const r = t.getBoundingClientRect(); return { text: t.textContent, lines: Math.round(r.height / parseFloat(getComputedStyle(t).lineHeight)), right: Math.round(r.right), divider: Math.round(document.querySelector('.divider').getBoundingClientRect().left), op: getComputedStyle(t).opacity }; })));
await page.screenshot({ path: out }); await browser.close();
