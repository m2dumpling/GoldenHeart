# GoldenHeart

GoldenHeart 是 dumpling 的个人站，记录正在构建的项目、技术工具、兴趣、设计作品与文字。

站点以“灯塔来信”为核心意象：纸张质感、墨蓝与金色、衬线标题、手写落款和克制的交互，共同组成属于 dumpling 的个人视觉语言。

## 技术栈

- Astro：静态站点框架与页面构建
- React：交互式页面岛屿
- Vite：开发与资源打包
- Phosphor Icons / Simple Icons：图标
- WAV / MP3：站内氛围音乐与播放器素材

## 页面结构

`src/pages/index.astro` 是唯一页面入口，加载 `BaseLayout` 与全页 React 岛屿 `GoldenApp`。

首页由以下区块组成：

1. Hero：个人介绍、头像、标签与 GitHub 入口
2. Works：PawBot、ArgoV、LevelUpLife-PWA 项目档案
3. About：个人信件与签名
4. Toolkit：技术栈跑马灯
5. Interests：音乐、播客、游戏、睡眠与旅行
6. Blog：四篇纯文字思考型随笔
7. Artworks：AIGC 与音乐设计作品
8. Footer：访问落款与返回顶部

导航使用 hash 路由：

- `#top`：首页顶部
- `#works`、`#about`、`#stack`、`#interests`、`#blog`、`#design`：区块定位
- `#blog/<slug>`：文章阅读页

## 项目目录

```text
src/
├── pages/              Astro 页面入口
├── layouts/            HTML 骨架、字体与站点元信息
├── golden/             当前 GoldenHeart 页面区块与全局样式
├── components/         可复用交互组件
├── data/               站点内容与博客数据
├── hooks/              React hooks
└── utils/              资源路径等工具函数

docs/                   设计作品、音乐封面、兴趣图片与项目 logo
public/                 公开静态资源、文章插图、头像与音频
scripts/visuals/        SVG 素材源稿、音频生成与视觉资源脚本
```

## 内容维护

- 修改站点导航、兴趣、技术栈：`src/data/siteContent.js`
- 修改博客标题、日期、摘要和正文：`src/data/blogContent.js`
- 修改项目档案：`src/golden/GoldenWorks.jsx`
- 修改设计作品分组：`src/golden/GoldenArtworks.jsx`
- 修改整体视觉、响应式和动效：`src/golden/golden.css`
- 新增公共图片或音频：放入 `public/`，引用时使用 `import.meta.env.BASE_URL`
- 新增设计素材：放入 `docs/Design/`，由 Artwork 组件按目录自动收集

## 本地开发

```bash
npm install
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

构建与本地预览：

```bash
npm run build
npm run preview
```

## GitHub Pages 部署

仓库地址：[github.com/m2dumpling/GoldenHeart](https://github.com/m2dumpling/GoldenHeart)

项目已配置：

- `astro.config.mjs`：站点地址为 `https://m2dumpling.github.io`，项目子路径为 `/GoldenHeart`
- `.github/workflows/deploy.yml`：推送到 `main` 后自动构建并部署

首次部署需要在 GitHub 仓库中打开：

`Settings → Pages → Build and deployment → Source → GitHub Actions`

启用后，网站地址为：

<https://m2dumpling.github.io/GoldenHeart/>

之后每次推送到 `main`，GitHub Actions 都会自动重新构建和发布。
