# Follow the Light motion system

Shipping specification for the homepage-only scrollytelling sequence.

## Source of truth

- Component: `src/components/FollowTheLight/FollowTheLight.tsx`
- Scoped styles: `src/components/FollowTheLight/FollowTheLight.module.css`
- Content model: `src/data/ministryPathways.ts`
- Integration point: `src/pages/Home.tsx`, immediately after the hero

When this document differs from those files, the shipping implementation wins.
Do not copy this system to inner pages.

## Current behavior

The outer section is `400vh`. Its direct child is a sticky, viewport-height
pin containing one absolutely stacked scene per entry in `ministryPathways`.
The current data produces the ministry-pathway story rather than hard-coded
"Love God / Love People / Make Disciples" scenes.

Scroll progress is calculated as:

```ts
progress = clamp(
  -section.getBoundingClientRect().top /
    (section.offsetHeight - window.innerHeight),
  0,
  1,
);
```

The active scene is `floor(progress * sceneCount)`, clamped to the available
scene indexes. Scroll work is scheduled with `requestAnimationFrame`; React
state is never updated per frame. The component only toggles CSS Module
classes and writes the aura transform/opacity and progress-bar width.

Mouse-wheel navigation adds a deliberate scene handoff:

- Approaching from the hero scrolls smoothly to the pinned section.
- While pinned, a wheel step advances to the neighboring scene.
- A 700ms guard prevents repeated wheel input from fighting smooth scrolling.
- Normal page scrolling resumes at the first and last boundaries.

## Scene anatomy

Each scene renders:

1. Uppercase pathway label.
2. Fraunces headline split into individually animated words.
3. One italic green accent word selected by `accentWord`.
4. Short pathway introduction.
5. An editorial ministry-name ribbon with green separators.
6. A React Router CTA with a Lucide `ArrowRight`.

All copy, destinations, accent positions, and ministry names belong in
`src/data/ministryPathways.ts`, not in the component or CSS.

## Visual and motion rules

- Section surface: warm white with a restrained radial light wash.
- Headline: `--font-display`, weight 300, `--text-hero`, line-height `0.94`.
- Supporting UI: `--font-body` (Space Grotesk), not a parallel font system.
- Accent: `--green-deep`; eyebrow: `--gold`; CTA: `--clay-dark`.
- Scene entrance: opacity, upward motion, and blur resolving over 600–750ms.
- Word stagger: 110ms increments through the fourth word.
- Ribbon entrance follows the headline; ministry names stagger at 70ms.
- Aura scale grows from `0.45` to `1.45`; opacity grows from `0.35` to `0.85`.
- Progress is a quiet 1px green-to-gold line.
- No bounce, spring, looping ornament, or React render loop.

At `620px`, scene padding tightens, headlines use `42–64px`, and ministry
names become a centered vertical list. A short-height desktop adjustment
applies below `720px` viewport height.

## Reduced motion

If `prefers-reduced-motion: reduce` matches, the component adds the scoped
`flat` class, marks every scene visible, and skips all scroll/wheel listeners.
The pin becomes normal document flow, scenes stack vertically, the aura and
progress bar disappear, and transitions are disabled.

This flat mode is required. New motion must preserve complete readability and
navigation when animation is disabled.

## Accessibility and implementation constraints

- The section has the accessible label "Our life together".
- The ministry ribbon is a semantic list with a scene-specific label.
- CTAs are router links and retain visible focus treatment and 44px targets.
- Decorative aura and progress elements are hidden from assistive technology.
- The sticky section must not be placed inside an ancestor with clipping,
  transforms, or a conflicting fixed height.
- Always clean up `scroll`, `resize`, `wheel`, and timeout resources.

## Acceptance checklist

- [ ] The section pins for four viewport heights after the hero.
- [ ] Exactly one animated scene is active at a time.
- [ ] Wheel input advances one neighboring scene while pinned.
- [ ] Aura and progress line track continuous scroll progress.
- [ ] Every pathway CTA uses the destination from shared data.
- [ ] Phone layouts keep every ministry name and CTA readable.
- [ ] Reduced-motion mode becomes a fully visible stacked document.
- [ ] Scrolling does not trigger React renders per frame.
