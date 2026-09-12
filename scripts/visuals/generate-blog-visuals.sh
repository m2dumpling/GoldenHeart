#!/bin/bash
# GoldenHeart 博客视觉第二批：技术封面 x3 + 散文封面 + 插图 x3
set -e
SVGDIR="$(pwd)/scripts/visuals/svg-src"
PUB="$(pwd)/public"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
mkdir -p "$SVGDIR" "$PUB/covers" "$PUB/essays"

NOISE='<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/></filter>'
grad() { echo "<linearGradient id=\"$1\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"$2\"/><stop offset=\"1\" stop-color=\"$3\"/></linearGradient>"; }
frame() { echo '<rect x="36" y="36" width="1528" height="768" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/><text x="1500" y="776" text-anchor="end" font-family="Arial" font-size="16" letter-spacing="6" fill="#f7f3e9" opacity="0.35">GOLDENHEART / 2026</text>'; }
wide() { cat > "$SVGDIR/$1.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="840" viewBox="0 0 1600 840">
<defs>$2$NOISE</defs>
<rect width="1600" height="840" fill="#0b0b0e"/>
$3
$4
<rect width="1600" height="840" filter="url(#n)" opacity="0.55"/>
</svg>
EOF
}

# ---------- cover-agent：中央核心 + 放射工具节点 ----------
WIDE_TITLE='<text x="96" y="700" font-family="Arial Black, Arial" font-size="118" font-weight="900" fill="none" stroke="url(#g)" stroke-width="2.5" letter-spacing="6">AI AGENT NOTES</text>'
wide cover-agent "$(grad g '#f2c98a' '#f2a565')$(grad gs '#87bed4' '#f7f3e9')" \
'<g fill="none" stroke="url(#gs)" stroke-width="1.6"><line x1="1120" y1="400" x2="1330" y2="205"/><line x1="1120" y1="400" x2="1410" y2="355"/><line x1="1120" y1="400" x2="1395" y2="560"/><line x1="1120" y1="400" x2="1180" y2="640"/><line x1="1120" y1="400" x2="905" y2="230"/></g><circle cx="1120" cy="400" r="86" fill="none" stroke="url(#g)" stroke-width="3"/><circle cx="1120" cy="400" r="118" fill="none" stroke="url(#g)" stroke-width="1.2" stroke-dasharray="3 9" opacity="0.7"/><circle cx="1120" cy="400" r="10" fill="url(#g)"/><circle cx="1330" cy="205" r="26" fill="none" stroke="url(#gs)" stroke-width="2"/><circle cx="1410" cy="355" r="20" fill="none" stroke="url(#gs)" stroke-width="2"/><circle cx="1395" cy="560" r="30" fill="none" stroke="url(#gs)" stroke-width="2"/><circle cx="1180" cy="640" r="18" fill="none" stroke="url(#gs)" stroke-width="2"/><circle cx="905" cy="230" r="22" fill="none" stroke="url(#gs)" stroke-width="2"/>' \
"$WIDE_TITLE"

# ---------- cover-rust：所有者圆 + 借用圆 ----------
wide cover-rust "$(grad g '#f2a565' '#f7f3e9')$(grad gs '#87bed4' '#203848')" \
'<circle cx="1080" cy="360" r="130" fill="none" stroke="url(#g)" stroke-width="3"/><circle cx="1270" cy="470" r="86" fill="none" stroke="url(#gs)" stroke-width="2" stroke-dasharray="6 8"/><path d="M1210,395 q 30,26 52,52" fill="none" stroke="url(#gs)" stroke-width="2.4"/><path d="M1246,462 l 16,-14 l -4,22 z" fill="url(#gs)"/><text x="1040" y="375" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="54" fill="url(#g)">own</text><text x="1270" y="482" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="36" fill="url(#gs)">&amp;</text>' \
'<text x="96" y="700" font-family="Arial Black, Arial" font-size="118" font-weight="900" fill="none" stroke="url(#g)" stroke-width="2.5" letter-spacing="6">OWNERSHIP</text>'

# ---------- cover-redis：缓存层叠 ----------
wide cover-redis "$(grad g '#87bed4' '#f7f3e9')$(grad gs '#f2c98a' '#f2a565')" \
'<rect x="960" y="250" width="440" height="86" rx="18" fill="none" stroke="url(#g)" stroke-width="2.6"/><rect x="1000" y="372" width="360" height="86" rx="18" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.75"/><rect x="1040" y="494" width="280" height="86" rx="18" fill="none" stroke="url(#gs)" stroke-width="2" opacity="0.55"/><path d="M1180,600 l 0,56 m -14,-18 l 14,18 l 14,-18" fill="none" stroke="url(#gs)" stroke-width="2.4"/><path d="M1166,236 l 14,-18 l 14,18" fill="none" stroke="url(#gs)" stroke-width="2.4"/><path d="M1180,218 l 0,-40" stroke="url(#gs)" stroke-width="2.4"/>' \
'<text x="96" y="700" font-family="Arial Black, Arial" font-size="118" font-weight="900" fill="none" stroke="url(#g)" stroke-width="2.5" letter-spacing="6">CACHE LAYERS</text>'

