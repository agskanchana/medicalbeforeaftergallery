#!/usr/bin/env node
// Makes the voiceover clips of the feature video with Gemini text-to-speech, one per scene of
// scripts/video/narration.json, and caches them in scripts/video/voice/.
//
//   NODE_OPTIONS=--use-system-ca node scripts/video/narrate.mjs [--voice=Sulafat] [--only=id,id] [--force]
//   NODE_OPTIONS=--use-system-ca node scripts/video/narrate.mjs --audition=Sulafat,Vindemiatrix,Charon
//   node scripts/video/narrate.mjs --measure    (no API calls: measure the clips that exist)
//
// The key comes from the environment (GEMINI_API_KEY) and goes only into the x-goog-api-key
// header of generativelanguage.googleapis.com. A clip is made again only when its text
// or voice changes, so re-recording the video does not call the API. Only the narration text is
// sent. The answer is 16-bit PCM, 24 kHz, mono (bare, or a WAV file); it is saved as a plain WAV. voice.json lists each
// clip with its levels, the silence to trim and the gain that brings it to the common loudness.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const VOICE_DIR = path.join(HERE, 'voice');
const INDEX = path.join(VOICE_DIR, 'voice.json');
const arg = (name, fallback = '') => {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : true;
};
// One model for every clip, so the voice does not change between scenes.
const MODELS = arg('model', '') ? ['models/' + arg('model')] : ['models/gemini-3.8-flash-tts', 'models/gemini-2.5-flash-preview-tts'];
const key = process.env.GEMINI_API_KEY;
// Only the line itself is sent: a style instruction in front of it was read aloud.
// What is spoken: the beats of scenes.json, joined ("dot com" where the written line has an address).
const SPOKEN = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(HERE, 'scenes.json'), 'utf8')).scenes.map((s) => [s.id, s.beats.map((b) => b.say).join(' ')]));

// ── WAV ────────────────────────────────────────────────────────────────────────────────────
function wav(pcm, rate = 24000) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}
/** The samples of a WAV answer (the API may send a whole WAV file, with extra chunks, instead of bare PCM). */
function pcmOf(buf) {
  if (buf.toString('latin1', 0, 4) !== 'RIFF') return null;
  let rate = 24000, p = 12;
  while (p + 8 <= buf.length) {
    const id = buf.toString('latin1', p, p + 4), size = buf.readUInt32LE(p + 4);
    if (id === 'fmt ') {
      if (buf.readUInt16LE(p + 8) !== 1 || buf.readUInt16LE(p + 10) !== 1 || buf.readUInt16LE(p + 22) !== 16) throw new Error('not 16-bit mono PCM');
      rate = buf.readUInt32LE(p + 12);
    }
    if (id === 'data') return { pcm: buf.subarray(p + 8, Math.min(buf.length, p + 8 + size)), rate };
    p += 8 + size + (size % 2);
  }
  throw new Error('no data chunk');
}
/** Levels of a clip: peak, loudness while speaking, where the speech starts and ends, noise between words. */
function measure(file) {
  const buf = fs.readFileSync(file);
  const rate = buf.readUInt32LE(24);
  const n = (buf.length - 44) >> 1;
  const s = new Float32Array(n);
  let peak = 0, clipped = 0;
  for (let i = 0; i < n; i++) {
    const v = buf.readInt16LE(44 + i * 2) / 32768;
    s[i] = v;
    const a = Math.abs(v);
    if (a > peak) peak = a;
    if (a >= 0.9999) clipped++;
  }
  const win = Math.round(rate * 0.02);
  const rms = [];
  for (let i = 0; i + win <= n; i += win) {
    let e = 0;
    for (let j = 0; j < win; j++) e += s[i + j] * s[i + j];
    rms.push(Math.sqrt(e / win));
  }
  const loudest = Math.max(...rms);
  const gate = Math.max(loudest * 0.03, 0.002);
  const first = rms.findIndex((r) => r > gate);
  let last = rms.length - 1;
  while (last > 0 && rms[last] <= gate) last--;
  const spoken = rms.slice(first, last + 1).filter((r) => r > loudest * 0.1);
  const loud = Math.sqrt(spoken.reduce((a, r) => a + r * r, 0) / spoken.length);
  const quiet = [...rms.slice(first, last + 1)].sort((a, b) => a - b).slice(0, Math.max(1, Math.round((last - first) * 0.05)));
  const noise = quiet.reduce((a, b) => a + b, 0) / quiet.length;
  // Pauses inside the speech, from the start of the trimmed clip: the cuts follow them.
  const start = Math.max(0, first * 0.02 - 0.04);
  const pauses = [];
  for (let i = first, run = 0; i <= last; i++) {
    if (rms[i] <= Math.max(loudest * 0.06, gate)) { run++; continue; }
    if (run >= 4) pauses.push({ at: Number((((i - run / 2) * 0.02) - start).toFixed(3)), len: Number((run * 0.02).toFixed(2)) });
    run = 0;
  }
  return {
    pauses,
    seconds: n / rate,
    start,
    end: Math.min(n / rate, (last + 1) * 0.02 + 0.12),
    peak, loud, noise, clipped,
  };
}
const db = (x) => (20 * Math.log10(Math.max(x, 1e-6))).toFixed(1);

