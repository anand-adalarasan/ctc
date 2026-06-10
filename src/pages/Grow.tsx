import FeatureRows from "../components/FeatureRows";
import SectionHeader from "../components/SectionHeader";
import { growItems } from "../data/site";

export default function Grow() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Grow</span>
        <h1>Grow in Scripture, prayer, and discipleship.</h1>
        <p>
          The Grow page brings Bible Study, Sunday School, Kids Circle, and
          sermon resources into one clear pathway.
        </p>
      </section>
      <section className="section">
        <SectionHeader
          title="Formation for every age"
          text="A modern page structure for the current Bible study, Sunday school, and children's ministry content."
        />
        <FeatureRows items={growItems} />
      </section>
    </>
  );
}
