import { ChevronDown, Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/site";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".hero, .page-hero, main > .section, main > .split-section, main > .media-feature, main > .contact-section, main > .facebook-section, main > .blast-experience-band, main > .kids-service-band, main > .bible-study-band, main > .grow-hub-cta, main > .blast-parent-cta, main > .kids-parent-cta"
      )
    );

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    sections.forEach((section) => {
      section.classList.remove("is-visible");
      section.classList.add("reveal-section");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12
      }
    );

    requestAnimationFrame(() => {
      sections.forEach((section) => observer.observe(section));
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">+</span>
          <span>
            <strong>Christ Tamil Church</strong>
            <small>Chicago</small>
          </span>
        </Link>

        <button
          className="icon-button mobile-only"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => {
            const isGrowSection =
              item.href === "/grow" &&
              (location.pathname.startsWith("/grow") || location.pathname === "/sermons");
            const children = "children" in item ? item.children : undefined;

            return children?.length ? (
              <div
                className={`nav-dropdown ${isGrowSection ? "active" : ""}`}
                key={item.href}
              >
                <NavLink
                  to={item.href}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive || isGrowSection ? "active" : "")}
                >
                  <span>{item.label}</span>
                  <ChevronDown size={14} aria-hidden="true" />
                </NavLink>
                <div className="nav-dropdown-menu" aria-label={`${item.label} pages`}>
                  {children.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            );
          })}
          <Link className="nav-cta" to="/visit" onClick={() => setOpen(false)}>
            Plan a Visit
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h2>Christ Tamil Church Chicago</h2>
            <p>
              A Christ-centered Tamil church committed to worship,
              discipleship, and serving our community.
            </p>
            <div className="social-row" aria-label="Social links">
              <span>f</span>
              <span>yt</span>
              <span>ig</span>
              <span>@</span>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <p><Link to="/visit">Visit</Link></p>
            <p><Link to="/worship">Worship</Link></p>
            <p><Link to="/grow">Grow</Link></p>
            <p><Link to="/serve">Serve</Link></p>
            <p><Link to="/contact">Contact</Link></p>
          </div>
          <div>
            <h3>Service Time</h3>
            <p>Sunday Worship</p>
            <p>10.30 AM</p>
            <p>Bible Study</p>
            <p>Wednesday 7:30 PM</p>
          </div>
          <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
            <h3>Stay Connected</h3>
            <label htmlFor="email">Subscribe to our newsletter for updates and encouragement.</label>
            <div>
              <input id="email" type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
        <div className="footer-bottom">
          <span>(c) 2025 Christ Tamil Church Chicago. All rights reserved.</span>
          <span>5630 W. Peterson Ave, Chicago, IL 60646</span>
          <span>(773) 936-3697</span>
          <span>ctcchicago@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}
