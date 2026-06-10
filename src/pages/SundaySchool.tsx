import { Link } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  Heart,
  HeartHandshake,
  Lightbulb,
  School,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import {
  ChildMinistryHeroCard,
  MinistryFeatureGrid,
  ParentFamilyCta,
  RelatedGrowPages
} from "../components/ChildrenMinistry";
import SectionHeader from "../components/SectionHeader";

const blastItems = [
  {
    letter: "B",
    word: "Bible",
    text: "Children learn the truth of God's Word."
  },
  {
    letter: "L",
    word: "Learning",
    text: "Lessons are taught in a way children can understand and remember."
  },
  {
    letter: "A",
    word: "And",
    text: "Faith grows through connection, questions, and encouragement."
  },
  {
    letter: "S",
    word: "Spiritual",
    text: "Children are guided to grow in their relationship with God."
  },
  {
    letter: "T",
    word: "Training",
    text: "Children are equipped to follow Jesus in everyday life."
  }
];

const experienceItems = [
  {
    title: "Gospel-Centered Lessons",
    text: "Children experience the gospel of Jesus Christ through Bible-based teaching.",
    icon: BookOpen
  },
  {
    title: "Experienced Leaders",
    text: "Caring leaders guide children with patience, wisdom, and love.",
    icon: HeartHandshake
  },
  {
    title: "Age-Appropriate Learning",
    text: "Lessons and activities are designed to help children understand and apply God's Word.",
    icon: Lightbulb
  },
  {
    title: "Loved by God's Family",
    text: "Our hope is that every child knows the love of God and the love of God's family.",
    icon: Heart
  }
];

const visitorChecklist = [
  "Kids of all ages welcome",
  "Bible-based teaching",
  "Caring leaders",
  "Child-friendly learning",
  "Family-centered church community"
];

const relatedGrowPages = [
  {
    title: "Kids Circle",
    text: "A joyful time during Sunday service where children learn God's Word and Biblical values.",
    href: "/grow/kids-circle",
    icon: UsersRound
  },
  {
    title: "Bible Study / Prayer",
    text: "Grow in God's Word and prayer with the church family.",
    href: "/grow/bible-study-prayer",
    icon: BookOpen
  },
  {
    title: "Audio Sermons",
    text: "Listen to Scripture-based teaching and messages.",
    href: "/sermons",
    icon: School
  }
];

export default function SundaySchool() {
  return (
    <>
      <section className="page-hero sunday-school-hero">
        <div className="sunday-school-hero-copy">
          <span className="eyebrow">Grow</span>
          <h1>Helping children grow strong in God's Word.</h1>
          <p>
            Through B.L.A.S.T. &mdash; Bible Learning And Spiritual Training
            &mdash; children experience the gospel of Jesus Christ in a joyful,
            memorable, and age-appropriate way.
          </p>
        </div>

        <ChildMinistryHeroCard
          className="blast-hero-card"
          iconClassName="blast-card-icon"
          icon={Sparkles}
          title="B.L.A.S.T."
          titleId="blast-card-title"
          subtitle="Bible Learning And Spiritual Training"
          details={[
            { icon: CalendarDays, text: "Every Sunday" },
            { icon: BookOpen, text: "During sermon / children's ministry time" },
            { icon: UsersRound, text: "Kids of all ages welcome" }
          ]}
          buttonText="Plan a Visit"
          buttonHref="/visit"
        />
      </section>

      <section className="section sunday-school-intro-section">
        <article className="blast-intro-card">
          <span className="eyebrow">Sunday School</span>
          <h2>Join In. Team Up. Get Strong. Keep On. Celebrate.</h2>
          <p>
            At Christ Tamil Church, we believe children grow spiritually as they
            learn God's Word, obey His teaching, and share the joy, peace, and
            love of Christ with others. Sunday School is a place where children
            are welcomed, taught, encouraged, and loved.
          </p>
        </article>
      </section>

      <section className="section blast-acronym-section">
        <SectionHeader
          eyebrow="Bible Learning And Spiritual Training"
          title="What is B.L.A.S.T.?"
        />
        <div className="blast-acronym-grid">
          {blastItems.map((item) => (
            <article className="blast-acronym-card" key={item.letter}>
              <span aria-hidden="true">{item.letter}</span>
              <div>
                <h3>{item.word}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blast-experience-band">
        <div className="blast-experience-inner">
          <SectionHeader
            eyebrow="Children's Ministry"
            title="A Sunday School Experience Children Remember"
            align="center"
          />
          <MinistryFeatureGrid
            items={experienceItems}
            gridClassName="blast-experience-grid"
            cardClassName="blast-experience-card"
          />
        </div>
      </section>

      <section className="section blast-schedule-section">
        <SectionHeader title="When Sunday School Happens" />
        <article className="blast-schedule-card">
          <div>
            <span className="blast-schedule-icon" aria-hidden="true">
              <CalendarDays size={26} />
            </span>
            <h3>Sunday School</h3>
            <strong>Every Sunday</strong>
            <p>
              Classes begin as the church gets ready for God's Message / Sermon.
            </p>
          </div>
          <div>
            <span className="blast-schedule-icon" aria-hidden="true">
              <ShieldCheck size={26} />
            </span>
            <h3>Children's Ministry</h3>
            <strong>Kids of all ages are welcome.</strong>
            <p>
              Experienced leaders use strong Bible study resources to present
              the gospel in a way children will remember.
            </p>
          </div>
          <Link className="button primary" to="/contact">
            Contact Us
          </Link>
        </article>
      </section>

      <ParentFamilyCta
        className="blast-parent-cta"
        panelClassName="blast-parent-panel"
        actionsClassName="blast-parent-actions"
        eyebrow="For Parents"
        title="Bringing your child for the first time?"
        titleId="blast-parent-title"
        text="We would love to welcome your family. Our children's ministry is designed to be warm, safe, joyful, and rooted in God's Word."
        checklist={visitorChecklist}
      />

      <RelatedGrowPages
        sectionClassName="blast-related-section"
        gridClassName="blast-related-grid"
        cardClassName="blast-related-card"
        pages={relatedGrowPages}
      />
    </>
  );
}
