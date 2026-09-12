import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ChapterHead } from "./GoldenAbout";
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
    accent: "#c98a2d",
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
    accent: "#4a8fa6",
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
    accent: "#6f9c72",
  },
];

export default function GoldenWorks() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section className="gh-section gh-works" id="works" aria-labelledby="works-title">
      <div className="gh-shell">
        <ChapterHead chapter="CH.00" en="Built, carefully." cn="认真做的东西" id="works-title" />

        <div className="gh-works-grid">
          <div className="gh-works-list" data-reveal>
            {projects.map((item, index) => (
              <a
                key={item.name}
                className={`gh-work-row${index === active ? " is-active" : ""}`}
                href={item.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                style={{ "--accent": item.accent }}
              >
                <span className="gh-work-no">{String(index + 1).padStart(2, "0")}</span>
                <span className="gh-work-name">{item.name}</span>
                <span className="gh-work-cat">{item.category}</span>
                <ArrowUpRight className="gh-work-arrow" size={20} weight="bold" aria-hidden="true" />
                <span className="gh-work-brief">{item.description}</span>
                <span className="gh-work-chips" aria-hidden="true">
                  {item.stack.slice(0, 4).map((tech) => (
                    <i key={tech}>{tech}</i>
                  ))}
                </span>
              </a>
            ))}
          </div>

          <aside className="gh-work-stage" data-reveal>
            <div className="gh-work-card" key={project.name} style={{ "--accent": project.accent }}>
              <p className="gh-work-card-no">
                FILE №{String(active + 1).padStart(2, "0")} — {project.category}
              </p>
              <div className="gh-work-card-logo">
                <img src={project.logo} alt={`${project.name} logo`} loading="lazy" draggable="false" />
              </div>
              <h3>{project.name}</h3>
              <p className="gh-work-card-desc">{project.description}</p>
              <ul className="gh-work-card-traits">
                {project.preview.map((trait, index) => (
                  <li key={trait}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {trait}
                  </li>
                ))}
              </ul>
              <div className="gh-work-card-stack">
                {project.stack.map((tech) => (
                  <i key={tech}>{tech}</i>
                ))}
              </div>
              <a className="gh-work-card-link" href={project.github} target="_blank" rel="noreferrer">
                open the repository
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
