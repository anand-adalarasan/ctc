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
    (section.offsetHeight - pin.offsetHeight),
  0,
  1,
);
```

The active scene is `round(progress * (sceneCount - 1))`, clamped to the
available scene indexes. Each scene anchor is evenly spaced across the sticky
travel at `index / (sceneCount - 1)`. Scroll work is scheduled with
`requestAnimationFrame` behind a `ticking` guard, so at most one visual update
runs per animation frame. React state is never updated per frame; the
component only toggles CSS Module classes, `aria-hidden`/`inert` attributes,
and writes the aura transform/opacity and progress-bar width.

## Navigation model: native scrolling, no JS scroll hijacking

The pin (`position: sticky`) does all "pinning" work in CSS. The component
attaches only **passive** `scroll` and `resize` listeners to read position —
it never calls `event.preventDefault()` and never calls
`window.scrollTo(...)`. The browser owns wheel, trackpad, touch, keyboard,
and scrollbar-drag input completely; the component just paints scene state in
response to wherever the user has scrolled to.

`Hero ↔ Worship ↔ Connect ↔ Grow ↔ Serve ↔ Footer` is a continuous document
scroll, not a set of discrete JS-driven stops. There is no gesture
accumulation, no settle timer, and no navigation lock. This is deliberate:
an earlier version of this component intercepted every wheel/touch event with
non-passive listeners, accumulated deltas until the input stream went quiet,
then replayed the gesture as a forced `scrollTo({ behavior: "smooth" })`. That
approach fought the browser's native (compositor-thread) scrolling on every
trackpad tick, and made the homepage feel laggy and unresponsive under
sustained precision-trackpad input. Prefer deleting this kind of controller
over layering another timeout or lock onto it.

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
`flat` class, marks every scene visible (including `aria-hidden`/`inert`
removal), and attaches no scroll listener at all. The pin becomes normal
document flow, scenes stack vertically, the aura and progress bar disappear,
and transitions are disabled.

This flat mode is required. New motion must preserve complete readability and
navigation when animation is disabled.

## Accessibility and implementation constraints

- The section has the accessible label "Our life together".
- The ministry ribbon is a semantic list with a scene-specific label.
- CTAs are router links and retain visible focus treatment and 44px targets.
- Decorative aura and progress elements are hidden from assistive technology.
- Every inactive scene gets `aria-hidden="true"` and `inert`, so it cannot
  hold focus or be read while off-screen; the active scene has both removed.
- The sticky section must not be placed inside an ancestor with clipping,
  transforms, or a conflicting fixed height.
- The pin and outer section use `100vh`/`400vh` with a `100dvh`/`400dvh`
  override (dynamic viewport units), so mobile browser-chrome show/hide does
  not leave a gap or misjudge scroll distance. Progress is always computed
  from the section's and pin's *measured* `offsetHeight`, never from
  `window.innerHeight` assumptions.
- Always clean up `scroll` and `resize` listeners on unmount.

## Acceptance checklist

- [ ] The section pins for four viewport heights after the hero.
- [ ] Exactly one animated scene is active at a time.
- [ ] Wheel, trackpad, touch, keyboard, and scrollbar-drag input all scroll
      natively — no input type is intercepted or preventDefault'd.
- [ ] Downward scroll passes through Hero, Worship, Connect, Grow, Serve,
      Footer in order; upward scroll reverses the same sequence.
- [ ] Sustained precision-trackpad scrolling (fast, slow, inertial,
      direction-reversed) tracks 1:1 with no forced smooth-scroll animation
      competing with it.
- [ ] Aura and progress line track continuous scroll progress.
- [ ] Every pathway CTA uses the destination from shared data.
- [ ] Phone layouts keep every ministry name and CTA readable.
- [ ] Reduced-motion mode becomes a fully visible stacked document with no
      scroll listener attached.
- [ ] Inactive scenes are not focusable and are hidden from assistive tech.
- [ ] Scrolling does not trigger React renders per frame.
