# HANDOFF · bok-labs.com

Last updated 2026-09-02 (end of round 5). Read this first when picking the site up again.

Live: https://bok-labs.com (GitHub Pages from the root of `main`, repo `djgp28/BOK-Labs`, CNAME).
Live commit: `main` @ 6c1d33f. Asset version in `index.html`: `?v=20260902n`.
Local clone: `~/BOK-Labs`. Working branch = `main` (feature branches are short-lived, one per round).

## What the site is

One page, built with the scroll-craft skill (`nateherkai/scroll-craft`, engine copied unmodified into `engine/`).
Grammar: a **split stage**. Left column = today (chaos), right column = with a system. A fixed vertical divider
is the chrome (labels "Today / With a system", wordmark, EN/ES toggle, progress). The page argues in six acts and
ends with the divider collapsing to zero over the contact form. Bilingual: English by default, Spanish when the
browser is Spanish or `?lang=es`; the toggle reloads with `?lang=` and the choice is remembered.

Offer = automation + AI systems for small businesses. No pricing, no invented numbers, no client logos (the three
example projects were removed at David's request in PR #9 and must stay out).

## Files

| Path | What |
|---|---|
| `index.html` | The whole page: all CSS (desktop first, phone block at the end under `@media (max-width: 860px)`), all markup, SEO head, JSON-LD. |
| `site.js` | Spanish dictionary (`ES`, keys = `data-i18n`), language resolution, phone setup, the `frame()` that publishes `--split`, the latch, the form. |
| `engine/scrollcraft.js`, `engine/scrollcraft.css` | The scroll-craft engine. **Never edit.** |
| `assets/01-chaos.mp4`, `01-chaos-m.mp4`, posters `.jpg` | Hero footage (kie.ai still + 5 s clip, encoded 1080p / 720p). |
| `assets/fonts/` | Space Grotesk + JetBrains Mono (variable). |
| `og-image.png`, `favicon*.png/svg`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`, `404.html`, `CNAME` | Static bits. |
| `scrollcraft/builds/bok-labs/` | Build folder: `BRIEF.md` (the interview and the plan), `REPORT.md` (build report + round notes), this file, probes (`*.mjs`), `gen_assets.sh`, `.env` (kie.ai key, gitignored), `lab/` and `out/` (screenshots, gitignored). |
| `scrollcraft/FINGERPRINTS.md` | Skill registry row for this build. |

## The page, act by act

| # | id | act | what happens |
|---|---|---|---|
| 1 | `#a1` | scrub, span 1.4, dwell 0.3 (phone 1.2) | Hero. Left: the clip (poster `<picture>` under it, `.clip-ok` fallback keeps the poster if the clip never paints) with the headline "Your operation runs on WhatsApp, spreadsheets and memory." Right: "It could run on your own system." (kinetic lines), the sub-line, the CTA. |
| 2 | `#a2` | flow, `.tension` | Three costs on the left, each answered by a push-notification card on the right ("BOK Labs · now"). One grid row per pair (`.cols--tension`, 60/40, `align-content: center`), so each cost is centred on its card. Cues: costs 0.16 / 0.32 / 0.48, cards 0.24 / 0.40 / 0.56, window `X 1 0.09 0`. `min-height: 92vh` so each arrival takes scroll. |
| 3 | `#a3` | flow, `.turn` | The stamp "Tuesday, 11:40 pm. Still at the desk." and the line "Then you make one decision, and we build the rest." (right column). `--split` fixed at 0.6 here. |
| 4 | `#a4` | pin, span 2.6 (phone 3) | The peak: seven chaos chips (`.chip`, coordinates in `.chip:nth-child(n)` rules, starts 0.16 … 0.46) fly across the divider and file beside the five pipeline steps (`.node`, `--n` 0.34 … 0.70); the tangle un-draws, the spine draws, the runner starts at p ≥ 0.70 and the stage gets `.is-built` (frozen forever after). Phones: chips are absorbed on landing and each step shows its own `.node__tile`; the spine/runner are hidden and the steps are a flow list. |
| 4b | `#a4b` | flow, `.after` | The quiet line, "One pipeline. It runs while you sleep." and the offer paragraph. `--split` 0.4. |
| 5 | `#a5` | flow, `.proof` | The gains block: heading "Big-company tools, in everyone's hands.", lede, four today / with-a-system rows (scale, more sales, more control, better decisions). `--split` 0.4. |
| 6 | `#contact` | pin, span 1.4 (phone: converted to flow by site.js) | The close: quiet line, "Tell us what's slowing you down.", the form (Web3Forms, honeypot `botcheck`), the footer. The divider collapses 0.4 → 0 here. |

Divider position over the page: 0.50 in the hero → 0.60 by the end of the tension → 0.40 across the peak → 0 at
the close. Formula in `site.js frame()`:
`split = 0.5 + 0.1·S((p2−0.1)/0.5) − 0.2·peak − 0.4·closeTerm`, `peak = built ? S(p4/0.04) : S((p4−0.04)/0.18)`,
`closeTerm = S((p6−0.40)/0.18)` when the close is flow (phones), else `S((p6−0.05)/0.45)`.
`body.is-collapsing` (split < 0.398 or p6 > 0.15) hides the divider labels on phones; `body.is-collapsed` at split < 0.08.

## Mechanics that matter

- **Text reveals are scroll cues, never IntersectionObserver.** `data-sc-cue="from to rampIn rampOut"` on a flow act
  reads the act's `--sc-p`. IO-based reveals (`data-sc-in`) never fired on David's devices; none remain in the page.
- **The latch.** `site.js latch()` adds `.is-latched` to every cue element, kinetic unit, pipeline node (at p4 ≥ n + 0.06)
  and the offer (p4 ≥ 0.7) the first time it reaches full opacity. `.is-latched { opacity:1 !important; transform:none !important }`
  beats the engine's inline styles. Text that has appeared never hides again until reload. David insists on this.
- **The freeze.** `.is-built` on the peak stage at p4 ≥ 0.70: chips filed, tangle gone, spine drawn, runner running,
  whatever the scroll does afterwards.
- **Paint order.** Flow sections have absolutely positioned ground layers (`.g--chaos`, `.g--system`). A static (latched,
  transform removed) text paints UNDER them unless the section isolates: `.turn, .proof, .tension, .after { position: relative;
  isolation: isolate }` and `.g { z-index: -1 }`. Removing that brings back "text missing after the hero" on phones.
- **Fixed `--split` in flow sections.** `.turn` 0.6, `.after` 0.4, `.proof` 0.4. If a flow section reads the live value,
  its grid re-wraps as the divider moves, the document height changes and Chrome's scroll anchoring jumps.
  The tension act is the exception: its grid is a fixed 60/40 and only its grounds read the live split.
- **Phones (≤ 860 px or coarse pointer).** Same two columns and vertical divider. Divider labels are vertical on the line.
  Gutter 20 px. Nothing is absolutely positioned in text blocks. The close act is unpinned by site.js before `ScrollCraft.mount`
  (`data-sc-act="flow"`, `data-sc-stage` removed). `data-sc-lerp` 0.6 and longer spans on touch (`a1` 1.2, `a4` 3, `contact` 1.3).
- **Cache.** Every script, style and clip URL carries `?v=…`. Bump it on every deploy or David's browsers keep the old
  site.js/CSS for a day: `sed -i '' 's/v=20260902n/v=NEW/g' index.html`.
- **The claude-in-chrome extension tab** reports `document.hidden === true` even when it looks foregrounded; rAF stops,
  paints throttle, screenshots go stale. Never use it for timing or paint checks. Use headed Playwright Chrome
  (`headed.mjs`, `spot.mjs`) or the harness.

## Copy

English lives in `index.html`; Spanish in the `ES` dictionary at the top of `site.js`, keyed by `data-i18n`
(attributes via `data-i18n-attr="content:meta.desc"`). Change both when changing a line. Current slogans and lines
David chose:

- Hero: "Your operation runs on WhatsApp, spreadsheets and memory." / "It could run on your own system." ·
  ES "Tu operación funciona con WhatsApp, hojas de cálculo y memoria." / "Podría funcionar con tu sistema."
- Hero sub: "BOK Labs builds the workflows, automations and AI systems tailored to your business's needs, to accelerate its growth." ·
  ES (David's wording) "BOK Labs construye los flujos de trabajo, automatizaciones y sistemas con IA ajustados a las necesidades de tu negocio para acelerar el crecimiento."
- Costs: "The price is in an email thread with someone." / "The order is in a chat from Tuesday." / "The report is in a spreadsheet only one person knows how to use." ·
  ES "El precio está en un correo con alguien." / "El pedido está en un chat del martes." / "El informe está en una hoja de cálculo que solo una persona sabe usar."
- Turn line (David's pick, option 3 of 5): "Then you make one decision, and we build the rest." · ES "Entonces tomas una decisión, y nosotros construimos el resto."
- Gains heading: "Big-company tools, in everyone's hands." · ES "Herramientas de grandes empresas, al alcance de todos."
- Footer tag: "Making small businesses feel large." · ES "Haciendo que los pequeños negocios se sientan grandes."
- Footer: "Maracaibo, Venezuela · Barcelona, Spain" · info@bok-labs.com · "© 2026 BOK Labs" (no "Inc", no reply-time promise).
- SEO: title/description name Maracaibo, Venezuela; JSON-LD `ProfessionalService` with a Maracaibo/Zulia/VE address; `og:locale` es_VE.

## Run locally

```
node ~/scroll-craft/plugins/nateherk-design/skills/scrollcraft/scripts/serve.mjs --root ~/BOK-Labs --port 4500
```
Then http://localhost:4500 (and `?lang=es`). For David's phone use the Mac's LAN IP on port 4500
(`ipconfig getifaddr en0`); his Chrome blocks `localhost`. `playwright-core` is a devDependency of the repo and
launches the installed Chrome (`channel: 'chrome'`); run probes from inside the repo so it resolves.

## Verify before any deploy

All probes live in `scrollcraft/builds/bok-labs/` and take a URL (local or https://bok-labs.com/?nocache=…).

| Probe | Command | Expect |
|---|---|---|
| Harness | `node ~/scroll-craft/plugins/nateherk-design/skills/scrollcraft/scripts/shoot.mjs --url http://localhost:4500/?lang=es --width 390 --height 844 --steps 12 --out scrollcraft/builds/bok-labs/lab/x` | `report.json`: `consoleErrors: []`, `failed: []`, clip value increasing every frame, contrast worst ≥ 4.3 (the Spanish hero line over the footage is the floor). Run 1440×900 EN + ES and 390×844 ES at least. |
| Overlap | `node scrollcraft/builds/bok-labs/overlap.mjs <url> 390 844` (also 375 667, 430 932) | `overlapping text pairs: 0` on phones. Desktop reports the fixed divider label crossing passing text for a frame; that is pre-existing and accepted. |
| Latch | `node scrollcraft/builds/bok-labs/latch.mjs <url> 390 844` | `hidden again after scrolling back: 0` (31 texts). |
| Freeze | `node scrollcraft/builds/bok-labs/freeze.mjs <url> …` | pipeline stays built after scrolling back. |
| Pairs | `node scrollcraft/builds/bok-labs/pairs.mjs <url> phone\|desktop en\|es <outdir>` | hero / tension / footer screenshots; each cost row centred on its card. |
| Small phone | `node scrollcraft/builds/bok-labs/se.mjs <url> es <out.png>` | Spanish hero copy sits below the divider label at 375×667. |
| Page end | `node scrollcraft/builds/bok-labs/bottom.mjs <url> es <out.png>` | `split: "0"`, divider at x = 0 after a real wheel scroll. |
| Turn line | `node scrollcraft/builds/bok-labs/turn.mjs <url> phone\|desktop en\|es <out.png>` | line count and no crossing of the divider. |
| Headed | `node scrollcraft/builds/bok-labs/headed.mjs …`, `spot.mjs <url> phone\|desktop <out.png>` | visible Chrome, real wheel events; use when a symptom only shows on David's devices. |
| Keyboard | `node scrollcraft/builds/bok-labs/tab.mjs …` | every focused control at opacity 1. |

Read the screenshots by eye as well; the probes do not see design.

## Deploy

Only on David's explicit word, per deploy ("publica", "deploy", "merge"). Never merge on your own judgement.

1. Branch from `main`, commit, bump `?v=` in `index.html`.
2. `git push -u origin <branch>` and `gh pr create --title … --body-file …` (a body file avoids shell quoting trouble).
3. On David's word: `gh pr merge <n> --squash --delete-branch`, then `git checkout main && git pull`.
4. Poll `gh api repos/djgp28/BOK-Labs/pages/builds/latest` until `status: built` and `commit` = main HEAD (about 30 s).
5. Verify live: `curl -s https://bok-labs.com/?nocache=$(date +%s) | grep -o 'v=20260902.'`, then the overlap and latch probes
   against https://bok-labs.com/ at 390×844.
6. Tell David to close the tab and reopen the site on his phone.

Commits are authored as `David Govea <241020443+djgp28@users.noreply.github.com>` (GitHub email privacy rejects
pushes with another address) with the Claude co-author trailer.

## Working rules learned from David

- Everything that appears must stay on screen until reload. Nothing reverses when scrolling back.
- Pinned stages sliding away read to him as "text disappearing"; long pins read as "slow scroll". Keep text in normal flow;
  pin only the hero, the peak animation and (desktop) the close.
- He likes the agent / push-notification metaphor for the system side.
- Remove exactly what he names, nothing more (PR #9 removed the notification animation along with the projects and he was upset).
- Phone layout must be the same vertical split as desktop, never a horizontal stack, and must never overlap on any iPhone size.
- He reports from a real iPhone and from Chrome on his computer. Before hunting a rendering bug, make sure he has the fresh version
  (the `?v=` bump exists because of a day lost to a stale cache).
- Spanish copy he writes is used verbatim (accents added); English gets an equivalent, not a literal translation.
- No invented numbers, clients or stats.

## Technical gotchas

- Never set `position` on a `[data-sc-stage]` element: it silently un-pins every act.
- Chip coordinates live in `.chip:nth-child(n)` rules, not inline styles (inline beats media queries).
- SVG dash un-drawing needs a real `viewBox` (not `pathLength` + `vector-effect: non-scaling-stroke`) and `stroke-linecap: butt`.
- A class named `.sent` collided with the form's success panel; the node line is `.fired`.
- `.node span { display:block }` once outranked `.node__tile { display:none }` and phone tiles rendered on desktop; keep the tile rule at `.node .node__tile`.
- Edit files with Python or `sed` using literal strings. Perl substitutions with `|` delimiters and `||` / `#` in the pattern corrupted `site.js` twice.
- Check `site.js` still parses after an edit: `node -e "new Function(require('fs').readFileSync('site.js','utf8'))"`.
- The overlap probe reads Playwright's `boundingClientRect` of text ink; it cannot see clip-paths or z-order. Look at screenshots for those.

## Pending

- David to confirm round 5 on his phone and computer (paired rows, new copy, turn line).
- David's side: request a Web3Forms access key for info@bok-labs.com and paste it into `WEB3FORMS_KEY` in `site.js`
  (until then the form falls back to a `mailto:` link, which is the live path); create a Google Business Profile for Maracaibo.
- Not verified on a real iPhone by us (video decode, Low Power Mode, touch scrolling); David's reports are the test.
- The turn line stacks over 5 (desktop) / 6 (phone) short lines in the right column. David accepted it "for now".
- The Spanish proof copy for the removed projects is still in the `ES` dictionary (harmless, unused).

## History (all 2026-09-02, one day)

| PR | What |
|---|---|
| 1 | Rebuild as a scroll-craft split stage; kie.ai hero footage (64 credits); gains block added on review. |
| 2 | Pinned copy holds until its act ends; notification cards on the system side. |
| 3 | Everything after the peak persists; larger divider labels; slogans; Maracaibo SEO. |
| 4 | The latch: text stays once shown, until reload. |
| 5 | Peak freezes once built; pipeline steps one by one. |
| 6 | Filed chips keep readable type. |
| 7 | Phone as a vertical split like desktop. |
| 8 | Text lives in the document (tension + after-peak became flow sections); shorter peak. |
| 9 | All flow text static; the three example projects removed (too much removed, see 10). |
| 10 | Phone: everything in flow; entry animations back; projects stay removed; `overlap.mjs`. |
| 11 | Divider labels hide when the close enters. |
| 12 | Hero keeps its poster until the clip paints (`.clip-ok`). |
| 13 | Phone tiles hidden on desktop. |
| 14 | Eager reveal observer (superseded by 17). |
| 15 | Asset version bump (the stale-cache day). |
| 16 | Hero photo only (precaution while the test tab was hidden; reverted by 17). |
| 17 | Hero clip restored; every reveal converted to scroll cues. |
| 18 | Ground layers under section text (`isolation: isolate`): the real cause of "text missing on phone". |
| 19 | Tension act: points and cards arrive one by one, slower. |
| 20 | Tension pairs share a row; new cost lines; hero "your own system" / "tu sistema"; new sub-line; footer ES; turn line option 3. |
