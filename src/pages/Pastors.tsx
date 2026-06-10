import SectionHeader from "../components/SectionHeader";
import { pastors } from "../data/site";

export default function Pastors() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Pastors</span>
        <h1>Pastoral leadership for worship, care, and discipleship.</h1>
        <p>
          Pastor profiles from the current website are preserved in a cleaner,
          more readable editorial layout.
        </p>
      </section>
      <section className="section">
        <SectionHeader title="Meet our pastors" />
        <div className="pastor-list">
          {pastors.map((pastor) => (
            <article className="pastor-card" key={pastor.name}>
              <div className="pastor-photo" aria-hidden="true" />
              <div>
                <h3>{pastor.name}</h3>
                <small>{pastor.role}</small>
                <p>{pastor.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
