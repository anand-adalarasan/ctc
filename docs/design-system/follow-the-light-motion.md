# Follow the Light — Scrollytelling Section (Implementation Spec)

A pinned, scroll-driven narrative section for the Christ Tamil Church website.
Five scenes reveal one at a time as the user scrolls; each headline rises in
word-by-word, an ambient light behind it brightens, and a progress bar fills.

**Stack:** Vite + React 18 + React Router, TypeScript, CSS Modules.
If the codebase uses Tailwind or styled-components instead, port the CSS below
1:1 — do not change any values.

> ⚠️ **Read the "Common mistakes" section at the bottom first.** Most broken
> builds come from re-rendering React on every scroll frame or getting the
> sticky/height relationship wrong.

---

## 1. How it works (mental model)

- The **outer `<section>` is very tall (`520vh`)**. This tall element is what
  the user actually scrolls through.
- Inside it, a **`.pin` wrapper is `position: sticky; top: 0; height: 100vh`**.
  Because the section is tall and the pin is sticky, the pin appears frozen on
  screen while ~520vh of scroll distance elapses.
- We map that scroll distance to a progress value **`p` in `[0,1]`**:
  `p = clamp(-sectionRect.top / (section.offsetHeight - window.innerHeight), 0, 1)`
- Five scenes are absolutely stacked (`inset: 0`) inside the pin. The active
  scene index is `clamp(floor(p * 5), 0, 4)`.
- Only DOM class toggles and a couple of inline style writes happen per frame —
  **React never re-renders during scroll.**

```
scroll ▼            p        active scene
─────────────────────────────────────────
 0vh   ┐  section top   0.0     0  Follow the light
       │  (pin frozen)  0.2     1  Love God
       │                0.4     2  Love People
       │                0.6     3  Make Disciples
       │                0.8     4  Come home
520vh  ┘  section end   1.0     4
```

---

## 2. Files to create

```
src/components/FollowTheLight/FollowTheLight.tsx
src/components/FollowTheLight/FollowTheLight.module.css
```

Then render `<FollowTheLight />` on the Home page **immediately after the hero
section** (see §5).

---

## 3. `FollowTheLight.tsx` (complete — copy verbatim)

```tsx
import { useEffect, useRef } from "react";
import styles from "./FollowTheLight.module.css";

type Scene = {
  eyebrow: string;
  eyebrowTamil?: string;
  /** Headline split into words. The LAST word is accented in green. */
  words: string[];
  sub: string;
  cite?: string;
  cta?: { label: string; href: string };
};

const SCENES: Scene[] = [
  {
    eyebrow: "Follow the light",
    eyebrowTamil: "ஒளியைப் பின்தொடர்",
    words: ["Follow", "the", "light."],
    sub: "\u201CThe people walking in darkness have seen a great light.\u201D",
    cite: "Isaiah 9:2",
  },
  {
    eyebrow: "One life, three callings · 01",
    words: ["Love", "God."],
    sub: "With all your heart, all your soul, and all your mind — the first and greatest command.",
  },
  {
    eyebrow: "One life, three callings · 02",
    words: ["Love", "People."],
    sub: "Your neighbour as yourself — welcomed in, no one left in the dark.",
  },
  {
    eyebrow: "One life, three callings · 03",
    words: ["Make", "Disciples."],
    sub: "Go, and walk with others toward home — that\u2019s why we gather.",
  },
  {
    eyebrow: "This Sunday · everyone welcome",
    words: ["Come", "home."],
    sub: "Worship with us in Tamil & English — Sundays at 10:30 AM, 1330 63rd St, Downers Grove.",
    cta: { label: "Plan your visit", href: "#visit" },
  },
];

export default function FollowTheLight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: collapse to a flat, fully-visible document. No scroll math.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      section.classList.add(styles.flat);
      sceneRefs.current.forEach((s) => s && s.classList.add(styles.on));
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      let p = total > 0 ? -rect.top / total : 0;
      p = Math.min(1, Math.max(0, p));

      const n = SCENES.length;
      let idx = Math.floor(p * n);
      if (idx >= n) idx = n - 1;
      if (idx < 0) idx = 0;

      sceneRefs.current.forEach((s, i) => {
        if (!s) return;
        s.classList.toggle(styles.on, i === idx);
        s.classList.toggle(styles.past, i < idx);
      });

      if (auraRef.current) {
        // scale 0.45 -> 1.45, opacity 0.35 -> 0.85, tracking p
        auraRef.current.style.transform =
          `translate(-50%, -50%) scale(${(0.45 + p).toFixed(3)})`;
        auraRef.current.style.opacity = (0.35 + p * 0.5).toFixed(3);
      }
      if (barRef.current) {
        barRef.current.style.width = `${(p * 100).toFixed(2)}%`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update(); // set initial state

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Follow the light">
      <div className={styles.pin}>
        <div ref={auraRef} className={styles.aura} aria-hidden="true" />

        {SCENES.map((scene, i) => (
          <div
            key={i}
            ref={(el) => (sceneRefs.current[i] = el)}
            className={`${styles.scene}${i === 0 ? " " + styles.on : ""}`}
          >
            <span className={styles.eyebrow}>
              {scene.eyebrowTamil && (
                <span className={styles.tamil}>{scene.eyebrowTamil}</span>
              )}
              {scene.eyebrowTamil ? " · " : ""}
              {scene.eyebrow}
            </span>

            <h2 className={styles.headline}>
              {scene.words.map((w, wi) => (
                <span
                  key={wi}
                  className={
                    wi === scene.words.length - 1
                      ? `${styles.w} ${styles.accent}`
                      : styles.w
                  }
                >
                  {w}
                  {wi < scene.words.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h2>

            <p className={styles.sub}>{scene.sub}</p>
            {scene.cite && <div className={styles.cite}>{scene.cite}</div>}
            {scene.cta && (
              <div className={styles.act}>
                <a className={styles.cta} href={scene.cta.href}>
                  {scene.cta.label}
                </a>
              </div>
            )}
          </div>
        ))}

        <div className={styles.bar}>
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
```

