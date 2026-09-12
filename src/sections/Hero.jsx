import BrandIcon from "../components/BrandIcon";
import Dock from "../components/Dock";
import Ferrofluid from "../components/Ferrofluid";
import FuzzyText from "../components/FuzzyText";
import ProfileCard from "../components/ProfileCard";
import { heroFluidColors, heroTags, socialLinks } from "../data/siteContent";

const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const avatarImage = `${baseUrl}dumpling-avatar.png`;

export default function Hero() {
  const dockItems = socialLinks.map(({ label, href, icon }) => ({
    label,
    icon: <BrandIcon icon={icon} />,
    onClick: () => {
      window.open(href, "_blank", "noopener,noreferrer");
    },
  }));

  return (
    <section className="hero-poster" id="home" aria-label="GoldenHeart hero poster">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-fluid" aria-hidden="true">
        <Ferrofluid
          colors={heroFluidColors}
          speed={0.34}
          scale={1.34}
          turbulence={0.9}
          fluidity={0.12}
          rimWidth={0.18}
          sharpness={2.7}
          shimmer={1.2}
          glow={1.45}
          flowDirection="down"
          opacity={0.42}
          mouseInteraction
          mouseStrength={0.55}
          mouseRadius={0.28}
          mouseDampening={0.2}
          mixBlendMode="screen"
          dpr={1}
        />
      </div>

      <div className="poster-content section-shell" data-reveal>
        <div
          className="poster-copy-block poster-copy-top"
          aria-label="Hero editorial note top"
        >
          <p>
            WELCOME TO GOLDENHEART ! HOPE YOU HAVE A WONDERFUL DAY, STAY AWAY FROM ANXIETY, AND MAY LIFE BE FULL OF FLOWERS AND BLESSINGS.
          </p>
        </div>

        <div
          className="poster-copy-block poster-copy-bottom"
          aria-label="Hero editorial note bottom"
        >
          <p>
            WE COME FROM AFAR, AND WE GO TO AFAR; WE ARE PILGRIMS AND
            STRANGERS ON THE EARTH.
          </p>
        </div>

        <div className="hero-bubble-field" aria-label="GoldenHeart tags">
          {heroTags.map((tag, index) => (
            <span
              className={`hero-bubble-anchor hero-bubble-${index + 1}`}
              key={tag}
            >
              <span className="hero-bubble">
                <span className="hero-bubble-label">#{tag}</span>
              </span>
            </span>
          ))}
        </div>

        <div className="poster-hero-stack">
          <p className="gh-hero-script">hello, i&apos;m</p>
          <div className="poster-title-wrap">
            <h1 className="poster-title">
              <span className="sr-only">I'M DUMPLING</span>
              <FuzzyText
                baseIntensity={0.08}
                hoverIntensity={0.46}
                fuzzRange={18}
                fps={42}
                direction="horizontal"
                transitionDuration={180}
                glitchMode
                glitchInterval={4300}
                glitchDuration={95}
                fontSize="var(--poster-title-size)"
                fontWeight={400}
                fontFamily='"Bebas Neue", Impact, "Arial Narrow", sans-serif'
                color="rgb(255 239 211 / 0.94)"
                letterSpacing={4}
                className="poster-title-canvas"
              >
                I'M DUMPLING
              </FuzzyText>
            </h1>
          </div>
        </div>

        <div className="poster-card-dock">
          <ProfileCard
            name="dumpling"
            title="Creative Developer"
            handle="m2dumpling"
            status="Keep a golden heart"
            avatarUrl={avatarImage}
            miniAvatarUrl={avatarImage}
            contactText="Contact Me"
            showContact={false}
            behindGlowColor="rgb(255 239 211 / 0.32)"
            behindGlowSize="56%"
            innerGradient="linear-gradient(150deg, rgb(255 255 255 / 0.12) 0%, rgb(30 80 116 / 0.18) 48%, rgb(238 148 101 / 0.12) 100%)"
          />
          <div className="poster-contact-dock">
            <Dock
              items={dockItems}
              panelHeight={58}
              baseItemSize={42}
              magnification={62}
              distance={150}
              dockHeight={132}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
