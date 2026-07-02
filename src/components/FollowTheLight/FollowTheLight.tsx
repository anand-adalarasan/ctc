import { useEffect, useRef } from "react";
import styles from "./FollowTheLight.module.css";

type Scene = {
  eyebrow: string;
  eyebrowTamil?: string;
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
    sub: "\"The people walking in darkness have seen a great light.\"",
    cite: "Isaiah 9:2",
  },
  {
    eyebrow: "One life, three callings · 01",
    words: ["Love", "God."],
    sub: "With all your heart, all your soul, and all your mind - the first and greatest command.",
  },
  {
    eyebrow: "One life, three callings · 02",
    words: ["Love", "People."],
    sub: "Your neighbour as yourself - welcomed in, no one left in the dark.",
  },
  {
    eyebrow: "One life, three callings · 03",
    words: ["Make", "Disciples."],
    sub: "Go, and walk with others toward home - that's why we gather.",
  },
  {
    eyebrow: "This Sunday · everyone welcome",
    words: ["Come", "home."],
    sub: "Worship with us in Tamil & English - Sundays at 12:30 PM, 1330 63rd St, Downers Grove.",
    cta: { label: "Plan your visit", href: "/visit" },
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
      sceneRefs.current.forEach((scene) => scene?.classList.add(styles.on));
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

      sceneRefs.current.forEach((scene, i) => {
        if (!scene) return;
        scene.classList.toggle(styles.on, i === idx);
        scene.classList.toggle(styles.past, i < idx);
      });

      if (auraRef.current) {
        auraRef.current.style.transform = `translate(-50%, -50%) scale(${(0.45 + p).toFixed(3)})`;
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
            key={scene.eyebrow}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className={`${styles.scene}${i === 0 ? ` ${styles.on}` : ""}`}
          >
            <span className={styles.eyebrow}>
              {scene.eyebrowTamil && <span className={styles.tamil}>{scene.eyebrowTamil}</span>}
              {scene.eyebrowTamil ? " · " : ""}
              {scene.eyebrow}
            </span>

            <h2 className={styles.headline}>
              {scene.words.map((word, wordIndex) => (
                <span
                  key={`${scene.eyebrow}-${word}`}
                  className={
                    wordIndex === scene.words.length - 1
                      ? `${styles.w} ${styles.accent}`
                      : styles.w
                  }
                >
                  {word}
                  {wordIndex < scene.words.length - 1 ? "\u00A0" : ""}
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

        <div className={styles.bar} aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
