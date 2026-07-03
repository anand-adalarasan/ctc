import { useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { churchInfo } from "../data/site";

const facebookPageUrl = "https://www.facebook.com/ChristTamilChurchChicago";
const facebookEmbedHeight = 620;

export default function Contact() {
  const embedRef = useRef<HTMLDivElement>(null);
  const [embedWidth, setEmbedWidth] = useState(500);

  useEffect(() => {
    const embedElement = embedRef.current;

    if (!embedElement) {
      return;
    }

    const updateEmbedWidth = () => {
      const nextWidth = Math.floor(embedElement.getBoundingClientRect().width);
      setEmbedWidth(Math.min(500, Math.max(280, nextWidth)));
    };

    updateEmbedWidth();

    const resizeObserver = new ResizeObserver(updateEmbedWidth);
    resizeObserver.observe(embedElement);

    return () => resizeObserver.disconnect();
  }, []);

  const facebookPluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    facebookPageUrl
  )}&tabs=timeline&width=${embedWidth}&height=${facebookEmbedHeight}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Contact</span>
        <h1>Send a message or prayer request.</h1>
        <p>
          We would love to hear from you, pray with you, and help your family
          feel at home this Sunday.
        </p>
      </section>
      <section className="contact-section">
        <div>
          <SectionHeader
            title="Get in touch"
            text="Use this form for questions, prayer requests, or your first Sunday with us."
          />
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea rows={6} placeholder="How can we help or pray?" />
            </label>
            <button className="button primary" type="submit">
              Send Message
            </button>
          </form>
        </div>
        <aside className="contact-card">
          <h2>Christ Tamil Church Chicago</h2>
          <p>{churchInfo.worship.label}</p>
          <p>{churchInfo.worship.time}</p>
          <p>{churchInfo.address.full}</p>
          <p><a href={churchInfo.contact.phoneHref}>{churchInfo.contact.phone}</a></p>
          <p><a href={churchInfo.contact.emailHref}>{churchInfo.contact.email}</a></p>
        </aside>
      </section>
      <section className="facebook-section">
        <div className="facebook-copy">
          <SectionHeader
            eyebrow="Facebook"
            title="Follow church updates"
            text="See recent announcements, photos, and community updates from our Facebook page."
          />
          <a
            className="button secondary"
            href={facebookPageUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Facebook Page
          </a>
        </div>
        <div className="facebook-embed-card" ref={embedRef}>
          <iframe
            title="Christ Tamil Church Chicago Facebook page"
            src={facebookPluginUrl}
            width={embedWidth}
            height={facebookEmbedHeight}
            loading="lazy"
            style={{ border: 0, overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </section>
    </>
  );
}
