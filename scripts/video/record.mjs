#!/usr/bin/env node
// Records the feature video from scripts/video/index.html in Chrome.
//
//   NODE_PATH=<folder with playwright-core> node scripts/video/record.mjs
//     [--only=mp4|webm|poster|vtt] [--mbps=1.15] [--out=<folder>] [--port=8099] [--allow-silent]
//
// Serves the repository on 127.0.0.1, opens the canvas page in Chrome (channel 'chrome') and
// records canvas.captureStream(30) together with the voice (Web Audio → MediaStream) with
// MediaRecorder, in real time:
//   public/video/mba-gallery-features.mp4          H.264 + AAC
//   public/video/mba-gallery-features.webm         VP9 + Opus
//   public/video/mba-gallery-features-poster.webp  the poster (1280×720)
//   public/video/mba-gallery-features.en.vtt       captions, from narration.json and the real timings
// There is no ffmpeg on this machine: the WebM's missing duration is written into its header here,
// and the MP4 is rewritten from fragments to an ordinary file with its index first (mp4-flat.mjs).
// Run scripts/video/capture.mjs (photographs) and narrate.mjs (voice) first.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { serveStatic } from '../lib/static-server.mjs';
import { flattenMp4 } from './mp4-flat.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const arg = (name, fallback = '') => {
  const hit = process.argv.find((x) => x === `--${name}` || x.startsWith(`--${name}=`));
  if (!hit) return fallback;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : true;
};
const OUT = path.resolve(String(arg('out', path.join(ROOT, 'public/video'))));
const ONLY = String(arg('only', ''));
const PORT = Number(arg('port', 8099));
const MBPS = Number(arg('mbps', 1.15));
const NAME = 'mba-gallery-features';

const FORMATS = [
  { key: 'mp4', file: `${NAME}.mp4`, types: ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4;codecs=avc1.640028,mp4a.40.2'], bits: MBPS * 1e6 },
  { key: 'webm', file: `${NAME}.webm`, types: ['video/webm;codecs=vp9,opus'], bits: MBPS * 0.9e6 },
];

// ── WebM: write the Duration into Segment › Info ───────────────────────────────────────────
function readVint(buf, pos) {
  const first = buf[pos];
  let len = 1;
  while (len <= 8 && !(first & (0x80 >> (len - 1)))) len++;
  let value = first & (0xff >> len);
  let unknown = value === (0xff >> len);
  for (let i = 1; i < len; i++) {
    value = value * 256 + buf[pos + i];
    if (buf[pos + i] !== 0xff) unknown = false;
  }
  return { len, value, unknown };
}
function readId(buf, pos) {
  const first = buf[pos];
  let len = 1;
  while (len <= 4 && !(first & (0x80 >> (len - 1)))) len++;
  let id = 0;
  for (let i = 0; i < len; i++) id = id * 256 + buf[pos + i];
  return { len, id };
}
function encodeVint(value, len) {
  const out = Buffer.alloc(len);
  let v = value;
  for (let i = len - 1; i >= 0; i--) { out[i] = v % 256; v = Math.floor(v / 256); }
  out[0] |= 0x80 >> (len - 1);
  return out;
}
function vintLenFor(value) {
  for (let len = 1; len <= 8; len++) if (value < 2 ** (7 * len) - 1) return len;
  throw new Error('size too large');
}
function fixWebmDuration(buf, durationMs) {
  let pos = 0;
  const header = readId(buf, pos);
  if (header.id !== 0x1a45dfa3) throw new Error('not a WebM file');
  const hs = readVint(buf, pos + header.len);
  pos += header.len + hs.len + hs.value;
  const seg = readId(buf, pos);
  if (seg.id !== 0x18538067) throw new Error('no Segment');
  const segSizePos = pos + seg.len;
  const segSize = readVint(buf, segSizePos);
  let p = segSizePos + segSize.len;
  while (p < buf.length) {
    const el = readId(buf, p);
    const size = readVint(buf, p + el.len);
    const dataStart = p + el.len + size.len;
    if (el.id === 0x1549a966) {
      // Info: replace an existing Duration, or append one.
      const durationEl = Buffer.alloc(11);
      durationEl[0] = 0x44; durationEl[1] = 0x89; durationEl[2] = 0x88;
      durationEl.writeDoubleBE(durationMs, 3);
      let q = dataStart;
      while (q < dataStart + size.value) {
        const c = readId(buf, q);
        const cs = readVint(buf, q + c.len);
        if (c.id === 0x4489) {
          if (cs.value === 8) { buf.writeDoubleBE(durationMs, q + c.len + cs.len); return buf; }
          if (cs.value === 4) { buf.writeFloatBE(durationMs, q + c.len + cs.len); return buf; }
        }
        q += c.len + cs.len + cs.value;
      }
      const newSize = size.value + durationEl.length;
      const sizeLen = newSize < 2 ** (7 * size.len) - 1 ? size.len : vintLenFor(newSize);
      const info = Buffer.concat([buf.subarray(p, p + el.len), encodeVint(newSize, sizeLen), buf.subarray(dataStart, dataStart + size.value), durationEl]);
      const delta = info.length - (dataStart + size.value - p);
      let segHeader = buf.subarray(pos, segSizePos + segSize.len);
      if (!segSize.unknown) segHeader = Buffer.concat([buf.subarray(pos, segSizePos), encodeVint(segSize.value + delta, segSize.len)]);
      return Buffer.concat([buf.subarray(0, pos), segHeader, buf.subarray(segSizePos + segSize.len, p), info, buf.subarray(dataStart + size.value)]);
    }
    if (size.unknown) break;
    p = dataStart + size.value;
  }
  throw new Error('no Info element');
}

// ── Captions ───────────────────────────────────────────────────────────────────────────────
const stamp = (t) => {
  const ms = Math.round(t * 1000);
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)}.${p(ms % 1000, 3)}`;
};
function vtt(cues) {
  const cue = (text) => {
    // At most two lines of about 42 characters.
    if (text.length <= 44) return text;
    const words = text.split(' ');
    let best = null;
    for (let i = 1; i < words.length; i++) {
      const x = words.slice(0, i).join(' '), y = words.slice(i).join(' ');
      const d = Math.abs(x.length - y.length);
      if (!best || d < best.d) best = { d, t: x + '\n' + y };
    }
    return best.t;
  };
  return 'WEBVTT\n\n' + cues.map((c, i) => `${i + 1}\n${stamp(c.a)} --> ${stamp(c.b)}\n${cue(c.text)}\n`).join('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────────────────────
fs.mkdirSync(OUT, { recursive: true });
const server = await serveStatic(ROOT, PORT);
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await context.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' && !/favicon/.test(m.location().url || '')) errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(`http://127.0.0.1:${PORT}/scripts/video/index.html`, { waitUntil: 'load' });
const info = await page.evaluate(() => window.mbaVideo.ready);
console.log(`video: ${info.scenes.length} scenes, ${info.duration.toFixed(1)} s`);
if (info.silent.length) {
  console.log('no voice clip for: ' + info.silent.join(', '));
  if (!arg('allow-silent', false)) { await browser.close(); server.close(); process.exit(1); }
}
const result = { duration: info.duration, scenes: info.scenes, cues: info.cues, files: {} };

