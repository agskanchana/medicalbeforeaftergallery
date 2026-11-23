// Generate the square logo used in the Organization structured data (512×512 PNG),
// drawn from the same mark as the Open Graph image (scripts/gen-og.mjs).
// Run: node scripts/gen-logo.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const S = 512;
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 92 92">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3c88fd"/>
      <stop offset="0.55" stop-color="#2670e8"/>
      <stop offset="1" stop-color="#5b6cf6"/>
    </linearGradient>
  </defs>
  <rect width="92" height="92" rx="24" fill="url(#bg)"/>
  <rect x="22" y="22" width="40" height="48" rx="8" fill="#ffffff" opacity="0.55"/>
  <rect x="34" y="30" width="40" height="48" rx="8" fill="#ffffff"/>
</svg>
`;

mkdirSync('public/images', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/images/logo-512.png');
console.log('✓ public/images/logo-512.png generated');
