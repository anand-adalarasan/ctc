# Handoff: Christ Tamil Church — "Follow the Light" Design System

## Overview
A warm, reverent, editorial design system and homepage for **Christ Tamil Church (CTC), Chicago** — a Bible-based Tamil home church for families in the Chicago area. The system pairs deep forest green + brass gold on a near-white paper with serif display type and a restrained, "light-follows-you" motion language. This bundle contains a fully-built homepage prototype plus a styleguide documenting color, type, components, and motion.

Tagline: **Love God. Love People. Make Disciples.**
Mission: *To revive believers, to live by love, and provide a Bible-based home church for Tamil families in the Chicago area.*

---

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes that show the intended look, feel, and behavior. They are **not** production code to copy verbatim. They are authored in a small in-house component runtime (`*.dc.html` + `support.js`), which you do **not** need to reproduce.

**Your task:** recreate these designs in the target codebase's environment using its established patterns. The church's production stack is **Vite + React 18 + React Router (TypeScript)** with **`lucide-react`** icons and Google Fonts (Inter). If you are starting fresh, that stack is the recommended target. Port the markup/CSS below into idiomatic React components + a stylesheet (or CSS modules / Tailwind, your call) — keep the tokens and motion specs exact.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and interactions are all specified here and should be reproduced pixel-accurately. Photography is represented by drop-in placeholder slots — replace with the church's real images.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#ffffff` | Page background (pure white) |
| `--card` | `#ffffff` | Card surfaces |
| `--ink` | `#10251b` | Headlines, near-black green ink |
| `--primary` | `#153d2b` | Primary green — buttons, headings, footer |
| `--primary-hover` | `#1d5238` | Primary button hover |
| `--body` | `#59635c` | Body text (muted green-grey) |
| `--faint` | `#8a9183` | Meta / captions |
| `--light` | `#8DC63F` | "The light" — lime accent, status dot, lit nodes, emphasis |
| `--green-deep` | `#6BA52C` | Deep green — links, node ring, italic emphasis word |
| `--gold` | `#b99045` | Brass/olive gold — eyebrows, small labels, gold CTA. A spice, never a flood |
| `--gold-hover` | `#c99d4c` | Gold button hover |
| `--sage` | `#edf3ea` | Sage-soft — inset panels, secondary bands |
| `--line` | `rgba(16,37,27,.1)` | Hairline borders |

Imagery is warm (golden natural light, wood tones, real congregation photos), slightly saturated on hover (`saturate(1.06–1.08)`), never cold or B&W.

### Typography
| Role | Family | Weight | Size | Notes |
|---|---|---|---|---|
| Display | **Fraunces** (serif) | 400–600, italic for emphasis | `clamp(30px,4.4vw,56px)` H2; hero up to `clamp(46px,7.5vw,104px)` | tracking −0.02 to −0.03em, line-height 1.02–1.1. *Production site uses Georgia serif — Fraunces is the refined substitute; either is acceptable, keep it serif.* |
| Tamil | **Anek Tamil** | 400–700 | matches display | greetings & bilingual headings |
| Body / UI | **Inter** | 400–600 | 15–18px | line-height 1.6–1.68, color `--body` |
| Label / Mono | **JetBrains Mono** | 500–800 | 10–13px | UPPERCASE, letter-spacing 0.12–0.22em, kickers/status/meta |

The gold **eyebrow/kicker** pattern: Mono 11–12px, weight 800, uppercase, 0.2em tracking, color `--gold`, with a 46px trailing 1px rule; bilingual variant prefixes a Tamil phrase in Anek Tamil.

### Spacing, layout, radii
- 4px-based spacing. Content rail (left gutter) `clamp(22px,6vw,84px)`; sections pad `96px` vertical.
- Section max content widths ~840–1120px, centered/gutter-aligned to the rail.
- **Radii:** buttons **squared (0px)** — the system's signature; cards/images **8px**; small cards **6px**; chips/pills **999px**.
- Cards: white, `1px solid rgba(16,37,27,.10)`, `8px` radius, shadow `0 16px 34px rgba(16,37,27,.05)`.

### Shadows (always green-tinted, soft, never neutral grey)
- Card rest: `0 16px 34px rgba(16,37,27,.05)`
- Card hover: `0 22px 44px rgba(16,37,27,.09)`
- Primary button hover: `0 12px 24px rgba(21,61,43,.24)`
- Hero photo: `0 40px 90px -40px rgba(16,37,27,.4)`

---

## Motion (Trend 6 — the differentiator)

Tone rule: **reverent → smooth, slow ease-outs. No bounce, no spring, no restless loops.** Signature easing `cubic-bezier(.2, .7, .2, 1)`.

| Interaction | Spec |
|---|---|
| Button hover | lift `translateY(-2px)` + soft shadow, 180ms |
| Button press | **ripple** from click point: expanding radial `rgba(255,255,255,.4)` (or `rgba(141,198,63,.4)` on ghost buttons), scale 0→1 + fade over ~620ms |
| Card hover | lift `translateY(-4px)`, border deepens to `rgba(21,61,43,.22)`, image scales 1.04 & warms `saturate(1.06–1.08)` over 500ms |
| List row hover | indent `padding-left 14px` + text turns `--green-deep` italic, 350ms |
| Scroll reveal | opacity 0→1 + `translateY(22px)→0` over 700–900ms, small stagger, **once** (IntersectionObserver, threshold ~0.16) |
| Scrollytelling | fixed comet dot tracks scroll progress down a left "spine"; each section's **station node** ignites (lime fill + soft ring) when it enters view (threshold ~0.42) |
| Ambient field | canvas particle "dust motes": ~40 soft gold specks drifting slowly upward, gently pulled toward the cursor; twinkle via sine alpha |
| Cursor sunpool | a large soft radial that follows the cursor with `mix-blend-mode:multiply`, warming the paper (desktop/fine-pointer only) |

