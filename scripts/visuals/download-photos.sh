#!/bin/bash
# GoldenHeart：下载无版权真实照片（picsum/Unsplash，黑白统一色系）
# 用法：bash scripts/visuals/download-photos.sh
set -u
D="E:/Projects/CodexProjects/GoldenHeart"
DP="/e/Projects/CodexProjects/GoldenHeart"
PICSUM="https://picsum.photos/id"
GH="/e/Projects/CodexProjects/GoldenHeart"

mkdir -p "$DP/public/friends" "$DP/public/covers" "$DP/public/essays" \
  "$DP/docs/Design/AIGC作品集/BLUECOMIC" "$DP/docs/Design/AIGC作品集/MC" "$DP/docs/Design/AIGC作品集/TLDOE" \
  "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片" "$DP/docs/Design/设计作品集/海报设计" \
  "$DP/docs/Interests/Podcast" "$DP/docs/Interests/Game" "$DP/docs/Interests/Music/音乐人" "$DP/docs/Interests/Music/播放器" \
  "$DP/docs/Projects/PawBot" "$DP/docs/Projects/AgentFramework" "$DP/docs/Projects/ProxyTool" "$DP/docs/Projects/ArgoV"

FAILS=""
# dl <id> <w> <h> <out-path>
dl() {
  local id=$1 w=$2 h=$3 out=$4 try
  local base="https://picsum.photos/id/$id/$w/$h"
  curl -sL --max-time 40 "$base" -o "$out"
  local size
  size=$(stat -c%s "$out" 2>/dev/null || echo 0)
  if [ "$size" -lt 9000 ]; then
    # 404/坏图：退回备用 id
    for try in 1084 1080 1060 1015; do
      curl -sL --max-time 40 "https://picsum.photos/id/$try/$w/$h" -o "$out"
      size=$(stat -c%s "$out" 2>/dev/null || echo 0)
      if [ "$size" -ge 9000 ]; then echo "  fallback id=$try for $out"; return 0; fi
    done
    echo "  STILL FAIL $out"; FAILS="$FAILS $out"
  else
    echo "  ok id=$id $(stat -c%s "$out") $out"
  fi
}

