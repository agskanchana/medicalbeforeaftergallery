// Rewrites Chrome's MediaRecorder MP4 (an empty index followed by fragments: moof + mdat) as an
// ordinary MP4 with the whole index (moov) at the front, so every player knows the length, can
// seek, and can start before the file has loaded. The samples are copied untouched.
const box = (type, ...parts) => {
  const body = Buffer.concat(parts.map((p) => (Buffer.isBuffer(p) ? p : Buffer.from(p))));
  const h = Buffer.alloc(8);
  h.writeUInt32BE(body.length + 8, 0);
  h.write(type, 4, 'latin1');
  return Buffer.concat([h, body]);
};
const full = (type, version, flags, ...parts) => box(type, Buffer.from([version, (flags >> 16) & 255, (flags >> 8) & 255, flags & 255]), ...parts);
const u32 = (...n) => { const b = Buffer.alloc(n.length * 4); n.forEach((v, i) => b.writeUInt32BE(v >>> 0, i * 4)); return b; };

function* boxes(buf, start = 0, end = buf.length) {
  let p = start;
  while (p + 8 <= end) {
    let size = buf.readUInt32BE(p), head = 8;
    const type = buf.toString('latin1', p + 4, p + 8);
    if (size === 1) { size = Number(buf.readBigUInt64BE(p + 8)); head = 16; }
    if (size === 0) size = end - p;
    if (size < head || p + size > end) throw new Error(`bad box ${type} at ${p}`);
    yield { type, start: p, body: p + head, end: p + size };
    p += size;
  }
}
const find = (buf, start, end, ...path) => {
  let a = start, b = end, hit = null;
  for (const t of path) {
    hit = null;
    for (const x of boxes(buf, a, b)) if (x.type === t) { hit = x; break; }
    if (!hit) return null;
    a = hit.body; b = hit.end;
  }
  return hit;
};

