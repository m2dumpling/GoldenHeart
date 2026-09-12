import { blogArticles } from "../data/blogContent";

export default function GoldenPost({ slug }) {
  const index = Math.max(0, blogArticles.findIndex((item) => item.slug === slug));
  const article = blogArticles[index];
  const next = blogArticles[(index + 1) % blogArticles.length];

  return (
    <main className="gh-post">
      <div className="gh-post-shell">
        <a className="gh-post-back" href="#blog" data-cursor>
          ← back to the shelf
        </a>

        <header className="gh-post-head">
          <p className="gh-post-meta">
            <span>{article.category}</span>
            <i aria-hidden="true">·</i>
            <time>{article.date}</time>
            <i aria-hidden="true">·</i>
            <span>essay №{String(index + 1).padStart(2, "0")}</span>
          </p>
          <h1>{article.title}</h1>
        </header>

        <div className="gh-post-body">
          {article.body.map((paragraph, pIndex) => (
            <p key={`p-${pIndex}`}>{paragraph}</p>
          ))}
        </div>

        <footer className="gh-post-end">
          <span className="gh-post-end-heart" aria-hidden="true">
            ♥
          </span>
          <p>— end of this essay —</p>
          <a className="gh-post-next" href={`#blog/${next.slug}`} data-cursor>
            next essay → 《{next.title}》
          </a>
        </footer>
      </div>
    </main>
  );
}
