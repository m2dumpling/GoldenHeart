// GoldenHeart 氛围音乐合成器：纯 Node 生成 PCM WAV，无版权。
// 用法：node scripts/visuals/generate-audio.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const SR = 22050;
const OUT = path.resolve("public/audio");
mkdirSync(OUT, { recursive: true });

function writeWav(name, samples) {
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i += 1) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    data.writeInt16LE(Math.round(v * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SR, 24);
  header.writeUInt32LE(SR * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  writeFileSync(path.join(OUT, name), Buffer.concat([header, data]));
  console.log("wav:", name, (data.length / 1024 / 1024).toFixed(2) + "MB");
}

const dur = (sec) => Math.floor(SR * sec);
const rnd = (a, b) => a + Math.random() * (b - a);

// 1) Rain on the Harbor —— 过滤雨声 + 低频海面（Hero 背景乐）
function rainOnTheHarbor() {
  const n = dur(36);
  const out = new Float32Array(n);
  let lp = 0;
  let nextDrip = dur(0.05);
  const drips = [];
  for (let i = 0; i < n; i += 1) {
    const white = Math.random() * 2 - 1;
    lp += 0.06 * (white - lp); // 一阶低通 → 柔和沙沙声
    out[i] = lp * 0.5;
    if (i >= nextDrip) {
      drips.push({ at: i, f: rnd(1400, 4200), len: dur(rnd(0.015, 0.05)), amp: rnd(0.05, 0.16) });
      nextDrip = i + dur(rnd(0.04, 0.22));
    }
  }
  for (const d of drips) {
    for (let j = 0; j < d.len && d.at + j < n; j += 1) {
      const env = Math.exp(-4 * (j / d.len));
      out[d.at + j] += Math.sin((2 * Math.PI * d.f * j) / SR) * d.amp * env;
    }
  }
  for (let i = 0; i < n; i += 1) {
    const swell = 0.5 + 0.5 * Math.sin((2 * Math.PI * i) / dur(9) - 1);
    out[i] += Math.sin((2 * Math.PI * 55 * i) / SR) * 0.045 * swell;
    out[i] *= 0.85;
  }
  return out;
}

// 2) Harbor Lights —— 小调慢琶音 + 回声（Lo-fi 夜港）
function harborLights() {
  const n = dur(30);
  const out = new Float32Array(n);
  const notes = [220, 261.63, 329.63, 440, 329.63, 261.63];
  const step = dur(0.85);
  for (let k = 0, at = 0; at < n; k += 1, at += step + dur(rnd(-0.06, 0.12))) {
    const f = notes[k % notes.length];
    const len = dur(1.6);
    for (let j = 0; j < len && at + j < n; j += 1) {
      const t = j / SR;
      const env = Math.min(1, t * 18) * Math.exp(-2.6 * t);
      const tri = Math.asin(Math.sin((2 * Math.PI * f * j) / SR)) / (Math.PI / 2);
      const v = (tri * 0.6 + Math.sin((2 * Math.PI * f * 2 * j) / SR) * 0.12) * env * 0.32;
      if (at + j < n) out[at + j] += v;
      const echo = at + j + dur(0.42);
      if (echo < n) out[echo] += v * 0.32;
    }
  }
  for (let i = 0; i < n; i += 1) {
    out[i] += Math.sin((2 * Math.PI * 110 * i) / SR) * 0.02;
    out[i] *= 0.9;
  }
  return out;
}

// 3) Star Graffiti —— 五声音阶风铃（星尘）
function starGraffiti() {
  const n = dur(27);
  const out = new Float32Array(n);
  const scale = [523.25, 587.33, 659.25, 783.99, 880];
  let at = dur(0.3);
  while (at < n) {
    const f = scale[Math.floor(rnd(0, scale.length))];
    const len = dur(2);
    for (let j = 0; j < len && at + j < n; j += 1) {
      const t = j / SR;
      const env = Math.min(1, t * 40) * Math.exp(-2.2 * t);
      const v =
        (Math.sin((2 * Math.PI * f * j) / SR) * 0.22 +
          Math.sin((2 * Math.PI * f * 2.01 * j) / SR) * 0.07) *
        env;
      if (at + j < n) out[at + j] += v;
      const echo = at + j + dur(0.3);
      if (echo < n) out[echo] += v * 0.25;
    }
    at += dur(rnd(0.45, 1.15));
  }
  for (let i = 0; i < n; i += 1) {
    out[i] += Math.sin((2 * Math.PI * 65 * i) / SR) * 0.018;
    out[i] *= 0.88;
  }
  return out;
}

// 4) Lighthouse —— 可听见的灯塔脉冲 + 海面（四点的大海）
function lighthouse() {
  const n = dur(28);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    const t = i / SR;
    const phase = t % 3.4;
    const beam = phase < 0.8 ? Math.sin((Math.PI * phase) / 0.8) ** 2 : 0;
    const chime = phase < 1.35 ? Math.exp(-2.8 * phase) : 0;
    const tide =
      Math.sin((2 * Math.PI * 55 * t) + Math.sin(t * 0.42) * 0.8) * 0.065 +
      Math.sin((2 * Math.PI * 110 * t) + 0.7) * 0.026;
    const warmPad =
      Math.sin(2 * Math.PI * 146.83 * t) * 0.065 +
      Math.sin(2 * Math.PI * 220 * t + 0.6) * 0.035;
    const beacon =
      (Math.sin(2 * Math.PI * 196 * t) * 0.19 +
        Math.sin(2 * Math.PI * 392 * t) * 0.065 +
        Math.sin(2 * Math.PI * 587.33 * t) * 0.018) *
      beam;
    const bell =
      (Math.sin(2 * Math.PI * 523.25 * phase) * 0.075 +
        Math.sin(2 * Math.PI * 783.99 * phase) * 0.028) *
      chime;
    out[i] = (tide + warmPad + beacon + bell) * 0.94;
  }
  return out;
}

const tracks = {
  "rain-on-the-harbor.wav": rainOnTheHarbor,
  "harbor-lights.wav": harborLights,
  "star-graffiti.wav": starGraffiti,
  "lighthouse.wav": lighthouse,
};

const requestedTrack = process.env.GOLDENHEART_TRACK;
const outputTracks = requestedTrack
  ? [requestedTrack.endsWith(".wav") ? requestedTrack : `${requestedTrack}.wav`]
  : Object.keys(tracks);

for (const name of outputTracks) {
  if (!tracks[name]) {
    throw new Error(`Unknown track: ${name}. Use one of ${Object.keys(tracks).join(", ")}`);
  }
  writeWav(name, tracks[name]());
}

console.log("audio done ->", OUT);
