#!/usr/bin/env node
// Checks every page of the demo export and captures the screenshots the site uses.
//
//   NODE_PATH=<folder with playwright-core> node scripts/capture-demo-shots.mjs --demo=<export folder>
//     [--only=part,of,path]  only pages whose path contains one of these
//     [--no-shots]           check only, write no images
//     [--port=8095]
//
// The export (the static demo site) is served by a tiny built-in server and visited in Chrome
// (playwright-core, channel 'chrome') as http://demo.medicalbeforeaftergallery.com:<port>/,
// mapped to 127.0.0.1, so nothing leaves the machine. One browser, one page at a time.
//
// For each page in src/data/demos.ts it checks that the gallery or embed renders, that a case
// window opens and closes (or, for an embed, that its own control responds), that there are no
// console errors and no failed requests, that images load and the page does not scroll sideways.
// Results go to src/data/demo-check.json; the /demo/ page lists only pages that passed.
//
// Images (WebP, encoded by Chrome's canvas — no image library needed):
//   public/images/demos/<slug>.webp      800×450, one per page (the /demo/ cards)
//   public/images/features/<slug>.webp  1600×900, for the pages in FEATURE (home and features)
//   scripts/video/shots/<name>.jpg      1920×1080 sources for the feature video (+ meta.json)
// Only the demo export is ever captured: its photos are publishable. Never point this at the
// development site.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { serveStatic } from './lib/static-server.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, fallback = '') => {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : true;
};
const DEMO = path.resolve(String(arg('demo', process.env.DEMO_EXPORT || 'E:/Temp/mba-feature-pass/demo-site/out')));
const ONLY = String(arg('only', '')).split(',').filter(Boolean);
const SHOTS = !arg('no-shots', false);
const PORT = Number(arg('port', 8095));
const HOST = `demo.medicalbeforeaftergallery.com:${PORT}`;
const BASE = `http://${HOST}`;

const { demos, demoSlug } = await import(pathToFileURL(path.join(ROOT, 'src/data/demos.ts')).href);

const OUT_CARDS = path.join(ROOT, 'public/images/demos');
const OUT_FEATURES = path.join(ROOT, 'public/images/features');
const OUT_VIDEO = path.join(ROOT, 'scripts/video/shots');
const CHECK_FILE = path.join(ROOT, 'src/data/demo-check.json');

