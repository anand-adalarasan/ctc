import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

type EventFlyerCardProps = {
  image: string | null;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  cadence: string;
  alt: string;
};

export default function EventFlyerCard({
  image,
  title,
  date,
  time,
  location,
  description,
  ctaText,
  ctaLink,
  cadence,
  alt
}: EventFlyerCardProps) {
  return (
    <article className="events-flyer-card">
      <div className="events-flyer-media">
        {image ? (
          <img src={image} alt={alt} />
        ) : (
          // TODO: Replace this placeholder by adding a flyer image path to the event data.
          <div className="events-flyer-placeholder" role="img" aria-label={`${title} flyer placeholder`}>
            <CalendarDays size={44} aria-hidden="true" />
            <span>Flyer Coming Soon</span>
          </div>
        )}
      </div>
      <div className="events-flyer-copy">
        <span className="event-category">{cadence} Event</span>
        <h3>{title}</h3>
        <dl className="events-flyer-details">
          <div>
            <dt>Date</dt>
            <dd>{date}</dd>
          </div>
          {time ? (
            <div>
              <dt>Time</dt>
              <dd>{time}</dd>
            </div>
          ) : null}
          <div>
            <dt>Location</dt>
            <dd>
              <MapPin size={15} aria-hidden="true" />
              {location}
            </dd>
          </div>
        </dl>
        <p>{description}</p>
        <Link className="button secondary" to={ctaLink}>
          {ctaText}
        </Link>
      </div>
    </article>
  );
}
