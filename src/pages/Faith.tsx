import SectionHeader from "../components/SectionHeader";
import { beliefs } from "../data/site";

export default function Faith() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Our faith</span>
        <h1>Statement of Faith</h1>
        <p>
          A fuller expression of what Christ Tamil Church believes, rooted in
          Scripture and centered on the Lord Jesus Christ.
        </p>
      </section>

      <section className="section faith-page-section">
        <SectionHeader
          eyebrow="This is what we believe"
          title="One God. One Savior. One Scripture-shaped life."
        />
        <div className="belief-statement-list">
          {beliefs.map((belief, index) => (
            <article className="belief-statement-card" key={belief.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{belief.title}</h3>
                <p>{belief.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
