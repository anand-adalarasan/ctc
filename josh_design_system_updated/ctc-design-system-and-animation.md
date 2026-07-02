# Christ Tamil Church — Design System & "Follow the Light" Animation

A single handoff document for building the Christ Tamil Church (CTC) Chicago
website and its signature scroll-driven animation. Part A is the visual design
system (tokens, type, components, voice). Part B is the complete animation spec
with copy-paste reference code.

**Stack assumed:** Vite + React 18 + React Router, TypeScript, CSS Modules.
If you use Tailwind/styled-components, port values 1:1 — do not change them.

- **Church:** Christ Tamil Church, Chicago — a Bible-based Tamil home church for
  families in Chicagoland.
- **Tagline:** Love God. Love People. Make Disciples.
- **Mission:** To revive believers, to live by love, and to provide a
  Bible-based home church for Tamil families in the Chicago area.
- **Service:** Sundays 10:30 AM · Bible Study Wed 7:30 PM
- **Address:** 1330 63rd St, Downers Grove, IL 60516 · (773) 936-3697
- **Pastor:** Rev. Jagan Samuelraj

---

# PART A — Design System

## A1. Aesthetic

Warm editorial reverence — a printed church bulletin reimagined for the web.
Natural-light photography, generous whitespace, serif authority, and a squared,
slightly traditional button language. Deep forest green + brass gold on cream
paper. Never corporate, never trendy.

## A2. Color tokens

```css
:root {
  /* surfaces */
  --bg:         #ffffff;   /* page (site also uses warm cream #f7f5ee for bands) */
  --card:       #ffffff;
  --sage:       #edf3ea;   /* sage-soft — secondary bands, inset panels */

  /* ink & text */
  --ink:        #10251b;   /* darkest — headings on light */
  --primary:    #153d2b;   /* deep forest green — primary buttons, footer */
  --primary-dk: #10251b;
  --body:       #59635c;   /* body copy (muted green-grey) */
  --faint:      #8a9183;   /* meta, captions */

  /* greens */
  --green-deep: #6ba52c;   /* accent green — emphasis, colon, accent word */
  --light:      #8dc63f;   /* bright leaf green — dots, glints */

  /* brass */
  --gold:       #b99045;   /* eyebrows, small labels, gold CTA — a spice, never a flood */

  /* lines */
  --line:       rgba(16,37,27,0.10);
}
```

Usage rules:
- **Gold is a spice.** Only eyebrows, tiny labels, thin emphasis, one gold CTA.
  Never large gold fills.
- **Green leads.** Headings, primary buttons, icon circles, footer.
- **Cream/sage tint bands** break the white; content stays centered in the band.
- **Imagery is warm** — golden natural light, wood tones, real congregation
  photos; slight saturation bump on hover (`filter: saturate(1.03–1.06)`), never
  cold or B&W.

## A3. Typography

```
Display  : "Fraunces", Georgia, serif   — headlines, card titles, pull quotes
           (weight 400; large & confident; tight leading 0.94–1.1;
            italic for warmth: use font-style:italic on emphasis)
Body/UI  : "Inter", system-ui, sans     — body, buttons, nav (400/500/600, ~17px, lh 1.6)
Mono     : "JetBrains Mono", monospace   — eyebrows/kickers, labels, cites (700/800, uppercase)
Tamil    : "Anek Tamil", sans           — Tamil words (400–700)
```

Type roles:
- **Hero / display headline:** Fraunces 400, `clamp(46px, 10vw, 148px)`,
  `letter-spacing:-.035em`, line-height ~0.94.
- **Section headline (h2):** Fraunces 400, `clamp(30px, 4.4vw, 56px)`,
  `letter-spacing:-.02em`, line-height ~1.04.
- **Eyebrow / kicker:** JetBrains Mono 800, `12px`, uppercase,
  `letter-spacing:.2–.24em`, color `--gold`; often trailed by a 46px rule.
  Tamil variant in Anek Tamil, sentence case, ~+2px, minimal tracking.
- **Body:** Inter, `16–17px`, line-height 1.6–1.68, color `--body`.
- **Pull quote / subtitle:** Fraunces italic, `clamp(17px, 2.1vw, 25px)`,
  line-height 1.5.
- **Citation:** JetBrains Mono 700, `11px`, uppercase, `letter-spacing:.18em`,
  color `--green-deep`.
- **Accent word:** color the final/subject word of a headline `--green-deep`
  (and sometimes set it italic Fraunces).

## A4. Spacing, layout, radii

- 4px-based spacing scale. Container max **1200px**; narrow content **980px**.
- Section vertical rhythm `clamp(46px, 6vw, 82px)` (home sections ~72–96px).
- Full-bleed tinted bands (sage / cream) break the white; content centered
  within the container inside each band.
