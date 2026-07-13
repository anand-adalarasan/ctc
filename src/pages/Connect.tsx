import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Baby,
  BookOpen,
  CalendarDays,
  Clock,
  Coffee,
  HeartHandshake,
  MapPin,
  Megaphone,
  Music,
  Sparkles,
  Sun,
  Users,
  UsersRound,
  Wheat,
  type LucideIcon
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { siteImages } from "../data/images";
import { churchEvents, churchInfo, type ChurchEvent } from "../data/site";
import "./Connect.css";

const eventIconMap: Record<string, LucideIcon> = {
  "Sunday Worship Service": Music,
  "Sunday School": Baby,
  "Prayer Conference": HeartHandshake,
  "Bible Study & Prayer": BookOpen,
  "Fasting Prayer": Sparkles,
  "Men's Fellowship": Users,
  "Women's Conference": Sparkles,
  Outreach: Megaphone,
  "Vacation Bible School": Baby,
  "Church Picnic": UsersRound,
  "Family Camp": CalendarDays,
  "Fellowship Hour": Users
};

const getEventIcon = (title: string) => eventIconMap[title] ?? CalendarDays;

const connectTraditions = [
  {
    number: "01",
    title: "Summer Picnic",
    text: "An easygoing day outdoors with shared food, games, conversation, and time for every generation to enjoy being together.",
    icon: Sun
  },
  {
    number: "02",
    title: "Family Visits",
    text: "Fellowship travels beyond the church building as families visit, encourage, pray with, and care for one another.",
    icon: HeartHandshake
  },
  {
    number: "03",
    title: "Summer Carnival",
    text: "A joyful community celebration where children, parents, friends, and neighbors can share activities, laughter, and hospitality.",
    icon: Sparkles
  },
  {
    number: "04",
    title: "Harvest Festival",
    text: "A seasonal gathering to give thanks for God’s goodness and celebrate with food, family activities, and fellowship.",
    icon: Wheat
  },
  {
    number: "05",
    title: "Carol Rounds",
    text: "At Christmas, we carry songs of hope from home to home and share the joy of Christ’s birth with our church family.",
    icon: Music
  }
];

