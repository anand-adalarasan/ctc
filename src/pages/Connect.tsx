import { Link } from "react-router-dom";
import {
  Baby,
  BookOpen,
  CalendarDays,
  Church,
  Clock,
  HeartHandshake,
  Megaphone,
  Music,
  Sparkles,
  Users,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { churchEvents, type ChurchEvent } from "../data/site";

const connectionWays = [
  {
    title: "Worship & Teaching",
    text: "Sunday Worship, sermon, Bible study, and spiritual growth through God's Word.",
    icon: Church
  },
  {
    title: "Prayer Gatherings",
    text: "Prayer Conference, fasting prayer, and times of seeking God together as a church family.",
    icon: HeartHandshake
  },
  {
    title: "Children & Family",
    text: "Sunday School, Kids Circle, Vacation Bible School, church picnic, and family camp.",
    icon: Baby
  },
  {
    title: "Men's Fellowship",
    text: "Encouraging men to grow in faith, leadership, friendship, and Christ-centered living.",
    icon: Users
  },
  {
    title: "Women's Ministry",
    text: "Women's conference, prayer, fellowship, and spiritual encouragement.",
    icon: Sparkles
  },
  {
    title: "Outreach & Community",
    text: "Serving others through care, prayer, outreach, and community engagement.",
    icon: Megaphone
  }
];

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

export default function Connect() {
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
          <span className="eyebrow">Connect</span>
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

      <section className="events-connect-section">
        <div className="events-connect-inner">
          <SectionHeader title="Ways to Get Connected" align="center" />
          <div className="events-connect-grid">
            {connectionWays.map((way) => {
              const Icon = way.icon;

              return (
                <article className="events-connect-card" key={way.title}>
                  <span className="events-connect-icon" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <h3>{way.title}</h3>
                  <p>{way.text}</p>
                </article>
              );
            })}
          </div>
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
