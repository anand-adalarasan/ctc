import { useEffect, useRef } from "react";
import { getTodayVerse } from "../../data/verses";
import styles from "./FollowTheLight.module.css";

type Scene = {
  eyebrow: string;
  eyebrowTamil?: string;
  words: string[];
  sub: string;
  cite?: string;
  chips?: string[];
  expect?: Array<{ title: string; text: string }>;
  verse?: {
    english: string;
    tamil: string;
    reference: string;
    tamilReference: string;
  };
  cta?: { label: string; href: string };
};

const todayVerse = getTodayVerse();

const SCENES: Scene[] = [
  {
    eyebrow: "Every Sunday",
    words: ["Three", "lights,", "one", "morning."],
    sub: "One morning shaped by worship, God's Word, and fellowship - come for one, stay for all three. There's a place for every age.",
    chips: ["Worship", "Word", "Fellowship"]
  },
  {
    eyebrow: "Our mission",
    eyebrowTamil: "எங்கள் நோக்கம்",
    words: ["Alive", "in", "Christ."],
    sub: "We gather as a Tamil church family to love God, love people, make disciples, and grow in a real relationship with Jesus.",
    cite: "Rooted in Christ. United in Love. Sent to Serve."
  },
  {
    eyebrow: "What to Expect",
    words: ["Come", "as", "you", "are."],
    sub: "A simple Sunday rhythm for first-time visitors and longtime families.",
    expect: [
      {
        title: "Tamil & English worship",
        text: "Songs, prayer, Scripture, and teaching for the whole church family."
      },
      {
        title: "Families welcome",
        text: "Children, youth, parents, and elders all have a place to belong."
      },
      {
        title: "Prayer & fellowship",
        text: "Stay after service for conversation, encouragement, and shared life."
      }
    ]
  },
  {
    eyebrow: "Today’s verse",
    eyebrowTamil: "இன்றைய வசனம்",
    words: ["Today's", "verse."],
    sub: todayVerse.english,
    verse: todayVerse
  },
  {
    eyebrow: "This Sunday · everyone welcome",
    words: ["Come", "home."],
    sub: "Worship with us in Tamil & English - Sundays at 12:30 PM, 1330 63rd St, Downers Grove.",
    cta: { label: "Plan your visit", href: "/visit" }
  }
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
                  key={`${scene.eyebrow}-${word}-${wordIndex}`}
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

            {scene.chips && (
              <div className={styles.chips} aria-label="Sunday rhythm">
                {scene.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            )}

            {scene.expect && (
              <div className={styles.expectGrid}>
                {scene.expect.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            )}

            {scene.verse && (
              <div className={styles.verseBlock}>
                <p className={styles.verseTamil} lang="ta">
                  {scene.verse.tamil}
                </p>
                <cite>
                  {scene.verse.reference} · {scene.verse.tamilReference}
                </cite>
              </div>
            )}

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
