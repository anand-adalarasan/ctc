import { Mail, Menu, Phone, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteImages } from "../data/images";
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
  const isHome = location.pathname === "/";

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
        <Link className="brand brand-logo-link" to="/" onClick={() => setOpen(false)}>
          <img
            className="brand-logo"
            src={siteImages.logo.src}
            alt={siteImages.logo.alt}
            width="200"
            height="47"
          />
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
          {!isHome && (
            <Link className="nav-cta nav-link" to="/visit" onClick={() => setOpen(false)}>
              I'm New
            </Link>
          )}
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <footer className="footer footer-flow reveal" ref={footerRef}>
        <div className="footer-grid">
          <section data-reveal-child>
            <h3>Contact</h3>
            <p>
              <Phone size={15} aria-hidden="true" />
              <a href="tel:+17739363697">(773) 936-3697</a>
            </p>
            <p>
              <Mail size={15} aria-hidden="true" />
              <a href="mailto:ctcchicago@gmail.com">ctcchicago@gmail.com</a>
            </p>
          </section>

          <section data-reveal-child>
            <h3>Explore</h3>
            <p><Link to="/visit">Visit</Link></p>
            <p><Link to="/worship">Worship</Link></p>
            <p><Link to="/connect">Connect</Link></p>
            <p><Link to="/grow">Grow</Link></p>
          </section>

          <section data-reveal-child>
            <h3>Resources</h3>
            <p><Link to="/serve">Serve</Link></p>
            <p><Link to="/sermons">Sermons</Link></p>
            <p><Link to="/events">Events</Link></p>
            <p><Link to="/contact">Prayer & Contact</Link></p>
          </section>
        </div>

        <div className="footer-bottom" data-reveal-child>
          <span>(c) 2026 Christ Tamil Church Chicago. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
