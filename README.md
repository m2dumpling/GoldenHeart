# GoldenHeart

个人网站。视觉调性源自 [CalmTown](https://github.com/Calmer2024/CalmTown)（深色海报底 + Bebas Neue 大写标题 + 区块编号），用 **Astro + React 岛屿** 重写为「内容与代码分离」的三层架构。

## 架构（1:1 复原 CalmTown 视觉）

整站是 CalmTown 的完整 SPA 结构，运行在 Astro 的一个全页 React 岛屿上：

```
src/
├── components/CalmtownApp.jsx   ← 主应用（hash 路由 + 全部区块组装）
├── components/*.jsx             ← CalmTown 全部特效组件（原样）
├── sections/*.jsx               ← 8 个区块（Hero/FriendSays/Stack/Works/Design/Interests/Blog/Footer）
├── data/siteContent.js          ← 站点内容：品牌、社交、留言、兴趣、技术栈
├── data/blogContent.js          ← 博客文章（段落正文 + IMG: 插图约定）
├── styles/calmtown.css          ← CalmTown 全局样式（3835 行原样）
└── docs/                        ← 素材库（设计作品/音乐人/播客/项目 logo/音频）
```

核心约定：**视觉与布局 1:1 来自 CalmTown，改内容只动 src/data/ 两个文件与 docs/ 素材**。
文章正文中 `IMG:/path/to.png` 段落会渲染为插图。图片素材新增后放 docs/ 对应目录即可被 glob 扫描收录。

## 常用命令

| 命令             | 说明                                       |
| :--------------- | :----------------------------------------- |
| `npm run dev`    | 本地开发服务器（localhost:4321，热更新）   |
| `npm run build`  | 构建到 `dist/`                             |
| `npm run preview`| 本地预览构建产物                           |

## 如何改内容

- **发文章**：在 `src/content/blog/` 新建 `.md`，文件名即链接 `/blog/<文件名>`
- **换站名/社交链接/技术栈**：改 `src/config/site.ts`
- **换留言**：改 `src/content/friends.yaml`（每条需要唯一 `id`）
- **加设计作品**：图片丢进 `src/assets/design/`，自动收录（文件名即标题）
- **再生成视觉**：`scripts/visuals/` 里有 SVG 源稿和 `generate-visuals.sh`（SVG 设计稿 → Edge 无头渲染 PNG）
- **占位图**：`public/friends/`、`public/covers/` 下的 PNG 全部是生成的占位图，直接替换

## 部署

默认构建为静态站点。部署到 GitHub Pages 子路径时，在 astro.config.mjs 里加 `base` 配置，
同时各 data 文件里的图片引用需保持走 `import.meta.env.BASE_URL` 或相对 import。

## 视觉生成工具

`scripts/visuals/` 内存有全部 SVG 设计稿与渲染脚本（Edge 无头渲染 SVG → PNG）：
- `generate-visuals.sh`：头像、朋友留言图、画廊海报、博客封面
- `generate-blog-visuals.sh`：技术笔记封面、散文插图
- `generate-dumpling-assets.sh`：音乐人占位图、项目 logo、品牌图标
