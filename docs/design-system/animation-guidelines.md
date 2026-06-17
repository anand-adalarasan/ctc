# Animation Guidelines — Quiet Grace Minimal

## Animation Philosophy

Use **quiet motion**.

Animations should enhance the experience, not decorate the site. They should make the website feel polished, calm, modern, and premium.

The motion should feel like:

- Gentle reveal
- Soft lift
- Calm transition
- Warm welcome
- Clear focus
- Premium polish

## Avoid

Do not use:

- Bouncing
- Spinning
- Shaking
- Fast zooming
- Heavy parallax
- Infinite animations
- Excessive hover effects
- Animation delays that make content feel slow
- Motion that makes text harder to read

## Preferred Animation Types

Use only a few purposeful patterns:

1. Page entrance fade
2. Hero content stagger reveal
3. Hero image soft fade/scale
4. Service highlight card gentle lift
5. Section reveal on scroll
6. Event card hover lift
7. Button micro-interactions
8. Navigation underline transition
9. Mobile menu slide/fade
10. Sermon play button subtle hover
11. First-time visitor steps stagger reveal

## Technology Recommendation

Use CSS transitions and IntersectionObserver for simple reveal animations.

If the project already uses Framer Motion / Motion for React, use it carefully.

If the project does not already use an animation library, prefer CSS + a small React hook instead of adding a large dependency.

## Performance Rules

Animate only:

- `transform`
- `opacity`

Avoid animating:

- `width`
- `height`
- `top`
- `left`
- `margin`
- `padding`
- `box-shadow`
- `filter`

Also avoid:

- Layout shift
- Scroll-jacking
- Heavy JavaScript animation loops
- Overusing `will-change`

## Motion Tokens

```css
:root {
  --motion-fast: 160ms;
  --motion-base: 260ms;
  --motion-slow: 520ms;
  --motion-cinematic: 900ms;

  --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Reduced Motion

Always respect `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

For reduced motion:

- Disable section slide movement.
- Disable image scale animations.
- Disable parallax.
- Keep content visible immediately.

## Reusable Reveal Classes

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity var(--motion-slow) var(--ease-soft),
    transform var(--motion-slow) var(--ease-soft);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-soft {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 420ms var(--ease-soft),
    transform 420ms var(--ease-soft);
}

.reveal-soft.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

## Hover Lift

```css
.hover-lift {
  transition:
    transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background-color var(--motion-base) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-4px);
}
```

## Button Micro-Interactions

```css
.btn {
  transition:
    transform var(--motion-fast) var(--ease-out),
    background-color var(--motion-fast) var(--ease-out),
    color var(--motion-fast) var(--ease-out),
    border-color var(--motion-fast) var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}
```

## Navigation Underline

```css
.nav-link {
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--motion-base) var(--ease-out);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}
```

## Hero Animation

Hero animation should complete quickly. Do not make visitors wait to read content.

Recommended order:

1. Label
2. Heading
3. Supporting text
4. Identity line
5. Buttons
6. Worship and location details
7. Floating Sunday Worship card
8. Gateway tiles

```css
.hero-label {
  animation: heroFadeUp 650ms var(--ease-premium) 220ms both;
}

.hero-title {
  animation: heroFadeUp 650ms var(--ease-premium) 330ms both;
}

.hero-copy {
  animation: heroFadeUp 650ms var(--ease-premium) 440ms both;
}

.hero-identity {
  animation: heroFadeUp 650ms var(--ease-premium) 550ms both;
}

.hero-actions {
  animation: heroFadeUp 650ms var(--ease-premium) 660ms both;
}

.hero-details {
  animation: heroFadeUp 650ms var(--ease-premium) 780ms both;
}

.home-cinematic-bg {
  animation: heroImageIn 1200ms var(--ease-premium) both;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroImageIn {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

## Scroll Reveal Hook

Create if needed:

`src/hooks/useRevealOnScroll.ts`

The hook should:

- Use IntersectionObserver
- Add class `is-visible` when an element enters viewport
- Support optional staggered children with `data-reveal-child`
- Use threshold around `0.12`
- Use rootMargin like `0px 0px -80px 0px`
- Disconnect cleanly
- Respect reduced motion by making content visible immediately

Apply reveal only to major sections:

- Service band
- Welcome section
- Events section
- Ministries section
- Sermon section
- First-time visitor section

Do not animate every small text element.

## Event Card Hover

```css
.event-card img {
  transition: transform 420ms var(--ease-soft);
}

.event-card:hover img {
  transform: scale(1.02);
}
```

Event cards should lift only 3–4px. Do not aggressively darken images.

## Mobile Menu

- Animate using opacity and translateY only.
- Duration around 220ms.
- Keep focus states visible.
- Ensure keyboard accessibility.
- Do not use large side-slide animations unless already implemented.

## Quality Checklist

Animations are successful if:

- They are subtle and premium.
- The site still feels calm and spiritual.
- The hero content is readable immediately.
- Motion uses mostly transform and opacity.
- Reduced motion is respected.
- Mobile still feels smooth.
- Hover effects are subtle.
- There is no layout shift.
- The site does not feel flashy or playful.