---

## 4. `FollowTheLight.module.css` (complete — copy verbatim)

The `--ftl-*` variables fall back to hard-coded CTC values, so this works even
if global tokens aren't in scope. If the app already defines `--green-deep`
etc. globally, they win automatically.

```css
.section {
  /* CTC tokens (with fallbacks) */
  --ftl-ink: var(--ink, #10251b);
  --ftl-body: var(--body, #59635c);
  --ftl-green-deep: var(--green-deep, #6ba52c);
  --ftl-light: var(--light, #8dc63f);
  --ftl-gold: var(--gold, #b99045);
  --ftl-glide: cubic-bezier(0.2, 0.7, 0.2, 1);

  position: relative;
  height: 520vh;          /* scroll distance — DO NOT shrink */
  z-index: 5;
}

.pin {
  position: sticky;
  top: 0;
  height: 100vh;          /* one frozen viewport */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ambient light */
.aura {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 42vmax;
  height: 42vmax;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%) scale(0.45);
  opacity: 0.35;
  mix-blend-mode: multiply;
  background: radial-gradient(
    circle,
    rgba(244, 232, 200, 0.92),
    rgba(141, 198, 63, 0.12) 42%,
    rgba(255, 255, 255, 0) 70%
  );
}

/* scenes */
.scene {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 8vw;
  opacity: 0;
  transform: translateY(46px) scale(0.955);
  filter: blur(9px);
  pointer-events: none;
  transition:
    opacity 0.6s ease,
    transform 0.75s var(--ftl-glide),
    filter 0.6s ease;
}
.scene.on {
  opacity: 1;
  transform: none;
  filter: none;
  pointer-events: auto;
}
.scene.past {
  opacity: 0;
  transform: translateY(-46px) scale(1.04);
  filter: blur(9px);
}

/* eyebrow */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ftl-gold);
}
.tamil {
  font-family: "Anek Tamil", sans-serif;
  letter-spacing: 0.03em;
  font-size: 14px;
  text-transform: none;
}

/* headline + kinetic words */
.headline {
  margin: 20px 0 0;
  font-family: "Fraunces", Georgia, serif;
  font-weight: 400;
  font-size: clamp(46px, 10vw, 148px);
  line-height: 0.94;
  letter-spacing: -0.035em;
  color: var(--ftl-ink);
}
.w {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.55em);
  transition:
    opacity 0.5s ease,
    transform 0.6s var(--ftl-glide);
}
.accent {
  color: var(--ftl-green-deep);
}
.scene.on .w {
  opacity: 1;
  transform: none;
}
.scene.on .w:nth-child(2) {
  transition-delay: 0.11s;
}
.scene.on .w:nth-child(3) {
  transition-delay: 0.22s;
}

/* subtitle / cite / cta */
.sub {
  margin: 28px 0 0;
  max-width: 32ch;
  font-family: "Fraunces", Georgia, serif;
  font-style: italic;
  font-size: clamp(17px, 2.1vw, 25px);
  line-height: 1.5;
  color: var(--ftl-body);
  opacity: 0;
  transition: opacity 0.6s ease 0.28s;
}
.scene.on .sub {
  opacity: 1;
}
.cite {
  margin-top: 16px;
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ftl-green-deep);
}
.act {
  margin-top: 30px;
  opacity: 0;
  transition: opacity 0.6s ease 0.42s;
}
.scene.on .act {
  opacity: 1;
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 600;
  font-size: 15px;
  padding: 13px 22px;
  color: #faf8f3;
  background: #153d2b;
  border: 1px solid #153d2b;
  text-decoration: none;
  transition: transform 0.18s var(--ftl-glide), background 0.18s ease;
}
.cta:hover {
  background: #1d5238;
  transform: translateY(-2px);
}

/* progress bar */
.bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  z-index: 4;
  background: rgba(185, 144, 69, 0.14);
}
.bar span {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--ftl-green-deep), var(--ftl-gold));
  transition: width 0.12s linear;
}

/* reduced motion — flat, fully visible, no pin */
.flat {
  height: auto;
}
.flat .pin {
  position: static;
  height: auto;
  display: block;
  padding: 40px 0;
}
.flat .scene {
  position: static;
  opacity: 1;
  transform: none;
  filter: none;
  pointer-events: auto;
  padding: 52px 8vw;
}
.flat .scene .w,
.flat .scene .sub,
.flat .scene .act {
  opacity: 1;
  transform: none;
}
.flat .aura,
.flat .bar {
  display: none;
}

/* also honor the OS setting directly */
@media (prefers-reduced-motion: reduce) {
  .scene,
  .w,
  .sub,
  .act,
  .bar span {
    transition: none !important;
  }
}
```

