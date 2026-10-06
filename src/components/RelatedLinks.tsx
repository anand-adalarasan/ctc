import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatStep } from "../utils/format";

export type RelatedLink = {
  title: string;
  meta: string;
  href: string;
  icon: LucideIcon;
};

type RelatedLinksProps = {
  items: RelatedLink[];
  className: string;
  id?: string;
};

// Numbered "Continue growing" link list shared by the Grow sub-pages.
// Each page styles it through its own list class.
export default function RelatedLinks({ items, className, id }: RelatedLinksProps) {
  return (
    <div className={className} id={id}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link to={item.href} key={item.title}>
            <span>{formatStep(index)}</span>
            <Icon size={20} />
            <div>
              <strong>{item.title}</strong>
              <small>{item.meta}</small>
            </div>
            <ArrowRight size={17} />
          </Link>
        );
      })}
    </div>
  );
}
