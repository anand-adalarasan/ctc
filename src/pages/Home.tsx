import { Link } from "react-router-dom";
import {
  BookOpen,
  Cross,
  HandHeart,
  Heart,
  Home as HomeIcon,
  Sprout,
  UsersRound
} from "lucide-react";
import heroSanctuary from "../assets/images/hero-sanctuary.jpg";
import storyPrayer from "../assets/images/story-prayer.jpg";
import FeatureRows from "../components/FeatureRows";
import SectionHeader from "../components/SectionHeader";
import { eventPromos, ministries, pastors, quickLinks } from "../data/site";

export default function Home() {
  const featuredEvent = eventPromos.find((event) => event.featured) ?? eventPromos[0];
  const upcomingEvents = eventPromos.filter((event) => event !== featuredEvent).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Love God. Love People. Make Disciples.</span>
          <h1>Welcome to Christ Tamil Church</h1>
          <p>
            A Christ-centered Tamil church in Chicago, committed to worshiping
            God, growing in faith, and serving our community with the love of
            Jesus.
          </p>
          <div className="button-row">
            <Link className="button primary" to="/visit">
              Plan Your Visit
            </Link>
            <Link className="button secondary" to="/visit">
              Learn More About Us
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <img
            src={heroSanctuary}
            alt="Warm church sanctuary with a cross"
          />
        </div>
      </section>

      <section className="section quick-info-section">
        <FeatureRows items={quickLinks} variant="info" />
      </section>

      <section className="section events-band">
        <SectionHeader
          eyebrow="Coming up"
          title="Upcoming Speakers & Events"
          text="Watch this space for event flyers, guest speaker announcements, and special church gatherings."
        />
        <div className={`events-showcase ${upcomingEvents.length === 0 ? "single" : ""}`}>
          <article className="event-feature-card">
            <div className="event-feature-image">
              <img src={featuredEvent.flyer} alt={`${featuredEvent.title} flyer`} />
              <span className="event-date-badge">{featuredEvent.dateLabel}</span>
            </div>
            <div className="event-feature-copy">
              <span className="event-category">{featuredEvent.category}</span>
              <h3>{featuredEvent.title}</h3>
              <p>
                Open the Events page to view the full flyer and contact the
                church if you are interested in attending.
              </p>
              <div className="event-actions">
                <Link className="button primary" to={featuredEvent.href}>
                  View Flyer
                </Link>
                <Link className="button secondary" to="/contact">
                  Contact Church
                </Link>
              </div>
            </div>
          </article>

          {upcomingEvents.length > 0 ? (
            <div className="upcoming-event-list">
              {upcomingEvents.map((event) => (
                <Link className="upcoming-event-card" key={event.title} to={event.href}>
                  <span className="upcoming-flyer-thumb">
                    <img src={event.flyer} alt="" />
                  </span>
                  <span className="upcoming-copy">
                    <small>{event.category}</small>
                    <strong>{event.title}</strong>
                    <span>{event.dateLabel}</span>
                  </span>
                  <span className="upcoming-arrow" aria-hidden="true">
                    &gt;
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="split-section">
        <div className="image-panel">
          <img
            src={storyPrayer}
            alt="Hands folded in prayer over an open Bible"
          />
        </div>
        <div className="split-copy">
          <span className="eyebrow">Our story</span>
          <h2>Who We Are</h2>
          <p>
            Christ Tamil Church is a Bible-based Tamil home church for families
            in the Chicago area, committed to worship, discipleship, love, and
            service.
          </p>
          <div className="mission-card">
            <span>Our Goal</span>
            <strong>Revive believers to live by love.</strong>
            <p>
              To revive believers, to live by love and provide a Bible-based
              home church for Tamil families in the Chicago area.
            </p>
          </div>
          <div className="vision-panel">
            <span className="vision-label">Our Perception</span>
            <div className="vision-list">
              <div className="vision-item">
                <span className="vision-icon" aria-hidden="true">
                  <HomeIcon size={20} />
                </span>
                <p>Provide an opportunity to worship and praise God in Tamil.</p>
              </div>
              <div className="vision-item">
                <span className="vision-icon" aria-hidden="true">
                  <Sprout size={20} />
                </span>
                <p>
                  Grow in personal relationship with Jesus, be alive in Christ,
                  and serve others.
                </p>
              </div>
              <div className="vision-item">
                <span className="vision-icon" aria-hidden="true">
                  <Heart size={20} />
                </span>
                <p>Support the needy and missions in the local Chicago community.</p>
              </div>
              <div className="vision-item">
                <span className="vision-icon" aria-hidden="true">
                  <UsersRound size={20} />
                </span>
                <p>Nurture family values and cultural values in our children.</p>
              </div>
            </div>
          </div>
          <Link className="text-link" to="/visit">
            Learn what to expect
          </Link>
        </div>
      </section>

      <section className="section belief-section">
        <div className="belief-home-layout">
          <div className="belief-home-copy">
            <span className="eyebrow">Our faith</span>
            <h2>What We Believe</h2>
            <p>
              We are a Bible-based church rooted in the historic Christian
              faith, centered on Jesus Christ, shaped by Scripture, and called
              to live by grace.
            </p>
            <Link className="button primary" to="/faith">
              Read Full Statement
            </Link>
          </div>
          <div className="belief-pillar-grid">
            <article className="belief-pillar-card">
              <span aria-hidden="true">
                <Cross size={22} />
              </span>
              <strong>Triune God</strong>
              <p>We believe in the Father, Son, and Holy Spirit as one God.</p>
            </article>
            <article className="belief-pillar-card">
              <span aria-hidden="true">
                <BookOpen size={22} />
              </span>
              <strong>Scripture</strong>
              <p>We receive the Old and New Testaments as God-breathed truth.</p>
            </article>
            <article className="belief-pillar-card">
              <span aria-hidden="true">
                <Heart size={22} />
              </span>
              <strong>Grace Through Faith</strong>
              <p>We are saved by God's grace through faith in Jesus Christ.</p>
            </article>
            <article className="belief-pillar-card">
              <span aria-hidden="true">
                <HandHeart size={22} />
              </span>
              <strong>Faithful Church Life</strong>
              <p>We live out our faith through repentance, service, and peace.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section ministry-band">
        <SectionHeader
          eyebrow="Our ministries"
          title="Sunday Worship & Ministries"
          text="We have ministries for every age and stage. Join us and grow in faith together."
          align="center"
        />
        <div className="ministries-showcase">
          <article className="ministry-feature-card">
            <img
              src={heroSanctuary}
              alt="Church sanctuary prepared for Sunday worship"
            />
            <div className="ministry-feature-copy">
              <span>Featured Gathering</span>
              <h3>Worship Together</h3>
              <p>
                Join us each Sunday for Christ-centered worship, Scripture,
                prayer, and fellowship with our church family.
              </p>
              <Link className="button primary" to="/worship">
                Plan for Sunday
              </Link>
            </div>
          </article>

          <div className="ministry-card-grid">
            {ministries.map((ministry) => {
              const Icon = ministry.icon;

              return (
                <Link className="ministry-card" key={ministry.title} to={ministry.href}>
                  <span className="ministry-card-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span className="ministry-card-copy">
                    <strong>{ministry.title}</strong>
                    <span>{ministry.text}</span>
                  </span>
                  <span className="ministry-card-arrow" aria-hidden="true">
                    &gt;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section pastors-section">
        <SectionHeader eyebrow="Our leaders" title="Meet Our Pastors" />
        <div className="pastor-list">
          {pastors.map((pastor) => (
            <article className="pastor-card" key={pastor.name}>
              <div
                className="pastor-photo"
                style={{ backgroundImage: `url(${pastor.image})` }}
                aria-hidden="true"
              />
              <div>
                <h3>{pastor.name}</h3>
                <small>{pastor.role}</small>
                <p>{pastor.text}</p>
                <Link className="text-link" to="/pastors">
                  Read profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
