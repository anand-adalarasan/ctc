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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cometRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const heroSection = heroSectionRef.current;

    if (!heroSection) {
      return;
    }

    // Watch the whole hero section, not just the card — on phones where the
    // hero's content is taller than the viewport, the card can sit below the
    // fold before the user has scrolled at all, which would show the FAB
    // prematurely if we only watched the card itself.
    const observer = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { rootMargin: "0px" }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    const comet = cometRef.current;

    if (!root || !canvas || !cursor || !comet) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let cursorFrame = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let mouseX = -9999;
    let mouseY = -9999;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      twinkle: number;
    };

    let particles: Particle[] = [];
    const sprite = document.createElement("canvas");
    const spriteRadius = 40;
    sprite.width = spriteRadius * 2;
    sprite.height = spriteRadius * 2;
    const spriteContext = sprite.getContext("2d");

    if (spriteContext) {
      const gradient = spriteContext.createRadialGradient(
        spriteRadius,
        spriteRadius,
        0,
        spriteRadius,
        spriteRadius,
        spriteRadius
      );
      gradient.addColorStop(0, "rgba(140, 198, 62, 0.78)");
      gradient.addColorStop(0.42, "rgba(140, 198, 62, 0.24)");
      gradient.addColorStop(1, "rgba(140, 198, 62, 0)");
      spriteContext.fillStyle = gradient;
      spriteContext.beginPath();
      spriteContext.arc(spriteRadius, spriteRadius, spriteRadius, 0, Math.PI * 2);
      spriteContext.fill();
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth * dpr;
      height = window.innerHeight * dpr;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const count = Math.min(72, Math.round((window.innerWidth * window.innerHeight) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1 * dpr,
        vy: (-0.045 - Math.random() * 0.12) * dpr,
        radius: (Math.random() * 1.6 + 0.55) * dpr,
        alpha: Math.random() * 0.3 + 0.12,
        twinkle: Math.random() * Math.PI * 2
      }));
    };

    const paint = (animate: boolean) => {
      if (!context) {
        return;
      }

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        if (animate && mouseX > -9000) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < 90000 * dpr * dpr) {
            const force = 0.00012;
            particle.vx += dx * force;
            particle.vy += dy * force;
          }
        }

        if (animate) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.992;
          particle.vy *= 0.992;
          particle.twinkle += 0.02;

          if (particle.y < -40) particle.y = height + 40;
          if (particle.y > height + 40) particle.y = -40;
          if (particle.x < -40) particle.x = width + 40;
          if (particle.x > width + 40) particle.x = -40;
        }

        const twinkle = animate ? Math.sin(particle.twinkle) * 0.3 + 0.7 : 1;
        const size = particle.radius * 7 * twinkle;
        context.globalAlpha = particle.alpha * twinkle;
        context.drawImage(sprite, particle.x - size / 2, particle.y - size / 2, size, size);
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    };

    const draw = () => {
      paint(true);
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: MouseEvent) => {
      mouseX = event.clientX * dpr;
      mouseY = event.clientY * dpr;
      cursor.style.opacity = "1";
    };

    const animateCursor = () => {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const handleMove = (event: MouseEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;
      };

      window.addEventListener("mousemove", handleMove);

      const loop = () => {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
        cursorFrame = window.requestAnimationFrame(loop);
      };

      loop();

      return () => window.removeEventListener("mousemove", handleMove);
    };

    const updateComet = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      comet.style.transform = `translateY(${progress * window.innerHeight}px)`;
      root.style.setProperty("--ctc-rail-progress", `${progress * 100}%`);
    };

    let scrollTicking = false;
    const handleScroll = () => {
      if (scrollTicking) {
        return;
      }

      scrollTicking = true;
      window.requestAnimationFrame(() => {
        updateComet();
        scrollTicking = false;
      });
    };

    resize();
    updateComet();
    const cleanupCursorLoop = finePointer && !reduceMotion ? animateCursor() : undefined;

    if (finePointer && !reduceMotion) {
      window.addEventListener("mousemove", handlePointerMove);
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (reduceMotion) {
      paint(false);
    } else {
      draw();
    }

    const handleVisibilityChange = () => {
      if (reduceMotion) {
        return;
      }

      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        running = false;
      } else if (!running) {
        running = true;
        draw();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(cursorFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cleanupCursorLoop?.();
    };
  }, []);

  return (
    <>
      <StickySundayBar visible={showFab} />
      <div className="ctc-light-shell" ref={rootRef}>
      <canvas className="ctc-field" ref={canvasRef} aria-hidden="true" />
      <div className="ctc-vignette" aria-hidden="true" />
      <div className="ctc-grain" aria-hidden="true" />
      <div className="ctc-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="ctc-spine" aria-hidden="true" />
      <div className="ctc-comet" ref={cometRef} aria-hidden="true" />

      <div className="ctc-home">
      <section
        className="ctc-stage ctc-stage-open ctc-hero is-lit"
        id="open"
        aria-labelledby="home-title"
        ref={heroSectionRef}
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
      </div>

      <FollowTheLight />
      </div>

    </>
  );
}