JOBS=""
job() { JOBS="$JOBS
$1|$2|$3|$4"; }

# ---- Whispers 朋友头像（6 方图）----
job 1011 640 640 "$DP/public/friends/mochi.png"
job 1015 640 640 "$DP/public/friends/latte.png"
job 1016 640 640 "$DP/public/friends/pixel.png"
job 1018 640 640 "$DP/public/friends/soda.png"
job 1019 640 640 "$DP/public/friends/nova.png"
job 1022 640 640 "$DP/public/friends/tofu.png"

# ---- STARHARBOR B1-B6（竖 800x1067：海/灯/夜航主题）----
job 1036 800 1067 "$DP/docs/Design/AIGC作品集/BLUECOMIC/B1.png"
job 1050 800 1067 "$DP/docs/Design/AIGC作品集/BLUECOMIC/B2.png"
job 1011 800 1067 "$DP/docs/Design/AIGC作品集/BLUECOMIC/B3.png"
job 1019 800 1067 "$DP/docs/Design/AIGC作品集/BLUECOMIC/B4.png"
job 1022 800 1067 "$DP/docs/Design/AIGC作品集/BLUECOMIC/B5.png"
job 1040 800 1067 "$DP/docs/Design/AIGC作品集/BLUECOMIC/B6.png"

# ---- Night Circuit C1-C7 ----
job 1047 800 1067 "$DP/docs/Design/AIGC作品集/MC/C1.png"
job 1048 800 1067 "$DP/docs/Design/AIGC作品集/MC/C2.png"
job 1049 800 1067 "$DP/docs/Design/AIGC作品集/MC/C3.png"
job 1051 800 1067 "$DP/docs/Design/AIGC作品集/MC/C4.png"
job 1052 800 1067 "$DP/docs/Design/AIGC作品集/MC/C5.png"
job 1054 800 1067 "$DP/docs/Design/AIGC作品集/MC/C6.png"
job 1055 800 1067 "$DP/docs/Design/AIGC作品集/MC/C7.png"

# ---- Letters Afar L1-L6 ----
job 1056 800 1067 "$DP/docs/Design/AIGC作品集/TLDOE/L1.png"
job 1057 800 1067 "$DP/docs/Design/AIGC作品集/TLDOE/L2.png"
job 1058 800 1067 "$DP/docs/Design/AIGC作品集/TLDOE/L3.png"
job 1059 800 1067 "$DP/docs/Design/AIGC作品集/TLDOE/L4.png"
job 1060 800 1067 "$DP/docs/Design/AIGC作品集/TLDOE/L5.png"
job 1061 800 1067 "$DP/docs/Design/AIGC作品集/TLDOE/L6.png"

# ---- Voyager cards 9（500x700）----
job 1063 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/anchor.png"
job 1065 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/star.png"
job 1067 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/moon.png"
job 1069 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/compass.png"
job 1070 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/sail.png"
job 1071 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/lantern.png"
job 1073 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/tide.png"
job 1076 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/gull.png"
job 1077 500 700 "$DP/docs/Design/设计作品集/创意设计/追梦合伙人音乐卡片/bell.png"

# ---- 专辑封面 2（800x800）----
job 1078 800 800 "$DP/docs/Design/设计作品集/创意设计/金心-专辑封面.png"
job 1079 800 800 "$DP/docs/Design/设计作品集/创意设计/dumpling-nights-歌曲封面.png"

# ---- 年度海报 5（800x1067）----
job 1080 800 1067 "$DP/docs/Design/设计作品集/海报设计/月背来信-2023.png"
job 1081 800 1067 "$DP/docs/Design/设计作品集/海报设计/初次点亮-2023.png"
job 1082 800 1067 "$DP/docs/Design/设计作品集/海报设计/港夜-2024.png"
job 1083 800 1067 "$DP/docs/Design/设计作品集/海报设计/金潮-2024.png"
job 1084 800 1067 "$DP/docs/Design/设计作品集/海报设计/环航-2026.png"

# ---- NIGHT FM 4（600x600）----
job 1000 600 600 "$DP/docs/Interests/Podcast/night-wind.png"
job 1001 600 600 "$DP/docs/Interests/Podcast/dumpling-fm.png"
job 1002 600 600 "$DP/docs/Interests/Podcast/lighthouse-fm.png"
job 1003 600 600 "$DP/docs/Interests/Podcast/stardust-fm.png"

# ---- Game 3 ----
job 1004 600 600 "$DP/docs/Interests/Game/joypad.png"
job 1005 600 600 "$DP/docs/Interests/Game/pixel.png"
job 1006 600 600 "$DP/docs/Interests/Game/maze.png"

# ---- 播放器封面 3 ----
job 1007 600 600 "$DP/docs/Interests/Music/播放器/cover-harbor-lights.jpg"
job 1008 600 600 "$DP/docs/Interests/Music/播放器/cover-star-graffiti.jpg"
job 1009 600 600 "$DP/docs/Interests/Music/播放器/cover-lighthouse.jpg"

# ---- 博客封面 5（1200x675）----
job 1010 1200 675 "$DP/public/covers/essay.png"
job 1012 1200 675 "$DP/public/covers/agent.png"
job 1014 1200 675 "$DP/public/covers/rust.png"
job 1017 1200 675 "$DP/public/covers/redis.png"
job 1020 1200 675 "$DP/public/covers/hello-goldenheart.png"

# ---- 散文插图 3（1200x700）----
job 1021 1200 700 "$DP/public/essays/steam.png"
job 1023 1200 700 "$DP/public/essays/window.png"
job 1024 1200 700 "$DP/public/essays/moon.png"

# ---- 技术区立绘（800x1200 竖）+ 页脚形象（960 方）----
job 1025 800 1200 "$DP/public/calmer-stand.png"
job 1026 960 960 "$DP/public/calmer-q.png"

# ---- Off Hours 音乐人 3（保持 jpg 命名）----
job 1027 640 640 "$DP/docs/Interests/Music/音乐人/mochi.jpg"
job 1028 640 640 "$DP/docs/Interests/Music/音乐人/latte.jpg"
job 1029 640 640 "$DP/docs/Interests/Music/音乐人/pixel.jpg"

# ---- Works 项目 logo 4（400x400）----
job 237 400 400 "$DP/docs/Projects/PawBot/pawbot-logo.png"
job 0 400 400 "$DP/docs/Projects/AgentFramework/agentframework-logo.png"
job 1015 400 400 "$DP/docs/Projects/ProxyTool/proxytool-logo.png"
job 180 400 400 "$DP/docs/Projects/ArgoV/argov-logo.png"

echo "$JOBS" | while IFS="|" read -r id w h out; do
  [ -z "$id" ] && continue
  dl "$id" "$w" "$h" "$out"
done

echo "=== done, fails: ${FAILS:-none} ==="
