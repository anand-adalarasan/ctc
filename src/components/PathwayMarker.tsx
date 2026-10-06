import { pathwayLabels } from "../data/ministryPathways";

type PathwayMarkerProps = {
  pathway: keyof typeof pathwayLabels;
  className?: string;
};

// Bilingual Tamil/English pathway kicker used above inner-page hero titles.
export default function PathwayMarker({ pathway, className }: PathwayMarkerProps) {
  const label = pathwayLabels[pathway];
  return (
    <div className={className ? `${className} pathway-marker` : "pathway-marker"}>
      <div className="pathway-marker-copy">
        <span lang="ta">{label.ta}</span>
        <small>{label.en}</small>
      </div>
      <span className="pathway-marker-rule" aria-hidden="true" />
    </div>
  );
}