export function Events() {
  const featuredGatherings = churchEvents.filter((event) => event.isFeatured);
  const upcomingEvents = churchEvents.filter((event) => event.isRecurring);
  const annualEvents = churchEvents.filter((event) => event.isAnnual);
  const weeklyCount = churchEvents.filter((event) => event.cadence === "Weekly").length;
  const monthlyCount = churchEvents.filter((event) => event.cadence === "Monthly").length;
  const annualCount = churchEvents.filter((event) => event.cadence === "Annual").length;
  const heroGatherings = [
    churchEvents.find((event) => event.title === "Prayer Conference"),
    churchEvents.find((event) => event.title === "Sunday Worship Service"),
    churchEvents.find((event) => event.title === "Fasting Prayer"),
    churchEvents.find((event) => event.title === "Family Camp")
  ].filter((event): event is ChurchEvent => Boolean(event));

  return (
    <>
      <section className="events-hero" aria-labelledby="events-hero-title">
        <div className="events-hero-copy">
          <span className="eyebrow">Events</span>
          <h1 id="events-hero-title">Gather, grow, and celebrate together.</h1>
          <p>
            Join us for worship, prayer, Bible study, children's activities,
            fellowship, seasonal celebrations, outreach, and family gatherings
            throughout the year.
          </p>
          <div className="events-hero-stats" aria-label="Event rhythm summary">
            <span>
              <strong>{weeklyCount}</strong>
              Weekly
            </span>
            <span>
              <strong>{monthlyCount}</strong>
              Monthly
            </span>
            <span>
              <strong>{annualCount}</strong>
              Annual
            </span>
          </div>
        </div>

        <aside className="events-hero-card" aria-labelledby="upcoming-gatherings-title">
          <span className="events-card-icon" aria-hidden="true">
            <CalendarDays size={26} />
          </span>
          <h2 id="upcoming-gatherings-title">Upcoming Gatherings</h2>
          <ul>
            {heroGatherings.map((event) => (
              <li key={event.title}>
                <Clock size={17} aria-hidden="true" />
                <span>
                  <strong className="events-hero-event-title">
                    {event.title === "Sunday Worship Service" ? "Sunday Worship" : event.title}
                  </strong>
                  <span>{event.frequency}</span>
                  {event.time ? <span>{event.time}</span> : null}
                </span>
              </li>
            ))}
          </ul>
          <a className="button primary" href="#upcoming-events">
            View Gatherings
          </a>
        </aside>
      </section>

      <section className="section events-featured-section">
        <SectionHeader title="Featured Church Gatherings" />
        <div className="events-featured-grid">
          {featuredGatherings.map((event) => {
            const Icon = getEventIcon(event.title);

            return (
              <article className="events-featured-card" key={event.title}>
                <span className="events-featured-icon" aria-hidden="true">
                  <Icon size={28} />
                </span>
                <small>{event.cadence}</small>
                <h3>{event.title === "Fasting Prayer" ? "Monthly Fasting Prayer" : event.title}</h3>
                <div className="events-featured-meta">
                  <strong>{event.frequency}</strong>
                  <span>{event.title === "Family Camp" ? "Annual Family Retreat" : event.time}</span>
                </div>
                <p>{event.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section events-list-section" id="upcoming-events">
        <SectionHeader title="Events & Gatherings" />
        <div className="events-grid">
          {upcomingEvents.map((event) => {
            const Icon = getEventIcon(event.title);

            return (
              <article className="events-card" key={event.title}>
                <div className="events-card-top">
                  <span aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <small>{event.cadence}</small>
                </div>
                <h3>{event.title}</h3>
                <span className="events-card-category">{event.category}</span>
                <dl>
                  <div>
                    <dt>Frequency</dt>
                    <dd>{event.frequency}</dd>
                  </div>
                  {event.time ? (
                    <div>
                      <dt>Time</dt>
                      <dd>{event.time}</dd>
                    </div>
                  ) : null}
                </dl>
                <p>{event.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section events-annual-section">
        <SectionHeader title="Annual Church Events" />
        <div className="events-annual-grid">
          {annualEvents.map((event) => (
            <article className="events-annual-card" key={event.title}>
              <span aria-hidden="true">
                <CalendarDays size={21} />
              </span>
              <div>
                <h3>{event.title}</h3>
                <p>{event.cadence} - {event.frequency}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </>
  );
}

export default function Connect() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reveals = Array.from(page.querySelectorAll<HTMLElement>(".connect-reveal"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 }
    );

    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="connect-page" ref={pageRef}>
      <section className="connect-hero" aria-labelledby="connect-title">
        <div className="connect-shell connect-hero-grid">
          <div className="connect-hero-copy">
            <p className="connect-hero-kicker">
              <span lang="ta">ஒன்றாய்க் கூடுவோம்</span>
              <small>Connect</small>
            </p>
            <h1 id="connect-title">Come as a guest. Leave as <em>family.</em></h1>
            <p className="connect-hero-lede">
              Faith grows in shared life. Around the table, through every season,
              and in one another’s homes, there is a place for you to belong.
            </p>
          </div>

          <aside className="connect-sunday-card" aria-label="Sunday fellowship details">
            <span className="connect-icon" aria-hidden="true"><Coffee size={22} /></span>
            <p className="connect-card-label">Every Sunday</p>
            <h2>Fellowship after worship</h2>
            <p>Stay after the service for a shared meal, warm conversation, and time to know the church family.</p>
            <div className="connect-card-details">
              <span><Clock size={17} aria-hidden="true" /> After {churchInfo.worship.time} worship</span>
              <span><MapPin size={17} aria-hidden="true" /> Fellowship auditorium</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="connect-band connect-fellowship connect-reveal" id="fellowship-hour" aria-labelledby="fellowship-title">
        <div className="connect-shell connect-fellowship-grid">
          <figure className="connect-fellowship-photo">
            <img
              src={siteImages.events.src}
              alt={siteImages.events.alt}
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>Food, friendship, and time to be known.</figcaption>
          </figure>

          <div className="connect-fellowship-copy">
            <p className="connect-eyebrow">Friendly fellowship hour</p>
            <h2 id="fellowship-title">The table is part of our Sunday rhythm.</h2>
            <p>
              After worship and children’s Sunday school, we gather in the auditorium
              to share a meal and spend unhurried time together. It is a simple, welcoming
              way to meet people, exchange stories, and begin building friendships.
            </p>
            <blockquote>
              Our fellowship is rooted in the unity we share through Christ—supporting
              one another and growing together in faith.
            </blockquote>
            <Link className="connect-text-link" to="/visit">
              Plan your first Sunday <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="connect-band connect-traditions connect-reveal" aria-labelledby="traditions-title">
        <div className="connect-shell connect-traditions-grid">
          <header className="connect-heading">
            <p className="connect-eyebrow">Through the year</p>
            <h2 id="traditions-title">Traditions that turn moments into memories.</h2>
            <p>Our calendar makes room for celebration, care, and the kind of friendship that continues beyond Sundays.</p>
          </header>

          <div className="connect-tradition-list">
            {connectTraditions.map((tradition) => {
              const Icon = tradition.icon;
              return (
                <article key={tradition.title}>
                  <span className="connect-tradition-number">{tradition.number}</span>
                  <Icon size={21} aria-hidden="true" />
                  <div>
                    <h3>{tradition.title}</h3>
                    <p>{tradition.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="connect-band connect-care connect-reveal" aria-labelledby="care-title">
        <div className="connect-shell connect-care-grid">
          <div className="connect-care-intro">
            <div className="connect-care-mark" aria-hidden="true">
              <HeartHandshake size={34} />
            </div>
            <p className="connect-eyebrow">Life together</p>
            <h2 id="care-title">Connection that continues beyond an event.</h2>
            <p>
              Fellowship means showing up for one another—in celebration, in prayer,
              and in seasons when a family could use encouragement. You do not need
              to know anyone before you come; we would be glad to introduce you.
            </p>
          </div>

          <aside className="connect-care-invitation" aria-labelledby="seat-title">
            <p className="connect-eyebrow">Your seat is waiting</p>
            <h3 id="seat-title">Stay after worship. Share a meal. Start a friendship.</h3>
            <p>Join us Sunday at {churchInfo.worship.time} in Downers Grove, or reach out and we will help you feel at home.</p>
            <Link className="connect-text-link" to="/events">
              Explore gatherings <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
