#!/usr/bin/env node
// Checks the recorded feature video in Chrome: it plays, has picture and sound, the sound is
// not silent or clipped in any scene and starts where the scene says, the length matches, and
// the captions parse. Saves a frame every few seconds to look at.
//
//   NODE_PATH=<folder with playwright-core> node scripts/video/check.mjs [--frames=<folder>] [--every=5] [--only=mp4|webm]
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const arg = (name, fallback = '') => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(hit.indexOf('=') + 1) : fallback;
};
const DIR = path.resolve(arg('dir', path.join(ROOT, 'public/video')));
const FRAMES = arg('frames');
const EVERY = Number(arg('every', 5));
const ONLY = arg('only');
const NAME = 'mba-gallery-features';
const rec = JSON.parse(fs.readFileSync(path.join(HERE, 'last-recording.json'), 'utf8'));

// A server with byte ranges (seeking needs them).
const TYPES = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt; charset=utf-8', '.webp': 'image/webp' };
const server = http.createServer((req, res) => {
  if (req.url === '/') { res.setHeader('Content-Type', 'text/html'); return res.end('<!doctype html><title>check</title>'); }
  const f = path.join(DIR, path.basename(decodeURIComponent(req.url.split('?')[0])));
  if (!fs.existsSync(f)) { res.statusCode = 404; return res.end(); }
  const size = fs.statSync(f).size;
  res.setHeader('Content-Type', TYPES[path.extname(f)] || 'application/octet-stream');
  res.setHeader('Accept-Ranges', 'bytes');
  const m = /bytes=(\d+)-(\d*)/.exec(req.headers.range || '');
  if (!m) { res.setHeader('Content-Length', size); return fs.createReadStream(f).pipe(res); }
  const a = Number(m[1]), b = m[2] ? Number(m[2]) : size - 1;
  res.writeHead(206, { 'Content-Range': `bytes ${a}-${b}/${size}`, 'Content-Length': b - a + 1 });
  fs.createReadStream(f, { start: a, end: b }).pipe(res);
});
await new Promise((r) => server.listen(8096, '127.0.0.1', r));
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
await page.goto('http://127.0.0.1:8096/');
let failed = 0;
const ok = (what, pass, detail = '') => { if (!pass) failed++; console.log(`${pass ? 'ok  ' : 'FAIL'} ${what}${detail ? '  ' + detail : ''}`); };
const db = (x) => (20 * Math.log10(Math.max(x, 1e-6))).toFixed(1);

