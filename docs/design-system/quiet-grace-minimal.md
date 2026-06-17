# Quiet Grace Minimal Design System

## 1. Design Vision

**Quiet Grace Minimal** is a modern, elegant, spacious design system for Christ Tamil Church.

The design should feel calm, premium, warm, spiritual, and welcoming without becoming decorative or crowded. It should help first-time visitors quickly understand who the church is, when to visit, how to connect, and where to grow.

The experience should feel like:

- A peaceful modern church lobby
- A warm family-centered Tamil Christian community
- A premium but simple digital welcome
- A site that is easy to scan for worship, events, ministries, sermons, and visitor information

The design should avoid looking like:

- An old church bulletin
- A generic church template
- A corporate SaaS website
- A dashboard full of cards
- A heavy green/gold traditional church design
- A dark hero-only website
- A decorative or overly formal church brand

## 2. Brand Personality

### Brand Words

- Graceful
- Warm
- Minimal
- Spiritual
- Welcoming
- Family-centered
- Calm
- Premium
- Clear
- Community-focused

### Emotional Goal

A visitor should feel:

> This church is warm, Christ-centered, organized, welcoming, and easy for my family to visit.

## 3. Brand Message

### Primary Identity Statement

**Rooted in Christ. United in Love. Sent to Serve.**

### Homepage Headline

**A Tamil church family rooted in Christ, love, and community**

### Supporting Message

**Join us for worship, God’s Word, prayer, and fellowship as we grow together as one family in Christ.**

### Visitor-Focused Message

**We would love to welcome you and your family. Come as you are, worship with us, and find your place in our church family.**

## 4. Color System

Quiet Grace Minimal uses soft, premium, warm neutrals with a restrained deep green, sage, sand, muted clay, and quiet gold palette. This is the approved previous palette and should feel calm, church-centered, and premium, not traditional or heavy.

### CSS Tokens

```css
:root {
  --qgm-bg: #FFFEFA;
  --qgm-surface: #FFFFFF;
  --qgm-surface-soft: #F7F8F4;

  --qgm-primary: #0D4B43;
  --qgm-primary-dark: #07352F;
  --qgm-primary-muted: #6F9386;
  --qgm-green-mobile: #14564D;
  --qgm-green-mobile-soft: #1C645A;
  --qgm-green-mobile-muted: #2D6F64;

  --qgm-text: #142824;
  --qgm-muted: #687872;
  --qgm-muted-light: #8C9A95;

  --qgm-canvas: #FAF7EE;
  --qgm-sage: #E7EFE9;
  --qgm-sage-soft: #F3F7F4;
  --qgm-sand: #FAF3E7;

  --qgm-clay: #B97455;
  --qgm-clay-dark: #9B5F43;
  --qgm-clay-soft: #F4E4DB;

  --qgm-gold: #D4B76A;
  --qgm-gold-soft: #F5EBCF;

  --qgm-line: rgba(13, 75, 67, 0.10);
  --qgm-line-soft: rgba(13, 75, 67, 0.07);

  --qgm-shadow-sm: 0 8px 24px rgba(13, 75, 67, 0.06);
  --qgm-shadow-md: 0 18px 50px rgba(13, 75, 67, 0.09);
}
```

### Color Roles

| Role | Hex | Usage |
|---|---:|---|
| Warm White | `#FFFEFA` | Main page background |
| Pure White | `#FFFFFF` | Cards, navigation, surfaces |
| Deep Green | `#0D4B43` | Headings, strong active states, icon accents |
| Green Ink | `#07352F` | Headings, footer, hover states |
| Soft Sage | `#E7EFE9` | Calm section backgrounds and supporting surfaces |
| Sage Soft | `#F3F7F4` | Light cards, icon wells, mobile nav hover |
| Soft Canvas | `#FAF7EE` | Warm hero and section canvas |
| Sand | `#FAF3E7` | Warm supporting backgrounds |
| Muted Clay | `#B97455` | Sitewide buttons, primary CTAs, and subtle warmth |
| Quiet Gold | `#D4B76A` | Small labels, active dots, fine highlights |
| Gold Soft | `#F5EBCF` | Soft highlight surfaces |
| Stone Text | `#687872` | Paragraphs and metadata |

### Color Usage Rules

Use warm white and white as the primary experience.

Use deep green for:

- Headings and strong text accents
- Strong active states

Use quiet gold only for:

