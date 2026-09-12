#!/bin/bash
# GoldenHeart 细节素材：音乐人占位图 x3 + 项目 logo x3
set -e
SVGDIR="$(pwd)/scripts/visuals/svg-src"
DOCS="$(pwd)/docs"
PROJ="$(pwd)/docs/Projects"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
mkdir -p "$SVGDIR" "$DOCS/Interests/Music/音乐人" "$PROJ/AgentFramework" "$PROJ/ProxyTool" "$PROJ/ArgoV"

NOISE='<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/></filter>'
grad() { echo "<linearGradient id=\"$1\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"$2\"/><stop offset=\"1\" stop-color=\"$3\"/></linearGradient>"; }

# 音乐人占位图（800x800，圆章 + 首字母，深青底适配亮色主题）
musician() { # letter name c1 c2
  cat > "$SVGDIR/musician-$2.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs>$(grad g "$3" "$4")$NOISE</defs>
<rect width="800" height="800" fill="#123c4c"/>
<circle cx="400" cy="372" r="216" fill="none" stroke="url(#g)" stroke-width="3"/>
<circle cx="400" cy="372" r="244" fill="none" stroke="url(#g)" stroke-width="1.2" stroke-dasharray="3 9" opacity="0.7"/>
<text x="400" y="465" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="280" fill="url(#g)">$1</text>
<text x="400" y="740" text-anchor="middle" font-family="Arial" font-size="20" letter-spacing="8" fill="#f7f3e9" opacity="0.5">$2</text>
<rect width="800" height="800" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
}
musician M mochi "#f2a565" "#f7f3e9"
musician L latte "#87bed4" "#f7f3e9"
musician P pixel "#f2c98a" "#f2a565"

# 项目 logo（512x512，金线徽章 + 几何母题）
logo() { # name motif
  cat > "$SVGDIR/logo-$1.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs>$(grad g "#f2c98a" "#f2a565")$(grad gs "#87bed4" "#f7f3e9")$NOISE</defs>
<rect width="512" height="512" fill="#0b1f2a"/>
<circle cx="256" cy="256" r="190" fill="none" stroke="url(#g)" stroke-width="4"/>
$2
<rect width="512" height="512" filter="url(#n)" opacity="0.5"/>
</svg>
EOF
}
# Agent Framework：核心节点 + 放射工具
logo AgentFramework '<circle cx="256" cy="256" r="52" fill="none" stroke="url(#g)" stroke-width="5"/><g stroke="url(#gs)" stroke-width="3"><line x1="256" y1="204" x2="256" y2="132"/><line x1="300" y1="230" x2="362" y2="196"/><line x1="300" y1="282" x2="362" y2="316"/><line x1="212" y1="230" x2="150" y2="196"/><line x1="212" y1="282" x2="150" y2="316"/></g><circle cx="256" cy="256" r="12" fill="url(#g)"/>'
# Proxy Tool：双向箭头隧道
logo ProxyTool '<g fill="none" stroke="url(#g)" stroke-width="6" stroke-linecap="round"><path d="M150,256 h180"/><path d="M300,226 l 46,30 l -46,30"/></g><rect x="120" y="216" width="60" height="80" rx="12" fill="none" stroke="url(#gs)" stroke-width="4"/>'
# ArgoV：双环内核
logo ArgoV '<circle cx="256" cy="256" r="96" fill="none" stroke="url(#g)" stroke-width="5" stroke-dasharray="14 10"/><circle cx="256" cy="256" r="54" fill="none" stroke="url(#gs)" stroke-width="5"/><circle cx="256" cy="256" r="14" fill="url(#gs)"/>'

render() {
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --window-size=$3,$4 --default-background-color=00000000 \
    --screenshot="$2" "file:///$1" >/dev/null 2>&1
  echo "ok $2"
}

BASE="E:/Projects/CodexProjects/GoldenHeart/scripts/visuals/svg-src"
render "$BASE/musician-mochi.svg" "$DOCS/Interests/Music/音乐人/mochi.jpg" 800 800
render "$BASE/musician-latte.svg" "$DOCS/Interests/Music/音乐人/latte.jpg" 800 800
render "$BASE/musician-pixel.svg" "$DOCS/Interests/Music/音乐人/pixel.jpg" 800 800
render "$BASE/logo-AgentFramework.svg" "$PROJ/AgentFramework/agentframework-logo.png" 512 512
render "$BASE/logo-ProxyTool.svg" "$PROJ/ProxyTool/proxytool-logo.png" 512 512
render "$BASE/logo-ArgoV.svg" "$PROJ/ArgoV/argov-logo.png" 512 512
echo "=== done ==="
