// One-time migration: convert the legacy hand-coded blog HTML into Markdown
// content collection entries. Run with: node scripts/migrate-blog.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';

const SRC = 'E:/work/medicalbeforeaftergallery.com/main-website/medicalbeforeaftergallery/blog';
const DEST = 'E:/work/medicalbeforeaftergallery.com/new-site/src/content/blog';

// Per-post metadata not reliably present in the article body (from the blog index).
const meta = {
  '5-reasons-cosmetic-dentistry-gallery': {
    date: '2024-12-15', author: 'Dr. Sarah Mitchell', category: 'Dental Marketing',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'smile-makeover-conversion-guide': {
    date: '2024-12-12', author: 'Dr. Michael Chen', category: 'Patient Conversion',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'static-photos-costing-patients': {
    date: '2024-12-10', author: 'Jennifer Martinez', category: 'Practice Growth',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'veneers-whitening-orthodontics-portfolio': {
    date: '2024-12-08', author: 'Dr. Lisa Thompson', category: 'Best Practices',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'dental-hipaa-compliance': {
    date: '2024-12-05', author: 'Legal Team', category: 'HIPAA Compliance',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'upgrade-to-pro': {
    date: '2026-01-06', author: 'MBA Gallery Team', category: 'Product',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
};

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

// Drop Font Awesome icon <i> tags entirely.
td.addRule('stripIcons', {
  filter: (node) => node.nodeName === 'I' && /\bfa[a-z]?-/.test(node.getAttribute('class') || ''),
  replacement: () => '',
});

// Convert highlight / cta / comparison callout boxes into blockquotes.
td.addRule('callouts', {
  filter: (node) =>
    node.nodeName === 'DIV' && /(highlight-box|cta-box|comparison-box|info-box|stat-box|warning-box)/.test(node.getAttribute('class') || ''),
  replacement: (content) =>
    '\n\n' +
    content
      .trim()
      .split('\n')
      .map((l) => (l.trim() ? '> ' + l : '>'))
      .join('\n') +
    '\n\n',
});

function rewriteLinks(md) {
  return md
    .replace(/\.\.\/index\.html#pricing/g, '/pricing/')
    .replace(/index\.html#pricing/g, '/pricing/')
    .replace(/\.\.\/index\.html#features/g, '/features/')
    .replace(/\.\.\/index\.html/g, '/')
    .replace(/\(([a-z0-9-]+)\.html\)/g, '(/blog/$1/)') // sibling blog post links
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function migrate(slug) {
  const html = readFileSync(`${SRC}/${slug}.html`, 'utf8');
  const root = parse(html);

  const title =
    root.querySelector('.post-title')?.text.trim() ||
    root.querySelector('title')?.text.trim() ||
    slug;
  const description =
    root.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';

  const content = root.querySelector('.post-content');
  if (!content) throw new Error(`No .post-content in ${slug}`);

  // Pull tags before we strip them
  const tags = content.querySelectorAll('.post-tags .post-tag').map((a) => a.text.trim()).filter(Boolean);

  // Remove non-article chrome
  content.querySelectorAll('.post-tags, .share-buttons').forEach((n) => n.remove());

  let body = td.turndown(content.innerHTML);
  body = rewriteLinks(body);

  const m = meta[slug];
  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `date: ${m.date}`,
    `author: ${JSON.stringify(m.author)}`,
    `category: ${JSON.stringify(m.category)}`,
    `image: ${JSON.stringify(m.image)}`,
    `imageAlt: ${JSON.stringify(title)}`,
    `tags: ${JSON.stringify(tags.slice(0, 7))}`,
    '---',
    '',
    body,
    '',
  ].join('\n');

  writeFileSync(`${DEST}/${slug}.md`, fm, 'utf8');
  console.log(`✓ ${slug}.md  (${tags.length} tags, ${body.length} chars)`);
}

mkdirSync(DEST, { recursive: true });
Object.keys(meta).forEach(migrate);
console.log('Done.');