// What state each page is photographed in (default: the gallery in view).
const ACTION = {
  '/free/plain-case-window/': 'open',
  '/pro-demos/doctors/': 'open',
  '/pro-demos/window-cinema/': 'open',
  '/pro-demos/window-drawer/': 'open',
  '/pro-demos/window-comparison-desk/': 'open',
  '/pro-demos/window-case-story/': 'open',
  '/pro-demos/comparison-labels/': 'open',
  '/pro-demos/case-details-and-booking/': 'open',
  '/pro-demos/automatic-watermarks/': 'open',
  '/pro-demos/shareable-case-links/': 'open',
  '/pro-demos/progress-stages/': 'stage',
  '/pro-demos/story-mode-on-phones/': 'phone-open',
  '/pro-demos/case-viewer-zoom/': 'zoom',
  '/pro-demos/image-annotations/': 'annotated',
  '/pro-demos/compare-two-cases/': 'compare',
  '/pro-demos/find-by-area/': 'area',
  '/pro-demos/help-me-choose/': 'guide',
  '/pro-demos/single-case-stages/': 'single-stage',
  '/pro-demos/sensitive-photos-notice/': 'notice',
  '/pro-demos/sensitive-content-notice/': 'notice',
};
// Pages also saved at 1600×900 for the home and features pages.
const FEATURE = new Set([
  '/free/', '/pro-demos/masonry-layout/', '/pro-demos/card-slider/', '/pro-demos/icon-chips/', '/pro-demos/window-cinema/',
  '/pro-demos/window-drawer/', '/pro-demos/window-comparison-desk/', '/pro-demos/window-case-story/', '/pro-demos/progress-stages/',
  '/pro-demos/single-case-stages/', '/pro-demos/single-case-embed/', '/pro-demos/category-carousel/', '/pro-demos/doctors/',
  '/pro-demos/doctor-portfolios/', '/pro-demos/treatment-hub/', '/pro-demos/concern-first/', '/pro-demos/collections/',
  '/pro-demos/compare-two-cases/', '/pro-demos/find-by-area/', '/pro-demos/help-me-choose/', '/pro-demos/template-luxury/',
  '/pro-demos/template-modern/', '/pro-demos/sensitive-photos-notice/', '/pro-demos/automatic-watermarks/', '/pro-demos/area-then-treatment/',
  '/pro-demos/story-mode-on-phones/', '/pro-demos/card-extras/', '/pro-demos/spotlight-layout/',
  '/pro-demos/image-annotations/', '/pro-demos/card-stacked/', // blog covers
]);
// Pages whose 1920×1080 capture the video uses.
const VIDEO = new Set([
  '/free/', '/pro-demos/masonry-layout/', '/pro-demos/card-slider/', '/pro-demos/icon-chips/', '/pro-demos/area-then-treatment/',
  '/pro-demos/treatment-hub/', '/pro-demos/find-by-area/', '/pro-demos/compare-two-cases/', '/pro-demos/window-cinema/',
  '/pro-demos/progress-stages/', '/pro-demos/window-comparison-desk/', '/pro-demos/window-drawer/', '/pro-demos/window-case-story/', '/pro-demos/single-case-stages/',
  '/pro-demos/category-carousel/', '/pro-demos/doctor-portfolios/', '/pro-demos/sensitive-photos-notice/',
  '/pro-demos/automatic-watermarks/', '/pro-demos/template-luxury/', '/pro-demos/story-mode-on-phones/', '/pro-demos/collections/',
]);

const DESKTOP = { viewport: { width: 1536, height: 864 }, deviceScaleFactor: 1.25 }; // = 1920×1080 pixels
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true };

// ── In-page helpers (run inside the demo pages) ─────────────────────────────────────────────
const visibleCards = () => {
  const seen = new Set();
  document.querySelectorAll('.medbeafgallery-gallery-item, .mba-pro-mcard, .mba-pro-organise-treatment:not(.mba-pro-organise-ghost), .mba-pro-organise-concerns > *, .mba-pro-organise-profile').forEach((e) => {
    const r = e.getBoundingClientRect();
    if (r.width > 40 && r.height > 40 && getComputedStyle(e).visibility !== 'hidden') seen.add(e);
  });
  return seen.size;
};
const openWindow = () => {
  const found = [...document.querySelectorAll('#medbeafgallery-modal, .mba-pro-mmodal, [role="dialog"]')].filter((d) => {
    const r = d.getBoundingClientRect();
    const s = getComputedStyle(d);
    return r.width > 200 && r.height > 200 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.5
      && d.getAttribute('aria-hidden') !== 'true' && !d.closest('[inert]') && !/consent|cookie/.test(d.id + d.className);
  });
  return found.length ? (found[0].id || String(found[0].className) || 'dialog') : '';
};
const rectOf = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };

async function settle(page, ms = 300) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(ms);
}

async function brokenImages(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, innerHeight * 0.8);
    for (let y = 0, n = 0; y < document.documentElement.scrollHeight && n < 60; y += step, n++) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  return page.evaluate(async () => {
    const imgs = [...document.images].filter((i) => { const r = i.getBoundingClientRect(); return i.getAttribute('src') && r.width > 4 && r.height > 4; });
    await Promise.all(imgs.map((i) => (i.complete ? 0 : new Promise((r) => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 3000); }))));
    // A lazy photo that has not started loading (an off-screen carousel slide) is not broken.
    return { count: imgs.length, broken: imgs.filter((i) => i.complete && !i.naturalWidth).map((i) => i.getAttribute('src')).slice(0, 4) };
  });
}

