import { ArrowRight, CalendarDays, MapPin, PlayCircle, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { siteImages } from "../data/images";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1330%2063rd%20St%20Downers%20Grove%20IL%2060516";

const gatewayTiles = [
  {
    number: "01",
    title: "Visit",
    text: "Get to know our church family",
    href: "/visit"
  },
  {
    number: "02",
    title: "Worship",
    text: "Join us this Sunday",
    href: "/worship"
  },
  {
    number: "03",
    title: "Connect",
    text: "Events and fellowship",
    href: "/connect"
  },
  {
    number: "04",
    title: "Grow",
    text: "Bible study, sermons, and kids",
    href: "/grow"
  },
  {
    number: "05",
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

export default function Home() {
  return (
    <section className="home-cinematic" aria-labelledby="home-hero-title">
      <div className="home-hero-hub">
        <div className="home-hero-message">
          <span className="home-kicker hero-label">Christ Tamil Church</span>
          <h1 className="home-hero-title hero-title" id="home-hero-title">
            Rooted in Christ.
            <span>United in Love.</span>
            <span>Sent to Serve.</span>
          </h1>
          <p className="home-hero-lede hero-copy">
            A Tamil Christian church family gathering for worship, God's Word,
            prayer, fellowship, and service in the love of Christ.
          </p>

          <div className="home-hero-actions hero-actions">
            <Link className="button primary" to="/visit">
              Plan Your Visit
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button secondary" to="/sermons">
              <PlayCircle size={18} aria-hidden="true" />
              Watch Worship
            </Link>
          </div>

          <div className="home-service-strip" aria-label="Sunday worship and location">
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

        <div className="home-hero-visual cinematic-visual hero-visual">
          <div className="home-hero-photo">
            <img
              src={siteImages.hero.src}
              alt={siteImages.hero.alt}
              width="980"
              height="760"
              style={{ objectPosition: siteImages.hero.objectPosition }}
            />
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

          <aside className="home-floating-card verse" aria-label="Verse of the day">
            <Quote size={18} aria-hidden="true" />
            <p>Let all that you do be done in love.</p>
            <span>1 Corinthians 16:14</span>
          </aside>
        </div>
      </div>

      <nav className="home-gateway" aria-label="Homepage gateways">
        {gatewayTiles.map((tile) => (
          <Link className="home-gateway-tile" to={tile.href} key={tile.title}>
            <span>{tile.number}</span>
            <strong>{tile.title}</strong>
            <p>{tile.text}</p>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </section>
  );
}

