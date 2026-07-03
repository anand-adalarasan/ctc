import { Link } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  Church,
  Clock,
  Coffee,
  Globe2,
  HandHeart,
  HeartHandshake,
  MapPin,
  MicVocal,
  Music,
  School,
  Users,
  UsersRound
} from "lucide-react";
import heroSanctuary from "../assets/images/hero-sanctuary.jpg";
import storyPrayer from "../assets/images/story-prayer.jpg";
import ministryCommunion from "../assets/images/ministry-communion.jpg";
import ministryFellowship from "../assets/images/ministry-fellowship.jpg";
import ministryKids from "../assets/images/ministry-kids.jpg";
import ministryMusic from "../assets/images/ministry-music.jpg";
import ministryPrayer from "../assets/images/ministry-prayer.jpg";
import ministrySchool from "../assets/images/ministry-school.jpg";
import ministrySermon from "../assets/images/ministry-sermon.jpg";
import ministryTestimony from "../assets/images/ministry-testimony.jpg";
import { churchInfo } from "../data/site";

const worshipFlow = [
  {
    title: "Music",
    text: "Lift your voice in Tamil and English worship as we praise God together.",
    icon: Music
  },
  {
    title: "Testimony",
    text: "Hear stories of God's faithfulness and be encouraged in your walk with Christ.",
    icon: MicVocal
  },
  {
    title: "Kids Circle",
    text: "A simple and joyful time for children to learn God's Word and His love.",
    icon: Users
  },
  {
    title: "Prayer",
    text: "We pray together for our church, our families, our community, and one another.",
    icon: HeartHandshake
  },
  {
    title: "Sunday School",
    text: "Children continue learning Scripture through age-appropriate Bible lessons.",
    icon: School
  },
  {
    title: "Sermon",
    text: "Scripture-based teaching that helps us follow Jesus in everyday life.",
    icon: BookOpen
  },
  {
    title: "Holy Communion",
    text: "We remember Christ's sacrifice and celebrate His grace through communion.",
    icon: Church
  },
  {
    title: "Fellowship",
    text: "Stay after worship to connect, encourage one another, and share life together.",
    icon: HandHeart
  }
];

const generationCards = [
  {
    title: "Kids Circle",
    text: "Engaging Bible stories, songs, and activities for children.",
    image: ministryKids,
    alt: "Children gathered for Kids Circle at church",
    icon: UsersRound
  },
  {
    title: "Sunday School",
    text: "Age-appropriate Bible teaching to build a strong foundation of faith.",
    image: ministrySchool,
    alt: "Children learning together during Sunday School",
    icon: BookOpen
  },
  {
    title: "Family Worship",
    text: "Worship together as one family across every stage of life.",
    // TODO: Replace with a congregation or family worship photo when one is available.
    image: heroSanctuary,
    alt: "Church sanctuary prepared for family worship",
    icon: Church
  }
];

const worshipImages = [
  { src: ministryMusic, alt: "Church worship team leading music" },
  { src: ministryTestimony, alt: "A microphone ready for testimony and worship" },
  { src: ministryPrayer, alt: "Hands folded in prayer during worship" },
  { src: ministrySermon, alt: "An open Bible for Scripture teaching during worship" },
  { src: ministryCommunion, alt: "Bread and cup prepared for holy communion" }
];

export default function Worship() {
  return (
    <>
      <section className="worship-hero">
        <div className="worship-hero-copy">
          <span className="eyebrow">Worship</span>
          <h1>Sunday worship centered on Christ.</h1>
          <p>
            Music, prayer, Scripture, sermon, testimony, communion, and
            fellowship shape our worship as a church family.
          </p>
        </div>

        <aside className="worship-hero-card" aria-labelledby="sunday-worship-title">
          <span className="worship-card-icon" aria-hidden="true">
            <CalendarDays size={24} />
          </span>
          <h2 id="sunday-worship-title">Sunday Worship</h2>
          <ul className="worship-detail-list">
            <li>
              <Clock size={18} aria-hidden="true" />
              <span>{churchInfo.worship.time}</span>
            </li>
            <li>
              <Globe2 size={18} aria-hidden="true" />
              <span>Tamil &amp; English Worship</span>
            </li>
            <li>
              <UsersRound size={18} aria-hidden="true" />
              <span>Family Friendly</span>
            </li>
            <li>
              <Coffee size={18} aria-hidden="true" />
              <span>Fellowship After Service</span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="worship-expect-section">
        <div className="worship-expect-copy">
          <span className="eyebrow">What to expect</span>
          <p>
            Our Sunday worship is Christ-centered, Scripture-rooted, and
            Spirit-led. You'll experience biblical teaching, heartfelt worship,
            meaningful prayer, and warm fellowship in a family where everyone
            belongs.
          </p>
        </div>
        <div className="worship-expect-image">
          <img src={storyPrayer} alt="Hands folded in prayer beside an open Bible" />
        </div>
      </section>

      <section className="worship-flow-band" aria-labelledby="worship-flow-title">
        <div className="worship-flow-inner">
          <div className="section-header">
            <h2 id="worship-flow-title">Our Sunday worship</h2>
          </div>
          <div className="worship-flow-layout">
            <div className="worship-image-stack">
              {worshipImages.map((image) => (
                <img key={image.src} src={image.src} alt={image.alt} />
              ))}
            </div>
            <div className="worship-flow-grid">
              {worshipFlow.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="worship-flow-card" key={item.title}>
                    <span className="worship-flow-icon" aria-hidden="true">
                      <Icon size={25} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="worship-generation-section" aria-labelledby="generation-title">
        <div className="section-header center">
          <h2 id="generation-title">A Place for Every Generation</h2>
        </div>
        <div className="worship-generation-grid">
          {generationCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="worship-generation-card" key={card.title}>
                <span className="worship-generation-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div className="worship-generation-copy">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
                <img src={card.image} alt={card.alt} />
              </article>
            );
          })}
        </div>

        <div className="worship-horizontal-grid">
          <article className="worship-horizontal-card">
            <img src={ministryCommunion} alt="Bread and cup for holy communion" />
            <div>
              <h3>Holy Communion</h3>
              <p>
                We remember Christ's sacrifice and celebrate the new life we
                have in Him. Everyone is welcome.
              </p>
            </div>
          </article>
          <article className="worship-horizontal-card">
            <img src={ministryFellowship} alt="Church family sharing fellowship after service" />
            <div>
              <h3>Fellowship</h3>
              <p>
                Stay back after the service for coffee, conversation, and
                community.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="worship-cta" aria-labelledby="first-time-title">
        <div className="worship-cta-icon" aria-hidden="true">
          <Church size={38} />
        </div>
        <div>
          <h2 id="first-time-title">Visiting for the first time?</h2>
          <p>
            We'd love to welcome you and your family. Plan your visit and let
            us know how we can help.
          </p>
        </div>
        <div className="worship-cta-actions single">
          <Link className="button outline-light" to="/visit">
            <MapPin size={17} aria-hidden="true" />
            Get Directions
          </Link>
        </div>
      </section>
    </>
  );
}