/** Opens a case from the first usable card; returns the clicked element's rectangle (or null). */
async function openCase(page) {
  const targets = [
    '.medbeafgallery-gallery-item .medbeafgallery-view-details', '.medbeafgallery-gallery-item .medbeafgallery-view-btn',
    '.mba-pro-caption-foot button', '.medbeafgallery-gallery-item button:has-text("View")', '.mba-pro-mcard .mba-pro-mcard-view',
    '.mba-pro-mcard button:has-text("View")', '.medbeafgallery-gallery-item', '.mba-pro-mcard',
  ];
  for (const sel of targets) {
    const all = page.locator(sel);
    const n = Math.min(await all.count(), 8);
    for (let i = 0; i < n; i++) {
      const el = all.nth(i);
      if (!(await el.isVisible().catch(() => false))) continue;
      await el.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(250);
      const rect = await el.evaluate(rectOf).catch(() => null);
      await el.click({ timeout: 3000 }).catch(() => {});
      const opened = await page.waitForFunction(openWindow, null, { timeout: 3000 }).then((h) => h.jsonValue()).catch(() => '');
      if (opened) return rect || { x: 0, y: 0, w: 0, h: 0 };
      break;
    }
  }
  return null;
}
async function closeCase(page) {
  await page.keyboard.press('Escape');
  return page.waitForFunction(`!(${openWindow.toString()})()`, null, { timeout: 4000 }).then(() => true).catch(() => false);
}
async function windowPhotosLoad(page) {
  await page.waitForTimeout(500);
  return page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 300));
    const root = [...document.querySelectorAll('#medbeafgallery-modal.active, .mba-pro-mmodal, [role="dialog"]')]
      .filter((d) => d.getBoundingClientRect().width > 200 && getComputedStyle(d).visibility !== 'hidden')[0];
    const imgs = root ? [...root.querySelectorAll('img')].filter((i) => i.getAttribute('src') && i.getBoundingClientRect().width > 20) : [];
    await Promise.all(imgs.map((i) => (i.complete ? 0 : new Promise((r) => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 3000); }))));
    return { n: imgs.length, broken: imgs.filter((i) => i.complete && !i.naturalWidth).length };
  });
}

/** Scrolls the page's main gallery or embed to the top of the viewport. */
async function scrollToMain(page) {
  await page.evaluate(() => {
    const el = document.querySelector('.medbeafgallery-container, .mba-pro-scase, .mba-pro-carousel-wrap, .mba-pro-carousel, .splide, .mba-pro-discovery-standalone, .mba-pro-discovery-map, .mba-pro-discovery-region');
    if (!el) return;
    const top = el.getBoundingClientRect().top + scrollY - 28;
    scrollTo(0, Math.max(0, top));
  });
  await page.waitForTimeout(700);
}

// ── Image encoding in Chrome (canvas → WebP) ────────────────────────────────────────────────
let encoder = null;
async function encode(png, width, height, { mode = 'cover', quality = 0.82, type = 'image/webp' } = {}) {
  return Buffer.from(await encoder.evaluate(async ({ b64, width, height, mode, quality, type }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    // Halve step by step for a clean downscale.
    let src = img, sw = img.naturalWidth, sh = img.naturalHeight;
    const targetW = mode === 'phone' ? Math.round(height * 0.92 * sw / sh) : width;
    while (sw / 2 >= targetW) {
      const c = document.createElement('canvas');
      c.width = Math.round(sw / 2); c.height = Math.round(sh / 2);
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(src, 0, 0, c.width, c.height);
      src = c; sw = c.width; sh = c.height;
    }
    const out = document.createElement('canvas');
    out.width = width; out.height = height;
    const ctx = out.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    if (mode === 'phone') {
      // A phone screenshot, centred on a soft background, with rounded corners.
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, '#eef4ff'); g.addColorStop(1, '#f3fbf8');
      ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);
      const h = Math.round(height * 0.92), w = Math.round(h * sw / sh);
      const x = Math.round((width - w) / 2), y = Math.round((height - h) / 2), r = Math.round(w * 0.07);
      ctx.save();
      ctx.shadowColor = 'rgba(15,27,51,0.22)'; ctx.shadowBlur = Math.round(height * 0.04); ctx.shadowOffsetY = Math.round(height * 0.012);
      ctx.beginPath(); ctx.roundRect(x - 6, y - 6, w + 12, h + 12, r + 6); ctx.fillStyle = '#0f1b33'; ctx.fill();
      ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.clip(); ctx.drawImage(src, x, y, w, h); ctx.restore();
    } else {
      const scale = Math.max(width / sw, height / sh);
      const dw = sw * scale, dh = sh * scale;
      ctx.drawImage(src, (width - dw) / 2, 0, dw, dh); // keep the top of the shot
    }
    return out.toDataURL(type, quality).split(',')[1];
  }, { b64: png.toString('base64'), width, height, mode, quality, type }), 'base64');
}

