# AGENTS.md

## Project
Christ Tamil Church website.

## Design Direction
Use the **CTC Design Template** for all UI work unless the user explicitly asks for a different direction. The live homepage (`src/pages/Home.tsx`) is the reference implementation.

Before making UI changes, read:

- `docs/design-system/ctc-design-template.md` — the single source of truth (tokens, type, components, motion, imagery, voice, inner-page blueprint)
- `docs/design-system/follow-the-light-motion.md` — only when touching the homepage "Follow the Light" scroll animation

## Core Design Rules

- Green leads, gold is a spice: deep greens (`--ink`, `--primary`, `--green-deep`) carry the design; brass gold/bronze (`--gold`, `--clay-dark`) is reserved for eyebrows, small labels, and the one primary CTA per view.
- Buttons are rounded pills (`--radius-pill`); the primary CTA is the bronze pill with white text.
- Use the canonical tokens at the top of `src/styles.css`; never extend the legacy `--ql-*`/`--qgm-*` aliases.
- Use spacious, warm, minimalist, premium design — never cramped, never corporate SaaS, never old church bulletin.
- Break long pages with sage/cream bands, one idea per band, one strong image per major section.
- Homepage-exclusive atmosphere (light rail, comet, particles, FollowTheLight scrollytelling) must not be copied to inner pages.
- Use semantic HTML and accessible contrast.
- Respect `prefers-reduced-motion` for all animations.

## Homepage Content Rules

- Prioritize first-time visitor needs: Sunday worship time, location, Plan Your Visit, Watch Online, ministries, sermons, events, and contact.
- Keep full event/ministry lists on inner pages, not the homepage.

## Main UI Files

- `src/styles.css` — canonical design tokens (top `:root` block), global styles, section styles, components, responsive rules
- `src/pages/Home.tsx` — homepage structure (the design reference)
- `src/components/FollowTheLight/` — signature scroll animation
- `src/components/Layout.tsx` — navigation and footer
- `src/data/site.ts` — shared site content
- `src/data/images.ts` — image registry (all images go through it)

## Implementation Expectations

When making UI changes:

1. Read `docs/design-system/ctc-design-template.md` first.
2. Explain which files will change.
3. Keep changes incremental and safe — one page per commit when migrating.
4. Do not rewrite the whole app unless explicitly asked.
5. Preserve existing routes and content.
6. Verify desktop, tablet, and mobile behavior before calling work done.
7. Summarize final changes.
