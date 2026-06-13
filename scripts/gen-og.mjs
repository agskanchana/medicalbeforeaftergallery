// Generate the default Open Graph image (1200x630) from an SVG.
// Run: node scripts/gen-og.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3c88fd"/>
      <stop offset="0.55" stop-color="#2670e8"/>
      <stop offset="1" stop-color="#5b6cf6"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#dbe8ff"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1060" cy="90" r="240" fill="#ffffff" opacity="0.08"/>
  <circle cx="120" cy="560" r="200" fill="#ffffff" opacity="0.07"/>

  <!-- logo mark -->
  <g transform="translate(90,86)">
    <rect width="92" height="92" rx="24" fill="url(#mark)"/>
    <rect x="22" y="22" width="40" height="48" rx="8" fill="#2670e8" opacity="0.55"/>
    <rect x="34" y="30" width="40" height="48" rx="8" fill="#2670e8"/>
  </g>

  <text x="210" y="150" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="#ffffff">MBA Gallery</text>

  <text x="90" y="330" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#ffffff">Before &amp; after galleries</text>
  <text x="90" y="408" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#dbe8ff">for medical practices</text>

  <text x="90" y="492" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400" fill="#eaf2ff" opacity="0.92">Comparison sliders · smart filtering · watermarking · consent</text>

  <g transform="translate(90,540)">
    <rect width="360" height="54" rx="27" fill="#ffffff" opacity="0.16"/>
    <text x="32" y="35" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#ffffff">medicalbeforeaftergallery.com</text>
  </g>
</svg>
`;

mkdirSync('public/images', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/images/og-default.png');
console.log('✓ public/images/og-default.png generated');
