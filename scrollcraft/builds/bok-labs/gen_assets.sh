#!/usr/bin/env bash
# bok-labs.com · asset generation (kie.ai via the scrollcraft skill). Run from this folder; .env holds KIE_AI_API_KEY.
# One style preamble, reused verbatim in every prompt.
set -euo pipefail
SKILL=${SKILL:-$HOME/scroll-craft/plugins/nateherk-design/skills/scrollcraft}
P='Photoreal documentary still, available light, 35mm, shallow depth, muted neutral grade, deep near-black shadows, no colour cast, subtle grain. Real materials, no CGI, no illustration, no digital glow. No people, no legible text, no logos, blank paper.'
mkdir -p out
node "$SKILL/scripts/kie.mjs" probe
# 01 · the chaos desk (hero, chaos half). Subject centred so the phone crop keeps it; the top of the frame stays dark.
node "$SKILL/scripts/kie.mjs" still "$P

A cluttered small-business desk late at night, seen from slightly above at eye height: paper invoices in loose piles, blank sticky notes stuck to the edge of a dark monitor, a phone face-up lit by its own notifications, a spiral notebook open with a pen across it, a calculator, a coffee ring on the wood. A single desk lamp is the only light. The pile sits in the centre of the frame; the upper part of the frame falls into darkness." out/01-chaos.png --ar 16:9
# 02 · the camera move (only after the still has been looked at)
node "$SKILL/scripts/kie.mjs" shot "The camera pushes very slowly and steadily forward toward the centre of the desk, a smooth continuous dolly-in with no tilt. Nothing enters or leaves the frame, nothing on the desk moves, the lamp light stays constant. One single continuous take, no cuts, no camera shake, no zoom snap. Slow, controlled, quiet." out/01-chaos.png out/01-chaos.mp4 --dur 5