// ── Main ────────────────────────────────────────────────────────────────────────────────────
const pages = demos.filter((d) => !ONLY.length || ONLY.some((o) => d.path.includes(o)));
if (!fs.existsSync(path.join(DEMO, 'index.html'))) {
  console.error(`No demo export at ${DEMO} (pass --demo=<folder>)`);
  process.exit(2);
}
for (const d of demos) {
  if (!fs.existsSync(path.join(DEMO, d.path, 'index.html'))) console.warn(`warning: ${d.path} is not in the export`);
}
if (SHOTS) for (const dir of [OUT_CARDS, OUT_FEATURES, OUT_VIDEO]) fs.mkdirSync(dir, { recursive: true });

const server = await serveStatic(DEMO, PORT);
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: [`--host-resolver-rules=MAP demo.medicalbeforeaftergallery.com 127.0.0.1`, '--disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable'],
});
const encContext = await browser.newContext();
encoder = await encContext.newPage();

const previous = fs.existsSync(CHECK_FILE) ? JSON.parse(fs.readFileSync(CHECK_FILE, 'utf8')) : { pages: {} };
const results = ONLY.length ? { ...previous.pages } : {};
const videoMeta = fs.existsSync(path.join(OUT_VIDEO, 'meta.json')) ? JSON.parse(fs.readFileSync(path.join(OUT_VIDEO, 'meta.json'), 'utf8')) : {};
let totalChecks = 0;

