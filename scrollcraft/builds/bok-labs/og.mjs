// Renders og-image.png (1200x630) from the brand kit with the installed Chrome. No generated media.
import { chromium } from 'playwright-core';
import path from "node:path";
import fs from "node:fs";
const root = path.resolve(process.argv[2] || ".");
const b64 = (f) => "data:font/woff2;base64," + fs.readFileSync(path.join(root, "assets/fonts", f)).toString("base64");
const SG = b64("space-grotesk-latin-wght-normal.woff2"), JB = b64("jetbrains-mono-latin-wght-normal.woff2");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Space Grotesk";src:url("${SG}") format("woff2-variations");font-weight:300 700}
@font-face{font-family:"JetBrains Mono";src:url("${JB}") format("woff2-variations");font-weight:100 800}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0A0A0A;color:#F4F4F5;font-family:"Space Grotesk",system-ui,sans-serif}
.l{position:absolute;left:0;top:0;width:600px;height:630px;background:#151311}
.r{position:absolute;left:600px;top:0;width:600px;height:630px;background:#0A0A0A;background-image:linear-gradient(rgba(244,244,245,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(244,244,245,.05) 1px,transparent 1px);background-size:56px 56px}
.line{position:absolute;left:600px;top:0;width:2px;height:630px;background:#3DBA7E}
.mark{position:absolute;left:64px;top:52px;font:700 34px/1 "Space Grotesk";letter-spacing:-.025em;display:flex;align-items:baseline;gap:10px}
.mark small{font:400 18px/1 "JetBrains Mono";color:#A1A1AA}.mark small b{color:#3DBA7E;font-weight:500}
.lab{position:absolute;top:60px;font:500 15px/1 "JetBrains Mono";letter-spacing:.12em;text-transform:uppercase;color:#A1A1AA}
.lab.a{right:624px}.lab.b{left:624px;color:#7DD3A8}
h1{position:absolute;margin:0;font:600 60px/1 "Space Grotesk";letter-spacing:-.03em;text-wrap:balance}
.h1{left:64px;top:300px;width:470px}.h2{left:664px;top:300px;width:470px}
p{position:absolute;left:664px;top:470px;width:470px;margin:0;font:400 22px/1.45 "Space Grotesk";color:#A1A1AA}
.chip{position:absolute;background:#171717;border:1px solid #303030;border-radius:10px;padding:12px 14px;font:400 13px/1.5 "JetBrains Mono";color:#A1A1AA;box-shadow:0 8px 18px -4px rgba(0,0,0,.5)}
.chip b{display:block;color:#F4F4F5;font-weight:500}
.wa{left:80px;top:120px;transform:rotate(-6deg);background:#14361F;border-color:#1F5C3F;border-radius:14px 14px 14px 4px}
.xl{left:330px;top:150px;transform:rotate(5deg)}
.st{left:200px;top:220px;transform:rotate(-10deg);background:#D8D1B4;color:#1B1A16;border-color:transparent;border-radius:2px;font-family:"Space Grotesk";font-weight:500;font-size:15px}
.node{position:absolute;left:700px;font:600 20px/1 "Space Grotesk";letter-spacing:-.01em}
.node::before{content:"";position:absolute;left:-30px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid #3DBA7E;box-sizing:border-box}
.spine{position:absolute;left:673px;top:112px;width:2px;height:150px;background:#3DBA7E}
</style></head><body>
<div class="l"></div><div class="r"></div><div class="line"></div>
<div class="mark">BOK <small><b>[</b>labs<b>]</b></small></div>
<div class="lab a">Today</div><div class="lab b">With a system</div>
<div class="chip wa"><span>WhatsApp · 11:42 PM</span><b>Do you still have the 500 ml?</b></div>
<div class="chip xl"><b>prices_v7_FINAL.xlsx</b><span>modified yesterday · by Luis</span></div>
<div class="chip st">Call Marta re: invoice 1042</div>
<div class="spine"></div>
<div class="node" style="top:106px">Intake</div><div class="node" style="top:156px">Rules</div><div class="node" style="top:206px">One record</div><div class="node" style="top:256px">Reports and alerts</div>
<h1 class="h1">Runs on WhatsApp, spreadsheets and memory.</h1>
<h1 class="h2" style="color:#F4F4F5">It could run on a system.</h1>
<p>Workflows, automations and AI systems that run small business operations.</p>
</body></html>`;
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(root, 'og-image.png'), type: 'png' });
await browser.close();
console.log('og-image.png written');
