#!/usr/bin/env node
// Photographs the demo export for the feature video: one or more states per scene
// (a window before and after a click, a slider while it is dragged).
//
//   NODE_PATH=<folder with playwright-core> node scripts/video/capture.mjs [--demo=<export folder>]
//     [--only=part,of,scene]  only these scenes
//     [--port=8097]
//
// The export is served by the tiny built-in server and visited in Chrome (one browser, one page
// at a time) as http://demo.medicalbeforeaftergallery.com:<port>/, mapped to 127.0.0.1: nothing
// leaves the machine. Writes scripts/video/shots/<name>.webp (1920×1080; drag frames are crops)
// and shots.json: for each shot the rectangles the pointer goes to, in canvas pixels.
// Only the demo export is ever captured: its photos are publishable.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { serveStatic } from '../lib/static-server.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'shots');
const INDEX = path.join(OUT, 'shots.json');
const arg = (name, fallback = '') => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(hit.indexOf('=') + 1) : fallback;
};
const DEMO = path.resolve(arg('demo', process.env.DEMO_EXPORT || 'E:/Temp/mba-feature-pass/demo-site/out'));
const ONLY = arg('only').split(',').filter(Boolean);
const PORT = Number(arg('port', 8097));
const BASE = `http://demo.medicalbeforeaftergallery.com:${PORT}`;
const SCALE = 1.25; // 1536×864 CSS pixels = 1920×1080
const DESKTOP = { viewport: { width: 1536, height: 864 }, deviceScaleFactor: SCALE };

fs.mkdirSync(OUT, { recursive: true });
const index = fs.existsSync(INDEX) ? JSON.parse(fs.readFileSync(INDEX, 'utf8')) : {};
const server = await serveStatic(DEMO, PORT);
const browser = await chromium.launch({
  channel: 'chrome', headless: true,
  args: ['--host-resolver-rules=MAP demo.medicalbeforeaftergallery.com 127.0.0.1', '--disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable'],
});
const encoder = await (await browser.newContext()).newPage();
const webp = async (png, quality = 0.86) => Buffer.from(await encoder.evaluate(async ({ b64, quality }) => {
  const img = new Image();
  img.src = 'data:image/png;base64,' + b64;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  c.getContext('2d').drawImage(img, 0, 0);
  return c.toDataURL('image/webp', quality).split(',')[1];
}, { b64: png.toString('base64'), quality }), 'base64');

const px = (r) => r && { x: Math.round(r.x * SCALE), y: Math.round(r.y * SCALE), w: Math.round(r.width * SCALE), h: Math.round(r.height * SCALE) };
async function box(target) {
  if (!target) return null;
  const b = await target.boundingBox().catch(() => null);
  return px(b);
}
async function snap(page, name, rects = {}) {
  const out = {};
  for (const [k, t] of Object.entries(rects)) out[k] = t && t.x !== undefined ? t : await box(t);
  fs.writeFileSync(path.join(OUT, `${name}.webp`), await webp(await page.screenshot({ type: 'png' })));
  index[name] = out;
  const missing = Object.entries(out).filter(([, v]) => !v).map(([k]) => k);
  console.log(`  ${name}${missing.length ? '  (not found: ' + missing.join(', ') + ')' : ''}`);
}
/** `count` crops of `clip` (a Locator) while the mouse drags a slider along `positions` (0..1 of the clip's width). */
async function dragFrames(page, name, clip, positions, y = 0.5, handle = null) {
  const b = await clip.boundingBox();
  // Whole device pixels, so the crop fits over the full shot.
  const c = { x: Math.floor(b.x), y: Math.floor(b.y), width: Math.ceil(b.width / 4) * 4, height: Math.ceil(b.height / 4) * 4 };
  c.x -= c.x % 4; c.y -= c.y % 4;
  const h = handle ? await handle.boundingBox() : null;
  const Y = h ? h.y + h.height / 2 : b.y + b.height * y;
  await page.mouse.move(h ? h.x + h.width / 2 : b.x + b.width * 0.5, Y);
  await page.mouse.down();
  for (let i = 0; i < positions.length; i++) {
    await page.mouse.move(b.x + b.width * positions[i], Y, { steps: 2 });
    await page.waitForTimeout(40);
    fs.writeFileSync(path.join(OUT, `${name}-${String(i).padStart(2, '0')}.webp`), await webp(await page.screenshot({ type: 'png', clip: c }), 0.84));
  }
  await page.mouse.up();
  index[name] = { frames: positions.length, rect: px(c), track: px(b), positions, y: Math.round(Y * SCALE) };
  console.log(`  ${name}: ${positions.length} drag frames`);
}
const sweep = (stops, n) => {
  // Eased through the stops, n frames in all.
  const out = [];
  const legs = stops.length - 1;
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * legs;
    const k = Math.min(legs - 1, Math.floor(t));
    const u = t - k;
    const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    out.push(Number((stops[k] + (stops[k + 1] - stops[k]) * e).toFixed(4)));
  }
  return out;
};

