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
import guestSpeakerSamReeves from "../assets/images/guest-speaker-sam-reeves.jpeg";
import heroSanctuary from "../assets/images/hero-sanctuary.jpg";
import ministryFellowship from "../assets/images/ministry-fellowship.jpg";
import ministryKids from "../assets/images/ministry-kids.jpg";
import ministryPrayer from "../assets/images/ministry-prayer.jpg";
import ministrySchool from "../assets/images/ministry-school.jpg";

type ChurchEvent = {
  title: string;
  frequency: string;
  time?: string;
  category: string;
  description: string;
  cadence: "Weekly" | "Monthly" | "Annual" | "Seasonal" | "Periodic";
  date: string;
  location: string;
  image: string | null;
  flyerImage: string | null;
  ctaText: string;
  ctaLink: string;
  isFeatured: boolean;
  isAnnual: boolean;
  isRecurring: boolean;
};

// Church admin/developer note:
// Add or update future events in this array only. Set isFeatured, isAnnual,
// and isRecurring to control which sections display the event.
// Use image for a real event photo/flyer when available; keep null to show
// the flyer-ready placeholder in the announcements section.
// Add flyerImage when a designed flyer is available. Keep flyerImage null to
// display a clean placeholder until the church provides final flyer artwork.
const churchEvents: ChurchEvent[] = [
  {
    title: "Sunday Worship Service",
    frequency: "Every Sunday",
    time: "10.30 AM",
    category: "Tamil & English Worship",
    description:
      "Join us for Tamil and English worship, prayer, Scripture, sermon, children's ministry, communion, and fellowship.",
    cadence: "Weekly",
    date: "Every Sunday",
    location: "Christ Tamil Church",
    image: heroSanctuary,
    flyerImage: guestSpeakerSamReeves,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Sunday School",
    frequency: "Every Sunday",
    time: "During worship",
    category: "Children's Ministry",
    description:
      "Bible-based learning for children to grow in faith through age-appropriate lessons and activities.",
    cadence: "Weekly",
    date: "Every Sunday",
    location: "Children's Ministry Area",
    image: ministrySchool,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Prayer Conference",
    frequency: "Monday to Thursday",
    time: "7:00 PM",
    category: "Prayer Gathering",
    description:
      "Join us during the week for prayer, encouragement, and spiritual strengthening as a church family.",
    cadence: "Weekly",
    date: "Monday to Thursday",
    location: "Christ Tamil Church",
    image: ministryPrayer,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: true,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Bible Study & Prayer",
    frequency: "Wednesday",
    time: "7:30 PM",
    category: "Midweek Bible Study",
    description:
      "Grow deeper in God's Word through midweek Bible study and prayer.",
    cadence: "Weekly",
    date: "Wednesday",
    location: "Christ Tamil Church",
    image: ministryPrayer,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Fasting Prayer",
    frequency: "First Saturday of every month",
    time: "10.30 AM",
    category: "Prayer & Fasting",
    description:
      "A dedicated time of prayer, fasting, worship, and seeking God together.",
    cadence: "Monthly",
    date: "First Saturday of every month",
    location: "Christ Tamil Church",
    image: ministryPrayer,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: true,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Men's Fellowship",
    frequency: "Periodic Gathering",
    time: "Time To Be Announced",
    category: "Men's Ministry",
    description:
      "A time for men to grow in faith, encourage one another, and build Christ-centered relationships.",
    cadence: "Periodic",
    date: "Periodic Gathering",
    location: "Christ Tamil Church",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Women's Conference",
    frequency: "Annual / Periodic Gathering",
    time: "Time To Be Announced",
    category: "Women's Ministry",
    description:
      "A gathering for women to worship, learn, pray, and encourage one another in faith.",
    cadence: "Annual",
    date: "Annual / Periodic Gathering",
    location: "Christ Tamil Church",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Outreach",
    frequency: "Seasonal / As Scheduled",
    time: "First Saturday of every month 4.30PM",
    category: "Community Outreach",
    description:
      "Serving our community through love, care, prayer, and practical support.",
    cadence: "Seasonal",
    date: "Seasonal / As Scheduled",
    location: "Chicago Area",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Vacation Bible School",
    frequency: "Every Summer",
    time: "Time To Be Announced",
    category: "Children's Summer Ministry",
    description:
      "A joyful summer program where children learn God's Word through Bible stories, songs, games, crafts, and activities.",
    cadence: "Annual",
    date: "Every Summer",
    location: "Christ Tamil Church",
    image: ministryKids,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Church Picnic",
    frequency: "Every June",
    time: "Time To Be Announced",
    category: "Family Fellowship",
    description:
      "A yearly outdoor gathering for food, fellowship, games, and community as a church family.",
    cadence: "Annual",
    date: "Every June",
    location: "Location To Be Announced",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Family Camp",
    frequency: "Labor Day Weekend Every Year",
    category: "Family Retreat",
    description:
      "A yearly family retreat for worship, teaching, fellowship, rest, and spiritual renewal.",
    cadence: "Annual",
    date: "Labor Day Weekend Every Year",
    location: "Retreat Location To Be Announced",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: true,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Fellowship Hour",
    frequency: "After Sunday Worship",
    time: "After Service",
    category: "Fellowship Hall",
    description:
      "Stay after worship to connect, encourage one another, and share life together.",
    cadence: "Weekly",
    date: "After Sunday Worship",
    location: "Fellowship Hall",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  }
];

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
