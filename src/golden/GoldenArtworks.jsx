import { ChapterHead } from "./GoldenAbout";

const designImageModules = import.meta.glob("../../docs/Design/**/*.{png,PNG,jpg,JPG,jpeg,JPEG}", {
  eager: true,
  import: "default",
});

const mcLabels = ["Skyline", "Neon", "Overpass", "Signal", "Windows", "Spire", "Rain"];

const tldoeLabels = ["夜航信笺", "灯塔来信", "季风航线", "星图收藏", "雾中灯", "四点的大海"];

function labelFromPath(path) {
  return path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? path;
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

      if (orderA !== orderB) return orderA - orderB;
      return pathA.localeCompare(pathB, "zh-Hans-CN", { numeric: true });
    })
    .map(([path, imported]) => ({
      src: typeof imported === "string" ? imported : imported?.src,
      label: labelFromPath(path),
      path,
    }));
}

const tldoeImages = collectImages("AIGC作品集/TLDOE/");
const mcImages = collectImages("AIGC作品集/MC/");
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
const albumCover = collectImages("设计作品集/创意设计/", ["金心-专辑封面"]).find(
  (item) => item.label === "金心-专辑封面",
);

function FilmStrip({ title, subtitle, images, labels, tone = "gold" }) {
  return (
    <div className={`gh-film is-${tone}`} data-reveal>
      <header>
        <h4>{title}</h4>
        <span>{subtitle}</span>
      </header>
      <div className="gh-film-track" tabIndex="0" aria-label={`${title} gallery`}>
        {images.map((image, index) => (
          <figure key={image.path}>
            <img src={image.src} alt={labels[index] ?? image.label} loading="lazy" draggable="false" />
            <figcaption>{labels[index] ?? image.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function GoldenArtworks() {
  return (
    <section className="gh-section gh-art" id="design" aria-labelledby="design-title">
      <div className="gh-shell">
        <ChapterHead chapter="CH.05" en="Artworks." cn="画的与印的" id="design-title" />

        <p className="gh-art-tag" data-reveal>
          #AIGC
        </p>
        <FilmStrip
          title="Letters From Afar"
          subtitle="远方来信 · 6 plates"
          images={tldoeImages}
          labels={tldoeLabels}
        />
        <FilmStrip
          title="Night Circuit"
          subtitle="夜航城市 · 7 plates"
          images={mcImages}
          labels={mcLabels}
          tone="blue"
        />

        <p className="gh-art-tag" data-reveal>
          #MUSIC DESIGN
        </p>
        <div className="gh-art-music" data-reveal>
          {albumCover ? (
            <figure className="gh-art-album">
              <img src={albumCover.src} alt="GoldenHeart Clover album cover" loading="lazy" draggable="false" />
              <figcaption>
                <strong>GoldenHeart Clover</strong>
                <span>album cover · 金心四叶草</span>
              </figcaption>
            </figure>
          ) : null}

          <div className="gh-art-hand" aria-label="Voyager cards">
            <p className="gh-art-hand-title">Voyager cards</p>
            <p className="gh-art-hand-sub">远航海员牌 · 一手九张</p>
            <div className="gh-art-fan">
              {dreamPartnerCards.map((card, index) => (
                <img
                  key={card.path}
                  src={card.src}
                  alt={`Voyager card ${index + 1}`}
                  loading="lazy"
                  draggable="false"
                  style={{ "--i": index }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
