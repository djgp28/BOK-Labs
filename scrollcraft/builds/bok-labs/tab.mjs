// Keyboard pass: tab through the page and report what receives focus, where it is, and whether it is visible.
import { chromium } from 'playwright-core';
const url = process.argv[2] || 'http://localhost:4500';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(800);
const seen = [];
for (let i = 0; i < 24; i++) {
  await page.keyboard.press('Tab');
  await page.waitForTimeout(120);
  const info = await page.evaluate(() => {
    const el = document.activeElement; if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect();
    let node = el, op = 1; while (node && node !== document.body) { op *= parseFloat(getComputedStyle(node).opacity); node = node.parentElement; }
    const label = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('name') || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    return { tag: el.tagName.toLowerCase(), label, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), opacity: +op.toFixed(2), scrollY: Math.round(scrollY) };
  });
  if (!info) { seen.push('(body)'); continue; }
  seen.push(`${String(i+1).padStart(2)} ${info.tag.padEnd(8)} ${info.label.padEnd(42)} at ${info.x},${info.y} ${info.w}x${info.h} op=${info.opacity} scrollY=${info.scrollY}`);
}
console.log(seen.join('\n'));
await browser.close();
