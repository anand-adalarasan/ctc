import { Link } from "react-router-dom";
import { PlayCircle, type LucideIcon } from "lucide-react";
import { siteImages } from "../data/images";
import { churchEvents, ministries, sermons } from "../data/site";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1330%2063rd%20St%20Downers%20Grove%20IL%2060516";

const serviceEssentials = [
  {
    title: "Sunday Worship",
    text: "10:30 AM"
  },
  {
    title: "Location",
    text: "1330 63rd St, Downers Grove, IL"
  },
  {
    title: "Families",
    text: "Sunday School and Kids Circle available"
  }
];

const welcomeChips = [
  "Christ-centered worship",
  "Tamil Christian fellowship",
  "Family and community"
];

const visitorSteps = [
  {
    title: "Arrive",
    text: "Come as you are. We will help you find your way in."
  },
  {
    title: "Worship",
    text: "Join the church family for worship, prayer, and God's Word."
  },
  {
    title: "Connect",
    text: "Stay after service for fellowship and a warm welcome."
  }
];

type HomeMinistry = {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

const isHomeMinistry = (ministry: HomeMinistry | undefined): ministry is HomeMinistry =>
  Boolean(ministry);

export default function Home() {
  const homeEventPreview = churchEvents.filter((event) => event.showOnHome).slice(0, 3);
  const featuredEvent =
    homeEventPreview.find((event) => event.homeFeatured) ?? homeEventPreview[0];
  const supportingEvents = homeEventPreview
    .filter((event) => event !== featuredEvent)
    .slice(0, 2);
  const latestSermon = sermons[0];
  const ministryPreview: HomeMinistry[] = ([
    ministries.find((ministry) => ministry.title === "Sunday School"),
    ministries.find((ministry) => ministry.title === "Kids Circle"),
    ministries.find((ministry) => ministry.title === "Bible Study"),
    ministries.find((ministry) => ministry.title === "Prayer")
  ] as Array<HomeMinistry | undefined>).filter(isHomeMinistry);

  const homeEvents = [featuredEvent, ...supportingEvents].filter(Boolean);

  return (
    <>
      <section className="home-hero section--main" aria-labelledby="home-hero-title">
        <div className="home-hero-copy">
          <span className="home-label">Welcome to Christ Tamil Church</span>
          <h1 id="home-hero-title">
            A Tamil church family rooted in Christ, love, and community
          </h1>
          <p>
            Join us for worship, God's Word, prayer, and fellowship as we grow
            together as one family in Christ.
          </p>
          <div className="home-hero-actions">
            <Link className="button primary" to="/visit">
              Plan Your Visit
            </Link>
            <Link className="button secondary" to="/sermons">
              <PlayCircle size={18} aria-hidden="true" />
              Watch Online
            </Link>
          </div>
          <p className="home-reassurance">
            Tamil worship <span aria-hidden="true">|</span> Families welcome{" "}
            <span aria-hidden="true">|</span> Sunday School available
          </p>
        </div>

        <div className="home-hero-visual">
          <img
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            width="900"
            height="780"
            style={{ objectPosition: siteImages.hero.objectPosition }}
          />
          <aside className="home-worship-card" aria-label="Sunday worship details">
            <span>Sunday Worship</span>
            <strong>10:30 AM</strong>
            <p>1330 63rd St, Downers Grove, IL</p>
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </aside>
        </div>
      </section>

      <section className="home-service-band section--main" aria-labelledby="home-service-title">
        <h2 className="sr-only" id="home-service-title">Service essentials</h2>
        {serviceEssentials.map((item) => (
          <div className="home-service-item" key={item.title}>
            <span>{item.title}</span>
            <h3>{item.text}</h3>
          </div>
        ))}
      </section>

      <section className="home-welcome-section section--white" aria-labelledby="home-welcome-title">
        <div className="home-welcome-image">
          <img
            src={siteImages.worship.src}
            alt={siteImages.worship.alt}
            width="760"
            height="570"
            loading="lazy"
            style={{ objectPosition: siteImages.worship.objectPosition }}
          />
        </div>
        <div className="home-welcome-copy">
          <span className="home-label">Welcome Home</span>
          <h2 id="home-welcome-title">Welcome to Christ Tamil Church</h2>
          <p>
            Christ Tamil Church is a Bible-based Tamil home church for families
            in the Chicago area, committed to worship, discipleship, love, and
            service.
          </p>
          <div className="home-chip-row" aria-label="Church values">
            {welcomeChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-events-section section--sage" aria-labelledby="home-events-title">
        <div className="home-section-heading">
          <div>
            <span className="home-label">Coming Up</span>
            <h2 id="home-events-title">Upcoming events</h2>
          </div>
          <Link className="home-text-link" to="/connect">
            View All Events
          </Link>
        </div>

        <div className="home-event-grid">
          {homeEvents.map((event) => {
            const eventImage = event.flyerImage ?? event.image ?? siteImages.events.src;
            const hasFlyer = Boolean(event.flyerImage);

            return (
            <article
              className={`home-event-card ${event.homeFeatured ? "featured" : ""} ${hasFlyer ? "flyer" : ""}`}
              key={event.title}
            >
              <img
                src={eventImage}
                alt={`${event.title} event preview`}
                width={event.homeFeatured ? "760" : "560"}
                height={event.homeFeatured ? "475" : "350"}
                loading="lazy"
              />
              <div>
                <span className="home-event-date">{event.frequency}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <dl>
                  <div>
                    <dt>Time</dt>
                    <dd>{event.time ?? event.date}</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>{event.location}</dd>
                  </div>
                </dl>
                <Link className="button secondary" to={event.ctaLink}>
                  {event.ctaText}
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="home-ministries-section section--main" aria-labelledby="home-ministries-title">
        <div className="home-section-heading center">
          <div>
            <span className="home-label">Grow Together</span>
            <h2 id="home-ministries-title">Ministries for every season of life</h2>
            <p>
              Simple, faithful spaces for children, families, and the church
              family to grow in Christ.
            </p>
          </div>
        </div>

        <div className="home-ministry-grid">
          {ministryPreview.map((ministry) => {
            const MinistryIcon = ministry.icon;

            return (
            <Link className="home-ministry-card" key={ministry.title} to={ministry.href}>
              <span className="home-ministry-icon" aria-hidden="true">
                <MinistryIcon size={22} strokeWidth={2} />
              </span>
              <span>{ministry.title}</span>
              <p>{ministry.text}</p>
            </Link>
            );
          })}
        </div>
        <Link className="home-text-link home-centered-link" to="/worship">
          View all ministries
        </Link>
      </section>

      <section className="home-sermon-section section--sand" aria-labelledby="home-sermon-title">
        <article className="home-sermon-card">
          <div className="home-sermon-media">
            <img
              src={siteImages.sermon.src}
              alt={siteImages.sermon.alt}
              width="720"
              height="450"
              loading="lazy"
              style={{ objectPosition: siteImages.sermon.objectPosition }}
            />
          </div>
          <div className="home-sermon-copy">
            <span className="home-label">Latest Sermon</span>
            <h2 id="home-sermon-title">{latestSermon.title}</h2>
            <p className="home-sermon-meta">
              {latestSermon.speaker} <span aria-hidden="true">|</span>{" "}
              {latestSermon.date}
            </p>
            <p>{latestSermon.text}</p>
            <div className="home-sermon-actions">
              <Link className="button primary" to="/sermons">
                Watch Online
              </Link>
              <Link className="button secondary" to="/sermons">
                Browse Sermons
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="home-visitor-section section--sage" aria-labelledby="home-visitor-title">
        <div className="home-visitor-inner">
          <div className="home-visitor-intro">
            <span className="home-label">First-Time Visitor</span>
            <h2 id="home-visitor-title">Visiting for the first time?</h2>
            <p>
              We would love to welcome you and your family. Here's what to expect
              when you join us.
            </p>
          </div>
          <div className="home-visitor-steps">
            {visitorSteps.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <Link className="button primary" to="/visit">
            Plan Your Visit
          </Link>
        </div>
      </section>
    </>
  );
}