- Small labels
- Active dots or hairlines
- Event date badges
- Fine highlights

Use muted clay for:

- Sitewide buttons and primary CTAs
- Secondary warmth
- Small supporting accents
- Hover arrow/icon color

### Mobile Color Balance

On mobile, large dark-green areas should use softer green tokens so the site
feels warmer and less heavy:

```css
:root {
  --green-ink: #07352F;
  --green-mobile: #14564D;
  --green-mobile-soft: #1C645A;
  --green-mobile-muted: #2D6F64;
}
```

Use mobile green only inside mobile media queries. Keep the mobile menu warm
white and use green for small active indicators, icons, and footer backgrounds.
Footer backgrounds should use a soft green gradient, not a flat dark block.

Do not use:

- Heavy saturated green
- Heavy metallic gold
- Full-page beige
- Too many colored cards
- Dark hero as the main homepage look

## 5. Section Background Rhythm

The website should not use one flat background everywhere. Use subtle section changes to create rhythm without making the site busy.

| Section | Background |
|---|---|
| Navigation | Warm White or White |
| Hero | Full-background warm human photo with warm ivory readability overlay |
| Service highlight | White card on Warm White |
| Welcome/About | Soft Canvas or Soft Sage |
| Events | Soft Sage or Sand |
| Ministries | Warm White |
| Sermons | White |
| First-time visitor | Warm White / Soft Canvas / Sage Soft layered gradient with near-white panel |
| Footer | Green Ink |

```css
.section {
  padding-block: 112px;
}

.section--warm {
  background: var(--qgm-bg);
}

.section--white {
  background: var(--qgm-surface);
}

.section--canvas {
  background: var(--qgm-canvas);
}

.section--sage {
  background: var(--qgm-sage-soft);
}

.section--sand {
  background: var(--qgm-sand);
}

.section--clay-soft {
  background: var(--qgm-clay-soft);
}

.section--ink {
  background: var(--qgm-primary-dark);
  color: var(--qgm-bg);
}

@media (max-width: 768px) {
  .section {
    padding-block: 72px;
  }
}
```

## 6. Typography System

Quiet Grace Minimal uses a modern, clean sans-serif typography system.

### Recommended Font Pairing

- **Headings:** Plus Jakarta Sans
- **Body:** Inter
- **Navigation/buttons:** Inter SemiBold

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
```

### Typography Tokens

```css
:root {
  --font-heading: "Plus Jakarta Sans", Inter, system-ui, sans-serif;
  --font-body: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

### Type Scale

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.125rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.75rem;
  --text-4xl: 4rem;
  --text-5xl: 5rem;
}
```

### Desktop Typography

| Element | Font | Size | Weight | Line height |
|---|---|---:|---:|---:|
| Hero H1 | Plus Jakarta Sans | 54-78px | 800 | 1.02-1.08 |
| Section H2 | Plus Jakarta Sans | 40-52px | 700/800 | 1.08 |
| Card title | Inter | 18–22px | 700 | 1.25 |
| Body | Inter | 16–18px | 400 | 1.65 |
| Navigation | Inter | 14–15px | 600 | 1 |
| Buttons | Inter | 14–15px | 700 | 1 |
| Small label | Inter | 12–13px | 700 | uppercase / letter spaced |

### Mobile Typography

| Element | Size |
|---|---:|
| Hero H1 | 42–48px |
| Section H2 | 32–38px |
| Body | 16px |
| Buttons | 15–16px |

## 7. Layout System

### Container

```css
.container {
  width: min(100% - 48px, 1180px);
  margin-inline: auto;
}

@media (max-width: 768px) {
  .container {
    width: min(100% - 40px, 1180px);
  }
}
```

### Grid Rules

Use simple grids. Avoid dense dashboard layouts.

Recommended:

- Hero: 2 columns
- Service highlight: 4 columns desktop, stacked mobile
- Events preview: 3 cards maximum
- Ministries preview: 4 cards maximum
- Footer: 4 columns desktop, stacked mobile

Do not show every event and every ministry on the homepage.

### Spacing Scale

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 120px;
}
```

### Spacing Principles

- Use whitespace as the main premium design element.
- Keep cards large and calm.
- Do not compress section content.
- Avoid more than three major cards in one row.
- Avoid small cramped text blocks.

## 8. Border Radius

```css
:root {
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --radius-xl: 36px;
  --radius-pill: 999px;
}
```

