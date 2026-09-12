#!/bin/bash
# GoldenHeart「NOCTURNE 夜航」系列素材生成
set -e
SVGDIR="$(pwd)/scripts/visuals/svg-src"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
D="$HOME_DIR_PLACEHOLDER"
D="E:/Projects/CodexProjects/GoldenHeart"
AIGC="$D/docs/Design/AIGC作品集"
CREA="$D/docs/Design/设计作品集/创意设计"
POST="$D/docs/Design/设计作品集/海报设计"
INT="$D/docs/Interests"
mkdir -p "$AIGC/BLUECOMIC" "$AIGC/MC" "$AIGC/TLDOE" "$CREA/追梦合伙人音乐卡片" "$POST" "$INT/Podcast" "$INT/Game" "$INT/Music/播放器"

NOISE='<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/></filter>'
grad() { echo "<linearGradient id=\"$1\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"$2\"/><stop offset=\"1\" stop-color=\"$3\"/></linearGradient>"; }

C1="#f2c98a|#f2a565"; C2="#87bed4|#f7f3e9"; C3="#f2a565|#87bed4"; C4="#203848|#f2a565"; C5="#f7f3e9|#87bed4"; C6="#f2c98a|#87bed4"
pairAt() { case $1 in 0) echo "$C1";; 1) echo "$C2";; 2) echo "$C3";; 3) echo "$C4";; 4) echo "$C5";; *) echo "$C6";; esac; }

# ---------- 母题片段（画布 800x1067 中央区域）----------
M_MOONARC='<path d="M420,180 A 210,210 0 1 0 560,520 A 168,168 0 1 1 420,180" fill="none" stroke="url(#g)" stroke-width="4"/><circle cx="620" cy="260" r="5" fill="url(#g)"/><circle cx="180" cy="200" r="3.5" fill="url(#g)" opacity="0.8"/><circle cx="700" cy="420" r="3" fill="url(#g)" opacity="0.6"/>'
M_LIGHTHOUSE='<path d="M360,560 L400,220 L440,560 Z" fill="none" stroke="url(#g)" stroke-width="4" stroke-linejoin="round"/><line x1="340" y1="560" x2="500" y2="560" stroke="url(#g)" stroke-width="4"/><path d="M410,210 L660,120 M410,210 L180,120" stroke="url(#gs)" stroke-width="2.4" opacity="0.85"/><circle cx="410" cy="205" r="8" fill="url(#g)"/><line x1="300" y1="640" x2="540" y2="640" stroke="url(#g)" stroke-width="2" opacity="0.6"/>'
M_COMPASS='<circle cx="410" cy="380" r="170" fill="none" stroke="url(#g)" stroke-width="3.5"/><circle cx="410" cy="380" r="130" fill="none" stroke="url(#g)" stroke-width="1.4" stroke-dasharray="4 10" opacity="0.7"/><path d="M410,240 L444,380 L410,520 L376,380 Z" fill="none" stroke="url(#gs)" stroke-width="2.6"/><circle cx="410" cy="380" r="10" fill="url(#g)"/>'
M_WHALE='<path d="M180,440 q 120,-90 260,-52 q 130,36 190,-8 q -30,66 -110,84 q -150,34 -278,-4 q -50,-14 -62,-20 Z" fill="none" stroke="url(#g)" stroke-width="4" stroke-linejoin="round"/><path d="M560,392 q 34,-26 62,-18 q -20,26 -46,34" fill="none" stroke="url(#g)" stroke-width="3"/><circle cx="240" cy="404" r="6" fill="url(#g)"/><circle cx="320" cy="240" r="3" fill="url(#gs)" opacity="0.8"/><circle cx="520" cy="200" r="4" fill="url(#gs)" opacity="0.7"/><circle cx="660" cy="300" r="3" fill="url(#gs)" opacity="0.6"/>'
M_PLANE='<path d="M300,520 L560,330 L470,560 L420,470 Z" fill="none" stroke="url(#g)" stroke-width="4" stroke-linejoin="round"/><path d="M300,520 L420,470 L560,330" fill="none" stroke="url(#g)" stroke-width="2.4"/><path d="M180,640 q 60,-30 120,0 t 120,0" fill="none" stroke="url(#gs)" stroke-width="2" stroke-dasharray="8 12" opacity="0.75"/><circle cx="620" cy="220" r="4" fill="url(#gs)"/>'
M_CLOCK='<circle cx="410" cy="380" r="175" fill="none" stroke="url(#g)" stroke-width="3.5"/><line x1="410" y1="380" x2="410" y2="255" stroke="url(#g)" stroke-width="4"/><line x1="410" y1="380" x2="510" y2="440" stroke="url(#gs)" stroke-width="3"/><circle cx="410" cy="380" r="9" fill="url(#g)"/><g stroke="url(#g)" stroke-width="2" opacity="0.5"><line x1="410" y1="205" x2="410" y2="225"/><line x1="410" y1="535" x2="410" y2="555"/><line x1="235" y1="380" x2="255" y2="380"/><line x1="565" y1="380" x2="585" y2="380"/></g>'

