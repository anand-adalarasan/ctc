import { ArrowRight, Facebook, Mail, Phone, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import { churchInfo } from "../data/site";
import { churchYoutubeChannelUrl } from "../data/sermonVideos";
import "./Contact.css";

const facebookPageUrl = "https://www.facebook.com/ChristTamilChurchChicago";

export default function Contact() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const reveals = Array.from(page.querySelectorAll<HTMLElement>(".contact-reveal"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );
    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="contact-page" ref={pageRef}>
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-shell contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="contact-hero-kicker"><span lang="ta">தொடர்பு</span><small>Contact</small></p>
            <h1 id="contact-title">Let&apos;s start a <em>conversation.</em></h1>
            <p className="contact-hero-lede">Questions, prayer requests, or help planning your first Sunday—we would love to hear from you.</p>
            <a className="contact-button contact-button-primary" href={churchInfo.contact.emailHref}>Email the church <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <aside className="contact-direct-card" aria-label="Reach us directly">
            <span className="contact-icon"><Mail size={22} aria-hidden="true" /></span>
            <p className="contact-card-label">Reach us directly</p>
            <h2>We&apos;re here to help.</h2>
            <ul>
              <li><Phone size={18} aria-hidden="true" /><a href={churchInfo.contact.phoneHref}>Call {churchInfo.contact.phone}</a></li>
              <li><Mail size={18} aria-hidden="true" /><a href={churchInfo.contact.emailHref}>{churchInfo.contact.email}</a></li>
            </ul>
            <a href={churchInfo.address.directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <section className="contact-band contact-closing contact-reveal" aria-labelledby="contact-closing-title">
        <div className="contact-shell contact-closing-grid">
          <a className="contact-social-card" href={facebookPageUrl} target="_blank" rel="noreferrer">
            <span className="contact-icon"><Facebook size={22} aria-hidden="true" /></span>
            <span><strong>Follow along on Facebook</strong>Updates, photos, and announcements from church life.</span>
            <span className="contact-social-link">Open Facebook page <ArrowRight size={17} aria-hidden="true" /></span>
          </a>
          <a className="contact-social-card" href={churchYoutubeChannelUrl} target="_blank" rel="noreferrer">
            <span className="contact-icon"><Youtube size={22} aria-hidden="true" /></span>
            <span><strong id="contact-closing-title">Watch on YouTube</strong>Worship, messages, and moments from Christ Tamil Church.</span>
            <span className="contact-social-link">Open YouTube channel <ArrowRight size={17} aria-hidden="true" /></span>
          </a>
        </div>
      </section>
    </main>
  );
}
