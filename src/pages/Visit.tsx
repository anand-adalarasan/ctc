import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  Coffee,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { beliefs, churchInfo } from "../data/site";
import { useRevealGroup } from "../hooks/useRevealGroup";
import "./Visit.css";

const missionPoints = [
  ["01", "Worship in Tamil", "Create a place for Tamil families to worship and praise God in Tamil."],
  ["02", "Grow in Christ", "Deepen our relationship with Jesus, become alive in Christ, and serve others."],
  ["03", "Serve our neighbors", "Support people in need and take part in mission throughout Chicagoland."],
  ["04", "Nurture families", "Pass faith, family values, and Tamil cultural identity to the next generation."]
];

export default function Visit() {
  const pageRef = useRevealGroup<HTMLElement>(".visit-reveal");

  return (
    <main className="visit-page" ref={pageRef}>
      <section className="visit-hero" aria-labelledby="visit-title">
        <div className="visit-shell visit-hero-grid">
          <div className="visit-hero-copy">
            <p className="visit-hero-kicker">
              <span lang="ta">வரவேற்கிறோம்</span>
              <small>I’m New</small>
            </p>
            <h1 id="visit-title">A church home where you can <em>belong.</em></h1>
            <p className="visit-hero-lede">Whether this is your first time in church or you are looking for a Tamil Christian community, we would love to welcome you this Sunday.</p>
          </div>

          <aside className="visit-sunday-card" aria-label="This Sunday at Christ Tamil Church">
            <span className="visit-icon"><CalendarDays size={22} aria-hidden="true" /></span>
            <p className="visit-card-label">This Sunday</p>
            <h2>{churchInfo.worship.time}</h2>
            <ul>
              <li><Clock size={17} aria-hidden="true" /> Worship begins at 10:30</li>
              <li><MapPin size={17} aria-hidden="true" /> {churchInfo.address.short}</li>
              <li><Coffee size={17} aria-hidden="true" /> Fellowship after worship</li>
            </ul>
            <a href={churchInfo.address.directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <section className="visit-band visit-welcome visit-reveal" aria-labelledby="welcome-title">
        <div className="visit-shell visit-split">
          <a className="visit-map" href={churchInfo.address.directionsUrl} target="_blank" rel="noreferrer">
            <span className="visit-map-pin"><MapPin size={28} aria-hidden="true" /></span>
            <span><strong>{churchInfo.address.street}</strong>{churchInfo.address.city}, {churchInfo.address.state} {churchInfo.address.zip}</span>
            <span className="visit-map-link">Open in Google Maps <ArrowRight size={17} aria-hidden="true" /></span>
          </a>
          <div>
            <p className="visit-eyebrow">What to expect</p>
            <h2 id="welcome-title">Join us for worship, children’s ministry, and fellowship.</h2>
            <p>Our Sunday gathering includes Tamil and English worship, prayer, Scripture, and Bible teaching. Children can take part in age-appropriate ministry, and everyone is invited to stay afterward for fellowship.</p>
            <Link className="visit-text-link" to="/worship">Learn about Sunday worship <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="visit-band visit-mission visit-reveal" id="mission" aria-labelledby="mission-title">
        <div className="visit-shell">
          <div className="visit-mission-intro">
            <header className="visit-heading">
              <p className="visit-eyebrow">Who we are</p>
              <h2 id="mission-title">A Bible-based home church for Tamil families.</h2>
            </header>
            <blockquote>“Our goal is to revive believers, live by love, and provide a Bible-based home church for Tamil families in the Chicago area.”</blockquote>
          </div>
          <div className="visit-mission-list">
            {missionPoints.map(([number, title, text]) => <article key={number}>
              <span>{number}</span><BookOpen size={20} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="visit-band visit-faith visit-reveal" id="beliefs" aria-labelledby="beliefs-title">
        <div className="visit-shell visit-faith-grid">
          <header className="visit-heading visit-faith-heading">
            <p className="visit-eyebrow">Our faith</p>
            <h2 id="beliefs-title">Rooted in Scripture. Centered on Jesus.</h2>
            <p>Our shared life is shaped by the historic Christian faith and the good news of grace through Jesus Christ.</p>
          </header>
          <div className="visit-belief-list">
            {beliefs.map((belief) => <details key={belief.title} className="visit-belief">
              <summary><span className="visit-check"><Check size={15} aria-hidden="true" /></span>{belief.title}<span className="visit-plus" aria-hidden="true">+</span></summary>
              <p>{belief.text}</p>
            </details>)}
          </div>
        </div>
      </section>

    </main>
  );
}