# ---------- 星港夜话 B1-B6 ----------
i=0
for motif in "$M_MOONARC" "$M_LIGHTHOUSE" "$M_COMPASS" "$M_WHALE" "$M_PLANE" "$M_CLOCK"; do
  i=$((i+1)); p=$(pairAt $((i-1))); c1="${p%%|*}"; c2="${p##*|}"
  cat > "$SVGDIR/sh-$i.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067">
<defs>$(grad g "$c1" "$c2")$(grad gs "#f7f3e9" "#87bed4")$NOISE</defs>
<rect width="800" height="1067" fill="#0b1f2a"/>
$motif
<text x="56" y="920" font-family="Arial Black, Arial" font-size="64" font-weight="900" fill="none" stroke="url(#g)" stroke-width="2">B$i</text>
<text x="56" y="985" font-family="Arial" font-size="19" letter-spacing="6" fill="#f7f3e9" opacity="0.55">STARHARBOR — NOCTURNE</text>
<rect x="26" y="26" width="748" height="1015" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/>
<rect width="800" height="1067" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
  render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/sh-$i.svg|$AIGC/BLUECOMIC/B$i.png|800|1067"
done

# ---------- 夜航城市 C1-C7（天际线模板，色相与构图轮换）----------
i=0
for tone in "#f2a565|#f7f3e9" "#87bed4|#f7f3e9" "#f2c98a|#f2a565" "#87bed4|#203848" "#f7f3e9|#87bed4" "#f2a565|#87bed4" "#f2c98a|#f2a565"; do
  i=$((i+1)); c1="${tone%%|*}"; c2="${tone##*|}"
  off=$(( (i % 3) * 40 ))
  cat > "$SVGDIR/nc-$i.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067">
<defs>$(grad g "$c1" "$c2")$NOISE</defs>
<rect width="800" height="1067" fill="#0b1f2a"/>
<circle cx="$((200 + off))" cy="300" r="90" fill="none" stroke="url(#g)" stroke-width="2.5" opacity="0.8"/>
<g fill="none" stroke="url(#g)" stroke-width="3">
<path d="M100,720 L100,540 L180,540 L180,620 L260,620 L260,470 L340,470 L340,720"/>
<path d="M380,720 L380,420 L470,420 L470,560 L560,560 L560,720"/>
<path d="M600,720 L600,500 L700,500 L700,720"/>
</g>
<g fill="url(#g)"><circle cx="140" cy="580" r="4"/><circle cx="300" cy="510" r="4"/><circle cx="430" cy="470" r="4"/><circle cx="520" cy="600" r="4"/><circle cx="650" cy="560" r="4"/></g>
<line x1="60" y1="722" x2="740" y2="722" stroke="url(#g)" stroke-width="2.5"/>
<path d="M100,800 q 80,-24 160,0 t 160,0 t 160,0 t 160,0" fill="none" stroke="url(#g)" stroke-width="1.6" opacity="0.5"/>
<text x="56" y="920" font-family="Arial Black, Arial" font-size="64" font-weight="900" fill="none" stroke="url(#g)" stroke-width="2">C$i</text>
<text x="56" y="985" font-family="Arial" font-size="19" letter-spacing="6" fill="#f7f3e9" opacity="0.55">NIGHT CIRCUIT — NOCTURNE</text>
<rect x="26" y="26" width="748" height="1015" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/>
<rect width="800" height="1067" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
  render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/nc-$i.svg|$AIGC/MC/C$i.png|800|1067"
done

# ---------- 信笺远方 L1-L6（信封 + 航线）----------
i=0
for tone in "#f2c98a|#f2a565" "#87bed4|#f7f3e9" "#f2a565|#87bed4" "#f7f3e9|#87bed4" "#203848|#f2a565" "#f2c98a|#87bed4"; do
  i=$((i+1)); c1="${tone%%|*}"; c2="${tone##*|}"
  cat > "$SVGDIR/lf-$i.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067">
