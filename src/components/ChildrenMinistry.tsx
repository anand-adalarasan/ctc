import { CheckCircle2, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

export type MinistryCardDetail = {
  icon: LucideIcon;
  text: string;
};

export type MinistryFeatureItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export type RelatedGrowPage = MinistryFeatureItem & {
  href: string;
};

type ChildMinistryHeroCardProps = {
  className: string;
  iconClassName: string;
  icon: LucideIcon;
  title: string;
  titleId: string;
  subtitle?: string;
  details: MinistryCardDetail[];
  buttonText: string;
  buttonHref: string;
};

export function ChildMinistryHeroCard({
  className,
  iconClassName,
  icon: Icon,
  title,
  titleId,
  subtitle,
  details,
  buttonText,
  buttonHref
}: ChildMinistryHeroCardProps) {
  return (
    <aside className={className} aria-labelledby={titleId}>
      <span className={iconClassName} aria-hidden="true">
        <Icon size={26} />
      </span>
      <h2 id={titleId}>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
      <ul>
        {details.map((detail) => {
          const DetailIcon = detail.icon;

          return (
            <li key={detail.text}>
              <DetailIcon size={17} aria-hidden="true" />
              <span>{detail.text}</span>
            </li>
          );
        })}
      </ul>
      <Link className="button primary" to={buttonHref}>
        {buttonText}
      </Link>
    </aside>
  );
}

type MinistryFeatureGridProps = {
  items: MinistryFeatureItem[];
  gridClassName: string;
  cardClassName: string;
  iconSize?: number;
};

export function MinistryFeatureGrid({
  items,
  gridClassName,
  cardClassName,
  iconSize = 24
}: MinistryFeatureGridProps) {
  return (
    <div className={gridClassName}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article className={cardClassName} key={item.title}>
            <span aria-hidden="true">
              <Icon size={iconSize} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}

type ParentFamilyCtaProps = {
  className: string;
  panelClassName: string;
  actionsClassName: string;
  eyebrow: string;
  title: string;
  titleId: string;
  text: string;
  checklist: string[];
};

export function ParentFamilyCta({
  className,
  panelClassName,
  actionsClassName,
  eyebrow,
  title,
  titleId,
  text,
  checklist
}: ParentFamilyCtaProps) {
  return (
    <section className={className} aria-labelledby={titleId}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={titleId}>{title}</h2>
        <p>{text}</p>
      </div>
      <div className={panelClassName}>
        <ul>
          {checklist.map((item) => (
            <li key={item}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={actionsClassName}>
          <Link className="button gold" to="/visit">
            Plan Your Visit
          </Link>
          <Link className="button outline-light" to="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

type RelatedGrowPagesProps = {
  sectionClassName: string;
  gridClassName: string;
  cardClassName: string;
  pages: RelatedGrowPage[];
};

export function RelatedGrowPages({
  sectionClassName,
  gridClassName,
  cardClassName,
  pages
}: RelatedGrowPagesProps) {
  return (
    <section className={`section ${sectionClassName}`}>
      <SectionHeader title="Continue Growing" />
      <div className={gridClassName}>
        {pages.map((page) => {
          const Icon = page.icon;

          return (
            <Link className={cardClassName} key={page.title} to={page.href}>
              <span aria-hidden="true">
                <Icon size={22} />
              </span>
              <div>
                <h3>{page.title}</h3>
                <p>{page.text}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {/* TODO: Add Blog / Clay Pot as a related Grow page after a real blog route exists. */}
    </section>
  );
}

type BlastAcronymStripProps = {
  className: string;
  words: string[];
};

export function BlastAcronymStrip({ className, words }: BlastAcronymStripProps) {
  return (
    <div className={className} aria-label="B.L.A.S.T. acronym">
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </div>
  );
}
