import { ArrowRight, BookOpen, CalendarDays, Heart, MessageCircleQuestion, Search, ShieldCheck, Sparkles, Sprout, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { siteImages } from "../data/images";
import { churchInfo } from "../data/site";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import "./KidsCircle.css";

const experiences = [
  { title: "Learn", text: "Hear God’s Word in a simple, memorable way.", icon: BookOpen },
  { title: "Discover", text: "Explore God’s love and biblical values.", icon: Search },
  { title: "Ask", text: "Wonder, question, and grow in understanding.", icon: MessageCircleQuestion },
  { title: "Belong", text: "Make friends and be loved by God’s family.", icon: UsersRound }
];

const related = [
  { title: "Sunday School · B.L.A.S.T.", meta: "Structured Bible learning", href: "/grow/sunday-school", icon: Sparkles },
  { title: "Bible Study & Prayer", meta: "For adults & families", href: "/grow/bible-study-prayer", icon: BookOpen },
  { title: "Worship", meta: "See the full Sunday experience", href: "/worship", icon: Heart }
];

export default function KidsCircle() {
  const experienceRef = useRevealOnScroll<HTMLElement>({ staggerChildren: true });
  const parentRef = useRevealOnScroll<HTMLElement>();

  return <>
    <section className="kc-hero" aria-labelledby="kc-title">
      <div className="kc-hero-copy">
        <span className="kc-hero-kicker"><span lang="ta">குழந்தைகள் வட்டம்</span><small>Grow</small></span>
        <h1 id="kc-title">A little space for faith to <em>bud and bloom.</em></h1>
        <p>During Sunday worship, Kids Circle gives children a brief, joyful place to hear God’s Word, ask questions, make friends, and know they are loved.</p>
        <Link className="kc-primary" to="/visit">Plan a family visit <ArrowRight size={17}/></Link>
      </div>
      <div className="kc-hero-visual">
        <img src={siteImages.kidsMinistry.src} alt={siteImages.kidsMinistry.alt} width="1200" height="900" style={{objectPosition:siteImages.kidsMinistry.objectPosition}} />
        <aside className="kc-hero-card" aria-label="Kids Circle details"><span>During Sunday worship</span><strong>Kids Circle</strong><p>Brief Bible teaching and biblical values for young hearts.</p><ul><li><CalendarDays size={16}/> Every Sunday</li><li><ShieldCheck size={16}/> Warm and child-friendly</li></ul><Link to="/contact">Ask a parent question <ArrowRight size={14}/></Link></aside>
      </div>
    </section>

    <section className="kc-experience reveal" ref={experienceRef} aria-labelledby="kc-experience-title">
      <SectionHeader eyebrow="A joyful moment in worship" title="What children experience" text="Kids Circle is intentionally brief, accessible, and full of opportunities for children to participate." />
      <div className="kc-experience-list" id="kc-experience-title">{experiences.map((item,index)=>{const Icon=item.icon;return <article className="kc-experience-row" key={item.title} data-reveal-child><span className="kc-row-number">{String(index+1).padStart(2,"0")}</span><span className="kc-row-icon"><Icon size={21}/></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>;})}</div>
    </section>

    <section className="kc-parent-band reveal" ref={parentRef} aria-labelledby="kc-parent-title">
      <div className="kc-parent-copy"><span className="eyebrow">For parents</span><h2 id="kc-parent-title">Brief, meaningful, and part of worship.</h2><p>Kids Circle is not a separate children’s service. It is a welcoming moment within Sunday worship where children receive concise Bible teaching before continuing through the service with their family.</p><ul><li><Sparkles size={18}/><span>Designed for children’s attention</span></li><li><BookOpen size={18}/><span>Rooted in God’s Word</span></li><li><ShieldCheck size={18}/><span>Led with warmth and care</span></li></ul></div>
      <div className="kc-parent-image"><img src={siteImages.sundaySchool.src} alt={siteImages.sundaySchool.alt} loading="lazy" width="1200" height="900" style={{objectPosition:siteImages.sundaySchool.objectPosition}} /></div>
    </section>

    <section className="kc-blast" aria-labelledby="kc-blast-title"><div><span className="eyebrow">The next step for children</span><h2 id="kc-blast-title">Kids Circle opens the door. B.L.A.S.T. goes deeper.</h2><p>Both are part of our children’s ministry. Kids Circle is the brief teaching moment during worship; B.L.A.S.T. Sunday School offers structured Bible Learning And Spiritual Training during the sermon.</p><Link to="/grow/sunday-school">Explore B.L.A.S.T. Sunday School <ArrowRight size={15}/></Link></div><div className="kc-blast-words" aria-label="B.L.A.S.T. means Bible Learning And Spiritual Training"><span><strong>B</strong>Bible</span><span><strong>L</strong>Learning</span><span><strong>A</strong>And</span><span><strong>S</strong>Spiritual</span><span><strong>T</strong>Training</span></div></section>

    <section className="kc-verse" aria-labelledby="kc-verse-title"><blockquote><p>“Children are a gift from the Lord.”</p><cite>Psalm 127:3</cite></blockquote><div><span className="eyebrow">Bud & bloom</span><h2 id="kc-verse-title">Every child is a unique gift from God.</h2><p>We want children to know God’s love and experience the love of His people in a church family where they can learn, grow, discover, and belong.</p></div></section>

    <section className="kc-related" aria-labelledby="kc-related-title"><SectionHeader eyebrow="Continue growing" title="More for your family"/><div className="kc-related-list" id="kc-related-title">{related.map((item,index)=>{const Icon=item.icon;return <Link to={item.href} key={item.title}><span>{String(index+1).padStart(2,"0")}</span><Icon size={20}/><div><strong>{item.title}</strong><small>{item.meta}</small></div><ArrowRight size={17}/></Link>;})}</div><p className="kc-sunday-note">Join us {churchInfo.worship.schedule}. We’ll help your family know what to expect when you arrive.</p></section>
  </>;
}