<defs>$(grad g "$c1" "$c2")$NOISE</defs>
<rect width="800" height="1067" fill="#0b1f2a"/>
<rect x="170" y="330" width="460" height="320" rx="10" fill="none" stroke="url(#g)" stroke-width="3.5"/>
<path d="M170,340 L400,510 L630,340" fill="none" stroke="url(#g)" stroke-width="3"/>
<circle cx="586" cy="374" r="34" fill="none" stroke="url(#gs)" stroke-width="2"/>
<path d="M570,374 h32 M586,358 v32" stroke="url(#gs)" stroke-width="2"/>
<path d="M120,760 q 80,-28 160,0 t 160,0 t 160,0 t 160,0" fill="none" stroke="url(#gs)" stroke-width="1.8" stroke-dasharray="10 12" opacity="0.7"/>
<circle cx="640" cy="240" r="46" fill="none" stroke="url(#gs)" stroke-width="2" opacity="0.8"/>
<text x="56" y="920" font-family="Arial Black, Arial" font-size="64" font-weight="900" fill="none" stroke="url(#g)" stroke-width="2">L$i</text>
<text x="56" y="985" font-family="Arial" font-size="19" letter-spacing="6" fill="#f7f3e9" opacity="0.55">LETTERS AFAR — NOCTURNE</text>
<rect x="26" y="26" width="748" height="1015" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/>
<rect width="800" height="1067" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
  render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/lf-$i.svg|$AIGC/TLDOE/L$i.png|800|1067"
done

# ---------- 同行者卡 9 张（500x700 圆章符号）----------
sym_anchor='<path d="M250,250 v160 a90,90 0 0 0 180,0 M250,320 h180 M340,250 m-16,0 a16,16 0 1 0 32,0 a16,16 0 1 0 -32,0" fill="none" stroke="url(#g)" stroke-width="6" stroke-linecap="round"/>'
sym_star='<path d="M340,220 L370,320 L470,330 L392,392 L420,490 L340,432 L260,490 L288,392 L210,330 L310,320 Z" fill="none" stroke="url(#g)" stroke-width="5" stroke-linejoin="round"/>'
sym_moon='<path d="M400,200 A 140,140 0 1 0 470,460 A 112,112 0 1 1 400,200" fill="none" stroke="url(#g)" stroke-width="5"/>'
sym_compass='<circle cx="340" cy="350" r="120" fill="none" stroke="url(#g)" stroke-width="4"/><path d="M340,250 L364,350 L340,450 L316,350 Z" fill="none" stroke="url(#gs)" stroke-width="3.5"/><circle cx="340" cy="350" r="8" fill="url(#g)"/>'
sym_sail='<path d="M340,210 L340,430 M340,230 Q 450,300 380,430 L340,430 M340,300 Q 260,350 300,430" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/><path d="M240,470 h220" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/>'
sym_lantern='<rect x="280" y="240" width="120" height="180" rx="40" fill="none" stroke="url(#g)" stroke-width="5"/><path d="M300,240 q 40,-40 80,0 M340,200 v40 M340,420 v50" stroke="url(#g)" stroke-width="4" fill="none"/><circle cx="340" cy="330" r="20" fill="url(#g)"/>'
sym_tide='<path d="M200,300 q 70,-32 140,0 t 140,0 M200,370 q 70,-32 140,0 t 140,0 M200,440 q 70,-32 140,0 t 140,0" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/>'
sym_gull='<path d="M220,300 q 60,-50 120,0 q 60,-50 120,0 M250,400 q 45,-38 90,0 q 45,-38 90,0" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/><circle cx="470" cy="240" r="7" fill="url(#gs)"/>'
sym_bell='<path d="M270,380 a70,70 0 0 1 140,0 q 0,60 30,80 h-200 q 30,-20 30,-80" fill="none" stroke="url(#g)" stroke-width="5" stroke-linejoin="round"/><path d="M340,220 v30 M310,480 q 30,26 60,0" stroke="url(#g)" stroke-width="4" fill="none"/><circle cx="340" cy="480" r="8" fill="url(#g)"/>'
names=(anchor star moon compass sail lantern tide gull bell)
words=(ANCHOR STAR MOON COMPASS SAIL LANTERN TIDE GULL BELL)
i=0
for sym in "$sym_anchor" "$sym_star" "$sym_moon" "$sym_compass" "$sym_sail" "$sym_lantern" "$sym_tide" "$sym_gull" "$sym_bell"; do
  n=${names[$i]}; w=${words[$i]}
  case $((i % 5)) in 0) p="$C1";; 1) p="$C2";; 2) p="$C3";; 3) p="$C5";; 4) p="$C6";; esac
  c1="${p%%|*}"; c2="${p##*|}"
  cat > "$SVGDIR/vg-$n.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="700" viewBox="0 0 500 700">
