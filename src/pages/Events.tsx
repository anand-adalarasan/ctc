import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { eventPromos, events } from "../data/site";

export default function Events() {
  const featuredEvent = eventPromos.find((event) => event.featured) ?? eventPromos[0];
  const upcomingEvents = eventPromos.filter((event) => event !== featuredEvent);

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Events</span>
        <h1>Event flyers and church announcements.</h1>
        <p>
          View current flyers for visiting speakers, special services,
          fellowship events, retreats, and church family gatherings.
        </p>
      </section>

      <section className="section events-page-section">
        <SectionHeader
          eyebrow="Featured flyer"
          title={featuredEvent.title}
          text="The flyer contains the event details. Contact the church if you are interested in attending or need more information."
        />
        <article className="event-feature-card event-feature-page">
          <div className="event-feature-image">
            <img src={featuredEvent.flyer} alt={`${featuredEvent.title} flyer`} />
            <span className="event-date-badge">{featuredEvent.dateLabel}</span>
          </div>
          <div className="event-feature-copy">
            <span className="event-category">{featuredEvent.category}</span>
            <p>
              Event details, guest speaker information, timing, and location
              can be placed directly on the flyer artwork.
            </p>
            <div className="event-actions">
              <Link className="button primary" to="/contact">
                Contact Church
              </Link>
              <Link className="button secondary" to="/visit">
                Plan a Visit
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="section events-page-section">
        <SectionHeader title="More event flyers" />
        <div className="event-promo-grid">
          {upcomingEvents.map((event) => (
            <article className="event-promo-card" key={event.title}>
              <img src={event.flyer} alt={`${event.title} flyer`} />
              <div>
                <span className="event-date-badge inline">{event.dateLabel}</span>
                <small>{event.category}</small>
                <h3>{event.title}</h3>
                <Link className="text-link" to="/contact">
                  Contact Church
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Recurring gatherings"
          title="Weekly and seasonal events"
        />
        <div className="card-grid">
          {events.map((event) => (
            <article className="content-card" key={event.title}>
              <small>{event.date}</small>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
