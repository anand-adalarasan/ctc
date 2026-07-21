import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteImages } from "../data/images";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

type LayoutProps = {
  children: ReactNode;
};

type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

const primaryNavItems: NavItem[] = [
  {
    label: "I'm New",
    href: "/visit",
    children: [
      { label: "Who We Are", href: "/visit#mission" },
      { label: "What We Believe", href: "/visit#beliefs" },
      { label: "Stay In Touch", href: "/contact" }
    ]
  },
  { label: "Worship", href: "/worship" },
  {
    label: "Connect",
    href: "/connect",
    children: [
      { label: "Events", href: "/events" },
      { label: "Fellowship Hour", href: "/connect#fellowship-hour" }
    ]
  },
  {
    label: "Grow",
    href: "/grow",
    children: [
      { label: "Bible Study & Prayer", href: "/grow/bible-study-prayer" },
      { label: "Sunday School – B.L.A.S.T.", href: "/grow/sunday-school" },
      { label: "Kids Circle", href: "/grow/kids-circle" },
      { label: "Audio Sermons", href: "/sermons" }
    ]
  },
  {
    label: "Serve",
    href: "/serve",
    children: [{ label: "Community Outreach", href: "/serve" }]
  },
  { label: "Contact", href: "/contact" }
];

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Christ Tamil Church Chicago",
    description: "A Tamil Christian church family worshiping Christ, growing together, and serving the Chicago area."
  },
  "/visit": {
    title: "I'm New | Christ Tamil Church Chicago",
    description: "Plan a visit and learn about the mission, beliefs, and leadership of Christ Tamil Church Chicago."
  },
  "/worship": {
    title: "Worship | Christ Tamil Church Chicago",
    description: "Learn what to expect during Sunday worship at Christ Tamil Church Chicago."
  },
  "/grow": {
    title: "Grow | Christ Tamil Church Chicago",
    description: "Explore Bible study, prayer, Sunday School, and Kids Circle ministries."
  },
  "/connect": {
    title: "Connect | Christ Tamil Church Chicago",
    description: "Find fellowship, prayer, family ministry, and ways to belong at Christ Tamil Church."
  },
  "/serve": {
    title: "Serve | Christ Tamil Church Chicago",
    description: "Learn about community outreach and opportunities to serve with Christ Tamil Church."
  },
  "/contact": {
    title: "Contact | Christ Tamil Church Chicago",
    description: "Contact Christ Tamil Church for directions, questions, or prayer."
  },
  "/events": {
    title: "Events | Christ Tamil Church Chicago",
    description: "Explore recurring gatherings and church events at Christ Tamil Church Chicago."
  },
  "/sermons": {
    title: "Sermons | Christ Tamil Church Chicago",
    description: "Watch verified Tamil and English sermon recordings from Christ Tamil Church Chicago."
  }
};

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const location = useLocation();
  const footerRef = useRevealOnScroll<HTMLElement>({ staggerChildren: true });

  useEffect(() => {
    setOpen(false);
    setOpenMobileGroup(null);
  }, [location.pathname]);

  useEffect(() => {
    const exact = pageMeta[location.pathname];
    const fallback = location.pathname.startsWith("/grow/")
      ? pageMeta["/grow"]
      : pageMeta["/"];
    const meta = exact ?? fallback;
    document.title = meta.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", meta.description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${location.pathname}`;
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname, location.hash]);

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
          onClick={() =>
            setOpen((value) => {
              if (value) {
                setOpenMobileGroup(null);
              }
              return !value;
            })
          }
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {primaryNavItems.map((item) => {
            const groupIsActive =
              location.pathname === item.href ||
              item.children?.some((child) => child.href.split("#")[0] === location.pathname);

            if (!item.children) {
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </NavLink>
              );
            }

            return (
              <div
                className={`nav-dropdown ${openMobileGroup === item.href ? "is-mobile-open" : ""}`}
                key={item.href}
              >
                <div className="nav-dropdown-heading">
                  <NavLink
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`nav-link ${groupIsActive ? "active" : ""}`}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className="nav-dropdown-chevron nav-dropdown-chevron-desktop"
                      size={14}
                      aria-hidden="true"
                    />
                  </NavLink>
                  <button
                    className="nav-dropdown-toggle"
                    type="button"
                    aria-label={`${openMobileGroup === item.href ? "Collapse" : "Expand"} ${item.label} menu`}
                    aria-expanded={openMobileGroup === item.href}
                    aria-controls={`nav-group-${item.href.slice(1)}`}
                    onClick={() =>
                      setOpenMobileGroup((current) => (current === item.href ? null : item.href))
                    }
                  >
                    <ChevronDown
                      className="nav-dropdown-chevron nav-dropdown-chevron-mobile"
                      size={14}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div
                  id={`nav-group-${item.href.slice(1)}`}
                  className="nav-dropdown-menu"
                  aria-label={`${item.label} navigation`}
                >
                  {item.children.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        isActive && location.hash === new URL(child.href, window.location.origin).hash
                          ? "active"
                          : ""
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
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
