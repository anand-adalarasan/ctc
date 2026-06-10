import { Link } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MessageCircleQuestion,
  Sparkles,
  UsersRound
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";

const formationCards = [
  {
    title: "God's Word",
    text: "Grow in Christ through Scripture-centered learning and reflection.",
    icon: BookOpen
  },
  {
    title: "Prayer",
    text: "Seek God together for the church, families, and community.",
    icon: HeartHandshake
  },
  {
    title: "Fellowship",
    text: "Be strengthened through encouragement and shared spiritual formation.",
    icon: UsersRound
  }
];

const prayerRhythms = [
  "Bible study rooted in Scripture",
  "Prayer for families, church, and community",
  "Prayer conference and fasting prayer rhythms",
  "Encouragement for everyday discipleship"
];

const relatedGrowPages = [
  {
    title: "Sunday School - B.L.A.S.T.",
    text: "Bible Learning And Spiritual Training for children of all ages.",
    href: "/grow/sunday-school",
    icon: Sparkles
  },
  {
    title: "Kids Circle",
    text: "A joyful Sunday service experience where children learn God's Word and Biblical values.",
    href: "/grow/kids-circle",
    icon: UsersRound
  },
  {
    title: "Audio Sermons",
    text: "Continue growing through Scripture-based messages.",
    href: "/sermons",
    icon: BookOpen
  }
];

export default function BibleStudyPrayer() {
  return (
    <>
      <section className="page-hero bible-study-hero">
        <div className="bible-study-hero-copy">
          <span className="eyebrow">Grow</span>
          <h1>Grow in God's Word and prayer.</h1>
          <p>
            Bible Study / Prayer helps adults and families grow in Christ
            through Scripture, prayer, encouragement, and shared discipleship.
          </p>
        </div>

        <aside className="bible-study-hero-card" aria-labelledby="bible-study-card-title">
          <span className="bible-study-card-icon" aria-hidden="true">
            <BookOpen size={26} />
          </span>
          <h2 id="bible-study-card-title">Bible Study / Prayer</h2>
          <ul>
            <li>
              <CalendarDays size={17} aria-hidden="true" />
              <span>Midweek Bible study</span>
            </li>
            <li>
              <HeartHandshake size={17} aria-hidden="true" />
              <span>Prayer conference and fasting prayer</span>
            </li>
            <li>
              <MessageCircleQuestion size={17} aria-hidden="true" />
              <span>Questions, reflection, and encouragement</span>
            </li>
          </ul>
          <Link className="button primary" to="/contact">
            Contact Us
          </Link>
        </aside>
      </section>

      <section className="section bible-study-intro-section">
        <article className="bible-study-intro-card">
          <span className="eyebrow">Spiritual Formation</span>
          <h2>Scripture, prayer, and life together.</h2>
          <p>
            We gather around God's Word because discipleship is formed through
            hearing Scripture, obeying Christ, praying with faith, and carrying
            one another in love.
          </p>
        </article>
      </section>

      <section className="section bible-study-formation-section">
        <SectionHeader title="Ways We Grow Together" />
        <div className="bible-study-card-grid">
          {formationCards.map((item) => {
            const Icon = item.icon;

            return (
              <article className="bible-study-card" key={item.title}>
                <span aria-hidden="true">
                  <Icon size={24} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bible-study-band">
        <div className="bible-study-band-inner">
          <SectionHeader
            eyebrow="Prayer Life"
            title="A steady rhythm for growing in Christ"
            text="These gatherings create space to study, pray, listen, ask, and be strengthened as a church family."
            align="center"
          />
          <div className="bible-study-rhythm-grid">
            {prayerRhythms.map((item) => (
              <div className="bible-study-rhythm-card" key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bible-study-related-section">
        <SectionHeader title="Continue Growing" />
        <div className="bible-study-related-grid">
          {relatedGrowPages.map((page) => {
            const Icon = page.icon;

            return (
              <Link className="bible-study-related-card" key={page.title} to={page.href}>
                <span aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div>
                  <h3>{page.title}</h3>
                  <p>{page.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
        {/* TODO: Add Blog / Clay Pot as a related Grow page after a real blog route exists. */}
      </section>
    </>
  );
}