<defs>$(grad g "$c1" "$c2")$NOISE</defs>
<rect width="500" height="700" fill="#0e2a37"/>
<circle cx="250" cy="330" r="165" fill="none" stroke="url(#g)" stroke-width="3"/>
$sym
<text x="250" y="600" text-anchor="middle" font-family="Arial" font-size="24" letter-spacing="10" fill="#f7f3e9" opacity="0.65">$w</text>
<rect width="500" height="700" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
  render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/vg-$n.svg|$CREA/追梦合伙人音乐卡片/$n.png|500|700"
  i=$((i+1))
done

# ---------- 两张专辑封面（800x800）----------
cat > "$SVGDIR/cov-goldheart.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs>$(grad g "#f2c98a" "#f2a565")$(grad gs "#87bed4" "#f7f3e9")$NOISE</defs>
<rect width="800" height="800" fill="#0b1f2a"/>
<path d="M400,560 C 300,480 240,420 240,340 a 80,80 0 0 1 160,-20 a 80,80 0 0 1 160,20 c 0,80 -60,140 -160,220 Z" fill="none" stroke="url(#g)" stroke-width="6" stroke-linejoin="round"/>
<path d="M400,560 C 300,480 240,420 240,340 a 80,80 0 0 1 160,-20 a 80,80 0 0 1 160,20 c 0,80 -60,140 -160,220 Z" fill="none" stroke="url(#gs)" stroke-width="1.5" opacity="0.5" transform="translate(0,-14)"/>
<text x="400" y="660" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="52" fill="url(#gs)">Golden Heart</text>
<text x="400" y="710" text-anchor="middle" font-family="Arial" font-size="17" letter-spacing="8" fill="#f7f3e9" opacity="0.5">DUMPLING — SINGLE</text>
<rect width="800" height="800" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
cat > "$SVGDIR/cov-dumplingnights.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs>$(grad g "#f2c98a" "#f2a565")$(grad gs "#87bed4" "#f7f3e9")$NOISE</defs>
<rect width="800" height="800" fill="#0b1f2a"/>
<circle cx="560" cy="230" r="110" fill="none" stroke="url(#gs)" stroke-width="2.5" stroke-dasharray="3 10" opacity="0.85"/>
<g fill="none" stroke="url(#g)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" transform="translate(190,330) scale(1.05)">
<path d="M120,190 A 120,104 0 0 1 360,190"/>
<path d="M158,110 q 11,-35 24,-3"/><path d="M198,96 q 11,-36 24,-3"/><path d="M240,92 q 11,-36 24,-3"/><path d="M282,102 q 11,-35 24,-2"/>
<path d="M92,216 q 148,46 296,0"/>
</g>
<path d="M120,600 q 90,-30 180,0 t 180,0 t 180,0" fill="none" stroke="url(#gs)" stroke-width="2" opacity="0.6"/>
<text x="400" y="700" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="52" fill="url(#g)">Dumpling Nights</text>
<rect width="800" height="800" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/cov-goldheart.svg|$CREA/金心-专辑封面.png|800|800"
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/cov-dumplingnights.svg|$CREA/dumpling-nights-歌曲封面.png|800|800"

# ---------- 年度海报 5 张（800x1067，大年份）----------
i=0
for item in "月背来信|2023|$M_MOONARC|#f2c98a|#f2a565" "初次点亮|2023|$M_LIGHTHOUSE|#87bed4|#f7f3e9" "港夜|2024|<circle cx='410' cy='380' r='180' fill='none' stroke='url(#g)' stroke-width='3.5'/><path d='M230,720 h360' stroke='url(#g)' stroke-width='3'/>|#f2a565|#87bed4" "金潮|2024|<path d='M180,380 q 115,-40 230,0 t 230,0 M180,470 q 115,-40 230,0 t 230,0 M180,560 q 115,-40 230,0 t 230,0' fill='none' stroke='url(#g)' stroke-width='4'/>|#f7f3e9|#87bed4" "环航|2026|$M_COMPASS|#f2c98a|#87bed4"; do
  IFS="|" read -r label year motif c1 c2 <<< "$item"
  i=$((i+1))
  cat > "$SVGDIR/yr-$i.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067">
