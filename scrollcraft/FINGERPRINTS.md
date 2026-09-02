# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| bok-labs (2026-09-02) | Split stage | No bar: fixed divider as chrome (labels for both sides, page progress, wordmark, EN/ES toggle) | 50/50 split: half-frame scrub clip left, CSS surface right, two greet headlines, one kinetic | scrub 2.0 · pin 2.4 · flow · pin 3.2 (peak) · flow+in (gains + proof) · pin 1.6, 6 acts, 12.3vh | The collapse: divider travels to the left edge, the form lives in the winning column, footer inside the stage, hold | Chaos becomes a system: artifacts fly across the divider and file themselves beside pipeline nodes while the scribbles un-draw and the pipeline starts running | Dark brand canvas, one warm chaos ground + one gridded system ground, photoreal desk clip | Shares with nobody yet (first build here). Differs from the AgerPRO build on all six. |


---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- Split stage, with the divider as the whole chrome (labels, progress, wordmark, language toggle). Taken by bok-labs.
- The collapse close with the form in the winning column. Taken by bok-labs.
- 6 acts at 10.6vh with one scrub, one 3.2 peak pin. Taken by bok-labs.
- Artifacts flying across a divider into nodes (the chaos-to-system move). Taken by bok-labs.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scrollcraft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.

