import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { siteImages } from "../data/images";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1330%2063rd%20St%20Downers%20Grove%20IL%2060516";

const ministries = [
  {
    number: "i",
    title: "Worship",
    meta: "Tamil & English - Sundays",
    href: "/worship"
  },
  {
    number: "ii",
    title: "Sunday School - B.L.A.S.T.",
    meta: "Bible learning for kids and teens",
    href: "/grow/sunday-school"
  },
  {
    number: "iii",
    title: "Kids Circle",
    meta: "During Sunday worship",
    href: "/grow/kids-circle"
  },
  {
    number: "iv",
    title: "Bible Study & Prayer",
    meta: "Growing through God's Word",
    href: "/grow/bible-study-prayer"
  },
  {
    number: "v",
    title: "Fellowship Hour",
    meta: "Food, family, and friends",
    href: "/connect"
  },
  {
    number: "vi",
    title: "Care & Outreach",
    meta: "Prayer and community service",
    href: "/serve"
  }
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

      const count = Math.min(92, Math.round((window.innerWidth * window.innerHeight) / 21000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12 * dpr,
        vy: (-0.05 - Math.random() * 0.16) * dpr,
        radius: (Math.random() * 2 + 0.6) * dpr,
        alpha: Math.random() * 0.45 + 0.14,
        twinkle: Math.random() * Math.PI * 2
      }));
    };

    const draw = () => {
      if (!context) {
        return;
      }

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        if (mouseX > -9000) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < 90000 * dpr * dpr) {
            const force = 0.00015;
            particle.vx += dx * force;
            particle.vy += dy * force;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        particle.twinkle += 0.02;

        if (particle.y < -40) particle.y = height + 40;
        if (particle.y > height + 40) particle.y = -40;
        if (particle.x < -40) particle.x = width + 40;
        if (particle.x > width + 40) particle.x = -40;

        const twinkle = Math.sin(particle.twinkle) * 0.3 + 0.7;
        const size = particle.radius * 7 * twinkle;
        context.globalAlpha = particle.alpha * twinkle;
        context.drawImage(sprite, particle.x - size / 2, particle.y - size / 2, size, size);
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      animationFrame = window.requestAnimationFrame(draw);
    };

    const paintStaticField = () => {
      if (!context) {
        return;
      }

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      particles.forEach((particle) => {
        const size = particle.radius * 7;
        context.globalAlpha = particle.alpha;
        context.drawImage(sprite, particle.x - size / 2, particle.y - size / 2, size, size);
      });
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
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

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    const stageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-lit", entry.isIntersecting);
        });
      },
      { threshold: 0.36 }
    );

    resize();

    const cleanupCursorLoop = finePointer && !reduceMotion ? animateCursor() : undefined;

    if (finePointer) {
      window.addEventListener("mousemove", handlePointerMove);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateComet();

    if (reduceMotion) {
      paintStaticField();
      root.querySelectorAll(".josh-reveal, .josh-stage").forEach((element) => {
        element.classList.add("is-visible", "is-lit");
      });
    } else {
      draw();
      root.querySelectorAll(".josh-reveal").forEach((element) => revealObserver.observe(element));
      root.querySelectorAll(".josh-stage").forEach((element) => stageObserver.observe(element));
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
      revealObserver.disconnect();
      stageObserver.disconnect();
    };
  }, []);

  return (
    <div className="josh-home" ref={rootRef}>
      <canvas className="josh-field" ref={canvasRef} aria-hidden="true" />
      <div className="josh-vignette" aria-hidden="true" />
      <div className="josh-grain" aria-hidden="true" />
      <div className="josh-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="josh-spine" aria-hidden="true" />
      <div className="josh-comet" ref={cometRef} aria-hidden="true" />

      <div className="josh-hud josh-hud-status" aria-hidden="true">
        <span />
        Sunday - 12:30 - Downers Grove
      </div>
      <div className="josh-hud josh-hud-actions">
        <Link className="go" to="/visit">I'm New</Link>
      </div>

      <section className="josh-stage josh-stage-open josh-hero is-lit" id="open" aria-labelledby="home-title">
        <div className="josh-hero-copy">
          <span className="josh-kicker josh-hero-kicker">
            <span lang="ta">என்னிடத்தில் வாருங்கள்</span>
            <small>Matthew 11:28</small>
          </span>
          <h1 className="josh-hero-title" id="home-title">
            A Tamil church family in Chicagoland
          </h1>
          <p className="josh-hero-lede">
            New to church, new to the area, or visiting for the first time?
            We'll help you feel at home this Sunday.
          </p>
          <div className="josh-hero-details" aria-label="Sunday worship and location">
            <span>
              <CalendarDays size={18} aria-hidden="true" />
              Sunday Worship - 12:30 PM
            </span>
            <span>
              <MapPin size={18} aria-hidden="true" />
              1330 63rd St, Downers Grove, IL
            </span>
          </div>
          <div className="josh-hero-actions">
            <Link className="go" to="/visit">
              I'm New
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="josh-scrollcue" aria-hidden="true">
            <span />
            Follow the light
          </div>
        </div>

        <div className="josh-hero-visual" aria-label="Christ Tamil Church community">
          <svg className="josh-star" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <radialGradient id="josh-gl" cx="50%" cy="50%" r="50%">
                <stop stopColor="#8CC63F" stopOpacity=".36" />
                <stop offset="1" stopColor="#8CC63F" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="josh-ry" x1="100" y1="6" x2="100" y2="194" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EAF8D9" stopOpacity="0" />
                <stop offset=".5" stopColor="#8CC63E" />
                <stop offset="1" stopColor="#8CC63E" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="josh-rx" x1="6" y1="100" x2="194" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C7C8C9" stopOpacity="0" />
                <stop offset=".5" stopColor="#AEB0B2" stopOpacity=".82" />
                <stop offset="1" stopColor="#C7C8C9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill="url(#josh-gl)" />
            <g className="josh-star-spin">
              <path d="M100 12 L106 100 L100 188 L94 100 Z" fill="url(#josh-ry)" />
              <path d="M12 100 L100 95 L188 100 L100 105 Z" fill="url(#josh-rx)" opacity=".74" />
              <path d="M40 40 L100 96 L160 160 L100 104 Z" fill="url(#josh-ry)" opacity=".25" />
              <path d="M160 40 L104 100 L40 160 L96 100 Z" fill="url(#josh-ry)" opacity=".25" />
            </g>
            <circle className="josh-star-core" cx="100" cy="100" r="7" fill="#FAFFF2" />
          </svg>
          <img
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            width="900"
            height="660"
            style={{ objectPosition: siteImages.hero.objectPosition }}
          />
          <aside className="josh-hero-card" aria-label="Sunday worship details">
            <span>This Sunday</span>
            <strong>12:30 PM</strong>
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              Get directions
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      <section className="josh-stage" id="sunday" aria-labelledby="sunday-title">
        <span className="josh-node" aria-hidden="true" />
        <div className="josh-reveal">
          <span className="josh-kicker">Every Sunday</span>
          <h2 id="sunday-title">One weekly rhythm, <em>three lights.</em></h2>
        </div>
        <div className="josh-times josh-reveal" aria-label="Sunday gathering rhythm">
          <div className="josh-time">
            <strong>12<span>:</span>30</strong>
            <p>Worship - Tamil & English</p>
          </div>
          <div className="josh-time">
            <strong>Kids</strong>
            <p>Sunday School & Kids Circle</p>
          </div>
          <div className="josh-time">
            <strong>After</strong>
            <p>Fellowship - food & friends</p>
          </div>
        </div>
      </section>

      <section className="josh-stage" id="gather" aria-labelledby="gather-title">
        <span className="josh-node" aria-hidden="true" />
        <div className="josh-reveal">
          <span className="josh-kicker">Ways to belong</span>
          <h2 id="gather-title">Come for one thing. Stay for all of it.</h2>
        </div>
        <div className="josh-ministry-list josh-reveal">
          {ministries.map((ministry) => (
            <Link className="josh-ministry-row" to={ministry.href} key={ministry.title}>
              <span>{ministry.number}</span>
              <strong>{ministry.title}</strong>
              <small>{ministry.meta}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="josh-stage" id="mission" aria-labelledby="mission-title">
        <span className="josh-node" aria-hidden="true" />
        <div className="josh-mission-grid">
          <div className="josh-reveal">
            <span className="josh-kicker">
              <span lang="ta">எங்கள் நோக்கம்</span> - Our mission
            </span>
            <h2 id="mission-title">To be alive in Christ - together.</h2>
            <p>
              A Bible-based home for Tamil families across Chicago. To revive
              believers, live by love, and grow in a real relationship with Jesus.
            </p>
          </div>
          <div className="josh-verse josh-reveal">
            <blockquote>
              "Come to me, all you who are weary, and I will give you rest."
            </blockquote>
            <cite>Matthew 11:28</cite>
          </div>
        </div>
      </section>

      <section className="josh-stage josh-stage-visit" id="visit" aria-labelledby="visit-title">
        <div className="josh-reveal">
          <h2 className="josh-come" id="visit-title">Come <em>home.</em></h2>
          <div className="josh-door">
            <div className="josh-door-mark" aria-hidden="true">+</div>
            <p>
              <strong>1330 63rd St, Downers Grove, IL 60516</strong>
              <br />
              Free parking - everyone welcome - this Sunday, 12:30 PM
            </p>
            <div>
              <a className="go" href={directionsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
              <a href="mailto:ctcchicago@gmail.com">Email us</a>
            </div>
          </div>
          <div className="josh-endlinks">
            <a href="https://www.youtube.com/c/ChristTamilChurchChicago" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://www.facebook.com/ChristTamilChurchChicago" target="_blank" rel="noreferrer">Facebook</a>
            <a href="tel:+17739363697">(773) 936-3697</a>
            <Link to="/contact">Contact</Link>
          </div>
          <p className="josh-signoff">
            Christ Tamil Church - Chicago - <span lang="ta">வணக்கம்</span>
          </p>
        </div>
      </section>
    </div>
  );
}
