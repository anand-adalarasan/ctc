import { Link } from "react-router-dom";
import FeatureRows from "../components/FeatureRows";
import SectionHeader from "../components/SectionHeader";
import { nextSteps, quickLinks } from "../data/site";

export default function Visit() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Visit</span>
        <h1>Plan your Sunday with Christ Tamil Church.</h1>
        <p>
          Find worship details, directions, children's ministry information, and
          what to expect when you join us.
        </p>
      </section>
      <section className="section">
        <SectionHeader title="Before you arrive" text="A simple guide for your first visit." />
        <FeatureRows items={quickLinks} />
      </section>
      <section className="split-section">
        <div className="map-panel">Map and directions</div>
        <div className="split-copy">
          <span className="eyebrow">Sunday gathering</span>
          <h2>Worship, children, and fellowship in one weekly rhythm.</h2>
          <p>
            Come as you are. Families are welcome, children can participate in
            age-appropriate ministry, and fellowship continues after worship.
          </p>
          <Link className="button primary" to="/contact">
            Ask a Question
          </Link>
        </div>
      </section>
      <section className="section sage">
        <SectionHeader title="Next steps after visiting" />
        <FeatureRows items={nextSteps} variant="green" />
      </section>
    </>
  );
}
