import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import ElectricBorder from "../components/ElectricBorder";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import pawBotLogoRaw from "../../docs/Projects/PawBot/pawbot-logo.png";
import argovLogoRaw from "../../docs/Projects/ArgoV/argov-logo.png";
import levelUpLifeLogoRaw from "../../docs/Projects/LevelUpLife-PWA/leveluplife-logo.png";
import { assetUrl } from "../utils/asset";

const projects = [
  {
    name: "PawBot",
    category: "Self-hosted AI Agent",
    description:
      "自托管的 AI 智能体框架：浏览器工作台、终端 TUI 与聊天应用三端接入，能读写文件、执行命令、调用 MCP 工具。独家 Record & Replay——录制一次真实运行即可离线回放调试，零 token 成本、零工具副作用。",
    stack: ["Python", "Bun", "MCP", "WebSocket", "Docker"],
    preview: ["Record & Replay", "WebUI + TUI", "MCP tools", "Local-first"],
    logo: assetUrl(pawBotLogoRaw),
    github: "https://github.com/m2dumpling/pawbot",
    theme: {
      accent: "#f2c98a",
      bg: "#1c1204",
      bg2: "#4a2c07",
      panel: "#fff8ec",
      text: "#fff7ea",
      ink: "#241503",
      chip: "#ffe9c4",
    },
  },
  {
    name: "ArgoV",
    category: "Network / DevOps",
    description:
      "单文件 Bash 脚本的双核零信任代理面板：Xray-core + Sing-box 双内核，7 种协议、WARP 智能路由与多用户流量配额；Argo 模式下公网零暴露，VPS 上一键部署。",
    stack: ["Bash", "Xray-core", "Sing-box", "Cloudflare Argo", "Python"],
    preview: ["Dual kernel", "7 protocols", "WARP routing", "Zero exposure"],
    logo: assetUrl(argovLogoRaw),
    github: "https://github.com/m2dumpling/argov",
    theme: {
      accent: "#87bed4",
      bg: "#061623",
      bg2: "#0e3450",
      panel: "#f0f8ff",
      text: "#f5fbff",
      ink: "#071623",
      chip: "#dceefa",
    },
  },
  {
    name: "LevelUpLife-PWA",
    category: "Health / Gamified PWA",
    description:
      "把自律变成升级打怪的游戏化习惯管理器：RPG 式任务系统（经验、等级、连续打卡）叠加商店、宠物与公会社交；Next.js 16 + Web Push 服务端推送，让健康提醒不再缺席。",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "SQLite", "Web Push"],
    preview: ["RPG quests", "Streaks & XP", "Guild & PvP", "Web push"],
    logo: assetUrl(levelUpLifeLogoRaw),
    github: "https://github.com/m2dumpling/LevelUpLife-PWA",
    theme: {
      accent: "#9fd6a0",
      bg: "#0d1b12",
      bg2: "#24402c",
      panel: "#f2fff4",
      text: "#f4fff6",
      ink: "#0b1a10",
      chip: "#ddf5e0",
    },
  },
];

function ProjectMedia({ project }) {
  const featuredStack = project.stack.slice(0, 5);

  return (
    <div className="jack-project-media jack-project-media-static" aria-label={`${project.name} project preview`}>
      <div className="jack-project-preview-grid" aria-hidden="true" />
      <div className="jack-project-preview-mark">
        <span className="jack-project-preview-ring" aria-hidden="true" />
        <img src={project.logo} alt={`${project.name} logo`} loading="lazy" draggable="false" />
      </div>
      <div className="jack-project-preview-panel jack-project-preview-panel-main">
        <p>{project.category}</p>
        <strong>{project.name}</strong>
      </div>
      <div className="jack-project-preview-panel jack-project-preview-panel-list">
        {project.preview.map((item, index) => (
          <span key={item}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            {item}
          </span>
        ))}
      </div>
      <div className="jack-project-preview-stack" aria-label={`${project.name} featured stack`}>
        {featuredStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const projectStyle = {
    "--project-accent": project.theme.accent,
    "--project-bg": project.theme.bg,
    "--project-bg-2": project.theme.bg2,
    "--project-panel": project.theme.panel,
    "--project-text": project.theme.text,
    "--project-ink": project.theme.ink,
    "--project-chip": project.theme.chip,
  };

  return (
    <ScrollStackItem itemClassName="jack-project-card">
      <ElectricBorder
        className="jack-project-electric"
        color={project.theme.accent}
        speed={0.75 + index * 0.08}
        chaos={0.1}
        thickness={2}
        borderRadius={34}
        style={projectStyle}
      >
        <article className="jack-project-card-inner">
          <div className="jack-project-copy">
            <div className="jack-project-brand-row">
              <div className="jack-project-logo-frame">
                <img src={project.logo} alt={`${project.name} logo`} loading="lazy" />
              </div>
              <div className="jack-project-kicker">
                <span className="jack-project-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{project.category}</span>
              </div>
            </div>
            <h3>{project.name}</h3>
            <p className="jack-project-description">{project.description}</p>
            <div className="jack-project-stack-list">
              <p>Tech stack</p>
              <div className="jack-project-tags" aria-label={`${project.name} technology stack`}>
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
            <a className="jack-live-button" href={project.github} target="_blank" rel="noreferrer">
              <GithubLogo size={20} weight="fill" aria-hidden="true" />
              <span>Go To Github</span>
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <ProjectMedia project={project} />
        </article>
      </ElectricBorder>
    </ScrollStackItem>
  );
}

export default function WorksSection() {
  const projectBaseScale = 1 - (projects.length - 1) * 0.03;

  return (
    <section className="portfolio-section jack-projects" id="works">
      <FadeIn>
        <SectionHeading className="jack-section-heading jack-project-heading" id="works-title" number="02" title="Built" />
      </FadeIn>
      <FadeIn className="jack-projects-shell" delay={0.1} y={30}>
        <ScrollStack className="jack-project-stack" useWindowScroll itemDistance={110} itemStackDistance={42} stackPosition="18%" baseScale={projectBaseScale} rotationAmount={2.5} blurAmount={1}>
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </ScrollStack>
      </FadeIn>
    </section>
  );
}