- **Radii:** buttons & nav CTA are **squared (0px)** — the signature. Cards/images
  `8px`, small cards `6px`, chips/inputs `4px`, pill `999px` for icon circles and
  date badges.

## A5. Borders, cards, shadows

```css
.card {
  background: #fff;
  border: 1px solid rgba(16,37,27,0.10);
  border-radius: 8px;
  box-shadow: 0 16px 34px rgba(16,37,27,0.06);   /* always green-tinted, soft */
  transition: transform .2s cubic-bezier(.2,.7,.2,1), box-shadow .2s ease, border-color .2s ease;
}
.card:hover {
  transform: translateY(-3px);                    /* -3 to -4px lift */
  border-color: rgba(21,61,43,0.22);
  box-shadow: 0 22px 44px rgba(16,37,27,0.09);
}
```

- Shadows are always green-tinted and soft — never neutral grey or harsh.
- Images inside cards scale `1.01–1.025` and warm slightly on hover.
- **Mission card** is the one sanctioned left-border accent: `4px` solid green
  left border on a sage background.

## A6. Buttons

Squared, no radius. Three variants:

```css
.btn { display:inline-flex; align-items:center; gap:8px;
  font: 600 15px "Inter"; padding: 13px 22px; cursor:pointer;
  transition: transform .18s cubic-bezier(.2,.7,.2,1), background .18s ease, box-shadow .18s ease; }

/* primary — green fill */
.btn-fill { background: var(--primary); color:#faf8f3; border:1px solid var(--primary); }
.btn-fill:hover { background:#1d5238; transform:translateY(-2px); box-shadow:0 12px 24px rgba(21,61,43,.24); }

/* gold CTA — use sparingly */
.btn-gold { background: var(--gold); color:#fff; border:1px solid var(--gold); }
.btn-gold:hover { background:#c99d4c; transform:translateY(-1px); }

/* secondary — outline, fills sage on hover */
.btn-ghost { background:transparent; color:var(--primary); border:1px solid var(--line); }
.btn-ghost:hover { background:var(--sage); border-color:var(--green-deep); transform:translateY(-1px); }
```

Optional signature micro-interaction: a **ripple** on click (white at low alpha
for fills, green for ghosts) that scales from the click point and fades in ~.6s.

## A7. Iconography

- **Single source: Lucide** (`lucide-react`). Clean 2px stroke, rounded. No
  filled icons, no duotone, no emoji, no unicode glyphs.
- Sizing: 20–28px glyphs inside 42–52px green pill circles (white glyph) for
  ministry/vision markers; bare icons 14–22px inline.
- Icons in use: Church, BookOpen, HandHeart, HeartHandshake, Users, Music,
  MicVocal, School, MapPin, Phone, CalendarDays, Cross, Heart, Sprout, Home,
  ChevronDown, Menu, X.
- **Brand mark:** a typographic "+" (cross) in Fraunces/Georgia, rotated ~6°, in
  primary green — not an SVG logo.

## A8. Motion foundations (site-wide)

- Gentle and reverent. Entrances use **fade-up** (opacity + 18–28px translateY)
  over ~.7–.8s ease; sections reveal on scroll via `IntersectionObserver` with a
  small stagger.
- Signature easing: `cubic-bezier(.2, .7, .2, 1)`.
- Hover transitions 160–220ms; image transforms ~.5s. **No** bounce, spring, or
  infinite loops.
- Header is sticky, translucent white (`rgba(255,255,255,.93)` + `blur(12px)`),
  gains a hairline border + soft shadow after 24px of scroll.
- Always honor `prefers-reduced-motion: reduce` — disable transforms/reveals and
  show content immediately.

## A9. Voice & copy

- Second person to the visitor ("you and your family"), first-person plural for
  the church ("we are…", "join us"). Always welcome the reader in.
- Warm, gentle, pastoral. Sincere about faith without being preachy. Hospitality
  leads ("We'd love to welcome you").
- Sentence case for body and most headings; Title Case for ministry names
  (Sunday School, Kids Circle, Holy Communion). Eyebrows are ALL-CAPS + short.
- Scripture quoted directly, cited inline in parentheses — e.g. "…a great light
  (Isa. 9:2)". Abbreviated book names, chapter:verse.
- CTAs are gentle imperatives, often hospitality-framed: "Plan your visit",
  "Get directions", "Ask for prayer".
- **No emoji.** No hype. Name Tamil identity with pride. Expand acronyms warmly
  (B.L.A.S.T. = Bible Learning And Spiritual Training).

---

# PART B — "Follow the Light" Scroll Animation

The site's signature moment: a pinned, scroll-driven narrative that carries the
scripture, the tagline (Love God / Love People / Make Disciples), and the Sunday
invite. Placed on the Home page immediately after the hero.

## B1. Mental model

