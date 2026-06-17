import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Church,
  HandHeart,
  HeartHandshake,
  Home as HomeIcon,
  MapPin,
  PlayCircle,
  Sparkles,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { siteImages } from "../data/images";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1330%2063rd%20St%20Downers%20Grove%20IL%2060516";

const gatewayTiles = [
  {
    icon: MapPin,
    title: "Visit",
    text: "Get to know our church family",
    href: "/visit"
  },
  {
    icon: Church,
    title: "Worship",
    text: "Join us this Sunday",
    href: "/worship"
  },
  {
    icon: Users,
    title: "Connect",
    text: "Events and fellowship",
    href: "/connect"
  },
  {
    icon: BookOpen,
    title: "Grow",
    text: "Bible study, sermons, and kids",
    href: "/grow"
  },
  {
    icon: HandHeart,
    title: "Serve",
    text: "Community outreach",
    href: "/serve"
  }
];

const serviceDetails = [
  {
    label: "Sunday Worship",
    value: "12:30 PM",
    icon: CalendarDays
  },
  {
    label: "Location",
    value: "1330 63rd St, Downers Grove, IL 60516",
    icon: MapPin
  }
];

const welcomeChips = [
  "Christ-centered worship",
  "Tamil Christian fellowship",
  "Family & community"
];

const placeBlocks = [
  {
    title: "For Families",
    text: "A warm place for children, youth, parents, and elders to worship and grow together.",
    icon: Users
  },
  {
    title: "For New Visitors",
    text: "A simple, friendly path to learn about the church, join worship, and feel at home.",
    icon: HomeIcon
  },
  {
    title: "For Every Season",
    text: "A community for prayer, encouragement, fellowship, and spiritual growth.",
    icon: Sparkles
  }
];

const visitorSteps = [
  {
    title: "Arrive",
    text: "Come as you are. We'll welcome you."
  },
  {
    title: "Worship",
    text: "Experience uplifting worship and biblical teaching."
  },
  {
    title: "Connect",
    text: "Meet our team and find your place."
  }
];

export default function Home() {
  const welcomeRef = useRevealOnScroll<HTMLElement>({ staggerChildren: true });
  const placeForYouRef = useRevealOnScroll<HTMLElement>({ staggerChildren: true });
  const visitorRef = useRevealOnScroll<HTMLElement>({ staggerChildren: true });

  return (
    <>
      <section className="home-cinematic" aria-labelledby="home-hero-title">
        <img
          className="home-cinematic-bg"
          src={siteImages.hero.src}
          alt=""
          width="1800"
          height="1100"
          aria-hidden="true"
          style={{ objectPosition: siteImages.hero.objectPosition }}
        />
        <div className="home-hero-hub">
          <div className="home-hero-message">
            <span className="home-kicker hero-label">Welcome to Christ Tamil Church</span>
            <h1 className="home-hero-title hero-title" id="home-hero-title">
              A Tamil church family rooted in Christ, love, and community
            </h1>
            <p className="home-hero-lede hero-copy">
              Join us for worship, God's Word, prayer, and fellowship as we grow
              together as one family in Christ.
            </p>
            <p className="home-identity-line hero-identity">
              Rooted in Christ. United in Love. Sent to Serve.
            </p>

            <div className="home-hero-actions hero-actions">
              <Link className="button primary" to="/visit">
                Plan Your Visit
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button secondary" to="/sermons">
                <PlayCircle size={18} aria-hidden="true" />
                Watch Online
              </Link>
            </div>

            <div className="home-service-strip hero-details" aria-label="Sunday worship and location">
              {serviceDetails.map((item) => {
                const DetailIcon = item.icon;

                return (
                  <div className="home-service-detail" key={item.label}>
                    <span className="home-service-icon" aria-hidden="true">
                      <DetailIcon size={17} strokeWidth={2} />
                    </span>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="home-floating-card worship" aria-label="Sunday worship details">
            <span>Sunday Worship</span>
            <strong>12:30 PM</strong>
            <p>1330 63rd St, Downers Grove, IL</p>
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              Get Directions
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      <nav className="home-gateway reveal-stagger" aria-label="Homepage gateways">
        {gatewayTiles.map((tile) => {
          const GatewayIcon = tile.icon;

          return (
            <Link className="home-gateway-tile" to={tile.href} key={tile.title}>
              <span className="home-gateway-icon" aria-hidden="true">
                <GatewayIcon size={20} strokeWidth={1.9} />
              </span>
              <strong>{tile.title}</strong>
              <p>{tile.text}</p>
              <ArrowRight className="home-gateway-arrow" size={16} aria-hidden="true" />
            </Link>
          );
        })}
      </nav>

      <section
        className="home-welcome-addition reveal"
        aria-labelledby="home-welcome-title"
        ref={welcomeRef}
      >
        <div className="home-welcome-addition-inner">
          <div className="home-welcome-photo" data-reveal-child>
            <img
              src={siteImages.worship.src}
              alt={siteImages.worship.alt}
              width="760"
              height="570"
              loading="lazy"
              style={{ objectPosition: siteImages.worship.objectPosition }}
            />
          </div>
          <div className="home-welcome-content">
            <span className="home-section-label" data-reveal-child>Welcome Home</span>
            <h2 id="home-welcome-title" data-reveal-child>Welcome to Christ Tamil Church</h2>
            <p data-reveal-child>
              Christ Tamil Church is a Christ-centered Tamil Christian church family
              where people gather for worship, God's Word, prayer, fellowship, and
              service. Whether you are new to faith, new to the area, or looking for
              a church home, we would love to welcome you.
            </p>
            <div className="home-chip-list" aria-label="Church welcome highlights">
              {welcomeChips.map((chip) => (
                <span key={chip} data-reveal-child>{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-place-for-you reveal"
        aria-labelledby="home-place-for-you-title"
        ref={placeForYouRef}
      >
        <div className="home-section-intro">
          <span className="home-section-label" data-reveal-child>Belong Here</span>
          <h2 id="home-place-for-you-title" data-reveal-child>
            A place for every generation to belong and grow
          </h2>
          <p data-reveal-child>
            From children and youth to parents, adults, and elders, Christ Tamil
            Church is a family where every season of life is valued. Come as you
            are, grow in Christ, and walk with a church family that prays,
            encourages, and serves together.
          </p>
        </div>
        <div className="home-welcome-blocks">
          {placeBlocks.map((block) => {
            const BlockIcon = block.icon;

            return (
              <article className="home-welcome-block" key={block.title} data-reveal-child>
                <span aria-hidden="true">
                  <BlockIcon size={20} strokeWidth={2} />
                </span>
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="home-first-visit reveal"
        aria-labelledby="home-first-visit-title"
        ref={visitorRef}
      >
        <div className="home-first-visit-panel" data-reveal-child>
          <div className="home-first-visit-intro">
            <span className="home-section-label" data-reveal-child>First-Time Visitor</span>
            <h2 id="home-first-visit-title" data-reveal-child>Visiting for the first time?</h2>
            <p data-reveal-child>
              We'd love to meet you. Here's what you can expect when you visit.
            </p>
          </div>
          <div className="home-visitor-step-list">
            {visitorSteps.map((step, index) => (
              <article className="home-visitor-step" key={step.title} data-reveal-child>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <Link className="button primary" to="/visit" data-reveal-child>
            Plan Your Visit
            <HeartHandshake size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

