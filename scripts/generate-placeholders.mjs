// Generate placeholder project images as inline SVG data URIs
// Run with: node scripts/generate-placeholders.mjs

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images', 'projects');

const palettes = [
    { name: 'mubien', bg: '#1a1a2e', accent: '#e94560', label: 'MUBIEN' },
    { name: 'digital', bg: '#0f0e17', accent: '#7f5af0', label: 'DIGITAL' },
    { name: 'vogue', bg: '#16161a', accent: '#f25f4c', label: 'VOGUE' },
    { name: 'noir', bg: '#0d1117', accent: '#58a6ff', label: 'NOIR' },
    { name: 'sculpture', bg: '#1b1b1b', accent: '#c8a96e', label: 'SCULPTURE' },
];

palettes.forEach(({ name, bg, accent, label }) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
    </radialGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feBlend in="SourceGraphic" mode="multiply"/>
    </filter>
  </defs>
  <rect width="1200" height="750" fill="${bg}"/>
  <rect width="1200" height="750" fill="url(#g)"/>
  <circle cx="600" cy="375" r="200" fill="none" stroke="${accent}" stroke-width="1" opacity="0.3"/>
  <circle cx="600" cy="375" r="300" fill="none" stroke="${accent}" stroke-width="0.5" opacity="0.15"/>
  <line x1="0" y1="375" x2="1200" y2="375" stroke="${accent}" stroke-width="0.5" opacity="0.1"/>
  <line x1="600" y1="0" x2="600" y2="750" stroke="${accent}" stroke-width="0.5" opacity="0.1"/>
  <text x="600" y="385" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="48" font-weight="bold" fill="${accent}" opacity="0.6" letter-spacing="16">${label}</text>
</svg>`;

    writeFileSync(join(outDir, `${name}.svg`), svg);
    console.log(`✓ ${name}.svg`);
});

console.log('\nDone! All placeholders generated.');
