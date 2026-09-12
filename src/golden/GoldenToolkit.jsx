import { techStackItems } from "../data/siteContent";
import { ChapterHead } from "./GoldenAbout";
import SiIcon from "./SiIcon";

function ToolRow({ items, reverse = false }) {
  return (
    <div className={`gh-tool-row${reverse ? " is-reverse" : ""}`}>
      <div className="gh-marquee-track">
        {[0, 1].map((copy) => (
          <span key={copy} aria-hidden={copy === 1}>
            {items.map(({ label, icon }) => (
              <em key={label}>
                <SiIcon icon={icon} size={17} />
                {label}
              </em>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function GoldenToolkit() {
  const firstRow = techStackItems.filter((_, index) => index % 2 === 0);
  const secondRow = techStackItems.filter((_, index) => index % 2 === 1);

  return (
    <section className="gh-section gh-tools" id="stack" aria-labelledby="stack-title">
      <div className="gh-shell">
        <ChapterHead chapter="CH.02" en="Tools of the trade." cn="趁手的工具" id="stack-title" />
      </div>
      <div className="gh-tool-belt" data-reveal>
        <ToolRow items={firstRow} />
        <ToolRow items={secondRow} reverse />
      </div>
    </section>
  );
}
