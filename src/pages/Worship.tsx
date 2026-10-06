import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Church, Coffee, Globe2, HeartHandshake, MicVocal, Music, School, UsersRound } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { siteImages } from "../data/images";
import { pathwayLabels } from "../data/ministryPathways";
import { churchInfo } from "../data/site";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import "./Worship.css";
import "./PageHeroTypography.css";

const flow = [
  { title: "Music", meta: "Tamil & English", text: "Our service begins with live, upbeat, intimate worship songs in Tamil and English. You may sing, clap, raise your hands, or quietly reflect—worship in the way that comes from your heart.", icon: Music },
  { title: "Testimony", meta: "A witness for Christ", text: "Sharing what God has done is an important part of Sunday worship, strengthening our spiritual growth and our relationship with Him.", icon: MicVocal },
  { title: "Kids Circle", meta: "During the service", text: "Every child is a unique gift from God. Kids Circle gives children a place to learn, grow, ask questions, make friends, and discover God's Word and Biblical values.", icon: UsersRound, href: "/grow/kids-circle" },
  { title: "Prayer", meta: "Scripture & hymns", text: "Worship continues with pastoral prayer, an English hymn, and a first Bible reading led by a teen or young adult.", icon: HeartHandshake },
  { title: "Sunday School", meta: "B.L.A.S.T.", text: "After the second hymn, children leave for B.L.A.S.T. Sunday School, where they joyfully sing and experience impactful Bible learning.", icon: School, href: "/grow/sunday-school" },
  { title: "Sermon", meta: "Relevant Biblical teaching", text: "Each Sunday you will hear a straightforward, Scripture-based message that applies to life today and helps build a growing, vibrant relationship with Jesus Christ.", icon: BookOpen, href: "/sermons" },
  { title: "Holy Communion", meta: "First Sundays & festival days", text: "We celebrate Holy Communion together on the first Sunday of the month and on festival days.", icon: Church },
  { title: "Fellowship", meta: "After the service", text: "After worship, join us in the fellowship hall. Meet our hospitable church family and enjoy Christian fellowship together.", icon: Coffee, href: "/connect" }
];

export default function Worship() {
  const flowRef = useRevealOnScroll<HTMLElement>({ staggerChildren: true });
  return <>
    <section className="worship-page-hero" aria-labelledby="worship-title">
      <div className="worship-page-hero-copy">
        <div className="worship-hero-kicker pathway-marker">
          <div className="pathway-marker-copy">
            <span lang="ta">{pathwayLabels.worship.ta}</span>
            <small>{pathwayLabels.worship.en}</small>
          </div>
          <span className="pathway-marker-rule" aria-hidden="true" />
        </div>
        <h1 id="worship-title">Come as you are. <em>Worship with us.</em></h1>
        <p>Join a warm Tamil church family for Christ-centered worship, Scripture, prayer, and fellowship this Sunday.</p>
      </div>
      <div className="worship-page-hero-visual">
        <img src={siteImages.worship.src} alt={siteImages.worship.alt} width="1400" height="960" style={{ objectPosition: siteImages.worship.objectPosition }} />
        <aside className="worship-service-card" aria-label="Sunday worship details">
          <span>This Sunday</span><strong>{churchInfo.worship.time}</strong>
          <ul><li><CalendarDays size={16} /> Sunday worship</li><li><Globe2 size={16} /> Tamil &amp; English</li></ul>
          <a href={churchInfo.address.directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={15} /></a>
        </aside>
      </div>
    </section>

    <section className="worship-flow-section reveal" ref={flowRef} aria-labelledby="flow-title">
      <SectionHeader eyebrow="Our Sunday worship" title="What happens in worship" text="From the opening song to fellowship after the service, every part helps us know and follow Christ together." />
      <div className="worship-flow-list" id="flow-title">{flow.map((item,index) => { const Icon=item.icon; return <article className="worship-flow-row" key={item.title} data-reveal-child><span className="worship-flow-number">{String(index+1).padStart(2,"0")}</span><span className="worship-flow-icon"><Icon size={21} /></span><div><h3>{item.title}</h3><span>{item.meta}</span>{item.href && <Link className="worship-flow-link" to={item.href}>Learn more <ArrowRight size={14}/></Link>}</div><p>{item.text}</p></article>; })}</div>
    </section>
  </>;
}