<defs>$(grad g "$c1" "$c2")$NOISE</defs>
<rect width="800" height="1067" fill="#0b1f2a"/>
<motif>$motif</motif>
<text x="56" y="860" font-family="Arial Black, Arial" font-size="150" font-weight="900" fill="none" stroke="url(#g)" stroke-width="2.5">$year</text>
<text x="58" y="955" font-family="Arial" font-size="20" letter-spacing="7" fill="#f7f3e9" opacity="0.55">$label — ANNUAL VISUAL</text>
<text x="58" y="990" font-family="Arial" font-size="15" letter-spacing="5" fill="#f7f3e9" opacity="0.32">GOLDENHEART / $year</text>
<rect x="26" y="26" width="748" height="1015" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/>
<rect width="800" height="1067" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
  render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/yr-$i.svg|$POST/$label-$year.png|800|1067"
done

# ---------- NIGHT FM 电台卡 4 张（600x600）----------
i=0
for item in "night-wind|夜风频道|NIGHT FM" "dumpling-fm|饺子电台|DUMPLING RADIO" "lighthouse-fm|灯塔频道|BEAM FM" "stardust-fm|星尘频道|STARDUST FM"; do
  IFS="|" read -r fname label en <<< "$item"
  i=$((i+1))
  case $((i % 5)) in 0) p="$C1";; 1) p="$C2";; 2) p="$C3";; 3) p="$C5";; 4) p="$C6";; esac
  c1="${p%%|*}"; c2="${p##*|}"
  cat > "$SVGDIR/fm-$i.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs>$(grad g "$c1" "$c2")$NOISE</defs>
<rect width="600" height="600" fill="#0e2a37"/>
<rect x="130" y="180" width="340" height="220" rx="24" fill="none" stroke="url(#g)" stroke-width="4"/>
<circle cx="410" cy="290" r="42" fill="none" stroke="url(#gs)" stroke-width="3"/>
<line x1="150" y1="240" x2="330" y2="240" stroke="url(#gs)" stroke-width="3" opacity="0.8"/>
<line x1="150" y1="280" x2="300" y2="280" stroke="url(#gs)" stroke-width="3" opacity="0.55"/>
<path d="M180,470 q 60,-22 120,0 t 120,0" fill="none" stroke="url(#g)" stroke-width="2.5"/>
<line x1="410" y1="290" x2="470" y2="180" stroke="url(#g)" stroke-width="3"/>
<circle cx="470" cy="180" r="7" fill="url(#g)"/>
<text x="300" y="520" text-anchor="middle" font-family="Arial" font-size="26" letter-spacing="8" fill="#f7f3e9" opacity="0.7">$en</text>
<text x="300" y="556" text-anchor="middle" font-family="Arial" font-size="16" letter-spacing="6" fill="#f7f3e9" opacity="0.4">$label · GOLDENHEART</text>
<rect width="600" height="600" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
  render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/fm-$i.svg|$INT/Podcast/$fname.png|600|600"
done