- The outer `<section>` is very tall (**`520vh`**) — this is the scroll budget.
- Inside it, a `.pin` wrapper is `position: sticky; top: 0; height: 100vh;
  overflow: hidden`, so one viewport stays frozen while ~520vh scrolls past.
- Scroll maps to progress `p ∈ [0,1]`:
  `p = clamp(-sectionRect.top / (section.offsetHeight - innerHeight), 0, 1)`.
- Five scenes are absolutely stacked (`inset:0`). Active index =
  `clamp(floor(p*5), 0, 4)`.
- Per frame we only toggle classes and write two inline styles — **React never
  re-renders during scroll.**

```
scroll ▼        p     active scene
──────────────────────────────────────
 0vh   ┐  top  0.0    0  Follow the light   (Isaiah 9:2)
       │       0.2    1  Love God
       │       0.4    2  Love People
       │       0.6    3  Make Disciples
520vh  ┘  end  0.8+   4  Come home          (invite + CTA)
```

## B2. Motion tokens

| Element           | Property  | Duration | Delay          | Easing              |
|-------------------|-----------|----------|----------------|---------------------|
| Scene             | opacity   | .6s      | —              | ease                |
| Scene             | transform | .75s     | —              | cubic-bezier(.2,.7,.2,1) |
| Scene             | filter    | .6s      | —              | ease                |
| Headline word     | transform | .6s      | 0 / .11 / .22s | cubic-bezier(.2,.7,.2,1) |
| Headline word     | opacity   | .5s      | (staggered)    | ease                |
| Subtitle          | opacity   | .6s      | .28s           | ease                |
| CTA               | opacity   | .6s      | .42s           | ease                |
| Progress bar fill | width     | .12s     | —              | linear              |

Transforms:
- Scene enter (hidden): `translateY(46px) scale(.955)` + `blur(9px)`, `opacity:0`
- Scene active (`.on`): `none`, `opacity:1`
- Scene exit (`.past`): `translateY(-46px) scale(1.04)` + `blur(9px)`, `opacity:0`
- Word rise: `translateY(.55em)` → `none`
- Aura: `scale 0.45 → 1.45`, `opacity 0.35 → 0.85`, tracking `p`
- Progress bar width = `p·100%`, gradient `green-deep → gold`

## B3. `FollowTheLight.tsx` (copy verbatim)

