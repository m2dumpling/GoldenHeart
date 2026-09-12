import InterestMusicPlayer from "../components/InterestMusicPlayer";
import { interests } from "../data/siteContent";
import { ChapterHead } from "./GoldenAbout";

function InterestItem({ group, item }) {
  const Icon = item.icon;
  const key = `${group.title}-${item.title}`;
  const inner = (
    <>
      {Icon ? (
        <span className="gh-int-icon" aria-hidden="true">
          <Icon size={24} weight="duotone" />
        </span>
      ) : (
        <img src={item.image} alt="" loading="lazy" draggable="false" />
      )}
      <span className="gh-int-copy">
        <strong>{item.title}</strong>
        <small>{item.text}</small>
      </span>
      {item.link ? <span className="gh-int-arrow" aria-hidden="true">↗</span> : null}
    </>
  );

  if (item.link) {
    return (
      <a
        className="gh-int-item is-link"
        key={key}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }
  return <div className="gh-int-item">{inner}</div>;
}

export default function GoldenInterests() {
  return (
    <section className="gh-section gh-interests" id="interests" aria-labelledby="interests-title">
      <div className="gh-shell">
        <ChapterHead chapter="CH.03" en="Off hours." cn="下班以后" id="interests-title" />

        <div className="gh-int-grid">
          {interests.map((group, index) => (
            <article className="gh-int-group" key={group.title} data-reveal style={{ "--i": index }}>
              <header>
                <span className="gh-int-no">{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
              </header>
              <div className="gh-int-items">
                {group.items.map((item) => (
                  <InterestItem key={`${group.title}-${item.title}`} group={group} item={item} />
                ))}
              </div>
              {group.title === "Music" ? <InterestMusicPlayer /> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
