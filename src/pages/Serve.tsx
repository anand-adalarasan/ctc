import { HandHeart, HeartHandshake, Package, Utensils, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const outreachActivities = [
  { title: "Pack food", text: "Help prepare food packages for children and families facing hunger.", icon: Package },
  { title: "Serve meals", text: "Join opportunities to serve food and offer practical care to neighbors in need.", icon: Utensils },
  { title: "Donation drives", text: "Support verified collection efforts for people experiencing hardship.", icon: HandHeart }
];

export default function Serve() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Serve</span>
        <h1>Serve neighbors with compassion and prayer.</h1>
        <p>
          Community outreach and ministry teams help the church witness to
          Christ through practical love.
        </p>
      </section>
      <section className="section sage" aria-labelledby="serve-ways-title">
        <SectionHeader eyebrow="Community outreach" title="Practical ways we care for our neighbors" />
        <span className="sr-only" id="serve-ways-title">Practical ways we care for our neighbors</span>
        <div className="card-grid">
          {outreachActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <article className="content-card" key={activity.title}>
                <Icon size={25} aria-hidden="true" />
                <h3>{activity.title}</h3>
                <p>{activity.text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="section about-closing" aria-labelledby="serve-next-title">
        <HeartHandshake size={28} aria-hidden="true" />
        <span className="eyebrow">Serve with us</span>
        <h2 id="serve-next-title">Ask about the next outreach opportunity.</h2>
        <p>Schedules change, so contact the church for the next verified opportunity to participate.</p>
        <Link className="button primary" to="/contact">
          Contact the Church <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
