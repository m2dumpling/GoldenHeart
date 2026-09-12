import { useRef, useState } from "react";
import CircularGallery from "../components/CircularGallery";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import Stack from "../components/Stack";
import TiltedCard from "../components/TiltedCard";

const designImageModules = import.meta.glob("../../docs/Design/**/*.{png,PNG,jpg,JPG,jpeg,JPEG}", {
  eager: true,
  import: "default",
});

const mcLabels = ["Skyline", "Neon", "Overpass", "Signal", "Windows", "Spire", "Rain"];

const tldoeLabels = ["夜航信笺", "灯塔来信", "季风航线", "星图收藏", "雾中灯", "四点的大海"];

const posterYearMap = {
  "月背来信-2023": 2023,
  "初次点亮-2023": 2023,
  "港夜-2024": 2024,
  "金潮-2024": 2024,
  "dumpling-nights-歌曲封面": 2024,
  "环航-2026": 2026,
};

function filenameFromPath(path) {
  return path.split("/").pop() ?? path;
}

function labelFromPath(path) {
  return filenameFromPath(path).replace(/\.[^.]+$/, "");
}

function collectImages(folderMarker, preferredOrder = []) {
  const orderMap = new Map(preferredOrder.map((name, index) => [name.toLowerCase(), index]));

  return Object.entries(designImageModules)
    .filter(([path]) => path.includes(folderMarker))
    .sort(([pathA], [pathB]) => {
      const labelA = labelFromPath(pathA).toLowerCase();
      const labelB = labelFromPath(pathB).toLowerCase();
      const orderA = orderMap.get(labelA) ?? Number.MAX_SAFE_INTEGER;
      const orderB = orderMap.get(labelB) ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return pathA.localeCompare(pathB, "zh-Hans-CN", { numeric: true });
    })
    .map(([path, imported]) => {
      // Astro 对图片的 glob import 返回 ImageMetadata（含 src），
      // 普通 Vite 环境返回字符串 URL——两种都归一化为字符串。
      const src = typeof imported === "string" ? imported : imported?.src;
      return {
        src,
        label: labelFromPath(path),
        path,
      };
    });
}

function yearForPoster(label) {
  if (posterYearMap[label]) {
    return posterYearMap[label];
  }

  const match = label.match(/20\d{2}/);
  return match ? Number.parseInt(match[0], 10) : 2024;
}

const mcImages = collectImages("AIGC作品集/MC/");
const tldoeImages = collectImages("AIGC作品集/TLDOE/");
const creativeDesignImages = collectImages("设计作品集/创意设计/", ["金心-专辑封面", "dumpling-nights-歌曲封面"]).filter(
  (item) => !item.path.includes("追梦合伙人音乐卡片"),
);
const dreamPartnerCards = collectImages("设计作品集/创意设计/追梦合伙人音乐卡片/", [
  "anchor",
  "star",
  "moon",
  "compass",
  "sail",
  "lantern",
  "tide",
  "gull",
  "bell",
]);
const albumCovers = creativeDesignImages.filter((item) => item.label === "金心-专辑封面");
const changeCover = creativeDesignImages.find((item) => item.label === "dumpling-nights-歌曲封面");
const posterImages = collectImages("设计作品集/海报设计/");

const tldoeGalleryItems = tldoeImages.map((image, index) => ({
  image: image.src,
  text: tldoeLabels[index] ?? `TLDOE${index + 1}`,
}));

const mcGalleryItems = mcImages.map((image, index) => ({
  image: image.src,
  text: mcLabels[index] ?? `MC${index + 1}`,
}));

const posterTimelineItems = [...posterImages, ...(changeCover ? [changeCover] : [])]
  .map((image) => ({
    ...image,
    year: yearForPoster(image.label),
  }))
  .sort((a, b) => a.year - b.year || a.label.localeCompare(b.label, "zh-Hans-CN", { numeric: true }));

function DesignStackCards() {
  const cards = dreamPartnerCards.map((image, index) => (
    <img src={image.src} alt={`Voyager card ${index + 1}`} loading="lazy" key={image.path} />
  ));

  return (
    <div className="design-stack-stage">
      <Stack
        randomRotation
        sensitivity={180}
        sendToBackOnClick
        cards={cards}
        animationConfig={{ stiffness: 260, damping: 22 }}
      />
    </div>
  );
}