# ---------- 游戏 3 张（600x600）----------
cat > "$SVGDIR/gm-1.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs>$(grad g "#f2c98a" "#f2a565")$NOISE</defs>
<rect width="600" height="600" fill="#0e2a37"/>
<rect x="150" y="210" width="300" height="180" rx="90" fill="none" stroke="url(#g)" stroke-width="5"/>
<circle cx="230" cy="300" r="14" fill="none" stroke="url(#g)" stroke-width="4"/><circle cx="380" cy="280" r="10" fill="none" stroke="url(#gs)" stroke-width="4"/><circle cx="380" cy="322" r="10" fill="url(#gs)"/>
<text x="300" y="500" text-anchor="middle" font-family="Arial" font-size="22" letter-spacing="9" fill="#f7f3e9" opacity="0.6">PLAY · GOLDENHEART</text>
<rect width="600" height="600" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
cat > "$SVGDIR/gm-2.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs>$(grad g "#87bed4" "#f7f3e9")$NOISE</defs>
<rect width="600" height="600" fill="#0e2a37"/>
<g fill="url(#g)"><rect x="200" y="200" width="40" height="40"/><rect x="260" y="240" width="40" height="40" opacity="0.8"/><rect x="320" y="200" width="40" height="40" opacity="0.6"/><rect x="260" y="160" width="40" height="40" opacity="0.9"/><rect x="200" y="280" width="40" height="40" opacity="0.7"/><rect x="320" y="280" width="40" height="40" opacity="0.85"/></g>
<text x="300" y="500" text-anchor="middle" font-family="Arial" font-size="22" letter-spacing="9" fill="#f7f3e9" opacity="0.6">PIXEL · GOLDENHEART</text>
<rect width="600" height="600" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
cat > "$SVGDIR/gm-3.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs>$(grad g "#f2a565" "#87bed4")$NOISE</defs>
<rect width="600" height="600" fill="#0e2a37"/>
<g fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round"><path d="M180,180 h240 v100 h-160 v90 h220"/><path d="M180,180 v190 h-40"/></g>
<circle cx="420" cy="370" r="10" fill="url(#gs)"/>
<text x="300" y="500" text-anchor="middle" font-family="Arial" font-size="22" letter-spacing="9" fill="#f7f3e9" opacity="0.6">MAZE · GOLDENHEART</text>
<rect width="600" height="600" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/gm-1.svg|$INT/Game/joypad.png|600|600"
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/gm-2.svg|$INT/Game/pixel.png|600|600"
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/gm-3.svg|$INT/Game/maze.png|600|600"

# ---------- 播放器封面 3 张（600x600）----------
cat > "$SVGDIR/cv-1.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs>$(grad g "#f2c98a" "#f2a565")$NOISE</defs>
<rect width="600" height="600" fill="#0b1f2a"/>
<path d="M120,430 q 90,-30 180,0 t 180,0" fill="none" stroke="url(#gs)" stroke-width="2.5" opacity="0.8"/>
<circle cx="300" cy="250" r="90" fill="none" stroke="url(#g)" stroke-width="3.5"/><circle cx="300" cy="250" r="56" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.7"/><circle cx="300" cy="250" r="8" fill="url(#g)"/>
<text x="300" y="520" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="34" fill="url(#g)">Harbor Lights</text>
<rect width="600" height="600" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
cat > "$SVGDIR/cv-2.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs>$(grad g "#87bed4" "#f7f3e9")$NOISE</defs>
<rect width="600" height="600" fill="#0b1f2a"/>
<g fill="url(#g)"><circle cx="180" cy="200" r="5"/><circle cx="300" cy="150" r="4"/><circle cx="420" cy="230" r="5"/><circle cx="240" cy="300" r="4"/><circle cx="380" cy="330" r="4"/><circle cx="300" cy="400" r="5"/><circle cx="150" cy="380" r="3"/><circle cx="450" cy="420" r="3"/></g>
<path d="M300,150 L380,330 L300,400 L240,300 Z" fill="none" stroke="url(#gs)" stroke-width="2" opacity="0.7"/>
<text x="300" y="520" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="34" fill="url(#gs)">Star Graffiti</text>
<rect width="600" height="600" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
cat > "$SVGDIR/cv-3.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<defs>$(grad g "#f2a565" "#87bed4")$NOISE</defs>
<rect width="600" height="600" fill="#0b1f2a"/>
<path d="M260,180 L300,120 L340,180" fill="none" stroke="url(#g)" stroke-width="4"/><rect x="270" y="180" width="60" height="160" rx="26" fill="none" stroke="url(#g)" stroke-width="4"/><circle cx="300" cy="260" r="14" fill="url(#g)"/>
<path d="M140,420 q 80,-28 160,0 t 160,0" fill="none" stroke="url(#gs)" stroke-width="2.2" opacity="0.7"/>
<text x="300" y="520" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="34" fill="url(#g)">Lighthouse</text>
<rect width="600" height="600" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/cv-1.svg|$INT/Music/播放器/cover-harbor-lights.jpg|600|600"
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/cv-2.svg|$INT/Music/播放器/cover-star-graffiti.jpg|600|600"
render_list="$render_list E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/cv-3.svg|$INT/Music/播放器/cover-lighthouse.jpg|600|600"

# ---------- 渲染 ----------
for item in $render_list; do
  IFS="|" read -r svg png w h <<< "$item"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --window-size=$w,$h --default-background-color=00000000 \
    --screenshot="$png" "file:///$svg" >/dev/null 2>&1
done
echo "=== nocturne done: $(echo $render_list | wc -w) images ==="
