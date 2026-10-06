import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ministryPathways } from "../../data/ministryPathways";
import styles from "./FollowTheLight.module.css";

const SCENES = ministryPathways;

export default function FollowTheLight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      section.classList.add(styles.flat);
      sceneRefs.current.forEach((scene) => {
        scene?.classList.add(styles.on);
        scene?.removeAttribute("aria-hidden");
        scene?.removeAttribute("inert");
      });
      return;
    }

    // Passive scroll observation only: the browser drives scrolling and the
    // sticky pin natively (wheel, touch, keyboard, scrollbar drag all work
    // for free). This just reads scroll position and paints scene state —
    // it never blocks or redirects the native scroll gesture.
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - pin.offsetHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      const sceneCount = SCENES.length;
      const activeIndex = Math.min(
        sceneCount - 1,
        Math.max(0, Math.round(progress * Math.max(1, sceneCount - 1))),
      );

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;
        const isActive = index === activeIndex;
        scene.classList.toggle(styles.on, isActive);
        scene.classList.toggle(styles.past, index < activeIndex);
        scene.setAttribute("aria-hidden", String(!isActive));
        if (isActive) scene.removeAttribute("inert");
        else scene.setAttribute("inert", "");
      });

      if (auraRef.current) {
        auraRef.current.style.transform = `translate(-50%, -50%) scale(${(0.45 + progress).toFixed(3)})`;
        auraRef.current.style.opacity = (0.35 + progress * 0.5).toFixed(3);
      }

      if (barRef.current) {
        barRef.current.style.width = `${(progress * 100).toFixed(2)}%`;
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
    <section ref={sectionRef} className={styles.section} aria-label="Our life together">
      <div ref={pinRef} className={styles.pin}>
        <div ref={auraRef} className={styles.aura} aria-hidden="true" />

        {SCENES.map((scene, sceneIndex) => (
          <div
            key={scene.id}
            id={`pathway-${scene.id}`}
            ref={(element) => {
              sceneRefs.current[sceneIndex] = element;
            }}
            aria-hidden={sceneIndex !== 0}
            className={`${styles.scene}${sceneIndex === 0 ? ` ${styles.on}` : ""}`}
          >
            <div className={styles.marker}>
              <div className={styles.markerCopy}>
                <span className={styles.markerTamil} lang="ta">{scene.labelTa}</span>
              </div>
              <span className={styles.markerRule} aria-hidden="true" />
            </div>
            <h2 className={styles.headline}>
              {scene.words.map((word, wordIndex) => (
                <span
                  key={`${scene.id}-${word}-${wordIndex}`}
                  className={
                    wordIndex === scene.accentWord
                      ? `${styles.w} ${styles.accent}`
                      : styles.w
                  }
                >
                  {word}
                  {wordIndex < scene.words.length - 1 ? "\u00a0" : ""}
                </span>
              ))}
            </h2>
            <p className={styles.sub}>{scene.introduction}</p>

            <div className={styles.ribbon}>
              <ul className={styles.ribbonList} aria-label={`${scene.labelEn} ministries`}>
                {scene.ministries.map((ministry) => (
                  <li key={ministry.name}>
                    <span>{ministry.name}</span>
                  </li>
                ))}
              </ul>
              <Link className={styles.pathwayCta} to={scene.cta.href}>
                {scene.cta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}

        <div className={styles.bar} aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
