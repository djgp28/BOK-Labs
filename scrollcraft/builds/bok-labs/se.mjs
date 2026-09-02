import { chromium } from 'playwright-core';
const [url, lang, out] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage(); await page.goto(url + '?lang=' + lang, { waitUntil: 'load' }); await page.waitForTimeout(1500);
console.log(JSON.stringify(await page.evaluate(() => { const c = document.querySelector('.copy--hero-sys').getBoundingClientRect(); const l = document.querySelector('.divider__label--r').getBoundingClientRect(); return { copyTop: Math.round(c.top), copyBottom: Math.round(c.bottom), labelBottom: Math.round(l.bottom), vh: innerHeight }; })));
await page.screenshot({ path: out }); await browser.close();