**Performance:** animate `transform`/`opacity` only (GPU); pause the canvas RAF on `visibilitychange`; **respect `prefers-reduced-motion: reduce`** — disable all animations, render particles static, force reveals visible.

---

## Screens / Views

### Homepage (`Christ Tamil Church - Home.dc.html`)
Single scroll, pure-white, left-spine layout. Fixed layers behind content: `#field` canvas (motes), warm vignette, `#sunpool`, subtle multiply grain, the spine + comet. Sticky translucent header (`rgba(255,255,255,.8)` + `blur(12px)`) that gains a border/shadow after 24px scroll.

Sections top → bottom (each a `.stage` with a left `.nodewrap` station that ignites; inner blocks are `.reveal`):
1. **Hero** — split grid (copy left, photo right). Small spinning starburst mark + bilingual eyebrow; animated headline that swaps **வணக்கம் ⇄ *Welcome home.*** (8s cycle, blur/translate); Fraunces subhead; status line with beating lime dot — **Sundays · 10:30 AM** · 1330 63rd St, Downers Grove, IL; CTAs **Plan your visit** (fill) / **Watch live** (ghost). Photo slot has a gold-sage matte behind it and a floating "This Sunday · 10:30 · everyone welcome" card. Scroll cue "Follow the light".
2. **What to Expect** — kicker `முதல் முறையா? · First time`; H2 "Joining us for the first time?"; 4 cards (About 90 min / No dress code / Free parking / Kids welcome — B.L.A.S.T. & Kids Circle); wide sanctuary photo slot.
3. **Times & Location** (`#sunday`) — big Fraunces times **10:30** (Sun Worship, Tamil & English) and **7:30** (Wed Bible Study & Prayer); sage address card with left green accent, **Get directions** + phone `773·936·3697`; map photo slot.
4. **Ministries** (`#gather`) — luminous list (roman-numeral index in gold, Fraunces name, right meta): Worship / Sunday School · B.L.A.S.T. / Kids Circle / Bible Study & Prayer / Fellowship Hour / Community Outreach.
5. **Mission + Verse** (`#mission`) — two-col: mission copy + sage verse card *"Come to me, all you who are weary, and I will give you rest." — Matthew 11:28*.
6. **Pastor** (`#pastor`) — portrait slot + pull-quote; **Rev. Jagan Samuelraj · Pastor**.
7. **Visit / Come home** (`#visit`) — centered "Come *home.*", white contact card with logo + address + this-Sunday line + Get directions / Email; social row (YouTube, Facebook, phone, email); copyright with வணக்கம்.

### Styleguide (`Follow the Light - Design System.dc.html`)
Documentation canvas (dark chrome) with stacked option turns:
- **Turn 3 / 3a — Trend 6 · Motion** (the newest): six live demos — micro hover+ripple, card lift+image warm, list focus, easing-curve visualizer (`cubic-bezier(.2,.7,.2,1)`), scroll reveal w/ replay, scrollytelling spine+comet+stations — plus a timing-token strip.
- **Turn 2 — Light themes:** 2a *Daybreak* (warm cream + gold motes) and 2b *Sage Glow* (pale sage + soft blooms + one dark verse "moment").
- **Turn 1 — Dark themes:** 1a *Dark Scroll* and 1b *Console* (the original near-black "follow the light" look the light themes derive from).

---

## Real content (use verbatim)
- Sunday Worship **10:30 AM**; Wednesday Bible Study & Prayer **7:30 PM**
- 1330 63rd St, Downers Grove, IL 60516 · (773) 936-3697
- Pastor: **Rev. Jagan Samuelraj**
- YouTube: `youtube.com/c/ChristTamilChurchChicago` · Facebook: `facebook.com/ChristTamilChurchChicago`
- Ministries: Worship · Sunday School (B.L.A.S.T. = Bible Learning And Spiritual Training) · Kids Circle · Bible Study & Prayer · Fellowship Hour · Community Outreach
- Verse: *"Come to me, all you who are weary, and I will give you rest." (Matthew 11:28)*

## Voice
Warm, welcoming, pastoral — never corporate or trendy. Second person to the visitor ("you and your family"), first-person-plural for the church ("we"). Sentence case; ALL-CAPS short eyebrows. Scripture quoted and cited inline. Tamil named with pride, never a footnote. **No emoji, no hype.**

## Assets
- `assets/ctc-logo.png` — horizontal logo lockup (included).
- Icons (production): **Lucide** (`lucide-react`), 2px stroke, rounded — never filled. Icons in use: Church, BookOpen, HandHeart, HeartHandshake, Users, Music, MicVocal, School, MapPin, Phone, CalendarDays, Cross, Heart, Sprout, Home, ChevronDown, Menu, X.
- Photography: replace the placeholder slots with real warm congregation/sanctuary/pastor/map images.
- The animated starburst is inline SVG (see homepage hero); reproduce as an SVG component.

## Files in this bundle
- `Christ Tamil Church - Home.dc.html` — the homepage prototype (all sections + motion).
- `Follow the Light - Design System.dc.html` — the styleguide (tokens, components, motion demos, theme options).
- `assets/ctc-logo.png` — logo lockup.
- `README.md` — this document.

> The `.dc.html` files open in a browser to preview. Ignore the `support.js` runtime and `<x-dc>/<helmet>` wrappers — read the inline styles, markup, and the `<script data-dc-script>` logic class as your source of truth for structure, tokens, and animation code.
