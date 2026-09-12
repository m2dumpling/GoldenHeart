const fs = require("fs");
let s = fs.readFileSync("src/sections/DesignSection.jsx", "utf8");

s = s.replace(`const bluePainCharacterMap = {
  B1: "Agni",
  B2: "Zenitsu",
  B3: "Reze",
  B4: "Makima",
  B5: "Ken Kaneki",
  B6: "Chainsaw Man",
};`, `const bluePainCharacterMap = {
  B1: "Moon Arc 月弧",
  B2: "The Lighthouse 灯塔",
  B3: "Compass 罗盘",
  B4: "Star Whale 星鲸",
  B5: "Paper Plane 纸飞机",
  B6: "Midnight Clock 午夜钟",
};`);

s = s.replace('const bluePainMoodWords = ["RAW", "TERRIFIED", "TENDER", "COLD", "HOLLOW", "FURIOUS"];',
  'const bluePainMoodWords = ["HUSH", "DRIFT", "GLOW", "TIDE", "WANDER", "DREAM"];');

s = s.replace('const mcLabels = ["City", "Bamboo", "Dicey", "Bank", "Hotel", "Alley", "Canyon"];',
  'const mcLabels = ["Skyline", "Neon", "Overpass", "Signal", "Windows", "Spire", "Rain"];');

s = s.replace('const tldoeLabels = ["失重房间", "漂浮动物园", "地球花园", "下一站天空", "冲向花园", "来一场老派约会"];',
  'const tldoeLabels = ["夜航信笺", "灯塔来信", "季风航线", "星图收藏", "雾中灯", "四点的大海"];');

s = s.replace(`const posterYearMap = {
  "新春海报-2023": 2023,
  "change-歌曲封面": 2023,
  "定向越野-2024": 2024,
  "信韵春歌-2024": 2024,
  "缘来是你-2024": 2024,
  "新年封面-2026": 2026,
};`, `const posterYearMap = {
  "月背来信-2023": 2023,
  "初次点亮-2023": 2023,
  "港夜-2024": 2024,
  "金潮-2024": 2024,
  "dumpling-nights-歌曲封面": 2024,
  "环航-2026": 2026,
};`);

s = s.split('"三叶草-专辑封面"').join('"金心-专辑封面"');
s = s.split('"change-歌曲封面"').join('"dumpling-nights-歌曲封面"');
s = s.replace(`[
  "calmer",
  "长木日",
  "青苹果",
  "波罗的海海王",
  "channel",
  "cher",
  "curfur",
  "hammer",
  "Shadowk",
]`, `[
  "anchor",
  "star",
  "moon",
  "compass",
  "sail",
  "lantern",
  "tide",
  "gull",
  "bell",
]`);

s = s.replace('<h4 className="design-work-title">BLUE PAIN</h4>', '<h4 className="design-work-title">STARHARBOR</h4>');
s = s.replace('<p className="design-work-subtitle">“蓝色”</p>', '<p className="design-work-subtitle">“星港夜话”</p>');
s = s.replace('title="The Last Day On Earth"', 'title="Letters From Afar"');
s = s.replace('subtitle="“地球上的最后一天”"', 'subtitle="“远方来信”"');
s = s.replace(`title="BUT I'VE REALLY COME A LONG WAY"`, 'title="Night Circuit"');
s = s.replace('subtitle="“可是我真的走了很远”"', 'subtitle="“夜航城市”"');
s = s.replace('<h4>Dream weaver cards</h4>', '<h4>Voyager cards</h4>');
s = s.replace('alt={`Dream partner card ${index + 1}`}', 'alt={`Voyager card ${index + 1}`}');

fs.writeFileSync("src/sections/DesignSection.jsx", s);
console.log("DesignSection updated:", s.includes("STARHARBOR"), s.includes("Voyager cards"), !s.includes("蓝色"));