export function flattenMp4(buf) {
  const top = [...boxes(buf)];
  const moov = top.find((b) => b.type === 'moov');
  const ftyp = top.find((b) => b.type === 'ftyp');
  if (!moov || !ftyp) throw new Error('no moov/ftyp');
  if (!top.some((b) => b.type === 'moof')) return buf; // Already an ordinary file.

  // ── Tracks from the (empty) index ──
  const tracks = new Map();
  for (const b of boxes(buf, moov.body, moov.end)) {
    if (b.type !== 'trak') continue;
    const tkhd = find(buf, b.body, b.end, 'tkhd');
    const v = buf[tkhd.body];
    const id = buf.readUInt32BE(tkhd.body + (v ? 20 : 12));
    const mdhd = find(buf, b.body, b.end, 'mdia', 'mdhd');
    const mv = buf[mdhd.body];
    const hdlr = find(buf, b.body, b.end, 'mdia', 'hdlr');
    tracks.set(id, {
      id, trak: b, tkhd, mdhd,
      timescale: buf.readUInt32BE(mdhd.body + (mv ? 20 : 12)),
      kind: buf.toString('latin1', hdlr.body + 8, hdlr.body + 12),
      stsd: find(buf, b.body, b.end, 'mdia', 'minf', 'stbl', 'stsd'),
      defaults: { duration: 0, size: 0, flags: 0 },
      samples: [], first: null,
    });
  }
  const mvex = find(buf, moov.body, moov.end, 'mvex');
  if (mvex) for (const b of boxes(buf, mvex.body, mvex.end)) {
    if (b.type !== 'trex') continue;
    const t = tracks.get(buf.readUInt32BE(b.body + 4));
    if (t) t.defaults = { duration: buf.readUInt32BE(b.body + 12), size: buf.readUInt32BE(b.body + 16), flags: buf.readUInt32BE(b.body + 20) };
  }

  // ── Samples from the fragments ──
  for (const m of top.filter((b) => b.type === 'moof')) {
    for (const traf of boxes(buf, m.body, m.end)) {
      if (traf.type !== 'traf') continue;
      const tfhd = find(buf, traf.body, traf.end, 'tfhd');
      const fl = buf.readUInt32BE(tfhd.body) & 0xffffff;
      const t = tracks.get(buf.readUInt32BE(tfhd.body + 4));
      if (!t) throw new Error('a fragment has a track the index does not list (the sound encoder started late)');
      let p = tfhd.body + 8;
      let base = m.start;
      const d = { ...t.defaults };
      if (fl & 0x1) { base = Number(buf.readBigUInt64BE(p)); p += 8; }
      if (fl & 0x2) p += 4;
      if (fl & 0x8) { d.duration = buf.readUInt32BE(p); p += 4; }
      if (fl & 0x10) { d.size = buf.readUInt32BE(p); p += 4; }
      if (fl & 0x20) { d.flags = buf.readUInt32BE(p); p += 4; }
      const tfdt = find(buf, traf.body, traf.end, 'tfdt');
      if (tfdt) {
        const at = buf[tfdt.body] ? Number(buf.readBigUInt64BE(tfdt.body + 4)) : buf.readUInt32BE(tfdt.body + 4);
        if (t.first === null) t.first = at;
        else if (t.samples.length) {
          // The gap to this fragment belongs to the last sample before it.
          const now = t.samples.reduce((n, s) => n + s.duration, 0) + t.first;
          if (at > now) t.samples[t.samples.length - 1].duration += at - now;
        }
      }
      let pos = null;
      for (const trun of boxes(buf, traf.body, traf.end)) {
        if (trun.type !== 'trun') continue;
        const tf = buf.readUInt32BE(trun.body) & 0xffffff;
        const version = buf[trun.body];
        const n = buf.readUInt32BE(trun.body + 4);
        let q = trun.body + 8;
        if (tf & 0x1) { pos = base + buf.readInt32BE(q); q += 4; }
        if (pos === null) throw new Error('trun without a data offset');
        let firstFlags = null;
        if (tf & 0x4) { firstFlags = buf.readUInt32BE(q); q += 4; }
        for (let i = 0; i < n; i++) {
          const s = { duration: d.duration, size: d.size, flags: i === 0 && firstFlags !== null ? firstFlags : d.flags, cts: 0 };
          if (tf & 0x100) { s.duration = buf.readUInt32BE(q); q += 4; }
          if (tf & 0x200) { s.size = buf.readUInt32BE(q); q += 4; }
          if (tf & 0x400) { s.flags = buf.readUInt32BE(q); q += 4; }
          if (tf & 0x800) { s.cts = version ? buf.readInt32BE(q) : buf.readUInt32BE(q); q += 4; }
          s.pos = pos;
          pos += s.size;
          t.samples.push(s);
        }
      }
    }
  }
  const list = [...tracks.values()].filter((t) => t.samples.length);
  if (!list.length) throw new Error('no samples');

  // ── Interleave half-second chunks ──
  const chunks = [];
  for (const t of list) {
    let time = t.first || 0, cur = null;
    t.samples.forEach((s, i) => {
      if (!cur || time - cur.time >= t.timescale / 2) { cur = { t, time, sec: time / t.timescale, first: i, count: 0, size: 0 }; chunks.push(cur); }
      cur.count++; cur.size += s.size;
      time += s.duration;
    });
    t.duration = time - (t.first || 0);
  }
  chunks.sort((a, b) => a.sec - b.sec || (a.t.kind === 'vide' ? -1 : 1));

  const MS = 1000; // Movie timescale.
  const longest = Math.max(...list.map((t) => ((t.first || 0) + t.duration) / t.timescale));

  const setDur = (src, offV0, offV1, value) => {
    const b = Buffer.from(src);
    if (b[8]) b.writeBigUInt64BE(BigInt(Math.round(value)), 8 + offV1); else b.writeUInt32BE(Math.round(value), 8 + offV0);
    return b;
  };
  const copy = (b) => buf.subarray(b.start, b.end);
  const build = (dataStart) => {
    let at = dataStart;
    for (const c of chunks) { c.offset = at; at += c.size; }
    const traks = list.map((t) => {
      const rle = (get) => { const out = []; for (const s of t.samples) { const v = get(s); const l = out[out.length - 1]; if (l && l[1] === v) l[0]++; else out.push([1, v]); } return out; };
      const stts = rle((s) => s.duration);
      const mine = chunks.filter((c) => c.t === t);
      const stsc = [];
      mine.forEach((c, i) => { const l = stsc[stsc.length - 1]; if (!l || l[1] !== c.count) stsc.push([i + 1, c.count, 1]); });
      const tables = [
        copy(t.stsd),
        full('stts', 0, 0, u32(stts.length), ...stts.map((e) => u32(...e))),
        full('stsc', 0, 0, u32(stsc.length), ...stsc.map((e) => u32(...e))),
        full('stsz', 0, 0, u32(0, t.samples.length), u32(...t.samples.map((s) => s.size))),
        full('stco', 0, 0, u32(mine.length), u32(...mine.map((c) => c.offset))),
      ];
      if (t.samples.some((s) => s.cts)) { const ctts = rle((s) => s.cts); tables.push(full('ctts', 1, 0, u32(ctts.length), ...ctts.map((e) => u32(...e)))); }
      if (t.kind === 'vide') {
        const sync = t.samples.map((s, i) => ((s.flags & 0x10000) ? 0 : i + 1)).filter(Boolean);
        tables.push(full('stss', 0, 0, u32(sync.length), u32(...sync)));
      }
      const minf = find(buf, t.trak.body, t.trak.end, 'mdia', 'minf');
      const minfParts = [...boxes(buf, minf.body, minf.end)].map((b) => (b.type === 'stbl' ? box('stbl', ...tables) : copy(b)));
      const mdia = find(buf, t.trak.body, t.trak.end, 'mdia');
      const mdiaParts = [...boxes(buf, mdia.body, mdia.end)].map((b) => {
        if (b.type === 'mdhd') return setDur(copy(b), 16, 24, t.duration);
        if (b.type === 'minf') return box('minf', ...minfParts);
        return copy(b);
      });
      const parts = [setDur(copy(t.tkhd), 20, 28, (((t.first || 0) + t.duration) / t.timescale) * MS)];
      if (t.first) {
        // The track starts later than the other one: an empty edit in front of it.
        parts.push(box('edts', full('elst', 0, 0, u32(2, Math.round((t.first / t.timescale) * MS), 0xffffffff, 0x10000, Math.round((t.duration / t.timescale) * MS), 0, 0x10000))));
      }
      parts.push(box('mdia', ...mdiaParts));
      return box('trak', ...parts);
    });
    const mvhd = find(buf, moov.body, moov.end, 'mvhd');
    let mv = Buffer.from(copy(mvhd));
    const ver = mv[8];
    mv.writeUInt32BE(MS, 8 + (ver ? 20 : 12));
    mv = setDur(mv, 16, 24, longest * MS);
    return box('moov', mv, ...traks);
  };
  const ft = box('ftyp', Buffer.from('isom'), u32(0x200), Buffer.from('isomiso2avc1mp41'));
  const size = build(0).length;
  const moovOut = build(ft.length + size + 8);
  if (moovOut.length !== size) throw new Error('index size changed');
  const data = Buffer.concat(chunks.flatMap((c) => c.t.samples.slice(c.first, c.first + c.count).map((s) => buf.subarray(s.pos, s.pos + s.size))));
  const mdat = Buffer.alloc(8);
  mdat.writeUInt32BE(data.length + 8, 0);
  mdat.write('mdat', 4, 'latin1');
  return Buffer.concat([ft, moovOut, mdat, data]);
}
