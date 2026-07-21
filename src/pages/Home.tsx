import {
  ArrowRight,
  BookOpen,
  Church,
  Coffee,
  HandHeart,
  Music,
  Users
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FollowTheLight from "../components/FollowTheLight/FollowTheLight";
import SectionHeader from "../components/SectionHeader";
import ThreeLights from "../components/ThreeLights/ThreeLights";
import { siteImages } from "../data/images";
import { churchInfo, verseOfTheWeek } from "../data/site";

function WeeklyVerse({ className = "" }: { className?: string }) {
  return (
    <blockquote
      className={`josh-hero-weekly-verse ${className}`.trim()}
      aria-label={`${verseOfTheWeek.label}: ${verseOfTheWeek.text} — ${verseOfTheWeek.reference}`}
    >
      <span>{verseOfTheWeek.label}</span>
      <p>“{verseOfTheWeek.text}”</p>
      <cite>{verseOfTheWeek.reference}</cite>
    </blockquote>
  );
}

const expectItems = [
  {
    kicker: "About 90 min",
    title: "Worship",
    text: "Praise, prayer, and the Word — in Tamil and English."
  },
  {
    kicker: "No dress code",
    title: "Come as you are",
    text: "Wear whatever's comfortable. You'll fit right in."
  },
  {
    kicker: "Free & easy",
    title: "Parking",
    text: "Free parking right at the church. Just come on in."
  },
  {
    kicker: "Kids welcome",
    title: "Your children",
    text: "Sunday School (B.L.A.S.T.) & Kids Circle during service."
  }
];

const ministryRows = [
  { title: "Worship", meta: "Tamil & English · Sundays", href: "/worship", icon: Music },
  { title: "Sunday School · B.L.A.S.T.", meta: "Bible Learning & Spiritual Training", href: "/grow/sunday-school", icon: BookOpen },
  { title: "Kids Circle", meta: "For our littlest ones", href: "/grow/kids-circle", icon: Users },
  { title: "Bible Study & Prayer", meta: "Wednesdays · 7:30 PM", href: "/grow/bible-study-prayer", icon: Church },
  { title: "Fellowship Hour", meta: "Food & friends", href: "/connect", icon: Coffee },
  { title: "Community Outreach", meta: "Serving Chicagoland", href: "/serve", icon: HandHeart }
];

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cometRef = useRef<HTMLDivElement | null>(null);

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
      root.style.setProperty("--josh-rail-progress", `${progress * 100}%`);
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
      <div className="josh-light-shell" ref={rootRef}>
      <canvas className="josh-field" ref={canvasRef} aria-hidden="true" />
      <div className="josh-vignette" aria-hidden="true" />
      <div className="josh-grain" aria-hidden="true" />
      <div className="josh-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="josh-spine" aria-hidden="true" />
      <div className="josh-comet" ref={cometRef} aria-hidden="true" />

      <div className="josh-home">
      <section className="josh-stage josh-stage-open josh-hero is-lit" id="open" aria-labelledby="home-title">
        <picture>
          <source media="(max-width: 620px)" srcSet={siteImages.heroBackgroundMobile.src} />
          <img
            className="josh-hero-bg"
            src={siteImages.heroBackground.src}
            alt=""
            aria-hidden="true"
            width="1672"
            height="941"
            style={{ objectPosition: siteImages.heroBackground.objectPosition }}
          />
        </picture>
        <div className="josh-hero-bg-wash" aria-hidden="true" />
        <div className="josh-hero-copy">
          <span className="josh-kicker josh-hero-kicker">
            <span lang="ta">என்னிடத்தில் வாருங்கள்</span>
            <small>Matthew 11:28</small>
          </span>
          <h1 className="josh-hero-title" id="home-title">
            A Tamil church in Chicagoland
          </h1>
          <p className="josh-hero-lede">
            New to church, new to the area, or visiting for the first time?
            We'll help you feel at home this Sunday.
          </p>
          <WeeklyVerse className="josh-hero-weekly-verse-inline" />
          <div className="josh-hero-actions">
            <Link className="go" to="/visit">
              I'm New
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="josh-hero-visual">
          <WeeklyVerse className="josh-hero-weekly-verse-image" />
          <aside className="josh-hero-card" aria-label="Sunday worship details">
            <span>This Sunday</span>
            <strong>{churchInfo.worship.time}</strong>
            <a href={churchInfo.address.directionsUrl} target="_blank" rel="noreferrer">
              Get directions
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>
      </div>

      <FollowTheLight />
      </div>

      {false && (
        <>

      <section className="section home-teaser-expect">
        <SectionHeader
          eyebrow="First time? · முதல் முறையா?"
          title="Here's what a Sunday looks like."
          text="No surprises, no pressure — just a warm welcome for you and your family."
        />
        <div className="home-teaser-expect-grid">
          {expectItems.map((item) => (
            <article className="home-teaser-expect-card" key={item.title}>
              <span className="home-teaser-kicker">{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link className="button primary" to="/visit">
          Plan your visit
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>

      <ThreeLights />

      <section className="section home-teaser-ministries">
        <SectionHeader
          eyebrow="Ways to belong"
          title="Come for one thing. Stay for all of it."
          text="A church family grows through worship, study, fellowship, and service."
        />
        <div className="home-teaser-ministry-list">
          {ministryRows.map((row, index) => {
            const Icon = row.icon;

            return (
              <Link className="home-teaser-ministry-row" key={row.title} to={row.href}>
                <span className="home-teaser-ministry-index">{String(index + 1).padStart(2, "0")}</span>
                <Icon className="home-teaser-ministry-icon" size={18} aria-hidden="true" />
                <span className="home-teaser-ministry-title">{row.title}</span>
                <span className="home-teaser-ministry-meta">{row.meta}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section home-teaser-mission">
        <div className="home-teaser-mission-grid">
          <div>
            <SectionHeader eyebrow="எங்கள் நோக்கம் · Our mission" title="To be alive in Christ — together." />
            <p className="home-teaser-mission-text">
              Our goal is to revive believers, to live by love, and to provide a
              Bible-based home church for Tamil families across the Chicago
              area — to worship and grow in a real relationship with Jesus.
            </p>
            <Link className="button secondary" to="/faith">
              Read our statement of faith
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <blockquote className="home-teaser-verse">
            <p>"Come to me, all you who are weary, and I will give you rest."</p>
            <cite>Matthew 11:28</cite>
          </blockquote>
        </div>
      </section>
        </>
      )}
    </>
  );
}
