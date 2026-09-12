import { blogArticles } from "../data/blogContent";
import { ChapterHead } from "./GoldenAbout";

export default function GoldenBlog() {
  return (
    <section className="gh-section gh-blog" id="blog" aria-labelledby="blog-title">
      <div className="gh-shell">
        <ChapterHead chapter="CH.04" en="Words & notes." cn="字与便签" id="blog-title" />

        <div className="gh-shelf" data-reveal>
          {blogArticles.map((article, index) => (
            <a
              className="gh-shelf-row"
              href={`#blog/${article.slug}`}
              key={article.slug}
              style={{ "--i": index }}
            >
              <span className="gh-shelf-date">{article.date}</span>
              <span className="gh-shelf-main">
                <strong>《{article.title}》</strong>
                <small>{article.excerpt}</small>
              </span>
              <span className="gh-shelf-cat">{article.category}</span>
              <span className="gh-shelf-no">{String(index + 1).padStart(2, "0")}</span>
            </a>
          ))}
        </div>

        <p className="gh-shelf-note" data-reveal>
          four essays, sealed with patience — 思考与短篇，慢慢写，慢慢寄。
        </p>
      </div>
    </section>
  );
}