// ── One request ────────────────────────────────────────────────────────────────────────────
let calls = 0;
async function speak(text, voiceName, model) {
  calls++;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/${model}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } } },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    let message = '';
    try { message = JSON.parse(body).error?.message || ''; } catch { /* not JSON */ }
    throw Object.assign(new Error(`HTTP ${res.status} ${message.slice(0, 600)}`), { status: res.status });
  }
  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error('no audio in the answer (' + (json.candidates?.[0]?.finishReason || 'no candidate') + ')');
  const rate = Number(/rate=(\d+)/.exec(part.inlineData.mimeType || '')?.[1] || 24000);
  const bytes = Buffer.from(part.inlineData.data, 'base64');
  return { ...(pcmOf(bytes) || { pcm: bytes, rate }), mime: part.inlineData.mimeType };
}
async function speakWithFallback(text, voiceName) {
  let last;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try { return { ...(await speak(text, voiceName, model)), model }; } catch (e) {
        last = e;
        console.log(`  ${model}: ${e.message}`);
        if ([400, 403, 404, 429].includes(e.status)) break; // not this model, or its quota is used up: no hammering
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }
  throw last;
}

// ── Main ───────────────────────────────────────────────────────────────────────────────────
const narration = JSON.parse(fs.readFileSync(path.join(HERE, 'narration.json'), 'utf8'));
fs.mkdirSync(VOICE_DIR, { recursive: true });

const audition = String(arg('audition', ''));
if (audition) {
  if (!key) throw new Error('GEMINI_API_KEY is not set');
  const id = String(arg('line', 'cinema'));
  const line = SPOKEN[id];
  for (const voice of audition.split(',')) {
    const { pcm, rate, model, mime } = await speakWithFallback(line, voice);
    const file = path.join(VOICE_DIR, `audition-${voice}.wav`);
    fs.writeFileSync(file, wav(pcm, rate));
    const m = measure(file);
    const words = line.split(/\s+/).length;
    console.log(`${voice}: ${model} ${mime}; speech ${(m.end - m.start).toFixed(2)} s (${((m.end - m.start) / words).toFixed(2)} s/word), peak ${db(m.peak)} dB, loud ${db(m.loud)} dB, between words ${db(m.noise)} dB, clipped ${m.clipped}`);
  }
  console.log(`${calls} API calls`);
  process.exit(0);
}

const index = fs.existsSync(INDEX) ? JSON.parse(fs.readFileSync(INDEX, 'utf8')) : { clips: {} };
const voiceName = String(arg('voice', index.voice || 'Sulafat'));
const only = String(arg('only', '')).split(',').filter(Boolean);
const measureOnly = Boolean(arg('measure', false));
let stopped = null;
for (const [id, text] of Object.entries(narration)) {
  const said = SPOKEN[id] || text;
  const hash = crypto.createHash('sha1').update(`${voiceName}|${said}`).digest('hex').slice(0, 12);
  const file = path.join(VOICE_DIR, `${id}.wav`);
  const old = index.clips[id];
  const fresh = old && old.hash === hash && fs.existsSync(file);
  if (fresh) old.said = said;
  if (only.length && !only.includes(id)) continue;
  if ((!fresh || arg('force', false)) && !measureOnly) {
    if (!key) throw new Error('GEMINI_API_KEY is not set');
    let spoken;
    // The quota is used up, or no model answers: keep what there is, and say so at the end.
    try { spoken = await speakWithFallback(said, voiceName); } catch (e) { stopped = e; break; }
    const { pcm, rate, model } = spoken;
    fs.writeFileSync(file, wav(pcm, rate));
    index.clips[id] = { hash, model, said };
    console.log(`${id}: ${model}`);
    index.voice = voiceName;
    fs.writeFileSync(INDEX, JSON.stringify(index, null, 1) + '\n'); // A stop loses nothing.
    await new Promise((r) => setTimeout(r, 8000)); // Gentle on the per-minute limit.
  }
}
index.voice = voiceName;

// Levels: every clip at the same loudness while speaking, the loudest peak at −1 dBFS.
const TARGET_PEAK = 10 ** (-1 / 20);
const ids = Object.keys(narration).filter((id) => fs.existsSync(path.join(VOICE_DIR, `${id}.wav`)));
for (const id of ids) Object.assign(index.clips[id], measure(path.join(VOICE_DIR, `${id}.wav`)));
for (const id of Object.keys(index.clips)) if (!narration[id]) delete index.clips[id];
const unit = ids.map((id) => index.clips[id].peak / index.clips[id].loud); // peak when the loudness is 1
const loudness = TARGET_PEAK / Math.max(...unit);
let total = 0;
for (const id of ids) {
  const c = index.clips[id];
  c.gain = loudness / c.loud;
  const words = (SPOKEN[id] || narration[id]).split(/\s+/).length;
  c.perWord = (c.end - c.start) / words;
  total += c.end - c.start;
  for (const k of ['seconds', 'start', 'end', 'peak', 'loud', 'noise', 'gain', 'perWord']) c[k] = Number(c[k].toFixed(4));
  console.log(`${id.padEnd(12)} ${(c.end - c.start).toFixed(2)} s  ${c.perWord.toFixed(2)} s/word  peak ${db(c.peak)} → ${db(c.peak * c.gain)} dB  gain ×${c.gain.toFixed(2)}  clipped ${c.clipped}${c.perWord > 0.62 || c.perWord < 0.22 ? '  ← check this clip' : ''}`);
}
index.note = 'Written by scripts/video/narrate.mjs: the clips, where the speech starts and ends in each, and the gain that gives them one loudness (peak −1 dBFS).';
fs.writeFileSync(INDEX, JSON.stringify(index, null, 1) + '\n');
const words = Object.values(narration).join(' ').split(/\s+/).length;
const stale = Object.keys(narration).filter((id) => !index.clips[id] || index.clips[id].said !== SPOKEN[id]);
if (stale.length) console.log('still to be spoken: ' + stale.join(', ') + (stopped ? ` (stopped: ${stopped.message.slice(0, 120)})` : ''));
console.log(`${ids.length} clips, ${total.toFixed(1)} s of speech, ${words} words; ${calls} API calls`);
if (stale.length) process.exitCode = 1;
