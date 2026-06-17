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

Quiet Grace Minimal uses soft, premium, neutral colors with a calm blue-gray and warm clay accent. The palette should not rely on heavy green or gold.

### CSS Tokens

```css
:root {
  --qgm-bg: #FFFEFA;
  --qgm-surface: #FFFFFF;
  --qgm-surface-soft: #F7F8F4;

  --qgm-primary: #1F2320;
  --qgm-primary-soft: #3A2E28;

  --qgm-text: #142824;
  --qgm-muted: #687872;
  --qgm-muted-light: #8C9A95;

  --qgm-canvas: #F1EEE7;
  --qgm-mist: #E7E5DE;
  --qgm-blue-mist: #DCE5E8;

  --qgm-accent: #C46645;
  --qgm-accent-soft: #F3D4C2;

  --qgm-olive-muted: #8A8F7A;

  --qgm-line: rgba(31, 35, 32, 0.10);
  --qgm-line-soft: rgba(31, 35, 32, 0.06);

  --qgm-shadow-sm: 0 8px 24px rgba(31, 35, 32, 0.06);
  --qgm-shadow-md: 0 20px 60px rgba(31, 35, 32, 0.10);
}
```

### Color Roles

| Role | Hex | Usage |
|---|---:|---|
| Warm White | `#FFFEFA` | Main page background |
| Pure White | `#FFFFFF` | Cards, navigation, surfaces |
| Soft Canvas | `#F1EEE7` | Welcome/about section background |
| Light Mist | `#E7E5DE` | Event section background |
| Blue Mist | `#DCE5E8` | Optional calm section background |
| Deep Ink | `#1F2320` | Headings, nav text, footer |
| Warm Charcoal | `#3A2E28` | Secondary dark text |
| Clay Orange | `#C46645` | Primary CTA, event badges, key accents |
| Soft Peach | `#F3D4C2` | Visitor section, soft highlight panels |
| Muted Olive | `#8A8F7A` | Small icons, quiet natural accent |
| Stone Text | `#687872` | Paragraphs and metadata |

### Color Usage Rules

Use warm white and white as the primary experience.

Use clay orange only for:

- Primary CTA buttons
- Event date badges
- Small labels
- Important active states

Use muted olive only for:

- Small icons
- Soft visual balance
- Minimal supporting accents

Do not use:

- Heavy gold
- Heavy green
- Full-page beige
- Too many colored cards
- Dark hero as the main homepage look

## 5. Section Background Rhythm

The website should not use one flat background everywhere. Use subtle section changes to create rhythm without making the site busy.

| Section | Background |
|---|---|
| Navigation | Warm White or White |
| Hero | Warm White |
| Service highlight | White card on Warm White |
| Welcome/About | Soft Canvas |
| Events | Light Mist |
| Ministries | Warm White |
| Sermons | White |
| First-time visitor | Soft Peach or Soft Canvas |
| Footer | Deep Ink |

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

.section--mist {
  background: var(--qgm-mist);
}

.section--peach {
  background: var(--qgm-accent-soft);
}

.section--ink {
  background: var(--qgm-primary);
  color: var(--qgm-bg);
}

@media (max-width: 768px) {
  .section {
    padding-block: 72px;
  }
}
```

## 6. Typography System

Quiet Grace Minimal uses a modern editorial typography system.

### Recommended Font Pairing

- **Headings:** Fraunces or Playfair Display
- **Body:** Inter
- **Navigation/buttons:** Inter SemiBold

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Typography Tokens

```css
:root {
  --font-heading: "Fraunces", "Playfair Display", Georgia, serif;
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
| Hero H1 | Fraunces | 64–80px | 600/700 | 0.95–1.05 |
| Section H2 | Fraunces | 40–52px | 600 | 1.05 |
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
  background: var(--qgm-accent);
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
  background: #A94F35;
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
  border: 1px solid rgba(31, 35, 32, 0.18);
  background: transparent;
  color: var(--qgm-primary);
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
  background: rgba(31, 35, 32, 0.04);
  transform: translateY(-1px);
}
```

### Button Rules

Use one primary CTA per section.

Avoid:

- Too many buttons together
- Gold buttons
- Green buttons
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
Home
Worship
Grow
Connect
Sermons
About
Contact
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
  background: var(--qgm-accent);
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

The homepage should be spacious and easy to scan.

Recommended order:

1. Sticky navigation
2. Spacious hero
3. Service essentials band
4. Welcome/about section
5. Upcoming events preview
6. Ministries preview
7. Latest sermon/watch online
8. First-time visitor section
9. Footer

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
  outline: 3px solid rgba(196, 102, 69, 0.45);
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
- Use serif headings carefully.
- Keep the homepage focused.

### Don’t

- Use green/gold as the main palette.
- Show all ministries on the homepage.
- Show too many events at once.
- Add decorative leaves everywhere.
- Use dense grids.
- Use tiny text.
- Use heavy shadows.
- Use multiple hero cards.
- Use a dark hero-only design.
- Make the site look like a dashboard.
