type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left"
}: SectionHeaderProps) {
  return (
    <div className={`section-header ${align === "center" ? "center" : ""}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
