import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { churchEvents, churchInfo, type ChurchEvent } from "../data/site";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import "./Events.css";

function EventRow({ event }: { event: ChurchEvent }) {
  return (
    <article className="ctc-events-row" data-reveal-child>
      <div className="ctc-events-row-media">
        {event.image ? (
          <img src={event.image} alt="" width="640" height="360" loading="lazy" />
        ) : (
          <span className="ctc-events-row-fallback" aria-hidden="true">
            <CalendarDays size={40} />
          </span>
        )}
      </div>

      <div className="ctc-events-row-copy">
        <p className="ctc-events-row-category">{event.category}</p>
        <h3>{event.title}</h3>
        <div className="ctc-events-row-schedule">
          <span><CalendarDays size={15} aria-hidden="true" /> {event.date}</span>
          {event.time ? <span><Clock size={15} aria-hidden="true" /> {event.time}</span> : null}
          {event.location ? <span><MapPin size={15} aria-hidden="true" /> {event.location}</span> : null}
        </div>
        <p className="ctc-events-row-description">{event.description}</p>
      </div>
    </article>
  );
}

export default function Events() {
  const listRef = useRevealOnScroll<HTMLDivElement>({
    staggerChildren: true,
    staggerStepMs: 85
  });

  return (
    <div className="ctc-events-page">
      <section className="ctc-events-home-hero" aria-labelledby="events-title">
        <div className="ctc-events-shell ctc-events-home-hero-grid">
          <div className="ctc-events-home-hero-copy">
            <p className="ctc-events-hero-kicker">
              <span lang="ta">ஒன்றுகூடுவோம்</span>
              <small>Events</small>
            </p>
            <h1 id="events-title">There is a place for you <em>here.</em></h1>
            <p className="ctc-events-home-hero-lede">
              Worship, learn, pray, and share life with our Tamil Christian church family.
              Explore the rhythms and gatherings that bring us together.
            </p>
          </div>

          <aside className="ctc-events-sunday-card" aria-label="Sunday worship invitation">
            <span className="ctc-events-sunday-icon" aria-hidden="true">
              <CalendarDays size={22} />
            </span>
            <p className="ctc-events-sunday-label">Planning your first visit?</p>
            <h2>Start with Sunday worship.</h2>
            <p>Join us each Sunday at {churchInfo.worship.time} in Downers Grove. Children are warmly welcomed.</p>
            <Link className="ctc-events-row-link" to="/visit">
              Plan your visit <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="ctc-events-upcoming" id="upcoming-events" aria-labelledby="upcoming-title">
        <div className="ctc-events-shell">
          <header className="ctc-events-list-heading">
            <p>Church life · சபை வாழ்க்கை</p>
            <h2 id="upcoming-title">Upcoming at CTC.</h2>
          </header>

          {churchEvents.length ? (
            <div className="ctc-events-list ctc-events-reveal" ref={listRef}>
              {churchEvents.map((event) => <EventRow event={event} key={event.title} />)}
            </div>
          ) : (
            <div className="ctc-events-empty" role="status">
              <CalendarDays size={30} aria-hidden="true" />
              <h3>No gatherings are listed right now.</h3>
              <p>Please contact us for the latest church schedule.</p>
              <Link className="ctc-events-row-link" to="/contact">
                Contact the church <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
