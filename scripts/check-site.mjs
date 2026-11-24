#!/usr/bin/env node
// Checks the built site (dist/) in Chrome, page by page, at 1440 px and 390 px.
//
//   npm run build
//   NODE_PATH=<folder with playwright-core> node scripts/check-site.mjs \
//     [--demo=<demo export folder>] [--demo-pages=<its pages.json>] [--shots=<folder for screenshots>] [--port=8098] [--only=part]
//
// Per page and width: no console errors, no failed requests to the site itself, every image
// loads and has alt text, no sideways scroll, JSON-LD parses, one h1 and no skipped heading
// levels. Then: every internal link and #anchor resolves, every demo link points to a page of
// the demo export that passed its check and is in its page list, every demo page is linked from
// /demo/, the video files exist. Requests to analytics and the
// checkout are blocked, so nothing is sent anywhere. One browser, one page at a time.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { serveStatic } from './lib/static-server.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, fallback = '') => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(hit.indexOf('=') + 1) : fallback;
};
const DIST = path.join(ROOT, 'dist');
const DEMO = arg('demo', process.env.DEMO_EXPORT || 'E:/Temp/mba-feature-pass/demo-site/out');
const DEMO_PAGES = arg('demo-pages', path.resolve(DEMO, '../pages.json'));
const SHOTS = arg('shots', '');
const PORT = Number(arg('port', 8098));
const ONLY = arg('only', '');
const BASE = `http://127.0.0.1:${PORT}`;
const SITE_HOST = 'medicalbeforeaftergallery.com';
const DEMO_HOST = 'demo.medicalbeforeaftergallery.com';
const BLOCK = /googletagmanager|google-analytics|freemius|web3forms/;

const check = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/demo-check.json'), 'utf8')).pages;
const demoPages = new Set(JSON.parse(fs.readFileSync(DEMO_PAGES, 'utf8')).pages.map((x) => x.path));

// Every built page.
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push('/' + path.relative(DIST, path.dirname(p)).replace(/\\/g, '/').replace(/^\.?$/, '').replace(/([^/])$/, '$1/'));
  }
})(DIST);
pages.sort();
const list = pages.filter((p) => !ONLY || p.includes(ONLY));

const exists = (rel) => {
  const clean = decodeURIComponent(rel.split('#')[0].split('?')[0]);
  const f = path.join(DIST, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(f, 'index.html'));
  return fs.existsSync(f) && fs.statSync(f).isFile() || fs.existsSync(path.join(f, 'index.html'));
};

if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const server = await serveStatic(DIST, PORT);
const browser = await chromium.launch({ channel: 'chrome', headless: true });

const VIEWPORTS = [
  { name: '1440', options: { viewport: { width: 1440, height: 900 } } },
  { name: '390', options: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
];
const results = [];
const links = new Map(); // href -> first page it was seen on
const ids = new Map(); // page -> Set of ids
let checks = 0;

for (const p of list) {
  for (const vp of VIEWPORTS) {
    const problems = [];
    const ok = (what, pass, detail = '') => { checks++; if (!pass) problems.push(detail ? `${what}: ${detail}` : what); };
    const context = await browser.newContext(vp.options);
    await context.route('**/*', (route) => (BLOCK.test(route.request().url()) ? route.abort() : route.continue()));
    const page = await context.newPage();
    const log = { console: [], failed: [] };
    page.on('console', (m) => { if (m.type() === 'error' && !BLOCK.test((m.location() || {}).url || '') && !/ERR_FAILED|blocked/i.test(m.text())) log.console.push(m.text().slice(0, 200)); });
    page.on('pageerror', (e) => log.console.push('exception: ' + String(e).slice(0, 200)));
    page.on('requestfailed', (r) => { if (r.url().startsWith(BASE)) log.failed.push(`${r.url()} ${r.failure()?.errorText}`); });
    page.on('response', (r) => { if (r.url().startsWith(BASE) && r.status() >= 400) log.failed.push(`${r.status()} ${r.url()}`); });
    try {
      const res = await page.goto(BASE + p, { waitUntil: 'load' });
      ok('status 200', res && res.status() === 200, String(res && res.status()));
      await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
      // Scroll through the page so lazy images load and reveal-on-scroll sections show.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.7)) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
      const data = await page.evaluate(async () => {
        const imgs = [...document.images];
        // A lazy image the quick scroll went past is brought into view and given time to load.
        for (const i of imgs) {
          if (i.complete && i.naturalWidth) continue;
          i.scrollIntoView({ block: 'center' });
          await new Promise((r) => { if (i.complete && i.naturalWidth) r(); else { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); setTimeout(r, 4000); } });
        }
        scrollTo(0, 0);
        const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => h.getClientRects().length).map((h) => Number(h.tagName[1]));
        const skips = [];
        for (let i = 1; i < headings.length; i++) if (headings[i] > headings[i - 1] + 1) skips.push(`h${headings[i - 1]}→h${headings[i]}`);
        const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
          try { const d = JSON.parse(s.textContent); return { ok: true, type: [].concat(d['@type']).join('+') }; } catch (e) { return { ok: false, error: String(e) }; }
        });
        return {
          broken: imgs.filter((i) => !i.naturalWidth).map((i) => i.getAttribute('src')),
          noAlt: imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.getAttribute('src')),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          wide: [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.right > document.documentElement.clientWidth + 1 && r.width > 0 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 3).map((e) => e.tagName + '.' + String(e.className).slice(0, 40)),
          h1: headings.filter((h) => h === 1).length,
          skips,
          jsonld,
          links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
          ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content || '',
        };
      });
      ok('images load', !data.broken.length, data.broken.slice(0, 3).join(', '));
      ok('images have alt', !data.noAlt.length, data.noAlt.slice(0, 3).join(', '));
      ok('no sideways scroll', data.overflow <= 1, `${data.overflow}px (${data.wide.join(', ')})`);
      ok('one h1', data.h1 === 1, String(data.h1));
      ok('headings in order', !data.skips.length, data.skips.slice(0, 3).join(', '));
      ok('JSON-LD parses', data.jsonld.every((j) => j.ok), JSON.stringify(data.jsonld.filter((j) => !j.ok)));
      ok('title and description', !!data.title && !!data.description);
      if (vp.name === '1440') {
        ids.set(p, new Set(data.ids));
        for (const h of data.links) if (!links.has(h)) links.set(h, p);
        results.push({ page: p, jsonld: data.jsonld.map((j) => j.type), title: data.title });
      }
      ok('no console errors', !log.console.length, log.console.slice(0, 2).join(' | '));
      ok('no failed requests', !log.failed.length, log.failed.slice(0, 3).join(' | '));
      if (SHOTS) {
        const name = (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-')) + `-${vp.name}.jpg`;
        await page.screenshot({ path: path.join(SHOTS, name), fullPage: true, type: 'jpeg', quality: 70 });
      }
    } catch (e) {
      ok('ran', false, String(e).slice(0, 200));
    }
    await context.close();
    const line = `${problems.length ? 'FAIL' : 'ok  '} ${vp.name.padEnd(4)} ${p}${problems.length ? ' — ' + problems.join('; ') : ''}`;
    console.log(line);
    results.push({ page: p, width: vp.name, problems });
  }
}

