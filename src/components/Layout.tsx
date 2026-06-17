import { ChevronDown, Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/site";

type LayoutProps = {
  children: ReactNode;
};

const growNavItem = navItems.find(
  (item): item is Extract<(typeof navItems)[number], { children: unknown }> =>
    item.href === "/grow" && "children" in item
);

const primaryNavItems = [
  { label: "Home", href: "/" },
  { label: "Worship", href: "/worship" },
  {
    label: "Grow",
    href: "/grow",
    children: growNavItem?.children.filter((child) => child.href !== "/sermons")
  },
  { label: "Connect", href: "/connect" },
  { label: "Sermons", href: "/sermons" },
  { label: "Contact", href: "/contact" }
];

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
            <small>Chicago</small>
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
          {primaryNavItems.map((item) => {
            const isGrowSection =
              item.href === "/grow" &&
              location.pathname.startsWith("/grow");
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
                  aria-haspopup="true"
                  className={({ isActive }) =>
                    `nav-link ${isActive || isGrowSection ? "active" : ""}`
                  }
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
                      className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
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
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            );
          })}
          <Link className="nav-cta nav-link" to="/visit" onClick={() => setOpen(false)}>
            Plan a Visit
          </Link>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <Link className="footer-brand" to="/">
              <span className="brand-mark" aria-hidden="true">+</span>
              <span>Christ Tamil Church Chicago</span>
            </Link>
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
          <div>
            <h3>Worship</h3>
            <p>Sunday Worship</p>
            <p>10:30 AM</p>
            <p>1330 63rd St, Downers Grove, IL</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p><a href="tel:+17739363697">(773) 936-3697</a></p>
            <p><a href="mailto:ctcchicago@gmail.com">ctcchicago@gmail.com</a></p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <p><Link to="/visit">Plan Your Visit</Link></p>
            <p><Link to="/worship">Worship</Link></p>
            <p><Link to="/grow">Grow</Link></p>
            <p><Link to="/sermons">Sermons</Link></p>
            <p><Link to="/contact">Contact</Link></p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>(c) 2025 Christ Tamil Church Chicago. All rights reserved.</span>
          <span>Sunday Worship 10:30 AM</span>
          <span>1330 63rd St, Downers Grove, IL</span>
        </div>
      </footer>
    </div>
  );
}