# ---------- 散文封面：月亮 + 饺子 ----------
wide essay "$(grad g '#f2c98a' '#f2a565')$(grad gm '#f7f3e9' '#87bed4')" \
'<circle cx="1210" cy="300" r="150" fill="none" stroke="url(#gm)" stroke-width="3"/><circle cx="1210" cy="300" r="178" fill="none" stroke="url(#gm)" stroke-width="1" stroke-dasharray="2 10" opacity="0.7"/><line x1="180" y1="620" x2="1420" y2="620" stroke="#f7f3e9" stroke-opacity="0.35" stroke-width="1.4"/><g fill="none" stroke="url(#g)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" transform="translate(880,428) scale(0.62)"><path d="M120,190 A 120,104 0 0 1 360,190"/><path d="M158,110 q 11,-35 24,-3"/><path d="M198,96 q 11,-36 24,-3"/><path d="M240,92 q 11,-36 24,-3"/><path d="M282,102 q 11,-35 24,-2"/><path d="M92,216 q 148,46 296,0"/></g>' \
'<text x="92" y="330" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="108" font-weight="700" fill="#f7f3e9" letter-spacing="10">一碗饺子</text><text x="92" y="452" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="108" font-weight="700" fill="none" stroke="url(#gm)" stroke-width="2" letter-spacing="10">的距离</text><text x="96" y="530" font-family="Georgia, serif" font-style="italic" font-size="34" fill="url(#g)">an essay by dumpling</text>'

# ---------- 插图（1200x700）----------
ill() { cat > "$SVGDIR/$1.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
<defs>$2$NOISE</defs>
<rect width="1200" height="700" fill="#0b0b0e"/>
$3
<rect x="28" y="28" width="1144" height="644" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/>
<text x="1136" y="648" text-anchor="end" font-family="Arial" font-size="15" letter-spacing="5" fill="#f7f3e9" opacity="0.32">GOLDENHEART — WORDS</text>
<rect width="1200" height="700" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
}

# steam：饺子与三缕蒸汽
ill steam "$(grad g '#f2c98a' '#f2a565')" \
'<g fill="none" stroke="url(#g)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" transform="translate(300,240) scale(1.35)"><path d="M120,190 A 120,104 0 0 1 360,190"/><path d="M158,110 q 11,-35 24,-3"/><path d="M198,96 q 11,-36 24,-3"/><path d="M240,92 q 11,-36 24,-3"/><path d="M282,102 q 11,-35 24,-2"/><path d="M92,216 q 148,46 296,0"/></g><path d="M600,320 q -26,-52 6,-96 q 30,-42 6,-88" fill="none" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" opacity="0.9"/><path d="M680,330 q -24,-48 6,-90 q 28,-40 6,-84" fill="none" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/><path d="M520,336 q -20,-42 5,-80 q 24,-36 5,-76" fill="none" stroke="url(#g)" stroke-width="3.2" stroke-linecap="round" opacity="0.45"/>'

# window：窗框与星点
ill window "$(grad g '#87bed4' '#f7f3e9')" \
'<rect x="380" y="120" width="440" height="420" fill="none" stroke="url(#g)" stroke-width="3"/><line x1="600" y1="120" x2="600" y2="540" stroke="url(#g)" stroke-width="2" opacity="0.6"/><line x1="380" y1="330" x2="820" y2="330" stroke="url(#g)" stroke-width="2" opacity="0.6"/><circle cx="470" cy="200" r="4" fill="url(#g)"/><circle cx="700" cy="170" r="3" fill="url(#g)" opacity="0.8"/><circle cx="760" cy="270" r="4.5" fill="url(#g)" opacity="0.9"/><circle cx="520" cy="420" r="3" fill="url(#g)" opacity="0.7"/><circle cx="660" cy="470" r="4" fill="url(#g)" opacity="0.8"/><circle cx="440" cy="500" r="2.5" fill="url(#g)" opacity="0.6"/><circle cx="905" cy="235" r="34" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.85"/>'

# moon：月亮与波浪
ill moon "$(grad gm '#f7f3e9' '#87bed4')$(grad g '#f2c98a' '#f2a565')" \
'<circle cx="600" cy="290" r="120" fill="none" stroke="url(#gm)" stroke-width="3"/><circle cx="600" cy="290" r="145" fill="none" stroke="url(#gm)" stroke-width="1" stroke-dasharray="2 9" opacity="0.7"/><path d="M120,520 q 90,-34 180,0 t 180,0 t 180,0 t 180,0 t 180,0" fill="none" stroke="url(#g)" stroke-width="2.2" opacity="0.85"/><path d="M120,570 q 90,-34 180,0 t 180,0 t 180,0 t 180,0 t 180,0" fill="none" stroke="url(#g)" stroke-width="1.6" opacity="0.55"/><path d="M120,620 q 90,-34 180,0 t 180,0 t 180,0 t 180,0 t 180,0" fill="none" stroke="url(#g)" stroke-width="1.1" opacity="0.35"/>'

render() {
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --window-size=$3,$4 --default-background-color=00000000 \
    --screenshot="$2" "file:///$1" >/dev/null 2>&1
  echo "ok $2"
}

render "C:/Users/DayDream/.zcode/workspace/default/../../..//e/Projects/CodexProjects/GoldenHeart/x" "/dev/null" 1 1 2>/dev/null || true
BASE="E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src"
render "$BASE/cover-agent.svg" "$PUB/covers/agent.png" 1600 840
render "$BASE/cover-rust.svg" "$PUB/covers/rust.png" 1600 840
render "$BASE/cover-redis.svg" "$PUB/covers/redis.png" 1600 840
render "$BASE/essay.svg" "$PUB/covers/essay.png" 1600 840
render "$BASE/steam.svg" "$PUB/essays/steam.png" 1200 700
render "$BASE/window.svg" "$PUB/essays/window.png" 1200 700
render "$BASE/moon.svg" "$PUB/essays/moon.png" 1200 700
echo "=== done ==="; ls "$PUB/covers" "$PUB/essays"