```tsx
import { useEffect, useRef } from "react";
import styles from "./FollowTheLight.module.css";

type Scene = {
  eyebrow: string;
  eyebrowTamil?: string;
  /** Headline words; the LAST word is accented green. */
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
        auraRef.current.style.transform =
          `translate(-50%, -50%) scale(${(0.45 + p).toFixed(3)})`;
        auraRef.current.style.opacity = (0.35 + p * 0.5).toFixed(3);
      }
      if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(2)}%`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

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
              {scene.eyebrowTamil && <span className={styles.tamil}>{scene.eyebrowTamil}</span>}
              {scene.eyebrowTamil ? " · " : ""}
              {scene.eyebrow}
            </span>

            <h2 className={styles.headline}>
              {scene.words.map((w, wi) => (
                <span
                  key={wi}
                  className={wi === scene.words.length - 1 ? `${styles.w} ${styles.accent}` : styles.w}
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
                <a className={styles.cta} href={scene.cta.href}>{scene.cta.label}</a>
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

## B4. `FollowTheLight.module.css` (copy verbatim)

```css
.section {
  --ftl-ink: var(--ink, #10251b);
  --ftl-body: var(--body, #59635c);
  --ftl-green-deep: var(--green-deep, #6ba52c);
  --ftl-light: var(--light, #8dc63f);
  --ftl-gold: var(--gold, #b99045);
  --ftl-glide: cubic-bezier(0.2, 0.7, 0.2, 1);

  position: relative;
  height: 520vh;      /* scroll budget — DO NOT shrink */
  z-index: 5;
}

.pin {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aura {
  position: absolute;
  left: 50%; top: 50%;
  width: 42vmax; height: 42vmax;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%) scale(0.45);
  opacity: 0.35;
  mix-blend-mode: multiply;
  background: radial-gradient(circle,
    rgba(244, 232, 200, 0.92),
    rgba(141, 198, 63, 0.12) 42%,
    rgba(255, 255, 255, 0) 70%);
}

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
  transition: opacity 0.6s ease, transform 0.75s var(--ftl-glide), filter 0.6s ease;
}
.scene.on { opacity: 1; transform: none; filter: none; pointer-events: auto; }
.scene.past { opacity: 0; transform: translateY(-46px) scale(1.04); filter: blur(9px); }

.eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: "JetBrains Mono", monospace; font-weight: 800; font-size: 12px;
  letter-spacing: 0.24em; text-transform: uppercase; color: var(--ftl-gold);
}
.tamil { font-family: "Anek Tamil", sans-serif; letter-spacing: 0.03em; font-size: 14px; text-transform: none; }

.headline {
  margin: 20px 0 0;
  font-family: "Fraunces", Georgia, serif; font-weight: 400;
  font-size: clamp(46px, 10vw, 148px); line-height: 0.94; letter-spacing: -0.035em;
  color: var(--ftl-ink);
}
.w {
  display: inline-block; opacity: 0; transform: translateY(0.55em);
  transition: opacity 0.5s ease, transform 0.6s var(--ftl-glide);
}
.accent { color: var(--ftl-green-deep); }
.scene.on .w { opacity: 1; transform: none; }
.scene.on .w:nth-child(2) { transition-delay: 0.11s; }
.scene.on .w:nth-child(3) { transition-delay: 0.22s; }

.sub {
  margin: 28px 0 0; max-width: 32ch;
  font-family: "Fraunces", Georgia, serif; font-style: italic;
  font-size: clamp(17px, 2.1vw, 25px); line-height: 1.5; color: var(--ftl-body);
  opacity: 0; transition: opacity 0.6s ease 0.28s;
}
.scene.on .sub { opacity: 1; }
.cite {
  margin-top: 16px; font-family: "JetBrains Mono", monospace; font-weight: 700;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ftl-green-deep);
}
.act { margin-top: 30px; opacity: 0; transition: opacity 0.6s ease 0.42s; }
.scene.on .act { opacity: 1; }
.cta {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: "Inter", system-ui, sans-serif; font-weight: 600; font-size: 15px;
  padding: 13px 22px; color: #faf8f3; background: #153d2b; border: 1px solid #153d2b;
  text-decoration: none; transition: transform 0.18s var(--ftl-glide), background 0.18s ease;
}
.cta:hover { background: #1d5238; transform: translateY(-2px); }

.bar {
  position: absolute; left: 0; right: 0; bottom: 0; height: 2px; z-index: 4;
  background: rgba(185, 144, 69, 0.14);
}
.bar span {
  display: block; height: 100%; width: 0;
  background: linear-gradient(90deg, var(--ftl-green-deep), var(--ftl-gold));
  transition: width 0.12s linear;
}

/* reduced motion — flat, fully visible, no pin */
.flat { height: auto; }
.flat .pin { position: static; height: auto; display: block; padding: 40px 0; }
.flat .scene {
  position: static; opacity: 1; transform: none; filter: none;
  pointer-events: auto; padding: 52px 8vw;
}
.flat .scene .w, .flat .scene .sub, .flat .scene .act { opacity: 1; transform: none; }
.flat .aura, .flat .bar { display: none; }

@media (prefers-reduced-motion: reduce) {
  .scene, .w, .sub, .act, .bar span { transition: none !important; }
}
```

## B5. Integrate on Home

Render right after the hero, as a normal sibling in page flow. It must NOT be
inside a wrapper with `overflow: hidden`, `transform`, `filter`, or a fixed
height — those break `position: sticky`.

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

Make the CTA `href="#visit"` match your visit-section id.

## B6. Design intent (preserve if refactoring)

1. **Light is the through-line** — aura brightens as the message deepens; accent
   color arcs brass → green.
2. **One idea per frame** — a single headline holds the stage; subtitle/CTA trail.
3. **Rise, don't slide** — all motion vertical & upward (reads as ascent home).
4. **Reverent restraint** — long, single-direction eased moves; no bounce/spring/loops.

## B7. Common mistakes (why a build looks broken)

- **Re-rendering on scroll.** Never `setState` per scroll frame — toggle classes
  on refs only. State-driven scroll stutters and fights the CSS transitions.
- **Section too short.** `520vh` is the scroll budget; shrinking it makes scenes
  flash past instantly.
- **Sticky not sticking.** Fails if any ancestor has `overflow` set or a
  `transform`/`filter`. `.pin` must be a direct child of the tall `.section`.
- **Wrong progress math.** Use `-rect.top / (offsetHeight - innerHeight)`, not
  `scrollY`.
- **Words not staggering.** Each word is its own `<span class="w">`; nth-child
  targets element children only.
- **All scenes visible.** Scenes are `position:absolute; inset:0` inside the pin.
- **Throttle + cleanup.** Keep the `ticking` rAF guard; remove both `scroll` and
  `resize` listeners on unmount.

## B8. Acceptance checklist

- [ ] Past the hero, one viewport freezes for ~5 screen-heights.
- [ ] Exactly one scene visible at a time; headlines rise word-by-word.
- [ ] The light behind the text grows brighter/bigger while scrolling down.
- [ ] The 2px bottom bar fills 0 → 100%.
- [ ] Last scene shows "Come home." + working "Plan your visit" button.
- [ ] With OS "Reduce motion" on: plain stacked, fully-readable block (no pin,
      fades, or aura).
- [ ] No React re-renders while scrolling (check DevTools).
