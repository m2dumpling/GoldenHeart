// 后台分段截图：headless Edge + CDP，不抢占前台焦点。
// 用法：node scripts/cdp-shot.mjs <url> <outPrefix> [viewportHeight]
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const url = process.argv[2] ?? "http://127.0.0.1:4321/";
const prefix = process.argv[3] ?? "shot";
const vh = Number(process.argv[4] ?? 900);
const VW = Number(process.argv[5] ?? 1440);
const PORT = 9333;
const OUT = path.resolve(" .shots".trim());

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const profile = path.join(process.env.TEMP ?? ".", "gh-edge-cdp");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findPageTarget() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  return null;
}

let wsUrl = await findPageTarget();
let edge = null;

if (!wsUrl) {
  edge = spawn(EDGE, [
    "--headless",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--window-size=1440,900",
    "--default-background-color=FFFFFFFF",
    "about:blank",
  ], { stdio: "ignore" });
  wsUrl = await findPageTarget();
}

if (!wsUrl) throw new Error("CDP endpoint not ready");
const ws = new WebSocket(wsUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

let msgId = 0;
const pending = new Map();
const loadWaiters = [];
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id && pending.has(data.id)) {
    pending.get(data.id)(data);
    pending.delete(data.id);
  } else if (data.method === "Page.loadEventFired") {
    loadWaiters.splice(0).forEach((fn) => fn());
  }
};

function send(method, params = {}) {
  const id = ++msgId;
  return new Promise((resolve) => {
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function waitLoad(timeout = 15000) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeout);
    loadWaiters.push(() => {
      clearTimeout(timer);
      resolve();
    });
  });
}

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: VW,
  height: vh,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url });
await waitLoad();
await sleep(2200);

const evalResult = await send("Runtime.evaluate", {
  expression: "document.body.scrollHeight",
  returnByValue: true,
});
const total = evalResult?.result?.result?.value;
console.log(`total height: ${total}`);

mkdirSync(OUT, { recursive: true });
let index = 0;
for (let y = 0; y < total; y += vh) {
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({top: ${y}, behavior: "instant"})`,
  });
  await sleep(1900);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  const file = path.join(OUT, `${prefix}-${String(index).padStart(2, "0")}.png`);
  writeFileSync(file, Buffer.from(shot.result.data, "base64"));
  console.log(`saved ${file} (y=${y})`);
  index += 1;
}

ws.close();
edge?.kill();
process.exit(0);