for (const demo of pages) {
  const slug = demoSlug(demo.path);
  const action = ACTION[demo.path] || 'view';
  const notice = action === 'notice';
  const kind = /single-case/.test(demo.path) ? 'single' : /category-carousel/.test(demo.path) ? 'carousel' : /body-map-embed/.test(demo.path) ? 'map' : 'gallery';
  const problems = [];
  const notes = [];
  const ok = (what, pass, detail = '') => { totalChecks++; if (!pass) problems.push(detail ? `${what} (${detail})` : what); return pass; };
  // Worth knowing, but the demo still works: recorded, not a reason to leave the page off.
  const warn = (what, pass, detail = '') => { totalChecks++; if (!pass) notes.push(detail ? `${what} (${detail})` : what); return pass; };

  const context = await browser.newContext(DESKTOP);
  if (!notice) await context.addInitScript(() => { try { localStorage.setItem('mbaGalleryConsent', '1'); } catch { /* about:blank */ } });
  const page = await context.newPage();
  const log = { console: [], failed: [], foreign: [] };
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    // The browser asks for /favicon.ico by itself; the export has none. Not the page's request.
    if (/\/favicon\.ico$/.test((m.location() || {}).url || '')) { log.favicon = true; return; }
    log.console.push(m.text().slice(0, 160));
  });
  page.on('pageerror', (e) => log.console.push('exception: ' + String(e).slice(0, 160)));
  page.on('requestfailed', (r) => { const f = r.failure(); if (!(f && /ERR_ABORTED/.test(f.errorText))) log.failed.push(`${r.url()} ${f ? f.errorText : ''}`); });
  page.on('response', (r) => { if (r.status() >= 400 && !/\/favicon\.ico$/.test(r.url())) log.failed.push(`${r.status()} ${r.url()}`); });
  page.on('request', (r) => { const u = r.url(); if (!/^(data|blob|about):/.test(u) && new URL(u).host !== HOST) log.foreign.push(u); });

  let png = null;
  let meta = null;
  try {
    const response = await page.goto(BASE + demo.path, { waitUntil: 'load' });
    ok('status 200', response && response.status() === 200, String(response && response.status()));
    await settle(page);

    // Notice pages: the notice shows first, and is the screenshot.
    if (notice) {
      await scrollToMain(page);
      const state = await page.evaluate(() => {
        const o = document.querySelector('#medbeafgallery-consent-overlay');
        return { overlay: !!o && getComputedStyle(o).display !== 'none', blurred: document.documentElement.classList.contains('mba-pro-sensitive') ? document.querySelectorAll('.mba-pro-veil').length : 0 };
      });
      ok('the notice covers the photos', state.overlay || state.blurred > 0, JSON.stringify(state));
      await page.waitForTimeout(600);
      const btn = page.locator('#medbeafgallery-consent-accept:visible, .mba-pro-veil button:visible').first();
      const target = await btn.evaluate(rectOf).catch(() => null);
      png = await page.screenshot({ type: 'png' });
      meta = { pointer: target };
      await page.locator('#medbeafgallery-consent-accept, .mba-pro-sensitive-bar button').first().click();
      await page.waitForTimeout(600);
      ok('the notice goes away', await page.evaluate(() => {
        const o = document.querySelector('#medbeafgallery-consent-overlay');
        return (!o || getComputedStyle(o).display === 'none' || !o.getBoundingClientRect().height) && !document.documentElement.classList.contains('mba-pro-sensitive');
      }));
    }

    // It renders.
    if (kind === 'gallery') {
      await page.waitForFunction(`(${visibleCards.toString()})() > 0`, null, { timeout: 10000 }).catch(() => {});
      ok('cards render', (await page.evaluate(visibleCards)) > 0);
    } else if (kind === 'carousel') {
      ok('slides render', (await page.locator('.splide__slide').count()) > 1);
    } else if (kind === 'single') {
      ok('the single case renders', (await page.locator('.mba-pro-scase-stage').count()) > 0);
    } else if (kind === 'map') {
      await page.waitForSelector('.mba-pro-discovery-region', { timeout: 8000 }).catch(() => {});
      ok('the map renders', (await page.locator('.mba-pro-discovery-region').count()) > 3);
    }
    // Concern first opens with text buttons only: a concern has to be chosen before any photo shows.
    if (/concern-first/.test(demo.path)) {
      await page.locator('.mba-pro-organise-concern').first().click().catch(() => {});
      await page.waitForSelector('.medbeafgallery-gallery-item', { state: 'visible', timeout: 6000 }).catch(() => {});
      ok('a concern shows its cases', (await page.locator('.medbeafgallery-gallery-item:visible').count()) > 0);
    }
    const scroll = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, v: document.documentElement.clientWidth }));
    warn('no sideways scroll at 1536 px', scroll.w <= scroll.v, `page is ${scroll.w - scroll.v}px wider than the window`);
    const images = await brokenImages(page);
    ok('images load', !images.broken.length && (images.count > 0 || kind === 'map'), `${images.count} images; broken ${images.broken.join(', ')}`);

    // It works: a case window opens and closes, or the embed's control responds.
    if (kind === 'gallery') {
      if (/treatment-hub/.test(demo.path)) {
        await page.locator('.mba-pro-organise-treatment').first().locator('button, a').first().click().catch(() => {});
        await page.waitForSelector('.medbeafgallery-gallery-item', { state: 'visible', timeout: 6000 }).catch(() => {});
        ok('a treatment shows its cases', (await page.locator('.medbeafgallery-gallery-item:visible').count()) > 0);
      }
      const clicked = await openCase(page);
      if (ok('a case window opens', !!clicked)) {
        const photos = await windowPhotosLoad(page);
        ok('the window photos load', photos.n > 0 && !photos.broken, JSON.stringify(photos));
        if (!png && action === 'open' && SHOTS) {
          await page.waitForTimeout(700);
          png = await page.screenshot({ type: 'png' });
          meta = { pointer: clicked };
        }
        ok('the case window closes', await closeCase(page));
      }
      if (/treatment-hub/.test(demo.path)) {
        // Back to the page's first view for the screenshot (Concern first keeps the chosen concern).
        await page.goto(BASE + demo.path, { waitUntil: 'load' });
        await settle(page);
      }
    } else if (kind === 'carousel') {
      const card = page.locator('.splide__slide.is-visible .mba-carousel-card').first();
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      const box = await card.boundingBox();
      if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 3);
      const opened = await page.waitForFunction(openWindow, null, { timeout: 6000 }).then(() => true).catch(() => false);
      if (ok('a slide opens the case window', opened)) ok('the case window closes', await closeCase(page));
    } else if (kind === 'single') {
      const before = page.locator('.mba-pro-scase-mode[data-mode="before"]').first();
      await before.scrollIntoViewIfNeeded();
      await before.click();
      await page.waitForTimeout(400);
      ok('the Before button switches the view', (await page.locator('.mba-pro-scase-viewer').first().getAttribute('data-mode')) === 'before');
      await page.locator('.mba-pro-scase-mode[data-mode="slider"]').first().click();
      await page.waitForTimeout(400);
      const handle = page.locator('.mba-pro-scase-handle').first();
      await handle.focus();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);
      ok('the slider moves with the keyboard', Number(await handle.getAttribute('aria-valuenow')) !== 50);
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
    } else if (kind === 'map') {
      await page.locator('.mba-pro-discovery-region-choice:visible').first().click();
      await page.waitForURL(/find-by-area|mbarea/, { timeout: 6000 }).catch(() => {});
      ok('an area leads to the gallery', /find-by-area|mbarea/.test(page.url()), page.url());
      await page.goto(BASE + demo.path, { waitUntil: 'load' });
      await settle(page);
    }

    // The screenshot, in the page's own state.
    if (SHOTS && !png) {
      if (action === 'stage') {
        // The hair transplant case has four dated stages.
        const card = page.locator('.medbeafgallery-gallery-item', { hasText: 'FUE Hair Transplant' }).first();
        await card.scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(400);
        const link = card.locator('.mba-pro-caption-foot button, .medbeafgallery-view-details, button:has-text("View"), a:has-text("View")').first();
        await ((await link.count()) ? link : card).click().catch(() => {});
        ok('a case with stages opens', await page.waitForFunction(openWindow, null, { timeout: 5000 }).then(() => true).catch(() => false));
        await page.waitForSelector('.mba-pro-stages-item', { state: 'visible', timeout: 6000 }).catch(() => {});
        const item = page.locator('.mba-pro-stages-item', { hasText: '3 months' }).first();
        const rect = await item.evaluate(rectOf).catch(() => null);
        await item.click().catch(() => {});
        await page.waitForTimeout(1200);
        png = await page.screenshot({ type: 'png' });
        meta = { pointer: rect };
        await closeCase(page);
      } else if (action === 'zoom') {
        const clicked = await openCase(page);
        await page.waitForTimeout(600);
        const zoom = page.locator('[aria-label="Zoom in"]:visible, .mba-pro-mmodal-zoom-in:visible').first();
        const rect = await zoom.evaluate(rectOf).catch(() => clicked);
        for (let i = 0; i < 3; i++) await zoom.click().catch(() => {});
        await page.waitForTimeout(800);
        png = await page.screenshot({ type: 'png' });
        meta = { pointer: rect };
        await closeCase(page);
      } else if (action === 'annotated') {
        const opened = await page.evaluate(() => {
          const list = typeof galleryData !== 'undefined' ? galleryData : [];
          const c = list.find((x) => /nose/i.test(x.title) && JSON.stringify(x).includes('annotation')) || list.find((x) => /Advanced Nose/.test(x.title));
          if (c) window.openModal(c.id);
          return !!c;
        });
        ok('the annotated case opens', opened);
        await page.waitForTimeout(1500);
        png = await page.screenshot({ type: 'png' });
        await closeCase(page);
      } else if (action === 'compare') {
        await scrollToMain(page);
        const boxes = page.locator('.medbeafgallery-gallery-item input[type="checkbox"]');
        await boxes.nth(0).scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.evaluate(() => { const b = document.querySelectorAll('.medbeafgallery-gallery-item input[type="checkbox"]'); b[0].click(); b[1].click(); });
        await page.waitForTimeout(500);
        const btn = page.locator('button:visible', { hasText: /^Compare/ }).last();
        const rect = await btn.evaluate(rectOf).catch(() => null);
        await btn.click();
        const opened = await page.waitForFunction(openWindow, null, { timeout: 5000 }).then(() => true).catch(() => false);
        ok('the comparison opens', opened);
        await page.waitForTimeout(900);
        png = await page.screenshot({ type: 'png' });
        meta = { pointer: rect };
        ok('the comparison closes', await closeCase(page));
      } else if (action === 'area' || action === 'guide') {
        await scrollToMain(page);
        const btn = page.locator('.mba-pro-discovery-button:visible').first();
        const rect = await btn.evaluate(rectOf).catch(() => null);
        await btn.click();
        await page.waitForTimeout(1000);
        ok(action === 'area' ? 'the map opens' : 'the guided search opens', !!(await page.evaluate(openWindow)));
        png = await page.screenshot({ type: 'png' });
        meta = { pointer: rect };
        await closeCase(page);
      } else if (action === 'single-stage') {
        await scrollToMain(page);
        const button = page.locator('[class*="scase"] button:visible', { hasText: '3 months' }).first();
        await button.scrollIntoViewIfNeeded();
        await page.evaluate(() => {
          const el = document.querySelector('.mba-pro-scase');
          if (el) scrollTo(0, Math.max(0, el.getBoundingClientRect().top + scrollY - 28));
        });
        await page.waitForTimeout(400);
        const rect = await button.evaluate(rectOf).catch(() => null);
        await button.click();
        await page.waitForTimeout(1000);
        ok('a stage photo fills the photo area', await page.evaluate(() => [...document.querySelectorAll('.mba-pro-scase img')].some((i) => i.getBoundingClientRect().width > 250 && i.naturalWidth > 0)));
        png = await page.screenshot({ type: 'png' });
        meta = { pointer: rect };
      } else if (action !== 'phone-open') {
        await scrollToMain(page);
        png = await page.screenshot({ type: 'png' });
      }
    }

    ok('no console errors', !log.console.length, log.console.slice(0, 2).join(' | '));
    ok('no failed requests', !log.failed.length, log.failed.slice(0, 3).join(' | '));
    ok('no request to another host', !log.foreign.length, log.foreign.slice(0, 2).join(' | '));
  } catch (e) {
    ok('ran without an error', false, String(e).slice(0, 200));
  }
  await context.close();

  // Story mode is a phone feature: photograph it on a phone.
  if (SHOTS && action === 'phone-open') {
    const phone = await browser.newContext(PHONE);
    await phone.addInitScript(() => { try { localStorage.setItem('mbaGalleryConsent', '1'); } catch { /* about:blank */ } });
    const p = await phone.newPage();
    try {
      await p.goto(BASE + demo.path, { waitUntil: 'load' });
      await settle(p);
      const clicked = await openCase(p);
      ok('the phone Story window opens', !!clicked);
      await p.waitForTimeout(1200);
      png = await p.screenshot({ type: 'png' });
      meta = { phone: true };
      await closeCase(p);
    } catch (e) {
      ok('phone capture ran', false, String(e).slice(0, 200));
    }
    await phone.close();
  }

  if (SHOTS && png) {
    const mode = action === 'phone-open' ? 'phone' : 'cover';
    fs.writeFileSync(path.join(OUT_CARDS, `${slug}.webp`), await encode(png, 800, 450, { mode }));
    if (FEATURE.has(demo.path)) fs.writeFileSync(path.join(OUT_FEATURES, `${slug}.webp`), await encode(png, 1600, 900, { mode, quality: 0.8 }));
    if (VIDEO.has(demo.path)) {
      if (mode === 'phone') fs.writeFileSync(path.join(OUT_VIDEO, `${slug}.png`), png);
      else fs.writeFileSync(path.join(OUT_VIDEO, `${slug}.jpg`), await encode(png, 1920, 1080, { quality: 0.9, type: 'image/jpeg' }));
      videoMeta[slug] = { ...(meta || {}), scale: mode === 'phone' ? PHONE.deviceScaleFactor : DESKTOP.deviceScaleFactor, title: demo.title };
    }
  } else if (SHOTS) {
    problems.push('no screenshot');
  }

  if (log.favicon) notes.push('the export has no /favicon.ico (the browser asks for it)');
  results[demo.path] = { ok: problems.length === 0, problems, notes };
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${demo.path}${problems.length ? ' — ' + problems.join('; ') : ''}${notes.length ? ' [note: ' + notes.join('; ') + ']' : ''}`);
}

// Two extra frames for the video's slider scene: the free case window in Before and After.
if (SHOTS && (!ONLY.length || ONLY.some((o) => '/free/'.includes(o)))) {
  const context = await browser.newContext(DESKTOP);
  await context.addInitScript(() => { try { localStorage.setItem('mbaGalleryConsent', '1'); } catch { /* about:blank */ } });
  const page = await context.newPage();
  try {
    await page.goto(BASE + '/free/', { waitUntil: 'load' });
    await settle(page);
    const clicked = await openCase(page);
    await windowPhotosLoad(page);
    const frames = {};
    for (const view of ['Before', 'After']) {
      await page.locator('#medbeafgallery-modal button:visible', { hasText: new RegExp(`^\\s*${view}\\s*$`) }).first().click().catch(() => {});
      await page.waitForTimeout(900);
      frames[view] = await page.screenshot({ type: 'png' });
    }
    const stage = await page.evaluate(() => {
      const m = document.querySelector('#medbeafgallery-modal');
      const imgs = m ? [...m.querySelectorAll('img')].filter((i) => i.getBoundingClientRect().width > 200) : [];
      if (!imgs.length) return null;
      const r = imgs[0].getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    for (const view of ['Before', 'After']) {
      fs.writeFileSync(path.join(OUT_VIDEO, `free-window-${view.toLowerCase()}.jpg`), await encode(frames[view], 1920, 1080, { quality: 0.9, type: 'image/jpeg' }));
    }
    videoMeta['free-window'] = { pointer: clicked, stage, scale: DESKTOP.deviceScaleFactor };
    console.log('ok   video frames: free case window, Before and After');
  } catch (e) {
    console.log('FAIL video frames: ' + String(e).slice(0, 200));
  }
  await context.close();
}

await browser.close();
server.close();

const passed = Object.values(results).filter((r) => r.ok).length;
fs.writeFileSync(CHECK_FILE, JSON.stringify({
  checked: new Date().toISOString().slice(0, 10),
  export: path.basename(path.dirname(DEMO)) + '/' + path.basename(DEMO),
  note: 'Written by scripts/capture-demo-shots.mjs. A page with ok:false is left off /demo/.',
  passed,
  total: Object.keys(results).length,
  pages: results,
}, null, 2) + '\n');
if (SHOTS) fs.writeFileSync(path.join(OUT_VIDEO, 'meta.json'), JSON.stringify(videoMeta, null, 1));
console.log(`\n${passed}/${Object.keys(results).length} pages work; ${totalChecks} checks this run`);
const failed = Object.entries(results).filter(([, r]) => !r.ok);
if (failed.length) console.log('Left off /demo/:\n' + failed.map(([p, r]) => `  ${p}: ${r.problems.join('; ')}`).join('\n'));
