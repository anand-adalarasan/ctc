import { Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

type LayoutProps = {
  children: ReactNode;
};

const primaryNavItems = [
  { label: "Visit", href: "/visit" },
  { label: "Worship", href: "/worship" },
  { label: "Connect", href: "/connect" },
  { label: "Grow", href: "/grow" },
  { label: "Serve", href: "/serve" }
];

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const footerRef = useRevealOnScroll<HTMLElement>({ staggerChildren: true });

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">+</span>
          <span>
            <strong>Christ Tamil Church</strong>
            <small><span lang="ta">வணக்கம்</span> Chicago</small>
          </span>
        </Link>

        <button
          className="icon-button mobile-only"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-link ${
                  isActive || (item.href === "/grow" && location.pathname.startsWith("/grow"))
                    ? "active"
                    : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="nav-cta nav-link" to="/visit" onClick={() => setOpen(false)}>
            I'm New
          </Link>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <footer className="footer reveal" ref={footerRef}>
        <div className="footer-grid">
          <div className="footer-brand-column" data-reveal-child>
            <Link className="footer-brand" to="/">
              <span className="brand-mark" aria-hidden="true">+</span>
              <span>Christ Tamil Church Chicago</span>
            </Link>
            <span className="footer-tamil" lang="ta">விசுவாசம் · அன்பு · ஐக்கியம்</span>
            <p>
              Rooted in Christ. United in Love. Sent to Serve.
            </p>
            <div className="social-row" aria-label="Social links">
              <a
                href="https://www.facebook.com/ChristTamilChurchChicago"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <Link to="/connect">Updates</Link>
            </div>
          </div>
          <div data-reveal-child>
            <h3>Worship</h3>
            <p>Sunday Worship</p>
            <p>12:30 PM</p>
            <p>1330 63rd St, Downers Grove, IL</p>
          </div>
          <div data-reveal-child>
            <h3>Contact</h3>
            <p><a href="tel:+17739363697">(773) 936-3697</a></p>
            <p><a href="mailto:ctcchicago@gmail.com">ctcchicago@gmail.com</a></p>
          </div>
          <div data-reveal-child>
            <h3>Quick Links</h3>
            <p><Link to="/visit">I'm New</Link></p>
            <p><Link to="/worship">Worship</Link></p>
            <p><Link to="/grow">Grow</Link></p>
            <p><Link to="/sermons">Sermons</Link></p>
            <p><Link to="/contact">Contact</Link></p>
          </div>
        </div>
        <div className="footer-bottom" data-reveal-child>
          <span>(c) 2026 Christ Tamil Church Chicago. All rights reserved.</span>
          <span>Sunday Worship 12:30 PM</span>
          <span>1330 63rd St, Downers Grove, IL</span>
        </div>
      </footer>
    </div>
  );
}
