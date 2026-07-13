import SectionHeader from "../components/SectionHeader";
import { ExternalLink } from "lucide-react";
import { sermons } from "../data/site";

export default function Sermons() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Sermons</span>
        <h1>Listen to recent sermons and teaching.</h1>
        <p>
          Explore verified recordings preserved from the church's legacy sermon archive.
        </p>
      </section>
      <section className="section">
        <SectionHeader title="Sermon archive" />
        <div className="card-grid">
          {sermons.map((sermon) => (
            <article className="content-card" key={sermon.title}>
              <small>{sermon.date}</small>
              <h3>{sermon.title}</h3>
              <p>{sermon.text}</p>
              <span>{sermon.speaker}</span>
              <a href={sermon.href} target="_blank" rel="noreferrer">
                Watch recording <ExternalLink size={15} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
