import { Link } from "react-router-dom";
import {
  BookOpen,
  HeartHandshake,
  MicVocal,
  School,
  Sparkles,
  UsersRound
} from "lucide-react";

const growPathways = [
  {
    title: "Bible Study / Prayer",
    text: "Grow through God's Word, prayer conference, and fasting prayer.",
    href: "/grow/bible-study-prayer",
    icon: BookOpen
  },
  {
    title: "Sunday School - B.L.A.S.T.",
    text: "Bible Learning And Spiritual Training for children of all ages.",
    href: "/grow/sunday-school",
    icon: School
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
    icon: MicVocal
  }
  // TODO: Add Blog / Clay Pot when a real blog route exists.
];

export default function Grow() {
  return (
    <>
      <section className="page-hero grow-hub-hero">
        <span className="eyebrow">Grow</span>
        <h1>Grow in Christ, together as a church family.</h1>
        <p>
          From Bible study and prayer to children's ministry and
          Scripture-based teaching, our Grow ministries help every generation
          follow Jesus more deeply.
        </p>
      </section>

      <section className="section grow-pathway-section" aria-labelledby="grow-pathway-title">
        <div className="section-header">
          <span className="eyebrow">Discipleship Pathway</span>
          <h2 id="grow-pathway-title">Choose a place to grow</h2>
        </div>
        <div className="grow-pathway-grid">
          {growPathways.map((pathway) => {
            const Icon = pathway.icon;

            return (
              <Link className="grow-pathway-card" key={pathway.title} to={pathway.href}>
                <span className="grow-pathway-icon" aria-hidden="true">
                  <Icon size={24} />
                </span>
                <div>
                  <h3>{pathway.title}</h3>
                  <p>{pathway.text}</p>
                </div>
                <span className="grow-pathway-arrow" aria-hidden="true">
                  &gt;
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grow-hub-cta" aria-labelledby="grow-cta-title">
        <span className="grow-cta-icon" aria-hidden="true">
          <Sparkles size={30} />
        </span>
        <div>
          <span className="eyebrow">Next Step</span>
          <h2 id="grow-cta-title">Not sure where to start?</h2>
          <p>
            Contact us and we'll help your family get connected.
          </p>
        </div>
        <div className="grow-cta-actions">
          <Link className="button gold" to="/contact">
            <HeartHandshake size={17} aria-hidden="true" />
            Contact Us
          </Link>
          <Link className="button outline-light" to="/visit">
            Plan Your Visit
          </Link>
        </div>
      </section>
    </>
  );
}
