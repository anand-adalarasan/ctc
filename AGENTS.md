# AGENTS.md

## Project
Christ Tamil Church website.

## Design Direction
Use the **Quiet Grace Minimal** design system for all UI work unless the user explicitly asks for a different direction.

Before making UI changes, read:

- `docs/design-system/quiet-grace-minimal.md`
- `docs/design-system/homepage-guidelines.md`
- `docs/design-system/animation-guidelines.md`
- `docs/design-system/image-guidelines.md`

## Core Design Rules

- Do not create a cramped layout.
- Do not use green/gold as the main visual system.
- Do not create an old church bulletin look.
- Do not make the site look like a corporate SaaS product.
- Use spacious, warm, minimalist, premium design.
- Use subtle section background changes to separate content.
- Use one strong image per major section.
- Use clay orange only for primary CTAs and key accents.
- Use semantic HTML and accessible contrast.
- Respect `prefers-reduced-motion` for animations.

## Homepage Content Rules

- Show only 3 event cards on the homepage.
- Show only 4 ministry cards on the homepage.
- Keep full event/ministry lists on inner pages, not the homepage.
- Prioritize first-time visitor needs: Sunday worship time, location, Plan Your Visit, Watch Online, ministries, sermons, events, and contact.

## Main UI Files

- `src/styles.css` — design tokens, global styles, section styles, components, responsive rules
- `src/pages/Home.tsx` — homepage structure
- `src/components/Layout.tsx` — navigation and footer
- `src/data/site.ts` — shared site content
- `src/data/images.ts` — image registry if added

## Implementation Expectations

When making UI changes:

1. Read the design system documentation first.
2. Explain which files will change.
3. Keep changes incremental and safe.
4. Do not rewrite the whole app unless explicitly asked.
5. Preserve existing routes and content.
6. Verify desktop, tablet, and mobile behavior.
7. Summarize final changes.