---

## 5. Integrate on the Home page

Render it **right after the hero**, as a normal sibling in the page flow — it
must NOT be inside a wrapper that has `overflow: hidden`, `transform`, or a
fixed height (those break `position: sticky`).

```tsx
import FollowTheLight from "../components/FollowTheLight/FollowTheLight";

export default function Home() {
  return (
    <>
      <Hero />
      <FollowTheLight />
      {/* ...rest of the page... */}
    </>
  );
}
```

Make sure the CTA `href="#visit"` matches the id of your visit/plan-a-visit
section (rename if your anchor differs).

---

## 6. Fonts & tokens required

The section assumes these are already loaded globally (they are used across the
CTC site):

- **Fraunces** (serif display) — weights 400
- **Inter** — 600 (button)
- **JetBrains Mono** — 700 / 800 (labels)
- **Anek Tamil** — 600 (Tamil eyebrow)

If any are missing, load them (Google Fonts) at the app root. The color tokens
`--ink --body --green-deep --light --gold` fall back to hard-coded values inside
the module, so nothing breaks if they aren't defined.

---

## 7. Design intent (keep these true if you refactor)

1. **Light is the through-line.** The aura brightens (scale + opacity up) as the
   message deepens; the accent color arcs brass → green.
2. **One idea per frame.** A single headline holds the stage; subtitle and CTA
   trail it, never compete.
3. **Rise, don't slide.** All motion is vertical and upward — it reads as ascent
   toward home. Entering content comes from below; leaving content exits upward.
4. **Reverent restraint.** Long, single-direction, eased moves
   (`cubic-bezier(.2,.7,.2,1)`). No bounce, spring, or infinite loops.

Motion timing reference:

| Element            | Property   | Duration | Delay          | Easing            |
|--------------------|------------|----------|----------------|-------------------|
| Scene              | opacity    | .6s      | —              | ease              |
| Scene              | transform  | .75s     | —              | cubic .2/.7/.2/1  |
| Scene              | filter     | .6s      | —              | ease              |
| Headline words     | transform  | .6s      | 0 / .11 / .22s | cubic .2/.7/.2/1  |
| Headline words     | opacity    | .5s      | (staggered)    | ease              |
| Subtitle           | opacity    | .6s      | .28s           | ease              |
| CTA                | opacity    | .6s      | .42s           | ease              |
| Progress bar fill  | width      | .12s     | —              | linear            |

---

## 8. Common mistakes (why a build looks broken)

- **Re-rendering on scroll.** Do NOT put `p` or the active index in React state
  and `setState` on scroll. That stutters and fights the CSS transitions. Toggle
  classes on refs only, exactly as shown.
- **Section too short.** The `520vh` height is the scroll budget. If you shrink
  it (or wrap the scenes in a non-tall container), scenes flip past instantly.
- **Sticky not sticking.** `position: sticky` fails if any ancestor has
  `overflow: hidden/auto/scroll` or a `transform`/`filter`. Ensure the section's
  parents are clean, and the `.pin` is a **direct child** of the tall `.section`.
- **Wrong progress math.** `p` must use `-rect.top / (offsetHeight - innerHeight)`,
  not `scrollY`. Using `scrollY` ignores the section's position on the page.
- **Words not staggering.** The nth-child rules count element children of
  `.headline`. Keep each word as its own `<span class="w">` with no wrapper
  elements between them (the `&nbsp;` text node is fine and does not count).
- **All scenes visible at once.** Scenes must be `position: absolute; inset: 0`
  inside the pin so they stack; only the `.on` scene is visible.
- **Throttle flag.** Keep the `ticking` guard so only one `requestAnimationFrame`
  is queued per frame.
- **Cleanup.** Remove both `scroll` and `resize` listeners in the effect cleanup
  to avoid duplicate handlers on hot reload / route changes.

---

## 9. Quick acceptance checklist

- [ ] Scrolling past the hero freezes one viewport for ~5 screen-heights.
- [ ] Exactly one scene is visible at a time; headlines rise in word-by-word.
- [ ] The light behind the text grows brighter/bigger as you scroll down.
- [ ] The 2px bar at the bottom fills left→right from 0 to 100%.
- [ ] Last scene shows "Come home." with a working "Plan your visit" button.
- [ ] With OS "Reduce motion" on, the section is a plain stacked, fully-readable
      block (no pin, no fades, no aura).
- [ ] No jank: DevTools shows no React re-renders while scrolling.
