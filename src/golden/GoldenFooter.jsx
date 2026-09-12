const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export default function GoldenFooter() {
  return (
    <footer className="gh-footer" id="continued" aria-label="Site footer">
      <div className="gh-footer-inner">
        <div className="gh-footer-stamp" aria-hidden="true">
          <span>
            golden heart
            <br />
            post · 2026
          </span>
        </div>

        <p className="gh-footer-thanks" data-reveal>
          THANK YOU FOR VISITING — HAVE A GREAT DAY
        </p>
        <h2 className="gh-footer-title" data-reveal>
          see you in the <em>next letter.</em>
        </h2>

        <div className="gh-footer-row" data-reveal>
          <img
            className="gh-footer-mascot"
            src={`${baseUrl}calmer-q.png`}
            alt="GoldenHeart character"
            loading="lazy"
            draggable="false"
          />
        </div>

        <div className="gh-footer-bar">
          <span>© 2026 dumpling</span>
          <a href="https://github.com/m2dumpling" target="_blank" rel="noreferrer">
            github / m2dumpling ↗
          </a>
          <span>
            written, printed &amp; lit by <em>a golden heart</em>
          </span>
        </div>
      </div>
    </footer>
  );
}
