# REPORT · bok-labs.com (scroll-craft build)

Build folder: `scrollcraft/builds/bok-labs/`. Page: `/index.html` + `/site.js` + `/engine/` (unmodified scrollcraft engine, `nateherkai/scroll-craft` main @ 2026-09-01).
Brief: interviewed (see BRIEF.md). Local URL during verification: http://localhost:4500

## Grammar: split stage

Left column = today (chaos), right column = with a system. The divider is the chrome
(fixed hairline carrying both labels, the page progress, the wordmark and the EN/ES
toggle). Hero at 50/50 with both headlines on screen. Close = the collapse.

Why the other seven lost: filmic one-shot hides the seam the brief is about, and it is
the AgerPRO build's grammar; live surface needs a real product running on the page;
typographic poster forbids the clip; continuous world has no geography and is the most
fragile build; chaptered editorial reads as a manifesto; gallery/catalog answers "what
are the options" not "should I believe you"; rhythmic cutlist is a pulse and the brief
said calm.

## Signature move: chaos becomes a system

Seven real-markup artifacts (WhatsApp bubble, voice note, receipt, spreadsheet, sticky
note, email thread, notebook line) scattered and rotated under a tangle of scribbles on
the chaos side. Driven from the act's `--sc-p` in page CSS: the divider first cedes
ground to the system (0.60 to 0.40), then each chip flies across, loses its rotation and
files itself as a small tile beside its pipeline node; the scribbles un-draw; the spine
draws; once the last chip lands the pipeline starts running (moving dash + a runner dot)
and keeps running while the reader stays. The engine is untouched; `site.js` publishes
`--split` and the harness signature `data-sc-verify-state` (split, chips landed, tangle,
spine, running).

## Fingerprint gate

Registry was empty (first build in this workspace). Checked against the AgerPRO row in
`~/AgerPRO/scrollcraft/FINGERPRINTS.md` anyway: differs on 6 of 6 dimensions.

## Journey, curve, peak

See BRIEF.md. Six beats: recognition, tension, turn, peak, proof, commitment.
Peak = act 4 (pin, span 3.2, the largest on the page, preceded by the quiet flow act 3).

## Score

| # | Act | Span | Devices |
|---|---|---|---|
| 1 | scrub | 2.0 | one clip (chaos half), CSS surface (system half), greet cues, one kinetic headline |
| 2 | pin | 1.8 | three cue pairs, divider 0.50 to 0.60 |
| 3 | flow | ~0.5 | one `data-sc-in` line (authored silence) |
| 4 | pin | 3.2 | signature move, one kinetic closing line |
| 5 | flow | ~1.8 | `data-sc-in`, `data-sc-reveal="left"` per system panel |
| 6 | pin | 1.6 | collapse 0.40 to 0, form, hold cues, footer in the stage |

10.6 viewport-heights at 1440x900, 10.7 in Spanish. Five device families, none twice in a row, one scrub. Banned by the grammar and not used: pan, spotlight, magnet, drift. No counters (no invented numbers; the one real figure is static text).

## Generated

Pending David's shot-list approval: one still (`01-chaos.png`, cluttered desk at night) and one 5 s kling push-in from it, encoded desktop + mobile, posters = first frames. Until then the hero carries a synthetic stand-in gradient clip (ffmpeg `gradients`) so the scrub path could be verified. No other media: the system side, the peak and the close are CSS/SVG; proof cards are text; og-image rendered from the brand kit with Playwright.

## Verified (shoot.mjs, real Chrome, served over HTTP)

- desktop 1440x900, EN and ES: no dead scroll, clip advances whenever on screen, all cues clear 4.5:1 at their worst frame, no console errors, no failed requests.
- phone 390x844, EN and ES: same.
- reduced motion: no dead scroll, resolved peak rendered statically, posters hold.
- keyboard: wordmark, EN, ES, link, hero CTA, three proof links, name, email, message, Send, footer links; every focused control at opacity 1 (hero CTA re-parks the act on focus).
- contact sheets and frames read by eye per act; fixes applied: stages must not carry `position` (my `.stage` rule un-pinned everything on the first run), chip coordinates moved out of inline styles so phone overrides apply, docked chips file as tiles, tangle caps blunt so the un-draw leaves no dots, phone labels right-aligned, phone hero copy anchored to the top of the system half.

## Feel check (cold scroll, then diffed against BRIEF.md)

Felt: recognition, unease, pause, relief, trust, done. Intended: recognition, unease, stillness, relief, trust, resolution. Match. The peak is the largest change on the sheet and holds the most scroll room; act 3 is quieter than act 4; the last screen holds with the form, heading and footer on it.

## Not verified

- A real iPhone (video decode, Low Power Mode, touch scrolling). David to test on the LAN preview.
- The Web3Forms path (no key yet; the mailto fallback is the live path).
- Lighthouse scores: see lab/lh/ once the run completes.
