import {
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import FollowTheLight from "../components/FollowTheLight/FollowTheLight";
import { siteImages } from "../data/images";
import { churchInfo, verseOfTheWeek } from "../data/site";

function WeeklyVerse({ className = "" }: { className?: string }) {
  return (
    <blockquote
      className={`ctc-hero-weekly-verse ${className}`.trim()}
      aria-label={`${verseOfTheWeek.label}: ${verseOfTheWeek.text} — ${verseOfTheWeek.reference}`}
    >
      <span>{verseOfTheWeek.label}</span>
      <i aria-hidden="true">·</i>
      <p>“{verseOfTheWeek.text}”</p>
      <i aria-hidden="true">·</i>
      <cite>{verseOfTheWeek.reference}</cite>
    </blockquote>
  );
}

function StickySundayBar({ visible }: { visible: boolean }) {
  if (!visible) {
    return null;
  }

  return createPortal(
    <div className="ctc-sunday-fab">
      <div className="ctc-sunday-fab-time">
        <span>Sun</span>
        <strong>{churchInfo.worship.time}</strong>
      </div>
      <a
        className="ctc-sunday-fab-directions"
        href={churchInfo.address.directionsUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Get directions — Sunday service at ${churchInfo.worship.time}`}
      >
        <MapPin size={18} aria-hidden="true" />
      </a>
    </div>,
    document.body
  );
}

export default function Home() {
  const spineRef = useRef<HTMLDivElement | null>(null);
  const cometRef = useRef<HTMLDivElement | null>(null);
  // The hero is Follow the Light's opening chapter; the Sunday FAB appears
  // once any later chapter (or the footer) is the one in view.
  const [showFab, setShowFab] = useState(false);
  const homeRef = useRef<HTMLDivElement | null>(null);

  // The homepage header floats over Follow the Light; publish its real
  // height so every chapter is centred in the space below it.
  useEffect(() => {
    const home = homeRef.current;
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!home || !header) return;

    const apply = () => home.style.setProperty("--ftl-top-inset", `${header.offsetHeight}px`);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Comet + light-rail fill track overall page scroll. Writes go to the rail
  // elements themselves (never an ancestor), so a scroll frame restyles
  // nothing else on the page.
  useEffect(() => {
    const spine = spineRef.current;
    const comet = cometRef.current;
    if (!spine || !comet) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
      comet.style.transform = `translate3d(0, ${(progress * window.innerHeight).toFixed(1)}px, 0)`;
      spine.style.setProperty("--ctc-rail-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const hero = (
      <section
        className="ctc-stage ctc-stage-open ctc-hero is-lit"
        id="open"
        aria-labelledby="home-title"
      >
        <picture>
          <source media="(max-width: 620px)" srcSet={siteImages.heroBackgroundMobile.src} />
          <img
            className="ctc-hero-bg"
            src={siteImages.heroBackground.src}
            alt=""
            aria-hidden="true"
            width="1672"
            height="941"
            style={{ objectPosition: siteImages.heroBackground.objectPosition }}
          />
        </picture>
        <div className="ctc-hero-bg-wash" aria-hidden="true" />
        <div className="ctc-hero-copy">
          <h1 className="ctc-hero-title" id="home-title" lang="ta">
            <span className="ctc-hero-title-accent">வாரும்,</span>
            <span>நாம் எல்லோரும் கூடி,</span>
            <span>மகிழ் கொண்டாடுவோம்</span>
          </h1>
          <p className="ctc-hero-lede">
            Join us this Sunday. We’d love to welcome you and your family.
          </p>
          <div className="ctc-hero-actions">
            <Link className="go" to="/visit">
              I'm New
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="ctc-hero-visual">
          <aside className="ctc-hero-card" aria-label="Sunday worship details">
            <div className="ctc-hero-card-info">
              <span>This Sunday</span>
              <strong>{churchInfo.worship.time}</strong>
            </div>
            <a href={churchInfo.address.directionsUrl} target="_blank" rel="noreferrer">
              Get directions
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </aside>
        </div>
        <WeeklyVerse className="ctc-hero-weekly-verse-ribbon" />
      </section>
  );

  return (
    <>
      <StickySundayBar visible={showFab} />
      <div className="ctc-light-shell">
      <div className="ctc-spine" ref={spineRef} aria-hidden="true" />
      <div className="ctc-comet" ref={cometRef} aria-hidden="true" />

      <div className="ctc-home" ref={homeRef}>
        <FollowTheLight
          opening={{ labelTa: "வணக்கம்", labelEn: "Welcome", content: hero }}
          onActiveChange={(index) => setShowFab(index > 0)}
        />
      </div>
      </div>
    </>
  );
}
