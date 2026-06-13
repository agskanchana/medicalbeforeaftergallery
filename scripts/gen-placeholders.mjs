// Generate labeled placeholder screenshots for the feature showcase.
// Replace the output PNGs in public/images/features/ with real screenshots.
// Run: node scripts/gen-placeholders.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1000;
const H = 625;
const OUT = 'public/images/features';

const items = [
  ['slider', 'Before / After Slider'],
  ['masonry', 'Masonry Layout & Modal'],
  ['filtering', 'Filtering, Search & Sort'],
  ['annotations', 'Image Annotations'],
  ['watermarking', 'Watermarking & Protection'],
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function svg(title, file) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eef4ff"/>
      <stop offset="1" stop-color="#f3fbf8"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="20" fill="#ffffff" fill-opacity="0.6"
        stroke="#bcd0f7" stroke-width="2" stroke-dasharray="10 9"/>

  <!-- image icon -->
  <g transform="translate(${W / 2 - 44}, 168)">
    <rect width="88" height="74" rx="12" fill="#dbe8ff" stroke="#3c88fd" stroke-width="3"/>
    <circle cx="28" cy="28" r="10" fill="#3c88fd"/>
    <path d="M12 60 L36 36 L54 54 L66 44 L76 60 Z" fill="#5a9cff"/>
  </g>

  <text x="${W / 2}" y="320" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="40" font-weight="700" fill="#0f1b33">${esc(title)}</text>
  <text x="${W / 2}" y="362" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="22" font-weight="600" fill="#3c88fd">Screenshot placeholder</text>
  <text x="${W / 2}" y="398" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="17" fill="#647189">Replace with your image at /public/images/features/${file}.png</text>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
for (const [file, title] of items) {
  await sharp(Buffer.from(svg(title, file))).png().toFile(`${OUT}/${file}.png`);
  console.log('✓', `${OUT}/${file}.png`);
}
console.log('Done.');
