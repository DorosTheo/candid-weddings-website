/**
 * Generates clearly-labelled placeholder images for every asset declared in
 * src/data/media.ts that does not yet exist on disk.
 *
 *   npm run placeholders            # create missing files only (safe)
 *   npm run placeholders -- --force # also regenerate files still flagged `placeholder: true`
 *
 * Real photographs are NEVER overwritten: a file is only (re)written when it is
 * missing, or when --force is passed AND the registry still marks it as a
 * placeholder.
 */
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { allMedia } from "../src/data/media.ts";

const root = path.resolve(import.meta.dirname, "..");
const force = process.argv.includes("--force");

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function svgFor(src: string, width: number, height: number) {
  const h = hash(src);
  // Monochrome tonal palette that sits naturally in the black & white brand.
  const tones = [
    ["#2a2a28", "#8d8b85"],
    ["#1c1c1b", "#6f6d68"],
    ["#3a3936", "#b5b2aa"],
    ["#4a4945", "#c9c6bd"],
    ["#22221f", "#a3a097"],
  ];
  const [dark, light] = tones[h % tones.length];
  const angle = h % 360;
  const cx = 25 + (h % 50);
  const cy = 20 + ((h >> 8) % 50);
  const file = path.basename(src);
  const folder = path.dirname(src).replace("/images/", "");
  const unit = Math.min(width, height);
  const fs1 = Math.round(unit * 0.022);
  const fs2 = Math.round(unit * 0.036);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle} .5 .5)">
      <stop offset="0" stop-color="${dark}"/>
      <stop offset="1" stop-color="${light}"/>
    </linearGradient>
    <radialGradient id="r" cx="${cx}%" cy="${cy}%" r="70%">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".28"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".25"/>
    </radialGradient>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${h % 1000}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".09"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <rect width="100%" height="100%" filter="url(#n)"/>
  <g font-family="Inter, DejaVu Sans, sans-serif" fill="#ffffff" text-anchor="middle">
    <text x="50%" y="${height / 2 - fs2 * 0.9}" font-size="${fs1}" letter-spacing="${fs1 * 0.3}" opacity=".7">PHOTO PLACEHOLDER — ${folder.toUpperCase()}</text>
    <text x="50%" y="${height / 2 + fs2 * 0.4}" font-size="${fs2}" font-family="DejaVu Serif, serif" font-style="italic" opacity=".95">${file}</text>
    <text x="50%" y="${height / 2 + fs2 * 1.6}" font-size="${fs1}" letter-spacing="${fs1 * 0.2}" opacity=".6">${width} × ${height}</text>
  </g>
</svg>`;
}

let created = 0;
let skipped = 0;
for (const asset of allMedia()) {
  const out = path.join(root, "public", asset.src);
  const exists = existsSync(out);
  if (exists && !(force && asset.placeholder)) {
    skipped++;
    continue;
  }
  mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svgFor(asset.src, asset.width, asset.height)))
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);
  created++;
}

console.log(`Placeholders: ${created} created, ${skipped} already present (left untouched).`);
