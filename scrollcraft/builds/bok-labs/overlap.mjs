// Scroll through in 100px steps; at each step report visible TEXT INK rectangles that intersect by more than 4px.
import { chromium } from 'playwright-core';
const url = process.argv[2], w = +process.argv[3], h = +process.argv[4];
const browser = await chromium.launch({ channel: 'chrome' }); const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(700);
const sel = '.cost, .notif, .node b, .node__tile, .peak__quiet, .peak__line, .offer, .turn__line, .stamp, .proof__h, .proof__lede, .row--gain h3, .row--gain p, .close__quiet, .close__h, .close__p, .field, .send, .foot > *, .hero__h, .hero__sys, .hero__sub, .cta, .divider__label, .status';
const docH = await page.evaluate(() => document.documentElement.scrollHeight); const found = new Map();
for (let y = 0; y <= docH - h; y += 100) {
  await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(90);
  const pairs = await page.evaluate((sel) => {
    const vis = (e) => { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return false; let n = e, o = 1; while (n && n !== document.body) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o > 0.5; };
    const ink = (e) => { const rg = document.createRange(); rg.selectNodeContents(e); const rs = [...rg.getClientRects()].filter(x => x.width > 0 && x.height > 0); if (!rs.length) return null;
      const l = Math.min(...rs.map(x => x.left)), t = Math.min(...rs.map(x => x.top)), r = Math.max(...rs.map(x => x.right)), b = Math.max(...rs.map(x => x.bottom)); return { left: l, top: t, right: r, bottom: b }; };
    const boxes = [...document.querySelectorAll(sel)].filter(vis).map(e => ({ e, r: ink(e), t: (e.textContent || '').trim().slice(0, 16) })).filter(b => b.r && b.r.bottom > 0 && b.r.top < innerHeight);
    const out = [];
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
      const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (ox > 4 && oy > 4) out.push(a.t + ' × ' + b.t + ' (' + Math.round(ox) + 'x' + Math.round(oy) + ')'); }
    return out; }, sel);
  pairs.forEach(p => found.set(p, y));
}
console.log(`${w}x${h}: overlapping text pairs: ${found.size}`); [...found.entries()].slice(0, 10).forEach(([p, y]) => console.log('   y=' + y, p));
await browser.close();
