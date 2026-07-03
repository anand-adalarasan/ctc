import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { churchInfo } from "../../data/site";
import styles from "./ThreeLights.module.css";

type Light = { time: string; label: [string, string]; hint: string };

const LIGHTS: Light[] = [
  { time: churchInfo.worship.compactTime, label: ["Worship", "Tamil & English"], hint: "Praise, prayer & the Word." },
  { time: "During", label: ["Sunday School", "B.L.A.S.T. · kids & teens"], hint: "Bible-based learning for every child." },
  { time: "After", label: ["Fellowship", "food & friends"], hint: "Chai, a meal & good company." }
];

export default function ThreeLights() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.in);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-label="Every Sunday">
      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>
            Every Sunday
            <span className={styles.rule} />
          </span>
          <h2 className={styles.title}>
            Three lights, <span className={styles.accent}>one morning.</span>
          </h2>
          <p className={styles.intro}>
            One service, three ways to belong — come for one, stay for all
            three. There's a place for every age.
          </p>
        </header>

        <div className={styles.lights}>
          <span className={styles.travel} aria-hidden="true" />
          {LIGHTS.map((light) => {
            const [hour, minute] = light.time.includes(":") ? light.time.split(":") : [light.time, null];

            return (
              <div key={light.label[0]} className={styles.col}>
                <span className={styles.node} aria-hidden="true" />
                <div className={styles.time}>
                  {hour}
                  {minute !== null && <span className={styles.colon}>:</span>}
                  {minute}
                </div>
                <div className={styles.label}>
                  {light.label[0]}
                  <br />
                  {light.label[1]}
                </div>
                <div className={styles.hint}>{light.hint}</div>
              </div>
            );
          })}
        </div>

        <div className={styles.footnote}>Plus Wednesdays · Bible Study &amp; Prayer · 7:30 PM</div>

        <div className={styles.find}>
          <div className={styles.findCard}>
            <div className={styles.findKicker}>Find us</div>
            <div className={styles.findAddr}>{churchInfo.address.full}</div>
            <div className={styles.findSub}>Free parking · everyone welcome</div>
            <div className={styles.findBtns}>
              <a
                className={`${styles.btn} ${styles.btnFill}`}
                href={churchInfo.address.directionsUrlDirect}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={churchInfo.contact.phoneHref}>
                {churchInfo.contact.phone}
              </a>
            </div>
          </div>
          <a
            className={styles.map}
            href={churchInfo.address.directionsUrlDirect}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Christ Tamil Church location in Google Maps"
          >
            <MapPin size={26} aria-hidden="true" />
            <span>Open map and directions</span>
          </a>
        </div>
      </div>
    </section>
  );
}