async function settle(page, ms = 500) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(ms);
}
async function toMain(page, sel = '.medbeafgallery-container, .mba-pro-scase, .mba-pro-carousel-wrap, .mba-pro-carousel, .splide, .mba-pro-discovery-standalone', gap = 28) {
  await page.evaluate(({ sel, gap }) => {
    const el = document.querySelector(sel);
    if (el) scrollTo(0, Math.max(0, el.getBoundingClientRect().top + scrollY - gap));
  }, { sel, gap });
  await page.waitForTimeout(800);
  await loaded(page);
}
/** Waits for every photo in view. */
async function loaded(page) {
  await page.evaluate(async () => {
    const imgs = [...document.images].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 4; });
    await Promise.all(imgs.map((i) => (i.complete && i.naturalWidth ? 0 : new Promise((r) => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 3000); }))));
  });
  await page.waitForTimeout(250);
}
const windowOpen = () => [...document.querySelectorAll('#medbeafgallery-modal, .mba-pro-mmodal, [role="dialog"]')].some((d) => {
  const r = d.getBoundingClientRect(); const s = getComputedStyle(d);
  return r.width > 200 && r.height > 200 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.5;
});
async function openCase(page, title) {
  await page.evaluate((t) => { const c = galleryData.find((x) => x.title.includes(t)); window.openModal(c.id); }, title);
  await page.waitForFunction(windowOpen, null, { timeout: 6000 });
  await page.waitForTimeout(1000);
  await loaded(page);
}
const card = (page, title) => page.locator('.medbeafgallery-gallery-item, .mba-pro-mcard').filter({ hasText: title }).filter({ visible: true }).first();
const park = (page) => page.mouse.move(1500, 850); // The mouse leaves what it hovered.

