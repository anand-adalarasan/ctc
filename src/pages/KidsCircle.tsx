import { Link } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  Heart,
  HeartHandshake,
  MessageCircleQuestion,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  UsersRound
} from "lucide-react";
import {
  BlastAcronymStrip,
  ChildMinistryHeroCard,
  MinistryFeatureGrid,
  ParentFamilyCta,
  RelatedGrowPages
} from "../components/ChildrenMinistry";
import SectionHeader from "../components/SectionHeader";

const experienceItems = [
  {
    title: "Learn",
    text: "Children learn God's Word in a simple and meaningful way.",
    icon: BookOpen
  },
  {
    title: "Grow",
    text: "Children are encouraged to grow in faith and character.",
    icon: Sprout
  },
  {
    title: "Discover",
    text: "Children discover God's love and Biblical truth.",
    icon: Search
  },
  {
    title: "Ask Questions",
    text: "Children are welcomed to ask, wonder, and understand.",
    icon: MessageCircleQuestion
  },
  {
    title: "Make Friends",
    text: "Children build friendships in a caring church family.",
    icon: UsersRound
  },
  {
    title: "Be Loved",
    text: "Children experience the love of God and the love of His people.",
    icon: Heart
  }
];

const sundayServiceItems = [
  {
    title: "Brief & Meaningful",
    text: "Short lessons designed for children's attention and understanding.",
    icon: Sparkles
  },
  {
    title: "Bible-Based",
    text: "Teaching rooted in God's Word and Biblical values.",
    icon: BookOpen
  },
  {
    title: "Warm & Safe",
    text: "A loving environment where children are welcomed and cared for.",
    icon: ShieldCheck
  }
];

const blastStrip = ["Bible", "Learning", "And", "Spiritual", "Training"];

const visitorChecklist = [
  "During Sunday service",
  "Child-friendly Bible teaching",
  "Safe and loving environment",
  "Encourages questions and discovery",
  "Connected to Sunday School ministry"
];

const relatedGrowPages = [
  {
    title: "Sunday School - B.L.A.S.T.",
    text: "Bible Learning And Spiritual Training for children of all ages.",
    href: "/grow/sunday-school",
    icon: Sparkles
  },
  {
    title: "Bible Study / Prayer",
    text: "Grow in God's Word and prayer with the church family.",
    href: "/grow/bible-study-prayer",
    icon: BookOpen
  },
  {
    title: "Worship",
    text: "Learn what to expect during Sunday worship.",
    href: "/worship",
    icon: HeartHandshake
  }
];

export default function KidsCircle() {
  return (
    <>
      <section className="page-hero kids-circle-hero">
        <div className="kids-circle-hero-copy">
          <span className="eyebrow">Grow</span>
          <h1>A joyful place for children to bud and bloom.</h1>
          <p>
            During Sunday service, Kids Circle helps children learn God's Word,
            discover Biblical values, ask questions, make friends, and
            experience God's love.
          </p>
        </div>

        <ChildMinistryHeroCard
          className="kids-hero-card"
          iconClassName="kids-card-icon"
          icon={Sprout}
          title="Kids Circle"
          titleId="kids-circle-card-title"
          details={[
            { icon: CalendarDays, text: "During Sunday Service" },
            { icon: BookOpen, text: "Brief Bible teaching" },
            { icon: Heart, text: "Biblical values" },
            { icon: ShieldCheck, text: "Safe, loving, child-friendly" }
          ]}
          buttonText="I'm New"
          buttonHref="/visit"
        />
      </section>

      <section className="section kids-intro-section">
        <article className="kids-intro-card">
          <span className="eyebrow">Children's Ministry</span>
          <h2>Bud &amp; Bloom</h2>
          <p>
            At Christ Tamil Church, we believe every child is a unique gift
            from God. Kids Circle gives children a warm and joyful place to
            learn, grow, discover, ask questions, build friendships, and be
            loved.
          </p>
          {/* TODO: Add a children's ministry image here when a high-quality church photo is available. */}
        </article>
      </section>

      <section className="section kids-experience-section">
        <SectionHeader title="What Children Experience" />
        <MinistryFeatureGrid
          items={experienceItems}
          gridClassName="kids-experience-grid"
          cardClassName="kids-experience-card"
          iconSize={23}
        />
      </section>

      <section className="kids-service-band">
        <div className="kids-service-inner">
          <SectionHeader
            eyebrow="Sunday Worship"
            title="Designed for Sunday Worship"
            text="Kids Circle happens during Sunday service and teaches God's Word and Biblical values in a brief, concise, and child-friendly way."
            align="center"
          />
          <MinistryFeatureGrid
            items={sundayServiceItems}
            gridClassName="kids-service-grid"
            cardClassName="kids-service-card"
          />
        </div>
      </section>

      <section className="section kids-blast-section">
        <div className="kids-blast-layout">
          <div>
            <span className="eyebrow">B.L.A.S.T.</span>
            <h2>Part of B.L.A.S.T. Children's Ministry</h2>
            <p>
              Kids Circle is part of B.L.A.S.T. &mdash; Bible Learning And
              Spiritual Training &mdash; Christ Tamil Church's children's
              ministry where kids experience the gospel of Jesus Christ.
            </p>
            <Link className="button primary" to="/grow/sunday-school">
              Learn About Sunday School
            </Link>
          </div>
          <BlastAcronymStrip className="kids-blast-strip" words={blastStrip} />
        </div>
      </section>

      <ParentFamilyCta
        className="kids-parent-cta"
        panelClassName="kids-parent-panel"
        actionsClassName="kids-parent-actions"
        eyebrow="First-Time Families"
        title="Bringing your child for the first time?"
        titleId="kids-parent-title"
        text="We would love to welcome your family. Kids Circle is designed to help children feel comfortable, loved, and included during Sunday worship."
        checklist={visitorChecklist}
      />

      <RelatedGrowPages
        sectionClassName="kids-related-section"
        gridClassName="kids-related-grid"
        cardClassName="kids-related-card"
        pages={relatedGrowPages}
      />
    </>
  );
}