// Links.
const linkProblems = [];
const external = new Map();
for (const [href, from] of links) {
  checks++;
  if (/^(mailto:|tel:|javascript:)/.test(href)) continue;
  let url;
  try { url = new URL(href, BASE + from); } catch { linkProblems.push(`${from}: bad link ${href}`); continue; }
  const local = url.origin === BASE || url.hostname === SITE_HOST || url.hostname === 'www.' + SITE_HOST;
  if (local) {
    const rel = url.pathname;
    if (!exists(rel)) linkProblems.push(`${from}: ${href} does not exist`);
    else if (url.hash && url.hash.length > 1) {
      const target = rel.endsWith('/') ? rel : rel + '/';
      const set = ids.get(target);
      if (set && !set.has(decodeURIComponent(url.hash.slice(1)))) linkProblems.push(`${from}: ${href} — no #${url.hash.slice(1)} on ${target}`);
    }
  } else if (url.hostname === DEMO_HOST) {
    const f = path.join(DEMO, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
    if (!fs.existsSync(f)) linkProblems.push(`${from}: demo link ${href} is not in the export`);
    else if (!demoPages.has(url.pathname)) linkProblems.push(`${from}: demo link ${href} is not in the demo's page list`);
    else if (!(check[url.pathname] && check[url.pathname].ok)) linkProblems.push(`${from}: demo link ${href} did not pass its check`);
    external.set(DEMO_HOST, (external.get(DEMO_HOST) || 0) + 1);
  } else {
    external.set(url.hostname, (external.get(url.hostname) || 0) + 1);
  }
}

// Every demo link on /demo/ is a demo page that passed.
const demoHtml = fs.readFileSync(path.join(DIST, 'demo/index.html'), 'utf8');
const demoLinks = [...new Set([...demoHtml.matchAll(/href="https:\/\/demo\.medicalbeforeaftergallery\.com(\/[^"]*)"/g)].map((m) => m[1]))];
for (const l of demoLinks) {
  checks++;
  if (!(check[l] && check[l].ok)) linkProblems.push(`/demo/: ${l} is linked but did not pass its check`);
}
// No demo page is left out.
for (const l of demoPages) {
  checks++;
  if (!demoLinks.includes(l)) linkProblems.push(`/demo/: the demo page ${l} is not linked`);
}

// The video files.
for (const f of ['video/mba-gallery-features.mp4', 'video/mba-gallery-features.webm', 'video/mba-gallery-features-poster.webp', 'video/mba-gallery-features.en.vtt']) {
  checks++;
  if (!fs.existsSync(path.join(DIST, f))) linkProblems.push(`missing ${f}`);
}

// A page that does not exist gets the 404 page.
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const res = await page.goto(BASE + '/no-such-page/');
  checks++;
  if (!res || res.status() !== 404 || !(await page.locator('h1').count())) linkProblems.push('the 404 page is not served for an unknown address');
  await context.close();
}

await browser.close();
server.close();

const failed = results.filter((r) => r.problems && r.problems.length);
console.log(`\n${list.length} pages × 2 widths; ${checks} checks; ${failed.length} page/width combinations with problems`);
console.log(`demo links on /demo/: ${demoLinks.length}`);
console.log(`links checked: ${links.size} unique; external hosts: ${[...external].map(([h, n]) => `${h} (${n})`).join(', ')}`);
if (linkProblems.length) console.log('LINK PROBLEMS:\n  ' + linkProblems.join('\n  '));
else console.log('all internal links, anchors and demo links resolve');
fs.writeFileSync(path.join(SHOTS || os.tmpdir(), 'site-check.json'), JSON.stringify({ when: new Date().toISOString(), pages: list.length, checks, failed, linkProblems, demoLinks: demoLinks.length, external: Object.fromEntries(external), jsonld: results.filter((r) => r.jsonld) }, null, 1));
process.exit(failed.length || linkProblems.length ? 1 : 0);
