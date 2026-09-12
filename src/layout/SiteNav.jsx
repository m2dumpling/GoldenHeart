import { navItems } from "../data/siteContent";

const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

function updateScanPosition(event) {
  const { left, top } = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--scan-x", `${event.clientX - left}px`);
  event.currentTarget.style.setProperty("--scan-y", `${event.clientY - top}px`);
}

export default function SiteNav() {
  return (
    <header className="site-nav">
      <a className="brand-mark" href="#home" aria-label="GOLDEN HEART home">
        <img className="brand-logo" src={`${baseUrl}ct-logo.png`} alt="" aria-hidden="true" />
        <strong>GOLDEN HEART</strong>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-text={item.label}
            onPointerMove={updateScanPosition}
          >
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