// ── Scenes ─────────────────────────────────────────────────────────────────────────────────
const scenes = {
  cinema: ['/pro-demos/window-cinema/', async (page) => {
    await openCase(page, 'FUE Hair');
    const stops = page.locator('.mba-pro-viewer-timeline-stop');
    const n = await stops.count();
    await park(page);
    await page.waitForTimeout(400);
    await snap(page, 'cinema-0', { to: stops.nth(1) });
    for (let i = 1; i < n; i++) {
      await stops.nth(i).click();
      await page.waitForTimeout(1000);
      await loaded(page);
      await snap(page, `cinema-${i}`, { to: i + 1 < n ? stops.nth(i + 1) : stops.nth(0) });
    }
    console.log(`  (${n} timeline stops)`);
  }],
  masonry: ['/pro-demos/masonry-layout/', async (page) => { await toMain(page); await park(page); await snap(page, 'layout-masonry'); }],
  spotlight: ['/pro-demos/spotlight-layout/', async (page) => { await toMain(page); await park(page); await snap(page, 'layout-spotlight'); }],
  editorial: ['/pro-demos/editorial-layout/', async (page) => {
    await toMain(page, '.medbeafgallery-gallery-item', 120); await park(page); await snap(page, 'layout-editorial');
  }],
  'card-slider': ['/pro-demos/card-slider/', async (page) => {
    await toMain(page, '.medbeafgallery-gallery-item', 150);
    const c = page.locator('.mba-pro-slider-card').filter({ visible: true }).first();
    const stage = c.locator('.mba-pro-slider-stage').first();
    const clip = (await stage.count()) ? stage : c;
    await park(page);
    await page.waitForTimeout(300);
    await snap(page, 'card-slider');
    const handle = c.locator('[role="slider"]').first();
    await dragFrames(page, 'card-slider-drag', clip, sweep([0.5, 0.14, 0.86, 0.5], 44), 0.5, (await handle.count()) ? handle : null);
  }],
  'card-switch': ['/pro-demos/card-switch/', async (page) => {
    await toMain(page, '.medbeafgallery-gallery-item', 150); await park(page); await page.waitForTimeout(300); await snap(page, 'card-switch');
  }],
  'card-stacked': ['/pro-demos/card-stacked/', async (page) => {
    await toMain(page, '.medbeafgallery-gallery-item', 60); await park(page); await page.waitForTimeout(300); await snap(page, 'card-stacked');
  }],
  'icon-chips': ['/pro-demos/icon-chips/', async (page) => {
    await toMain(page);
    const chip = page.locator('.medbeafgallery-carousel-item').filter({ hasText: /^\s*Teeth/ }).filter({ visible: true }).first();
    await park(page);
    await snap(page, 'cat-icons-0', { to: chip });
    await chip.click();
    await page.waitForTimeout(1000); await toMain(page); await park(page); await page.waitForTimeout(300);
    await snap(page, 'cat-icons-1');
  }],
  'area-then-treatment': ['/pro-demos/area-then-treatment/', async (page) => {
    await toMain(page);
    const chip = page.locator('.medbeafgallery-carousel-item').filter({ hasText: /^\s*Botox/ }).filter({ visible: true }).first();
    await chip.click();
    await page.waitForTimeout(1000); await toMain(page); await park(page); await page.waitForTimeout(300);
    await snap(page, 'cat-area', { to: chip });
  }],
  'treatment-cards': ['/pro-demos/treatment-cards/', async (page) => { await toMain(page); await park(page); await snap(page, 'cat-cards'); }],
  'side-menu': ['/pro-demos/side-menu/', async (page) => { await toMain(page); await park(page); await snap(page, 'cat-menu'); }],
  'photo-pills': ['/pro-demos/photo-pills/', async (page) => { await toMain(page); await park(page); await snap(page, 'cat-pills'); }],
  'single-case': ['/pro-demos/single-case-stages/', async (page) => {
    const frame = async () => {
      await page.evaluate(() => {
        const el = document.querySelector('.mba-pro-scase-progress, .mba-pro-scase-progress-list') || document.querySelector('.mba-pro-scase-progress-item').parentElement;
        scrollTo(0, Math.max(0, el.getBoundingClientRect().bottom + scrollY - innerHeight + 26));
      });
      await page.waitForTimeout(400);
    };
    await toMain(page, '.mba-pro-scase', 24);
    await frame();
    const stops = page.locator('.mba-pro-scase').first().locator('.mba-pro-scase-progress-item');
    const n = await stops.count();
    await park(page); await page.waitForTimeout(300);
    await snap(page, 'single-0', { to: stops.nth(1) });
    for (let i = 1; i < Math.min(n, 4); i++) {
      await stops.nth(i).click();
      await page.waitForTimeout(900); await loaded(page);
      await frame();
      await snap(page, `single-${i}`, { to: i + 1 < n ? stops.nth(i + 1) : stops.nth(0) });
    }
    console.log(`  (${n} timeline stops)`);
  }],
  carousel: ['/pro-demos/category-carousel/', async (page) => {
    await page.evaluate(() => { const el = document.querySelector('.splide'); scrollTo(0, Math.max(0, el.getBoundingClientRect().top + scrollY - 125)); });
    await page.waitForTimeout(700); await loaded(page);
    const next = page.locator('.splide__arrow--next').filter({ visible: true }).first();
    await park(page);
    await snap(page, 'carousel-0', { to: next, view: page.locator('.splide').first() });
    for (let i = 1; i <= 1; i++) {
      await next.click();
      await page.waitForTimeout(1100); await loaded(page);
      await snap(page, `carousel-${i}`, { to: next, view: page.locator('.splide').first() });
    }
  }],
  drawer: ['/pro-demos/window-drawer/', async (page) => {
    await toMain(page);
    const c = card(page, 'Melasma');
    const b = c.locator('button:has-text("View"), .medbeafgallery-view-details, a:has-text("View")').first();
    await park(page);
    await snap(page, 'drawer-0', { to: (await b.count()) ? b : c });
    await openCase(page, 'Melasma');
    await park(page);
    await snap(page, 'drawer-1');
  }],
  desk: ['/pro-demos/window-comparison-desk/', async (page) => {
    await toMain(page);
    await openCase(page, 'FUE Hair');
    await park(page); await page.waitForTimeout(300);
    const photo = page.locator('.mba-pro-viewer-canvas, .mba-pro-viewer-stage').filter({ visible: true }).first();
    await snap(page, 'desk-0', { to: photo });
    const b = await photo.boundingBox();
    // The linked magnifier: the mouse over the before photo.
    await page.mouse.move(b.x + b.width * 0.24, b.y + b.height * 0.5);
    await page.mouse.move(b.x + b.width * 0.26, b.y + b.height * 0.52, { steps: 4 });
    await page.waitForTimeout(700);
    index['desk-pointer'] = { to: px({ x: b.x + b.width * 0.26, y: b.y + b.height * 0.52, width: 1, height: 1 }) };
    await snap(page, 'desk-1', { to: px({ x: b.x + b.width * 0.26, y: b.y + b.height * 0.52, width: 1, height: 1 }) });
  }],
  story: ['/pro-demos/window-case-story/', async (page) => {
    await toMain(page);
    await openCase(page, 'FUE Hair');
    await park(page); await page.waitForTimeout(400);
    await snap(page, 'story-0');
  }],
  hub: ['/pro-demos/treatment-hub/', async (page) => { await toMain(page); await park(page); await snap(page, 'hub'); }],
  concern: ['/pro-demos/concern-first/', async (page) => {
    await toMain(page);
    const concern = page.locator('.mba-pro-organise-concern').filter({ visible: true }).nth(1);
    await snap(page, 'concern-0', { to: concern });
    await concern.click();
    await page.waitForTimeout(1200); await loaded(page);
    await toMain(page);
    await park(page);
    await snap(page, 'concern-1', { to: concern });
  }],
  doctors: ['/pro-demos/doctor-portfolios/', async (page) => {
    await toMain(page);
    const d = page.locator('.mba-pro-organise-doctor').filter({ visible: true }).nth(1);
    await park(page);
    await snap(page, 'doctors-0', { to: d });
    await d.click();
    await page.waitForTimeout(1200); await loaded(page);
    await toMain(page);
    await park(page);
    await snap(page, 'doctors-1');
  }],
  map: ['/pro-demos/find-by-area/', async (page) => {
    await toMain(page);
    const open = page.locator('.mba-pro-discovery-button').filter({ visible: true }).first();
    await park(page);
    await snap(page, 'map-0', { to: open });
    await open.click();
    await page.waitForTimeout(1000);
    // A part of the face on the drawing itself.
    const region = page.locator('.mba-pro-discovery-region').filter({ visible: true });
    let pick = null;
    for (let i = 0; i < await region.count(); i++) {
      const label = `${await region.nth(i).getAttribute('aria-label') || ''} ${await region.nth(i).textContent() || ''}`;
      if (/nose/i.test(label)) { pick = region.nth(i); break; }
    }
    pick = pick || region.first();
    const rect = await box(pick);
    await park(page);
    await snap(page, 'map-1', { to: rect });
    await pick.hover({ force: true }).catch(() => {});
    await page.waitForTimeout(400);
    await snap(page, 'map-2', { to: rect });
  }],
  guide: ['/pro-demos/help-me-choose/', async (page) => {
    await toMain(page);
    const open = page.locator('.mba-pro-discovery-button').filter({ visible: true }).first();
    await open.click();
    await page.waitForTimeout(1000);
    const answer = page.locator('.mba-pro-discovery-answer').filter({ visible: true }).first();
    await park(page);
    await snap(page, 'guide-0', { to: answer });
    await answer.click();
    await page.waitForTimeout(900);
    await park(page); await page.waitForTimeout(200);
    await snap(page, 'guide-1', { to: page.locator('.mba-pro-discovery-answer').filter({ visible: true }).first() });
  }],
  compare: ['/pro-demos/compare-two-cases/', async (page) => {
    await toMain(page, '.medbeafgallery-gallery-item', 90);
    await page.evaluate(() => { const b = document.querySelectorAll('.medbeafgallery-gallery-item input[type="checkbox"]'); b[0].click(); b[1].click(); });
    await page.waitForTimeout(700);
    const btn = page.locator('button:visible', { hasText: /^Compare/ }).last();
    await park(page); await page.waitForTimeout(200);
    await snap(page, 'compare-0', { to: btn, tick: page.locator('.medbeafgallery-gallery-item input[type="checkbox"]').nth(1) });
    await btn.click();
    await page.waitForFunction(windowOpen, null, { timeout: 6000 });
    await page.waitForTimeout(1000); await toMain(page); await park(page); await page.waitForTimeout(300);
    await park(page);
    await snap(page, 'compare-1');
  }],
  'template-luxury': ['/pro-demos/template-luxury/', async (page) => { await toMain(page); await park(page); await snap(page, 'template-luxury'); }],
  'template-modern': ['/pro-demos/template-modern/', async (page) => { await toMain(page); await park(page); await snap(page, 'template-modern'); }],
  'template-editorial': ['/pro-demos/template-editorial/', async (page) => { await toMain(page); await park(page); await snap(page, 'template-editorial'); }],
  'template-photo-first': ['/pro-demos/template-photo-first/', async (page) => { await toMain(page); await park(page); await snap(page, 'template-photo-first'); }],
  watermark: ['/pro-demos/automatic-watermarks/', async (page) => {
    await toMain(page);
    await openCase(page, 'FUE Hair');
    await page.locator('#medbeafgallery-modal button:visible', { hasText: /^\s*After\s*$/ }).first().click().catch(() => {});
    await page.waitForTimeout(900);
    await park(page); await page.waitForTimeout(300);
    const photo = await page.evaluate(() => {
      // The photo as drawn (object-fit: contain) and its bottom right corner.
      const img = [...document.querySelectorAll('#medbeafgallery-modal img')].filter((i) => { const r = i.getBoundingClientRect(); return r.width > 200 && i.naturalWidth && getComputedStyle(i).visibility !== 'hidden'; }).pop();
      const r = img.getBoundingClientRect();
      const k = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight);
      const w = img.naturalWidth * k, h = img.naturalHeight * k;
      return { x: r.x + (r.width - w) / 2, y: r.y + (r.height - h) / 2, width: w, height: h };
    });
    await snap(page, 'watermark', { photo: px(photo), mark: px({ x: photo.x + photo.width * 0.72, y: photo.y + photo.height * 0.9, width: photo.width * 0.26, height: photo.height * 0.08 }) });
  }],
  notice: ['/pro-demos/sensitive-photos-notice/', async (page) => {
    await toMain(page, '.medbeafgallery-gallery-item', 44);
    const show = page.locator('button.mba-pro-veil').filter({ visible: true }).first();
    await park(page);
    await snap(page, 'notice-0', { to: show });
    await show.click();
    await page.waitForTimeout(900);
    await park(page); await page.waitForTimeout(300);
    await snap(page, 'notice-1');
  }, { notice: true }],
  free: ['/free/', async (page) => {
    await toMain(page);
    const c = page.locator('.medbeafgallery-gallery-item').filter({ visible: true }).first();
    const b = c.locator('button:has-text("View"), .medbeafgallery-view-details, a:has-text("View")').first();
    await park(page);
    await snap(page, 'free-0', { to: (await b.count()) ? b : c });
    await openCase(page, 'Clear Aligners');
    await park(page); await page.waitForTimeout(300);
    await snap(page, 'free-1');
  }],
};

let failed = 0;
for (const [name, [url, run, opts = {}]] of Object.entries(scenes)) {
  if (ONLY.length && !ONLY.some((o) => name.includes(o))) continue;
  console.log(`${name}  ${url}`);
  const context = await browser.newContext(DESKTOP);
  if (!opts.notice) await context.addInitScript(() => { try { localStorage.setItem('mbaGalleryConsent', '1'); } catch { /* about:blank */ } });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  try {
    await page.goto(BASE + url, { waitUntil: 'load' });
    await settle(page);
    await run(page);
  } catch (e) {
    failed++;
    console.log(`  FAILED ${String(e).slice(0, 300)}`);
  }
  if (errors.length) console.log('  page errors: ' + errors.join(' | ').slice(0, 300));
  await context.close();
}
await browser.close();
server.close();
fs.writeFileSync(INDEX, JSON.stringify(index, null, 1) + '\n');
const bytes = fs.readdirSync(OUT).reduce((s, f) => s + fs.statSync(path.join(OUT, f)).size, 0);
console.log(`${Object.keys(index).length} entries, ${(bytes / 1048576).toFixed(1)} MB in shots/; ${failed} scenes failed`);
process.exitCode = failed ? 1 : 0;
