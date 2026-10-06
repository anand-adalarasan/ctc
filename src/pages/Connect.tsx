import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Coffee,
  HeartHandshake,
  MapPin,
  Music,
  Sparkles,
  Sun,
  Wheat
} from "lucide-react";
import PathwayMarker from "../components/PathwayMarker";
import { siteImages, type SiteImage } from "../data/images";
import { churchInfo } from "../data/site";
import { useRevealGroup } from "../hooks/useRevealGroup";
import "./Connect.css";
import "./PageHeroTypography.css";

type ConnectTradition = {
  number: string;
  title: string;
  text: string;
  icon: typeof Sun;
  image?: SiteImage;
};

const connectTraditions: ConnectTradition[] = [
  {
    number: "01",
    title: "Summer Picnic",
    text: "An easygoing day outdoors with shared food, games, conversation, and time for every generation to enjoy being together.",
    icon: Sun,
    image: siteImages.connectSummerPicnic
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
    icon: Sparkles,
    image: siteImages.connectSummerCarnival
  },
  {
    number: "04",
    title: "Harvest Festival",
    text: "A seasonal gathering to give thanks for God’s goodness and celebrate with food, family activities, and fellowship.",
    icon: Wheat,
    image: siteImages.connectHarvestFestival
  },
  {
    number: "05",
    title: "Carol Rounds",
    text: "At Christmas, we carry songs of hope from home to home and share the joy of Christ’s birth with our church family.",
    icon: Music,
    image: siteImages.connectCarolRounds
  }
];

export default function Connect() {
  const pageRef = useRevealGroup<HTMLDivElement>(".connect-reveal");
  const listRef = useRef<HTMLDivElement>(null);
  const [activeTradition, setActiveTradition] = useState(0);
  const [shownPhoto, setShownPhoto] = useState(0);

  // The frame keeps the last photographed tradition when the active row has no photo.
  useEffect(() => {
    if (connectTraditions[activeTradition].image) setShownPhoto(activeTradition);
  }, [activeTradition]);

  // Rows crossing the middle of the viewport become active as the visitor scrolls.
  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-tradition]");
    if (!rows?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTradition(Number((entry.target as HTMLElement).dataset.tradition));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="connect-page" ref={pageRef}>
      <section className="connect-hero" aria-labelledby="connect-title">
        <div className="connect-hero-media" aria-hidden="true">
          <picture>
            <source media="(max-width: 900px)" srcSet={siteImages.connectHeroMobile.src} />
            <img
              className="connect-hero-bg"
              src={siteImages.connectHero.src}
              alt=""
              width="2000"
              height="1117"
              style={{ objectPosition: siteImages.connectHero.objectPosition }}
            />
          </picture>
          <div className="connect-hero-wash" />
        </div>
        <div className="connect-shell connect-hero-grid">
          <div className="connect-hero-copy">
            <PathwayMarker pathway="connect" className="connect-hero-kicker" />
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
              src={siteImages.connectFellowshipMeal.src}
              alt={siteImages.connectFellowshipMeal.alt}
              width="1070"
              height="716"
              loading="lazy"
              style={{ objectPosition: siteImages.connectFellowshipMeal.objectPosition }}
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

            <figure className="connect-tradition-frame" aria-hidden="true">
              <div className="connect-tradition-frame-photos">
                {connectTraditions.map((tradition, index) =>
                  tradition.image ? (
                    <img
                      key={tradition.title}
                      className={index === shownPhoto ? "is-shown" : undefined}
                      src={tradition.image.src}
                      alt=""
                      loading="lazy"
                      style={{ objectPosition: tradition.image.objectPosition }}
                    />
                  ) : null
                )}
              </div>
              <figcaption key={shownPhoto}>{connectTraditions[shownPhoto].title}</figcaption>
            </figure>
          </header>

          <div className="connect-tradition-list" ref={listRef}>
            {connectTraditions.map((tradition, index) => {
              const Icon = tradition.icon;
              return (
                <article
                  key={tradition.title}
                  data-tradition={index}
                  className={index === activeTradition ? "is-active" : undefined}
                  onPointerEnter={() => setActiveTradition(index)}
                >
                  <span className="connect-tradition-number">{tradition.number}</span>
                  <Icon size={21} aria-hidden="true" />
                  <div>
                    <h3>{tradition.title}</h3>
                    <p>{tradition.text}</p>
                    {tradition.image ? (
                      <img
                        className="connect-tradition-inline-photo"
                        src={tradition.image.src}
                        alt={tradition.image.alt}
                        loading="lazy"
                        style={{ objectPosition: tradition.image.objectPosition }}
                      />
                    ) : null}
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

          <div className="connect-care-stage">
            <figure className="connect-care-photo">
              <img
                src={siteImages.connectCampfire.src}
                alt={siteImages.connectCampfire.alt}
                width="1400"
                height="1050"
                loading="lazy"
                style={{ objectPosition: siteImages.connectCampfire.objectPosition }}
              />
            </figure>

            <aside className="connect-care-invitation" aria-labelledby="seat-title">
              <p className="connect-eyebrow">Your seat is waiting</p>
              <h3 id="seat-title">Stay after worship. Share a meal. Start a friendship.</h3>
              <p>Join us Sunday at {churchInfo.worship.time} in Downers Grove, or reach out and we will help you feel at home.</p>
              <Link className="connect-text-link" to="/events">
                Explore gatherings <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
