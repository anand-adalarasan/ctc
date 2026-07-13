import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-hero" aria-labelledby="not-found-title">
      <span className="eyebrow">Page not found</span>
      <h1 id="not-found-title">We couldn't find that page.</h1>
      <p>The link may be outdated. Return home or use the navigation to continue.</p>
      <Link className="button primary" to="/">Return Home</Link>
    </section>
  );
}
