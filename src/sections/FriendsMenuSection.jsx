import { useEffect, useRef, useState } from "react";
import InfiniteMenu from "../components/InfiniteMenu";
import SectionHeading from "../components/SectionHeading";
import { friendMenuItems } from "../data/siteContent";

export default function FriendsMenuSection() {
  const sectionRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`friends-menu-section${hasEntered ? " is-entered" : ""}`}
      id="about"
      ref={sectionRef}
      aria-labelledby="friends-menu-title"
    >
      <SectionHeading
        className="friends-section-heading"
        id="friends-menu-title"
        number="00"
        title="Whispers"
      />
      <div className="gh-about-card">
        <p className="gh-about-kicker">About me</p>
        <p className="gh-about-text">
          你好，我是 dumpling —— 一个把好奇心写进代码的人。白天折腾 AI 与计算机视觉，
          晚上写后端和小工具；偶尔拍照片，偶尔煮一锅很站得住的饺子。
          相信好的工程和好的食物一样：皮要薄，馅要足，火候要诚。
        </p>
        <p className="gh-about-quote">
          “我们都在阴沟里，但仍有人仰望星空。”
        </p>
        <p className="gh-about-quote-by">— Oscar Wilde</p>
      </div>
      <div className="friends-menu-shell">
        <InfiniteMenu items={friendMenuItems} scale={1.06} />
      </div>
      <p className="friends-menu-tip">Tip: 鼠标拖动以切换留言</p>
    </section>
  );
}
