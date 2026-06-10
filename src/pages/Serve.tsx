import FeatureRows from "../components/FeatureRows";
import SectionHeader from "../components/SectionHeader";
import { growItems } from "../data/site";

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
      <section className="section sage">
        <SectionHeader title="Ways to serve" />
        <FeatureRows items={growItems.filter((item) => item.title === "Community Outreach")} variant="green" />
      </section>
    </>
  );
}
