# Three Lights, One Morning — Section Spec

A Sunday-rhythm section for the Christ Tamil Church website: the three Sunday
gatherings presented as three lights that ignite in sequence along a shared
thread of light. Stack: Vite + React 18 + React Router, TypeScript, CSS Modules.
Port values 1:1 if you use Tailwind/styled-components.

CTC tokens used: primary green `#153d2b`, accent gold `#b99045`, leaf green
`#8dc63f`, ink `#10251b`, body `#59635c`, faint `#8a9183`, sage `#edf3ea`,
cream `#f7f5ee`. Georgia serif display, Inter body/UI, JetBrains Mono eyebrows.

---

## 1. Behavior

- 3-column grid. Each column: a small ringed **light node**, the service time in
  big Georgia serif (green colon), a mono two-line label, and an italic hover hint.
- A 1px **thread of light** runs behind the three nodes. On section reveal it
  **draws in left→right** (`scaleX 0→1`).
- Each node's inner glow **ignites in sequence** (delays .30s / .62s / .94s) once
  the section is in view — "three lights, one morning."
- A small gold **glint travels** along the thread on a gentle infinite loop.
- Hovering a column reveals its one-line hint.
- Reveal is triggered once by an `IntersectionObserver` adding an `.in` class.

---

## 2. `ThreeLights.tsx` (copy verbatim)

```tsx
import { useEffect, useRef } from "react";
import styles from "./ThreeLights.module.css";

type Light = { time: [string, string]; label: [string, string]; hint: string };

const LIGHTS: Light[] = [
  { time: ["10", "30"], label: ["Worship", "Tamil & English"], hint: "Praise, prayer & the Word." },
  { time: ["11", "15"], label: ["Sunday School", "kids & teens"], hint: "A class for every age." },
  { time: ["12", "15"], label: ["Fellowship", "food & friends"], hint: "Chai, a meal & good company." },
];

export default function ThreeLights() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add(styles.in);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-label="Every Sunday">
      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>
            Every Sunday<span className={styles.rule} />
          </span>
          <h2 className={styles.title}>
            Three lights, <span className={styles.accent}>one morning.</span>
          </h2>
          <p className={styles.intro}>
            One morning, three gatherings — come for one, stay for all three.
            There&rsquo;s a place for every age.
          </p>
        </header>

        <div className={styles.lights}>
          <span className={styles.travel} aria-hidden="true" />
          {LIGHTS.map((l, i) => (
            <div key={i} className={styles.col}>
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.time}>
                {l.time[0]}
                <span className={styles.colon}>:</span>
                {l.time[1]}
              </div>
              <div className={styles.label}>
                {l.label[0]}
                <br />
                {l.label[1]}
              </div>
              <div className={styles.hint}>{l.hint}</div>
            </div>
          ))}
        </div>

        <div className={styles.footnote}>
          Plus Wednesdays · Bible Study &amp; Prayer · 7:30 PM
        </div>

        <div className={styles.find}>
          <div className={styles.findCard}>
            <div className={styles.findKicker}>Find us</div>
            <div className={styles.findAddr}>1330 63rd St, Downers Grove, IL 60516</div>
            <div className={styles.findSub}>Free parking · everyone welcome</div>
            <div className={styles.findBtns}>
              <a
                className={`${styles.btn} ${styles.btnFill}`}
                href="https://www.google.com/maps/dir//1330+63rd+St,+Downers+Grove,+IL+60516"
                target="_blank"
                rel="noopener"
              >
                Get directions
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="tel:+17739363097">
                773·936·3097
              </a>
            </div>
          </div>
          <div className={styles.map}>{/* <img src=".../map.png" alt="Map to the church" /> */}</div>
        </div>
      </div>
    </section>
  );
}
```

---

## 3. `ThreeLights.module.css` (copy verbatim)