if (!ONLY || ONLY === 'vtt') fs.writeFileSync(path.join(OUT, `${NAME}.en.vtt`), vtt(info.cues));

if (!ONLY || ONLY === 'poster') {
  const b64 = await page.evaluate(() => {
    window.mbaVideo.poster();
    const c = document.createElement('canvas');
    c.width = 1280; c.height = 720;
    const x = c.getContext('2d');
    x.imageSmoothingQuality = 'high';
    x.drawImage(window.mbaVideo.canvas, 0, 0, 1280, 720);
    return c.toDataURL('image/webp', 0.86).split(',')[1];
  });
  const file = path.join(OUT, `${NAME}-poster.webp`);
  fs.writeFileSync(file, Buffer.from(b64, 'base64'));
  result.files.poster = fs.statSync(file).size;
  console.log(`poster: ${(result.files.poster / 1024).toFixed(0)} KB`);
}

for (const f of FORMATS) {
  if (ONLY && ONLY !== f.key) continue;
  const mimeType = await page.evaluate((types) => types.find((m) => MediaRecorder.isTypeSupported(m)) || '', f.types);
  if (!mimeType) { console.log(`${f.key}: ${f.types.join(' / ')} is not supported by this Chrome — skipped`); result.files[f.key] = 'unsupported'; continue; }
  console.log(`${f.key}: recording (${mimeType}, ${f.bits / 1e6} Mbit/s)…`);
  const rec = await page.evaluate(async ({ mimeType, bits }) => {
    const v = window.mbaVideo;
    await v.openAudio();
    v.renderAt(0);
    const stream = new MediaStream([...v.canvas.captureStream(30).getVideoTracks(), ...v.audioStream.getAudioTracks()]);
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: bits, audioBitsPerSecond: 128000 });
    const chunks = [];
    recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    const started = new Promise((r) => { recorder.onstart = r; });
    const stopped = new Promise((r) => { recorder.onstop = r; });
    recorder.start(1000);
    await started;
    const t0 = performance.now();
    const played = await v.play();
    await new Promise((r) => setTimeout(r, 120));
    recorder.stop();
    await stopped;
    const ms = performance.now() - t0;
    const bytes = new Uint8Array(await new Blob(chunks, { type: mimeType }).arrayBuffer());
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return { b64: btoa(bin), ms, ...played, type: recorder.mimeType };
  }, { mimeType, bits: f.bits });
  let buf = Buffer.from(rec.b64, 'base64');
  if (f.key === 'webm') {
    try { buf = fixWebmDuration(buf, rec.ms); } catch (e) { console.log('webm duration not written: ' + e.message); }
  } else {
    try { buf = flattenMp4(buf); } catch (e) { console.log('mp4 kept as recorded (fragments): ' + e.message); }
  }
  const file = path.join(OUT, f.file);
  fs.writeFileSync(file, buf);
  result.files[f.key] = buf.length;
  console.log(`${f.key}: ${(buf.length / 1048576).toFixed(1)} MB, ${(rec.ms / 1000).toFixed(1)} s, ${rec.frames} frames drawn (${(rec.frames / rec.seconds).toFixed(0)} fps, longest gap ${rec.worst.toFixed(0)} ms), ${rec.type}`);
}

if (errors.length) console.log('page errors:\n  ' + errors.join('\n  '));
await browser.close();
server.close();
if (!ONLY) fs.writeFileSync(path.join(ROOT, 'scripts/video/last-recording.json'), JSON.stringify(result, null, 1) + '\n');
