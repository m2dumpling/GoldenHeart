import { useEffect, useState } from "react";
import "../styles/calmtown.css";
import useMediaProtection from "../hooks/useMediaProtection";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import FloatingStaggeredMenu from "./FloatingStaggeredMenu";
import SiteNav from "../layout/SiteNav";
import BlogArticlePage from "../sections/BlogArticlePage";
import BlogSection from "../sections/BlogSection";
import DesignSection from "../sections/DesignSection";
import FooterSection from "../sections/FooterSection";
import FriendsMenuSection from "../sections/FriendsMenuSection";
import Hero from "../sections/Hero";
import InterestsSection from "../sections/InterestsSection";
import TechStackSection from "../sections/TechStackSection";
import WorksSection from "../sections/WorksSection";

function getHashRoute() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#/, "");
}

// GoldenHeart 主应用：CalmTown 的完整 SPA 结构原样运行在 Astro 岛屿内。
export default function CalmtownApp() {
  useRevealOnScroll();
  useMediaProtection();
  const [route, setRoute] = useState(getHashRoute);
  const [progress, setProgress] = useState(0);
  const isBlogArticle = route.startsWith("blog/");
  const blogSlug = route.replace("blog/", "");

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
    const handleHashChange = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const revealHome = () => {
      document.querySelectorAll("#home [data-reveal]").forEach((target) => {
        target.classList.add("is-visible");
      });
    };

    const handleBackToHome = () => {
      setRoute("");
      revealHome();
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };

    window.addEventListener("calmtown:back-to-home", handleBackToHome);
    return () => window.removeEventListener("calmtown:back-to-home", handleBackToHome);
  }, []);

  useEffect(() => {
    if (isBlogArticle) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (!route) return;
    window.requestAnimationFrame(() => {
      document.getElementById(route)?.scrollIntoView({ block: "start" });
      if (route === "home") {
        document.querySelectorAll("#home [data-reveal]").forEach((target) => {
          target.classList.add("is-visible");
        });
      }
    });
  }, [isBlogArticle, route]);

  return (
    <div className="app-shell">
      <div className="gh-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <SiteNav />
      {!isBlogArticle ? <FloatingStaggeredMenu /> : null}
      {isBlogArticle ? (
        <BlogArticlePage slug={blogSlug} />
      ) : (
        <main>
          <Hero />
          <FriendsMenuSection />
          <TechStackSection />
          <WorksSection />
          <InterestsSection />
          <BlogSection />
          <DesignSection />
          <FooterSection />
        </main>
      )}
    </div>
  );
}
