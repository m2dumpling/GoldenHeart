import { heroTags } from "../data/siteContent";

const AVATAR = `${import.meta.env.BASE_URL}dumpling-avatar.png`;
const STAND = `${import.meta.env.BASE_URL}calmer-stand.png`;

function Chars({ text, className = "" }) {
  return (
    <span className={`gh-chars ${className}`.trim()} aria-hidden="true">
      {text.split("").map((char, index) => (
        <span key={`${char}-${index}`} style={{ "--i": index }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function GoldenHero() {
  const tags = heroTags.map((tag) => `#${tag.toUpperCase()}`);

  return (
    <section className="gh-hero" id="home" aria-label="GoldenHeart cover">
      <svg className="gh-hero-heart" viewBox="0 0 64 64" aria-hidden="true">
        <path
          pathLength="1"
          d="M32 47.5c-1.4-1-13.5-9.6-16.4-15.7-2.6-5.5-.4-11.3 4.6-12.9 4-1.3 8.3.4 11.8 5 3.5-4.6 7.8-6.3 11.8-5 5 1.6 7.2 7.4 4.6 12.9-2.9 6.1-15 14.7-16.4 15.7z"
        />
      </svg>

      <div className="gh-hero-inner">
        <p className="gh-hero-kicker" data-reveal>
          Welcome to GoldenHeart — hope you have a wonderful day, stay away from anxiety, and may
          life be full of flowers and blessings.
        </p>

        <h1 className="gh-hero-title" aria-label="Keep a golden heart">
          <span className="gh-hero-script" data-reveal>
            keep a
          </span>
          <span className="gh-hero-line" data-reveal>
            <Chars text="Golden" />
          </span>
          <span className="gh-hero-line gh-hero-line-solid" data-reveal>
            <Chars text="HEART." />
          </span>
        </h1>

        <p className="gh-hero-cn" data-reveal>
          你好，我是 <strong>dumpling</strong> —— 一个把好奇心写进代码的人。
        </p>

        <div className="gh-hero-cta" data-reveal>
          <a className="gh-btn" href="#blog" data-cursor>
            <span>read the letters</span>
            <i aria-hidden="true">↓</i>
          </a>
          <a
            className="gh-btn gh-btn-ghost"
            href="https://github.com/m2dumpling"
            target="_blank"
            rel="noreferrer"
            data-cursor
          >
            <span>github / m2dumpling</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>

        <div className="gh-hero-photos" aria-hidden="true">
          <figure className="gh-polaroid gh-polaroid-front">
            <img src={AVATAR} alt="" draggable="false" />
            <figcaption>vol.01 — the golden one</figcaption>
          </figure>
          <figure className="gh-polaroid gh-polaroid-back">
            <img src={STAND} alt="" draggable="false" />
            <figcaption>vol.02 — stand by</figcaption>
          </figure>
        </div>
      </div>

      <div className="gh-hero-tags" aria-label="Interests">
        <div className="gh-marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1}>
              {tags.map((tag) => (
                <em key={tag}>{tag}</em>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
