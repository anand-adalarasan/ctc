# Page design: Sunday School — B.L.A.S.T. (`/grow/sunday-school`)

The first inner page migrated onto the
[CTC Design Template](../ctc-design-template.md); use it as the worked example
when migrating the remaining pages.

- **Component:** `src/pages/SundaySchool.tsx`
- **Styles:** `src/pages/SundaySchool.css` (page-scoped; every migrated page
  gets its own design file like this one). Shared bases it relies on from
  `src/styles.css`: `.page-hero`, `.section`, `.section-header`, `.eyebrow`,
  `.button`, `.reveal`.
- **Audience:** parents deciding whether to bring their child; the page must
  answer *what is B.L.A.S.T., when does it happen, is my child welcome* and
  end on a clear next step.

## Band map

| # | Band | Surface | Template recipe |
|---|---|---|---|
| 1 | Hero: kicker · headline (accent on "God's Word.") · lede + B.L.A.S.T. info card with the one bronze primary ("Plan a Visit") | cream (`.page-hero` base) | §6.1 light variant + §6.3 card + §6.2 primary |
| 2 | Intro panel: white card, gold left bar, Fraunces welcome line | sage (`.section:nth-of-type(even)`) | §6.6-style panel |
| 3 | What is B.L.A.S.T.: 5-across acronym strip (letters in Fraunces `--green-deep`) | white | §6.3 in-flow cards |
| 4 | Experience: 4 feature cards, green pill icons | full-bleed sage (`.blast-experience-band`) | §6.4 header + §6.3 cards |
| 5 | Schedule: split card with mono labels + tertiary arrow link ("Contact us") | white | §6.3 card anatomy |
| 6 | Continue Growing: hairline row list (mono-gold index · green icon · Fraunces title) | white | §6.5 row list |
| 7 | Closing CTA "For Parents": deep-green band, checklist panel, bronze "I'm New" + quiet white-outline "Contact Us" | deep green (`--primary` gradient) | §10 closing band |

## Motion

Sitewide subset only (§7): `.page-hero` fade-up on load; every band below uses
`useRevealOnScroll` + the shared `.reveal` class; the acronym cards stagger via
`data-reveal-child`. Reduced motion is handled by the hook and the global CSS.

## Intentionally page-specific

- **5-across acronym strip** so B·L·A·S·T reads in order on desktop; it
  collapses to horizontal letter-rows ≤1120px (never a ragged 3+2 wrap).
- **Icon-driven, no photography** — a deliberate choice until real
  children's-ministry photos exist. When one is available, register it in
  `src/data/images.ts` and add it per §8 (hero side or band 4); don't use
  stock children photos.
- The shared `ChildrenMinistry.tsx` components (also used by Kids Circle)
  emit the markup for bands 1, 4, 6, 7; all styling stays in this page's CSS
  via the `blast-*` class props — never restyle the component internals.
