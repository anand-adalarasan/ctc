import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Church,
  Clock,
  Coffee,
  HeartHandshake,
  MapPin,
  Phone,
  Users
} from "lucide-react";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1330%2063rd%20St%20Downers%20Grove%20IL%2060516";

const visitEssentials = [
  {
    title: "Sunday Worship",
    text: "Join us every Sunday for worship, Bible teaching, prayer, and fellowship.",
    detail: "Sunday at 12:30 PM",
    icon: CalendarDays
  },
  {
    title: "Location",
    text: "We gather in Downers Grove and would love to welcome you in person.",
    detail: "1330 63rd St, Downers Grove, IL 60516",
    icon: MapPin
  },
  {
    title: "Contact",
    text: "Reach out with questions, prayer requests, or help planning your visit.",
    detail: "(773) 936-3697",
    icon: Phone
  }
];

const visitSteps = [
  {
    title: "Attend Worship",
    text: "Join the church family for Sunday worship centered on Christ.",
    href: "/worship",
    icon: Church
  },
  {
    title: "Bring Your Family",
    text: "Children, youth, parents, and elders are welcome in our church family.",
    href: "/grow",
    icon: Users
  },
  {
    title: "Join Fellowship",
    text: "Stay after worship for conversation, encouragement, and community.",
    href: "/connect",
    icon: Coffee
  },
  {
    title: "Ask for Prayer",
    text: "Send a confidential prayer request or contact the church office.",
    href: "/contact",
    icon: HeartHandshake
  }
];

export default function Visit() {
  return (
    <>
      <section className="visit-hero" aria-labelledby="visit-title">
        <div className="visit-hero-copy">
          <span className="home-section-label">Visit</span>
          <h1 id="visit-title">Plan your Sunday with Christ Tamil Church.</h1>
          <p>
            Find worship details, directions, children's ministry information,
            and what to expect when you join us.
          </p>
          <div className="visit-hero-actions">
            <a className="button primary" href={directionsUrl} target="_blank" rel="noreferrer">
              Get Directions
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <Link className="button secondary" to="/contact">
              Ask a Question
            </Link>
          </div>
        </div>

        <aside className="visit-hero-card" aria-label="Sunday visit details">
          <span className="visit-card-icon" aria-hidden="true">
            <CalendarDays size={24} />
          </span>
          <h2>Sunday Worship</h2>
          <div className="visit-hero-details">
            <span>
              <Clock size={18} aria-hidden="true" />
              12:30 PM
            </span>
            <span>
              <MapPin size={18} aria-hidden="true" />
              1330 63rd St, Downers Grove, IL 60516
            </span>
            <span>
              <Coffee size={18} aria-hidden="true" />
              Fellowship after service
            </span>
          </div>
        </aside>
      </section>

      <section className="visit-section visit-arrive" aria-labelledby="visit-arrive-title">
        <div className="visit-section-heading">
          <span className="home-section-label">Before You Arrive</span>
          <h2 id="visit-arrive-title">A simple guide for your first visit</h2>
          <p>
            The essentials are easy to find: when we meet, where to go, and how
            to reach us before Sunday.
          </p>
        </div>
        <div className="visit-essential-grid">
          {visitEssentials.map((item) => {
            const Icon = item.icon;

            return (
              <article className="visit-essential-card" key={item.title}>
                <span className="visit-card-icon" aria-hidden="true">
                  <Icon size={21} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <strong>{item.detail}</strong>
              </article>
            );
          })}
        </div>
      </section>

      <section className="visit-gathering" aria-labelledby="visit-gathering-title">
        <a
          className="visit-map-panel"
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Christ Tamil Church location in Google Maps"
        >
          <MapPin size={30} aria-hidden="true" />
          <span>Open map and directions</span>
        </a>
        <div className="visit-gathering-copy">
          <span className="home-section-label">Sunday Gathering</span>
          <h2>Worship, children, and fellowship in one weekly rhythm.</h2>
          <p>
            Come as you are. Families are welcome, children can participate in
            age-appropriate ministry, and fellowship continues after worship.
          </p>
          <Link className="button primary" to="/worship">
            Learn About Worship
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="visit-section visit-next" aria-labelledby="visit-next-title">
        <div className="visit-section-heading">
          <span className="home-section-label">Next Steps</span>
          <h2 id="visit-next-title">After you visit, find your place to belong</h2>
        </div>
        <div className="visit-next-grid">
          {visitSteps.map((step) => {
            const Icon = step.icon;

            return (
              <Link className="visit-next-card" key={step.title} to={step.href}>
                <span className="visit-card-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ArrowRight className="visit-card-arrow" size={16} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
