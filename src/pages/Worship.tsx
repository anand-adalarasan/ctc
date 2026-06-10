import FeatureRows from "../components/FeatureRows";
import SectionHeader from "../components/SectionHeader";
import { ministries } from "../data/site";

export default function Worship() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Worship</span>
        <h1>Sunday worship centered on Christ.</h1>
        <p>
          Music, prayer, Scripture, sermon, testimony, communion, and fellowship
          shape our worship as a church family.
        </p>
      </section>
      <section className="section green-band">
        <SectionHeader title="Our Sunday worship" />
        <FeatureRows items={ministries} variant="green" />
      </section>
    </>
  );
}