```css
.section {
  --tl-ink: var(--ink, #10251b);
  --tl-body: var(--body, #59635c);
  --tl-faint: var(--faint, #8a9183);
  --tl-primary: var(--primary, #153d2b);
  --tl-green: var(--green-deep, #6ba52c);
  --tl-light: var(--light, #8dc63f);
  --tl-gold: var(--accent, #b99045);
  --tl-sage: var(--ctc-sage-soft, #edf3ea);
  --tl-glide: cubic-bezier(0.2, 0.7, 0.2, 1);
  --tl-line: rgba(16, 37, 27, 0.1);

  padding: clamp(60px, 8vw, 110px) 24px;
  background: var(--bg, #f7f5ee);
}
.inner { max-width: 1080px; margin: 0 auto; }

/* header */
.head { margin-bottom: clamp(40px, 6vw, 60px); }
.eyebrow {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: "JetBrains Mono", monospace; font-weight: 800; font-size: 12px;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--tl-gold);
}
.rule { display: block; width: 46px; height: 1px; background: var(--tl-gold); opacity: 0.5; }
.title {
  margin: 16px 0 0; font-family: Georgia, "Times New Roman", serif; font-weight: 700;
  font-size: clamp(30px, 4.4vw, 56px); line-height: 1.02; letter-spacing: -0.02em;
  color: var(--tl-ink);
}
.accent { color: var(--tl-green); font-style: italic; }
.intro {
  margin: 18px 0 0; max-width: 50ch; font-family: "Inter", system-ui, sans-serif;
  font-size: 16px; line-height: 1.65; color: var(--tl-body);
}

/* three lights */
.lights {
  position: relative;
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: clamp(20px, 4vw, 52px);
}
/* the thread */
.lights::before {
  content: ""; position: absolute; left: 16.6%; right: 16.6%; top: 11px; height: 1px; z-index: 0;
  background: linear-gradient(90deg, transparent, rgba(185, 144, 69, 0.55) 20%,
    rgba(185, 144, 69, 0.55) 80%, transparent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 1.15s var(--tl-glide) 0.15s;
}
.in .lights::before { transform: scaleX(1); }

/* traveling glint */
.travel {
  position: absolute; top: 11px; left: 16.6%; width: 7px; height: 7px;
  margin: -3.5px 0 0 -3.5px; border-radius: 50%; z-index: 2;
  background: var(--tl-gold); box-shadow: 0 0 8px 2px rgba(185, 144, 69, 0.6);
  opacity: 0;
}
.in .travel { animation: tl-travel 7s ease-in-out infinite 1.4s; }
@keyframes tl-travel {
  0%   { left: 16.6%; opacity: 0; }
  6%   { opacity: 1; }
  44%  { left: 50%;  opacity: 1; }
  50%  { opacity: 0.45; }
  88%  { left: 83.4%; opacity: 1; }
  96%, 100% { left: 83.4%; opacity: 0; }
}

.col { position: relative; z-index: 1; text-align: center; padding-top: 38px; }

/* light node */
.node {
  position: absolute; left: 50%; top: 4px; width: 15px; height: 15px; margin-left: -7.5px;
  border-radius: 50%; background: var(--bg, #f7f5ee); border: 1px solid var(--tl-green);
}
.node::after {
  content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--tl-light);
  opacity: 0.14; transform: scale(0.35);
  transition: opacity 0.6s ease, transform 0.6s var(--tl-glide), box-shadow 0.6s ease;
}
.in .col:nth-child(2) .node::after { opacity: 1; transform: scale(1); box-shadow: 0 0 0 6px rgba(141,198,63,0.16); transition-delay: 0.30s; }
.in .col:nth-child(3) .node::after { opacity: 1; transform: scale(1); box-shadow: 0 0 0 6px rgba(141,198,63,0.16); transition-delay: 0.62s; }
.in .col:nth-child(4) .node::after { opacity: 1; transform: scale(1); box-shadow: 0 0 0 6px rgba(141,198,63,0.16); transition-delay: 0.94s; }
/* note: .travel is nth-child(1); the three columns are 2/3/4 */

.time {
  font-family: Georgia, "Times New Roman", serif; font-weight: 500;
  font-size: clamp(40px, 6vw, 80px); line-height: 0.9; letter-spacing: -0.04em; color: var(--tl-ink);
}
.colon { color: var(--tl-green); }
.label {
  margin-top: 12px; font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 12px;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--tl-faint); line-height: 1.5;
}
.hint {
  margin-top: 10px; font-family: Georgia, serif; font-style: italic; font-size: 14.5px;
  color: var(--tl-green); max-height: 0; opacity: 0; overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.35s ease;
}
.col:hover .hint { max-height: 44px; opacity: 1; }

.footnote {
  margin-top: 30px; text-align: center; font-family: "JetBrains Mono", monospace;
  font-weight: 700; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--tl-faint);
}

/* find us */
.find {
  margin-top: clamp(40px, 6vw, 58px);
  display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 5vw, 64px); align-items: center;
}
.findCard { padding: 24px 26px; background: var(--tl-sage); border-left: 4px solid var(--tl-primary); border-radius: 6px; }
.findKicker { font-family: "JetBrains Mono", monospace; font-weight: 800; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--tl-gold); }
.findAddr { margin-top: 12px; font-family: Georgia, serif; font-size: 20px; line-height: 1.3; color: var(--tl-ink); }
.findSub { margin-top: 6px; font-family: "Inter", sans-serif; font-size: 14px; color: var(--tl-body); }
.findBtns { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px; }
.map {
  width: 100%; height: clamp(260px, 30vw, 400px); border-radius: 8px;
  background: #eef2ea; /* replace with <img> */
}
.map img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; display: block; }

/* buttons (squared, CTC) */
.btn {
  display: inline-flex; align-items: center; gap: 8px; font-family: "Inter", sans-serif;
  font-weight: 600; font-size: 14px; padding: 11px 18px; text-decoration: none;
  transition: transform 0.18s var(--tl-glide), background 0.18s ease;
}
.btnFill { background: var(--tl-primary); color: #faf8f3; border: 1px solid var(--tl-primary); }
.btnFill:hover { background: #1d5238; transform: translateY(-2px); }
.btnGhost { background: transparent; color: var(--tl-primary); border: 1px solid var(--tl-line); }
.btnGhost:hover { background: var(--tl-sage); border-color: var(--tl-green); transform: translateY(-1px); }

/* responsive */
@media (max-width: 720px) { .find { grid-template-columns: 1fr; } }
@media (max-width: 560px) {
  .lights { grid-template-columns: 1fr; gap: 26px; }
  .lights::before, .travel { display: none; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .lights::before { transition: none; transform: scaleX(1); }
  .node::after { transition: none; opacity: 1; transform: scale(1); box-shadow: 0 0 0 6px rgba(141,198,63,0.16); }
  .in .travel { animation: none; }
  .hint { transition: none; }
}
```

---

## 4. Notes

- **nth-child mapping:** inside `.lights`, the traveling glint `.travel` is the
  first child, so the three columns are `nth-child(2 | 3 | 4)`. If you drop the
  glint, shift these to `1 | 2 | 3`.
- Georgia is a system serif (no font file needed). Inter + JetBrains Mono load
  from Google Fonts at the app root.
- Replace the `.map` placeholder with a real `<img>` (church map screenshot).
- The section reveals **once** — the observer disconnects after first intersect,
  so lights don't re-ignite on scroll-back.

## 5. Design intent
- **Three lights, one morning** — the thread draws, then each gathering lights in
  turn; the glint keeps a gentle life moving between them.
- Reverent restraint: single-direction eased motion, no bounce/spring, warm
  green-and-gold on cream.