function AigcCircularRow({
  title,
  subtitle,
  items,
  bend,
  font,
  distortion = true,
  enableDrag = true,
  preloadRenderer = false,
  className = "",
}) {
  return (
    <div className={`design-aigc-work design-circular-row ${className}`.trim()}>
      <div className="design-work-heading">
        <h4 className="design-work-title">{title}</h4>
        <p className="design-work-subtitle">{subtitle}</p>
      </div>
      <div className="design-circular-stage">
        <CircularGallery
          items={items}
          bend={bend}
          textColor="#f7f7f2"
          borderRadius={0.02}
          font={font}
          scrollSpeed={2}
          scrollEase={0.045}
          showText={false}
          distortion={distortion}
          enableDrag={enableDrag}
          preloadRenderer={preloadRenderer}
          label={`${title} gallery`}
        />
      </div>
    </div>
  );
}

function PosterTimeline({ items }) {
  const trackRef = useRef(null);
  const [activePosterIndex, setActivePosterIndex] = useState(0);

  const playPosterMove = (index) => {
    const track = trackRef.current;
    const nextIndex = index === activePosterIndex ? (index + 1) % items.length : index;
    const nextSlide = track?.querySelectorAll(".design-poster-slide")[nextIndex];

    setActivePosterIndex(nextIndex);
    track?.scrollTo({
      left: nextSlide?.offsetLeft ?? 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <div
      className="design-poster-timeline"
      aria-label="Poster timeline carousel"
      ref={trackRef}
    >
      {items.map((image, index) => (
        <FadeIn
          className={`design-poster-slide${index === activePosterIndex ? " is-active" : ""}`}
          delay={index * 0.04}
          y={28}
          key={image.path}
        >
          <button className="design-poster-button" type="button" onClick={() => playPosterMove(index)}>
            <span>{image.year}</span>
            <img src={image.src} alt={`${image.label} poster`} loading="lazy" draggable="false" />
          </button>
        </FadeIn>
      ))}
    </div>
  );
}

export default function DesignSection() {
  return (
    <section className="portfolio-section jack-design" id="design">
      <FadeIn>
        <SectionHeading className="jack-section-heading jack-design-heading" id="design-title" number="05" title="Artworks" />
      </FadeIn>

      <div className="design-shell">
        <div className="design-aigc-block">
          <FadeIn className="design-block-heading" delay={0.08} y={26}>
            <h3>#AIGC</h3>
          </FadeIn>

          

          <AigcCircularRow
            title="Letters From Afar"
            subtitle="“远方来信”"
            items={tldoeGalleryItems}
            bend={3.1}
            font={'400 28px "Microsoft YaHei", "PingFang SC", sans-serif'}
            className="design-circular-row-spaced"
          />
          <AigcCircularRow
            title="Night Circuit"
            subtitle="“夜航城市”"
            items={mcGalleryItems}
            bend={-2.8}
            font={'500 28px "Google Sans Flex"'}
            distortion={false}
            preloadRenderer
          />
        </div>

        <div className="design-creative-block">
          <FadeIn className="design-block-heading" delay={0.08} y={26}>
            <h3>#MUSIC DESIGN</h3>
          </FadeIn>

          <div className="design-creative-grid">
            <FadeIn className="design-music-card-panel" delay={0.12} y={30}>
              <div className="design-panel-copy">
                <h4>Voyager cards</h4>
              </div>
              <DesignStackCards />
            </FadeIn>

            <div className="design-clover-row">
              {albumCovers.map((image) => (
                <FadeIn className="design-clover-cover-wrap" delay={0.14} y={28} key={image.path}>
                  <TiltedCard
                    imageSrc={image.src}
                    altText="GoldenHeart Clover album cover"
                    captionText="GoldenHeart Clover"
                    containerHeight="390px"
                    containerWidth="390px"
                    imageHeight="350px"
                    imageWidth="350px"
                    rotateAmplitude={12}
                    scaleOnHover={1.06}
                    showTooltip
                    displayOverlayContent
                    overlayContent={<p className="design-clover-card-text">GoldenHeart Clover</p>}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <div className="design-poster-block">
          <FadeIn className="design-block-heading" delay={0.08} y={26}>
            <h3>#POSTER</h3>
          </FadeIn>

          <PosterTimeline items={posterTimelineItems} />
        </div>
      </div>
    </section>
  );
}
