#!/bin/bash
# GoldenHeart 视觉生成：SVG 设计稿 -> Edge 无头渲染 PNG
set -e
SVGDIR="$(pwd)/scripts/visuals/svg-src"
PUB="$(pwd)/public"
GAL="$(pwd)/src/assets/design"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
mkdir -p "$SVGDIR" "$PUB/friends" "$PUB/covers" "$GAL"

NOISE='<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/></filter>'

grad() { # id c1 c2
  echo "<linearGradient id=\"$1\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"$2\"/><stop offset=\"1\" stop-color=\"$3\"/></linearGradient>"
}

# ---------- 几何模板 ----------
GEO_A='<circle cx="560" cy="330" r="70" fill="none" stroke="url(#g)" stroke-width="2.5"/><circle cx="560" cy="330" r="130" fill="none" stroke="url(#g)" stroke-width="1.6" opacity="0.7"/><circle cx="560" cy="330" r="200" fill="none" stroke="url(#g)" stroke-width="1.1" opacity="0.45"/><circle cx="560" cy="330" r="270" fill="none" stroke="url(#g)" stroke-width="0.8" opacity="0.28"/><circle cx="560" cy="330" r="7" fill="url(#g)"/><line x1="0" y1="880" x2="800" y2="240" stroke="url(#g)" stroke-width="1.2" opacity="0.5"/>'
GEO_B='<circle cx="400" cy="790" r="280" fill="none" stroke="url(#g)" stroke-width="2.5"/><line x1="0" y1="790" x2="800" y2="790" stroke="url(#g)" stroke-width="1.4" opacity="0.6"/><circle cx="400" cy="790" r="190" fill="none" stroke="url(#g)" stroke-width="1.2" opacity="0.5"/><circle cx="628" cy="640" r="9" fill="url(#g)"/><circle cx="185" cy="905" r="5" fill="url(#g)" opacity="0.8"/>'
GEO_C='<path d="M0,320 q100,-46 200,0 t200,0 t200,0 t200,0" fill="none" stroke="url(#g)" stroke-width="2.2"/><path d="M0,400 q100,-46 200,0 t200,0 t200,0 t200,0" fill="none" stroke="url(#g)" stroke-width="1.7" opacity="0.75"/><path d="M0,480 q100,-46 200,0 t200,0 t200,0 t200,0" fill="none" stroke="url(#g)" stroke-width="1.3" opacity="0.55"/><path d="M0,560 q100,-46 200,0 t200,0 t200,0 t200,0" fill="none" stroke="url(#g)" stroke-width="1" opacity="0.4"/><path d="M0,640 q100,-46 200,0 t200,0 t200,0 t200,0" fill="none" stroke="url(#g)" stroke-width="0.8" opacity="0.28"/><circle cx="640" cy="220" r="46" fill="none" stroke="url(#g)" stroke-width="2"/>'

# ---------- 画廊海报（800x1067）----------
poster() { # num c1 c2 geo
  cat > "$SVGDIR/poster-$1.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067">
<defs>$(grad g "$2" "$3")$NOISE</defs>
<rect width="800" height="1067" fill="#0b0b0e"/>
$4
<text x="56" y="820" font-family="Arial Black, Arial" font-size="230" font-weight="900" fill="none" stroke="url(#g)" stroke-width="3">$1</text>
<text x="58" y="975" font-family="Arial" font-size="21" letter-spacing="7" fill="#f7f3e9" opacity="0.55">GOLDENHEART — VISUAL STUDY</text>
<text x="58" y="1008" font-family="Arial" font-size="17" letter-spacing="5" fill="#f7f3e9" opacity="0.32">FIG. $1 / 2026</text>
<rect x="26" y="26" width="748" height="1015" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/>
<rect width="800" height="1067" filter="url(#n)" opacity="0.55"/>
</svg>
EOF
}
poster 01 "#f2a565" "#f7f3e9" "$GEO_A"
poster 02 "#87bed4" "#f7f3e9" "$GEO_B"
poster 03 "#f2c98a" "#f2a565" "$GEO_C"
poster 04 "#87bed4" "#203848" "$GEO_C"
poster 05 "#f7f3e9" "#87bed4" "$GEO_B"
poster 06 "#f2a565" "#87bed4" "$GEO_A"

