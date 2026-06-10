import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  title: string;
  text?: string;
  detail?: string;
  meta?: string;
  metaSecond?: string;
  metaHref?: string;
  href?: string;
  icon: LucideIcon;
  image?: string;
};

type FeatureRowsProps = {
  items: FeatureItem[];
  variant?: "light" | "green" | "info";
};

export default function FeatureRows({ items, variant = "light" }: FeatureRowsProps) {
  return (
    <div className={`feature-rows ${variant}`}>
      {items.map((item) => {
        const Icon = item.icon;
        const metaContent = item.metaHref ? (
          <a
            className="feature-meta map-link"
            href={item.metaHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${item.title} in Google Maps`}
          >
            <strong>{item.meta}</strong>
          </a>
        ) : (
          <span className="feature-meta">
            <strong>{item.meta}</strong>
            {item.metaSecond ? <span>{item.metaSecond}</span> : null}
          </span>
        );
        const infoContent = (
          <>
            <span className="feature-icon">
              <Icon size={28} />
            </span>
            <span className="feature-copy">
              <strong>{item.title}</strong>
              <span>{item.text ?? item.detail}</span>
            </span>
            {metaContent}
          </>
        );
        const content = variant === "info" ? infoContent : (
          <>
            {item.image ? (
              <span className="feature-image" aria-hidden="true">
                <img src={item.image} alt="" />
              </span>
            ) : null}
            <span className="feature-icon">
              <Icon size={22} />
            </span>
            <span className="feature-copy">
              <strong>{item.title}</strong>
              <span>{item.text ?? item.detail}</span>
            </span>
            <span className="feature-arrow">{item.image ? "Read more" : item.meta}</span>
          </>
        );

        return item.href && !(variant === "info" && item.metaHref) ? (
          <Link className="feature-row" key={item.title} to={item.href}>
            {content}
          </Link>
        ) : (
          <div className="feature-row" key={item.title}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