for (const ext of ['mp4', 'webm']) {
  if (ONLY && ONLY !== ext) continue;
  const file = path.join(DIR, `${NAME}.${ext}`);
  if (!fs.existsSync(file)) { ok(`${ext}: exists`, false); continue; }
  const bytes = fs.statSync(file).size;
  const info = await page.evaluate(async (src) => {
    const v = document.createElement('video');
    v.preload = 'auto'; v.muted = true; v.src = src;
    document.body.replaceChildren(v);
    await new Promise((r, j) => { v.onloadeddata = r; v.onerror = () => j(new Error('cannot load: ' + (v.error && v.error.message))); });
    const meta = { duration: v.duration, w: v.videoWidth, h: v.videoHeight };
    // Audio: decoded in full.
    const ac = new OfflineAudioContext(1, 48000, 48000);
    const ab = await ac.decodeAudioData(await (await fetch(src)).arrayBuffer());
    window.pcm = ab.getChannelData(0); window.pcmRate = ab.sampleRate;
    return { ...meta, audio: ab.duration, rate: ab.sampleRate, channels: ab.numberOfChannels };
  }, `/${NAME}.${ext}`);
  ok(`${ext}: 1920×1080, under 15 MB`, info.w === 1920 && info.h === 1080 && bytes < 15 * 1048576, `${info.w}×${info.h}, ${(bytes / 1048576).toFixed(1)} MB`);
  ok(`${ext}: length known and 45–60 s`, Number.isFinite(info.duration) && info.duration >= 45 && info.duration <= 60.5, `${info.duration.toFixed(2)} s (scenes ${rec.duration.toFixed(2)} s)`);
  ok(`${ext}: the sound is as long as the picture`, Math.abs(info.audio - info.duration) < 0.6, `sound ${info.audio.toFixed(2)} s, ${info.rate} Hz, ${info.channels} channel(s)`);
  const levels = await page.evaluate((scenes) => scenes.map((s) => {
    const a = Math.max(0, Math.floor((s.start + 0.02) * pcmRate)), b = Math.min(pcm.length, Math.floor((s.start + s.seconds) * pcmRate));
    let peak = 0, e = 0, clip = 0;
    for (let i = a; i < b; i++) { const x = Math.abs(pcm[i]); if (x > peak) peak = x; if (x >= 0.9995) clip++; e += pcm[i] * pcm[i]; }
    // Where the voice starts: the first 20 ms louder than 4% of the scene's peak.
    const w = Math.round(pcmRate * 0.02);
    let on = -1;
    for (let i = a; i + w < b; i += w) { let q = 0; for (let j = 0; j < w; j++) q += pcm[i + j] ** 2; if (Math.sqrt(q / w) > peak * 0.04) { on = i / pcmRate; break; } }
    return { id: s.id, peak, rms: Math.sqrt(e / (b - a)), clip, on, expected: s.spokenAt };
  }), rec.scenes);
  for (const l of levels) ok(`${ext}: voice in "${l.id}"`, l.peak > 0.15 && l.clip === 0 && Math.abs(l.on - l.expected) < 0.45, `peak ${db(l.peak)} dBFS, rms ${db(l.rms)} dBFS, starts ${l.on.toFixed(2)} s (line at ${l.expected.toFixed(2)} s)`);
  const top = Math.max(...levels.map((l) => l.peak));
  ok(`${ext}: loudest peak near −1 dBFS, not clipped`, top > 0.7 && top < 0.999, `${db(top)} dBFS`);

  // The picture changes and is not black.
  const times = [];
  for (let t = 1.5; t < info.duration - 0.3; t += EVERY) times.push(t);
  times.push(info.duration - 1.2);
  if (FRAMES) fs.mkdirSync(FRAMES, { recursive: true });
  const seen = [];
  for (const t of times) {
    const f = await page.evaluate(async (t) => {
      const v = document.querySelector('video');
      await new Promise((r) => { v.onseeked = r; v.currentTime = t; });
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const c = document.createElement('canvas');
      c.width = 1280; c.height = 720;
      const x = c.getContext('2d');
      x.drawImage(v, 0, 0, 1280, 720);
      const d = x.getImageData(0, 0, 1280, 720).data;
      let sum = 0, hash = 0;
      for (let i = 0; i < d.length; i += 4004) { sum += d[i] + d[i + 1] + d[i + 2]; hash = (hash * 31 + d[i] + d[i + 1]) >>> 0; }
      return { b64: c.toDataURL('image/jpeg', 0.86).split(',')[1], mean: sum / (d.length / 4004) / 3, hash };
    }, t);
    if (FRAMES) fs.writeFileSync(path.join(FRAMES, `${ext}-${t.toFixed(1).padStart(5, '0')}.jpg`), Buffer.from(f.b64, 'base64'));
    seen.push(f);
  }
  ok(`${ext}: ${times.length} frames, none black, all different`, seen.every((f) => f.mean > 12) && new Set(seen.map((f) => f.hash)).size === seen.length, `mean brightness ${Math.min(...seen.map((f) => f.mean)).toFixed(0)}–${Math.max(...seen.map((f) => f.mean)).toFixed(0)}`);
}

// Captions.
const cues = await page.evaluate(async (src) => {
  const v = document.createElement('video');
  v.src = src + '.mp4';
  const t = document.createElement('track');
  t.kind = 'captions'; t.srclang = 'en'; t.src = src + '.en.vtt'; t.default = true;
  v.append(t);
  document.body.append(v);
  t.track.mode = 'hidden';
  await new Promise((r, j) => { t.onload = r; t.onerror = () => j(new Error('captions do not load')); setTimeout(() => j(new Error('captions: timeout')), 8000); });
  return [...t.track.cues].map((c) => ({ a: c.startTime, b: c.endTime, text: c.text }));
}, `/${NAME}`).catch((e) => { console.log(String(e)); return []; });
const all = (list) => list.map((c) => c.text.replace(/\s+/g, ' ')).join(' ');
ok('captions: every line, in order, with the recorded times', cues.length === rec.cues.length && all(cues) === rec.scenes.map((s) => s.text).join(' ') && cues.every((c, i) => Math.abs(c.a - rec.cues[i].a) < 0.01 && c.b > c.a && (i === 0 || c.a >= cues[i - 1].b - 0.001)), `${cues.length} cues`);
await browser.close();
server.close();
console.log(failed ? `${failed} FAILED` : 'all passed');
process.exit(failed ? 1 : 0);
