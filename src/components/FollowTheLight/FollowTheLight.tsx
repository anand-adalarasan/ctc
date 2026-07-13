import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ministryPathways } from "../../data/ministryPathways";
import styles from "./FollowTheLight.module.css";

const SCENES = ministryPathways;

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
    let wheelHandoffInProgress = false;
    let wheelHandoffTimer = 0;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      let progress = total > 0 ? -rect.top / total : 0;
      progress = Math.min(1, Math.max(0, progress));

      const sceneCount = SCENES.length;
      const activeIndex = Math.min(sceneCount - 1, Math.max(0, Math.floor(progress * sceneCount)));

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;
        scene.classList.toggle(styles.on, index === activeIndex);
        scene.classList.toggle(styles.past, index < activeIndex);
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

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const direction = Math.sign(event.deltaY);
      const approachingFromHero = direction > 0 && rect.top > 0 && rect.top <= window.innerHeight * 1.25;
      const sectionIsPinned = rect.top <= 1 && rect.bottom >= window.innerHeight;

      if (!approachingFromHero && !sectionIsPinned) return;

      if (wheelHandoffInProgress) {
        event.preventDefault();
        return;
      }

      const sectionTop = window.scrollY + rect.top;
      let targetTop: number | null = approachingFromHero ? sectionTop : null;

      if (sectionIsPinned) {
        const progress = Math.min(1, Math.max(0, -rect.top / total));
        const activeIndex = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length));
        const targetIndex = activeIndex + direction;

        if (targetIndex >= 0 && targetIndex < SCENES.length) {
          const sceneProgress = targetIndex / SCENES.length;
          targetTop = sectionTop + total * sceneProgress + (targetIndex > 0 ? 2 : 0);
        }
      }

      if (targetTop === null) return;

      event.preventDefault();
      wheelHandoffInProgress = true;
      window.scrollTo({ top: targetTop, behavior: "smooth" });

      window.clearTimeout(wheelHandoffTimer);
      wheelHandoffTimer = window.setTimeout(() => {
        wheelHandoffInProgress = false;
      }, 700);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    update();

    return () => {
      window.clearTimeout(wheelHandoffTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Our life together">
      <div className={styles.pin}>
        <div ref={auraRef} className={styles.aura} aria-hidden="true" />

        {SCENES.map((scene, sceneIndex) => (
          <div
            key={scene.id}
            id={`pathway-${scene.id}`}
            ref={(element) => {
              sceneRefs.current[sceneIndex] = element;
            }}
            className={`${styles.scene}${sceneIndex === 0 ? ` ${styles.on}` : ""}`}
          >
            <span className={styles.eyebrow}>{scene.label}</span>
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
              <ul className={styles.ribbonList} aria-label={`${scene.label} ministries`}>
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