| Element | Radius |
|---|---:|
| Buttons | 999px |
| Small cards | 18–24px |
| Event cards | 24px |
| Large images | 32–36px |
| Hero image | 36px |
| Service band | 28px |

## 9. Shadows and Borders

Quiet Grace Minimal should use subtle shadows only.

```css
.card {
  background: var(--qgm-surface);
  border: 1px solid var(--qgm-line-soft);
  border-radius: var(--radius-lg);
  box-shadow: var(--qgm-shadow-sm);
}
```

Avoid:

- Strong black shadows
- Heavy outlines
- Overly raised cards
- Too many bordered boxes

## 10. Buttons

### Primary Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  background: var(--qgm-clay);
  color: #FFFFFF;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 180ms ease,
    background-color 180ms ease;
}

.btn-primary:hover {
  background: var(--qgm-clay-dark);
  transform: translateY(-1px);
}
```

### Secondary Button

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(185, 116, 85, 0.32);
  background: transparent;
  color: var(--qgm-clay-dark);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    border-color 180ms ease;
}

.btn-secondary:hover {
  background: var(--qgm-clay-soft);
  transform: translateY(-1px);
}
```

### Button Rules

Use one primary CTA per section. Sitewide buttons use the muted clay palette.

Avoid:

- Too many buttons together
- Gold primary buttons
- Multiple competing button colors
- Square buttons

## 11. Navigation

### Style

- Warm white or white background
- Sticky at top
- Minimal logo
- Simple nav links
- One clear CTA: Plan Your Visit
- No heavy nav background
- No crowded menu

### Navigation Structure

```text
Visit
Worship
Connect
Grow
Serve
```

### Nav CSS Guidance

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 254, 250, 0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--qgm-line-soft);
}

.nav-link {
  position: relative;
  color: var(--qgm-primary);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  background: var(--qgm-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}
```

## 12. Homepage Structure

The current approved homepage is **Quiet Grace 2026: Full-Background Cinematic Hero**.

Recommended order:

1. Sticky navigation
2. One full-background cinematic hero image with left-aligned content
3. Compact icon gateway tiles for Visit, Worship, Connect, Grow, and Serve
4. Welcome to Christ Tamil Church
5. A Place for You
6. First-Time Visitor
7. Footer

Gateway tiles should use one subtle lucide line icon per tile, not number labels. Keep the title, short description, and small arrow affordance.

Keep full event, ministry, sermon, and deeper visitor-detail content on inner pages unless the church explicitly asks to expand the homepage again.

## 12.1 Inner Page Structure

All non-home pages should use the homepage design language in a quieter form:

- Warm white / sage / canvas hero bands
- Large Plus Jakarta Sans page titles
- Left-aligned editorial copy
- One calm glass-like information panel when useful
- Subtle icon wells instead of decorative graphics
- Spacious card grids with soft borders
- Deep green for primary CTAs
- Clay only for small accents and hover warmth
- Quiet scroll/entrance motion that respects reduced motion

Inner pages should not look like separate templates. Visit, Worship, Connect,
Grow, Serve, Sermons, Faith, Pastors, and Contact should feel like members of
the same system as the homepage.

## 13. Accessibility

### Requirements

- Use one `h1` on the homepage.
- Use logical `h2` headings for major sections.
- Use semantic `header`, `nav`, `main`, `section`, and `footer`.
- Use links for navigation.
- Use buttons for actions.
- Add useful alt text to important images.
- Use empty alt text for decorative images.
- Keep focus states visible.
- Maintain strong color contrast.
- Do not place small text over images.
- Respect reduced motion preferences.

### Focus Style

```css
:focus-visible {
  outline: 3px solid rgba(212, 183, 106, 0.72);
  outline-offset: 4px;
}
```

## 14. Do / Don’t

### Do

- Use whitespace generously.
- Use one strong image per section.
- Use warm human photography.
- Use clear CTAs.
- Use soft section backgrounds.
- Use minimal icons.
- Use clean sans-serif headings consistently.
- Keep the homepage focused.
- Use the green/sage/gold palette with restraint.

### Don’t

- Use heavy, saturated green or metallic gold.
- Show all ministries on the homepage.
- Show too many events at once.
- Add decorative leaves everywhere.
- Use dense grids.
- Use tiny text.
- Use heavy shadows.
- Use multiple hero cards.
- Use a dark hero-only design.
- Make the site look like a dashboard.
