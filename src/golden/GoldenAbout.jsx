function ChapterHead({ chapter, en, cn, id }) {
  return (
    <div className="gh-chapter-head" data-reveal>
      <p className="gh-chapter-no">{chapter}</p>
      <h2 className="gh-chapter-title">
        {en}
        <span>{cn}</span>
      </h2>
      <i className="gh-chapter-rule" aria-hidden="true" />
    </div>
  );
}

export { ChapterHead };

export default function GoldenAbout() {
  return (
    <section className="gh-section gh-about" id="about" aria-labelledby="about-title">
      <div className="gh-shell">
        <ChapterHead chapter="CH.01" en="A letter, first." cn="先读一封信" id="about-title" />

        <div className="gh-letter" data-reveal>
          <div className="gh-letter-stamp" aria-hidden="true">
            <span>GH</span>
            <small>2026</small>
          </div>
          <div className="gh-letter-postmark" aria-hidden="true">
            <span>
              golden heart
              <br />
              post · est. 2026
            </span>
          </div>
          <p className="gh-letter-to">TO: EVERY PASSING READER —</p>
          <p className="gh-letter-body">
            你好，我是 dumpling。白天把复杂的事情拆成一行行代码，晚上给小工具收拾残局；偶尔拍照，替光线保管几秒钟，
            偶尔包一锅很站得住的饺子。相信好的工程和好的食物一样：皮要薄，馅要足，火候要诚——至于人生，偶尔露馅也不要紧，
            至少说明里面还有东西。
          </p>
          <blockquote className="gh-letter-quote">
            “我们都在阴沟里，但仍有人仰望星空。”
            <cite>— Oscar Wilde</cite>
          </blockquote>
          <p className="gh-letter-sign" aria-label="signed dumpling">
            dumpling
          </p>
        </div>

      </div>
    </section>
  );
}
