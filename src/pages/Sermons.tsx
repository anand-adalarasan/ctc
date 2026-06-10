import SectionHeader from "../components/SectionHeader";
import { sermons } from "../data/site";

export default function Sermons() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Sermons</span>
        <h1>Listen to recent sermons and teaching.</h1>
        <p>
          The current audio sermons area becomes a clean archive with room for
          future filters, audio embeds, and video links.
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
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
