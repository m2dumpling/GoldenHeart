import { useEffect, useState } from "react";
import "./golden.css";
import GoldenHero from "./GoldenHero";
import GoldenAbout from "./GoldenAbout";
import GoldenToolkit from "./GoldenToolkit";
import GoldenWorks from "./GoldenWorks";
import GoldenInterests from "./GoldenInterests";
import GoldenBlog from "./GoldenBlog";
import GoldenPost from "./GoldenPost";
import GoldenArtworks from "./GoldenArtworks";
import GoldenFooter from "./GoldenFooter";

function getHashRoute() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#/, "");
}

const HEART_MARK = (
  <svg viewBox="0 0 64 64" className="gh-mark" aria-hidden="true">
    <path
      d="M32 47.5c-1.4-1-13.5-9.6-16.4-15.7-2.6-5.5-.4-11.3 4.6-12.9 4-1.3 8.3.4 11.8 5 3.5-4.6 7.8-6.3 11.8-5 5 1.6 7.2 7.4 4.6 12.9-2.9 6.1-15 14.7-16.4 15.7z"
      fill="currentColor"
    />
  </svg>
);

function GoldenNav() {
  const [clock, setClock] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnHashChange = () => setMenuOpen(false);

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("hashchange", closeOnHashChange);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("hashchange", closeOnHashChange);
    };
  }, []);

  const links = [
    ["00", "Works", "#works"],
    ["01", "About", "#about"],
    ["02", "Toolkit", "#stack"],
    ["03", "Off Hours", "#interests"],
    ["04", "Words", "#blog"],
    ["05", "Artworks", "#design"],
  ];

  return (
    <header className="gh-nav">
      <a className="gh-nav-brand" href="#top" aria-label="GoldenHeart home">
        {HEART_MARK}
        <span className="gh-nav-word">
          golden<em>heart</em>
        </span>
      </a>
      <nav className="gh-nav-links" aria-label="Site sections">
        {links.map(([no, label, href]) => (
          <a key={href} href={href}>
            <sup>{no}</sup>
            {label}
          </a>
        ))}
      </nav>
      <div className="gh-nav-side">
        <span className="gh-nav-clock" suppressHydrationWarning>
          {clock}
        </span>
        <a
          className="gh-nav-gh"
          href="https://github.com/m2dumpling"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          GH ↗
        </a>
      </div>
      <button
        className={`gh-nav-menu-toggle${menuOpen ? " is-open" : ""}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="gh-mobile-nav"
        aria-label={menuOpen ? "Close site menu" : "Open site menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        className={`gh-nav-mobile${menuOpen ? " is-open" : ""}`}
        id="gh-mobile-nav"
        aria-label="Mobile site sections"
      >
        {links.map(([no, label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            <sup>{no}</sup>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function FloatingBackToTop({ progress }) {
  const visible = progress > 0.08;

  return (
    <button
      className={`gh-floating-top${visible ? " is-visible" : ""}`}
      type="button"
      tabIndex={visible ? 0 : -1}
      aria-label="Back to top"
      data-cursor
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span>TOP</span>
      <i aria-hidden="true">↑</i>
    </button>
  );
}

function useReveal(route) {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      targets.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => {
      if (!el.classList.contains("is-in")) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [route]);
}

export default function GoldenApp() {
  const [route, setRoute] = useState(getHashRoute);
  const [progress, setProgress] = useState(0);
  const isPost = route.startsWith("blog/");
  const slug = route.replace(/^blog\//, "");

  useEffect(() => {
    const onHashChange = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (isPost) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    if (route && document.getElementById(route)) {
      window.requestAnimationFrame(() => {
        document.getElementById(route)?.scrollIntoView({ block: "start" });
      });
    }
  }, [isPost, route]);

  useReveal(route);

  useEffect(() => {
    document.documentElement.classList.remove("gh-cursor-on");
  }, []);

  return (
    <div className="gh-app" id="top">
      <div className="gh-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <FloatingBackToTop progress={progress} />
      <GoldenNav />
      {isPost ? (
        <GoldenPost slug={slug} />
      ) : (
        <main>
          <GoldenHero />
          <GoldenWorks />
          <GoldenAbout />
          <GoldenToolkit />
          <GoldenInterests />
          <GoldenBlog />
          <GoldenArtworks />
          <GoldenFooter />
        </main>
      )}
    </div>
  );
}
