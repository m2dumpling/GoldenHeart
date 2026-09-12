import { Bed, CloudMoon, MapTrifold, MoonStars } from "@phosphor-icons/react";
import { assetUrl } from "../utils/asset";
import {
  siCplusplus,
  siDocker,
  siFastapi,
  siGithub,
  siGo,
  siLangchain,
  siMysql,
  siOpencv,
  siOpenjdk,
  siPython,
  siRedis,
  siSpringboot,
  siUbuntu,
} from "simple-icons";
import mochiImageRaw from "../../docs/Interests/Music/音乐人/mochi.jpg";
import latteImageRaw from "../../docs/Interests/Music/音乐人/latte.jpg";
import pixelImageRaw from "../../docs/Interests/Music/音乐人/pixel.jpg";
import horizonImageRaw from "../../docs/Interests/Game/stardew.jpg";
import minecraftImageRaw from "../../docs/Interests/Game/rdr2.jpg";
import valorantImageRaw from "../../docs/Interests/Game/cs2.jpg";
import aotuPodcastImageRaw from "../../docs/Interests/Podcast/stardust-fm.png";
import banlattePodcastImageRaw from "../../docs/Interests/Podcast/lighthouse-fm.png";
import feihuaPodcastImageRaw from "../../docs/Interests/Podcast/night-wind.png";
import yilePodcastImageRaw from "../../docs/Interests/Podcast/dumpling-fm.png";

const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const publicAsset = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Interests", href: "#interests" },
  { label: "Blog", href: "#blog" },
  { label: "Design", href: "#design" },
];

export const techStackItems = [
  { label: "Java", icon: siOpenjdk },
  { label: "Spring Boot", icon: siSpringboot },
  { label: "Redis", icon: siRedis },
  { label: "MySQL", icon: siMysql },
  { label: "Python", icon: siPython },
  { label: "FastAPI", icon: siFastapi },
  { label: "LangChain", icon: siLangchain },
  { label: "Go", icon: siGo },
  { label: "C++", icon: siCplusplus },
  { label: "OpenCV", icon: siOpencv },
  { label: "Docker", icon: siDocker, color: "#f7f3e9", glow: "#f7f3e9" },
  { label: "Ubuntu", icon: siUbuntu },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/m2dumpling",
    icon: siGithub,
  },
];

export const heroTags = [
  "AI / LLM",
  "Computer Vision",
  "Backend",
  "Stay Hungry",
];

export const heroFluidColors = ["#f2c98a", "#f2a565", "#87bed4", "#fff7df"];

export const friendMenuItems = [
  {
    title: "Mochi",
    subtitle: "夜宵合伙人",
    description: "“把月亮吃掉，就不饿了。”",
    image: publicAsset("friends/mochi.png"),
    alt: "Mochi",
  },
  {
    title: "Latte",
    subtitle: "深夜电台 DJ",
    description: "“凌晨三点的城市，比白天温柔。”",
    image: publicAsset("friends/latte.png"),
    alt: "Latte",
  },
  {
    title: "Pixel",
    subtitle: "8-bit 诗人",
    description: "“人生就是无限循环的存档点。”",
    image: publicAsset("friends/pixel.png"),
    alt: "Pixel",
  },
  {
    title: "Soda",
    subtitle: "气泡水理论家",
    description: "“不开心就摇一摇，反正会冒泡。”",
    image: publicAsset("friends/soda.png"),
    alt: "Soda",
  },
  {
    title: "Nova",
    subtitle: "星尘收藏家",
    description: "“我们都是星星的余烬，别熄灭。”",
    image: publicAsset("friends/nova.png"),
    alt: "Nova",
  },
  {
    title: "Tofu",
    subtitle: "极简主义实践者",
    description: "“少即是多，躺即是卷。”",
    image: publicAsset("friends/tofu.png"),
    alt: "Tofu",
  },
];

export const interests = [
  {
    title: "Music",
    summary: "耳机是通往另一个世界的船票。",
    items: [
      { title: "luther — Kendrick Lamar", text: "低音一响，整座城市开始慢放。", image: assetUrl(mochiImageRaw), link: "https://www.youtube.com/watch?v=HfWLgELllZs" },
      { title: "Money Trees — Kendrick Lamar", text: "Money trees is the perfect place for shade.", image: assetUrl(latteImageRaw), link: "https://www.youtube.com/watch?v=0nF69UTw99E" },
      { title: "Rich Spirit — Kendrick Lamar", text: "保持在人间的礼仪，也保持神圣。", image: assetUrl(pixelImageRaw), link: "https://www.youtube.com/watch?v=hl3-ZPg-JAA" },
    ],
  },
  {
    title: "Podcast",
    summary: "喜欢在耳机里听到有人在和你聊天，或者讲故事。",
    items: [
      { title: "Lex Fridman Podcast", text: "长对话的重量：AI、科学与人的处境。", image: assetUrl(yilePodcastImageRaw), link: "https://www.youtube.com/@lexfridman" },
      { title: "Huberman Lab", text: "把神经科学讲成生活说明书。", image: assetUrl(aotuPodcastImageRaw), link: "https://www.youtube.com/@hubermanlab" },
      { title: "The Diary Of A CEO", text: "听 CEO 们把失败讲得比成功诚实。", image: assetUrl(banlattePodcastImageRaw), link: "https://www.youtube.com/@TheDiaryOfACEO" },
      { title: "Design Better", text: "给做产品与设计的人充电。", image: assetUrl(feihuaPodcastImageRaw), link: "https://www.youtube.com/@designbetterpod" },
    ],
  },
  {
    title: "Games",
    summary: "又菜又爱玩。",
    items: [
      { title: "Counter-Strike 2", text: "枪线、道具与经济，凌晨三点的竞技场。", image: assetUrl(valorantImageRaw), link: "https://store.steampowered.com/app/730/CounterStrike_2/" },
      { title: "Red Dead Redemption 2", text: "亚瑟的西部：慢下来才看得见风景。", image: assetUrl(minecraftImageRaw), link: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/" },
      { title: "Stardew Valley", text: "种田钓鱼养鸡，电子种田治愈一切。", image: assetUrl(horizonImageRaw), link: "https://store.steampowered.com/app/413150/Stardew_Valley/" },
    ],
  },
  {
    title: "Sleep",
    summary: "REST型人格，DeepSleep代言人。",
    items: [
      { title: "睡 8 个小时", text: "8个小时是基础。", icon: MoonStars },
      { title: "睡 10 个小时", text: "10个小时是小康。", icon: Bed },
      { title: "睡 12 个小时", text: "12个小时彻底睡眠自由。", icon: CloudMoon },
    ],
  },
  {
    title: "Travel",
    summary: "还想和好朋友去更多、更远的地方。",
    items: [
      { title: "好想去旅游", text: "先从别人的风景照开始种草。", icon: MapTrifold, link: "https://www.nationalgeographic.com/travel" },
    ],
  },
];