# ---------- 朋友头像（800x800）----------
friend() { # letter name c1 c2
  cat > "$SVGDIR/friend-$2.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs>$(grad g "$3" "$4")$NOISE</defs>
<rect width="800" height="800" fill="#123c4c"/>
<circle cx="400" cy="372" r="216" fill="none" stroke="url(#g)" stroke-width="3"/>
<circle cx="400" cy="372" r="244" fill="none" stroke="url(#g)" stroke-width="1.2" stroke-dasharray="3 9" opacity="0.7"/>
<text x="400" y="465" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="280" fill="url(#g)">$1</text>
<text x="400" y="740" text-anchor="middle" font-family="Arial" font-size="20" letter-spacing="8" fill="#f7f3e9" opacity="0.5">$2 — FRIENDS OF GOLDENHEART</text>
<rect width="800" height="800" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
}
friend M mochi "#f2a565" "#f7f3e9"
friend L latte "#87bed4" "#f7f3e9"
friend P pixel "#f2c98a" "#f2a565"
friend S soda "#87bed4" "#203848"
friend N nova "#f7f3e9" "#87bed4"
friend T tofu "#f2a565" "#87bed4"

# ---------- 站主头像（800x800）：饺子剪影 ----------
cat > "$SVGDIR/avatar.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs>$(grad g "#f2c98a" "#f2a565")$(grad gs "#f7f3e9" "#87bed4")$NOISE</defs>
<rect width="800" height="800" fill="#123c4c"/>
<circle cx="400" cy="392" r="252" fill="none" stroke="url(#gs)" stroke-width="1.4" stroke-dasharray="2 10" opacity="0.75"/>
<g fill="none" stroke="url(#g)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">
<path d="M248,458 A 152,132 0 0 1 552,458"/>
<path d="M296,340 q 14,-44 30,-4"/>
<path d="M348,322 q 14,-46 30,-4"/>
<path d="M402,316 q 14,-46 30,-4"/>
<path d="M456,330 q 14,-44 30,-2"/>
<path d="M212,492 q 188,58 376,0"/>
</g>
<text x="400" y="726" text-anchor="middle" font-family="Arial" font-size="24" letter-spacing="10" fill="#f7f3e9" opacity="0.55">DUMPLING</text>
<text x="400" y="758" text-anchor="middle" font-family="Arial" font-size="15" letter-spacing="5" fill="#f7f3e9" opacity="0.3">KEEP A GOLDEN HEART</text>
<rect width="800" height="800" filter="url(#n)" opacity="0.5"/>
</svg>
EOF

# ---------- 博客封面（1600x840）----------
cat > "$SVGDIR/cover.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="840" viewBox="0 0 1600 840">
<defs>$(grad g "#f2c98a" "#f2a565")$(grad gs "#87bed4" "#f7f3e9")$NOISE</defs>
<rect width="1600" height="840" fill="#0b0b0e"/>
<text x="96" y="360" font-family="Arial Black, Arial" font-size="120" font-weight="900" fill="#f7f3e9" letter-spacing="4">HELLO,</text>
<text x="96" y="500" font-family="Arial Black, Arial" font-size="120" font-weight="900" fill="none" stroke="url(#gs)" stroke-width="2.5" letter-spacing="4">GOLDENHEART</text>
<text x="100" y="580" font-family="Georgia, serif" font-style="italic" font-size="38" fill="url(#g)">a letter from dumpling</text>
<g fill="none" stroke="url(#g)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" transform="translate(1150,250) scale(1.05)">
<path d="M120,190 A 120,104 0 0 1 360,190"/>
<path d="M158,110 q 11,-35 24,-3"/>
<path d="M198,96 q 11,-36 24,-3"/>
<path d="M240,92 q 11,-36 24,-3"/>
<path d="M282,102 q 11,-35 24,-2"/>
<path d="M92,216 q 148,46 296,0"/>
</g>
<rect x="40" y="40" width="1520" height="760" fill="none" stroke="#f7f3e9" stroke-opacity="0.14"/>
<text x="1504" y="772" text-anchor="end" font-family="Arial" font-size="17" letter-spacing="6" fill="#f7f3e9" opacity="0.35">GOLDENHEART / 2026</text>
<rect width="1600" height="840" filter="url(#n)" opacity="0.55"/>
</svg>
EOF

# ---------- 渲染 ----------
render() { # svg png w h
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --window-size=$3,$4 --default-background-color=00000000 \
    --screenshot="$2" "file:///$1" >/dev/null 2>&1
  echo "ok $2"
}

for n in 01 02 03 04 05 06; do render "E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/poster-$n.svg" "$GAL/serie-$n.png" 800 1067; done
for n in mochi latte pixel soda nova tofu; do render "E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/friend-$n.svg" "$PUB/friends/$n.png" 800 800; done
render "E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/avatar.svg" "$PUB/dumpling-avatar.png" 800 800
render "E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src/cover.svg" "$PUB/covers/hello-goldenheart.png" 1600 840

rm -f "$GAL"/sample-*.png
echo "=== done ==="; ls "$GAL" "$PUB/friends"
