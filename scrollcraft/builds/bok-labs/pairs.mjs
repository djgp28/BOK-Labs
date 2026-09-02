// screenshots: tension act at the moment every pair is in, hero (top), footer (bottom); desktop + iPhone, EN + ES
import { chromium, devices } from 'playwright-core';
const [url, mode, lang, outdir] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext(mode === 'phone' ? { ...devices['iPhone 13'] } : { viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url + '?lang=' + lang, { waitUntil: 'load' }); await page.waitForTimeout(1500);
await page.screenshot({ path: `${outdir}/${mode}-${lang}-hero.png` });
// scroll so the tension act's progress is ~0.75
const target = await page.evaluate(() => { const a = document.getElementById('a2'); return a.offsetTop + a.offsetHeight * 0.75 - innerHeight; });
let y = 0; while (y < target) { await page.mouse.move(200, 400); await page.mouse.wheel(0, 160); y += 160; await page.waitForTimeout(16); }
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('.cols--tension > *')].map(e => { const r = e.getBoundingClientRect(); return { cls: e.className.split(' ')[0], top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), op: getComputedStyle(e).opacity }; });
  const div = document.querySelector('.divider'); const d = div ? Math.round(div.getBoundingClientRect().left) : null;
  return { y: Math.round(scrollY), divider: d, p2: getComputedStyle(document.getElementById('a2')).getPropertyValue('--sc-p').trim(), rows };
});
console.log(mode, lang, JSON.stringify(info));
await page.screenshot({ path: `${outdir}/${mode}-${lang}-tension.png` });
await page.evaluate(() => scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(1500);
await page.screenshot({ path: `${outdir}/${mode}-${lang}-foot.png` });
await browser.close();
