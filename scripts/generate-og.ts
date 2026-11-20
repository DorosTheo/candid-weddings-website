/** Generates the default Open Graph / social sharing image (1200×630). */
import path from "node:path";
import sharp from "sharp";
const out = path.resolve(import.meta.dirname, "../public/brand/og-default.jpg");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#f6f5f1"/>
<text x="600" y="300" text-anchor="middle" font-family="DejaVu Serif, serif" font-style="italic" font-size="96" fill="#171717">Candid</text>
<text x="600" y="370" text-anchor="middle" font-family="Inter, DejaVu Sans, sans-serif" font-size="26" letter-spacing="9" fill="#171717">WEDDINGS CO.</text>
<line x1="540" y1="430" x2="660" y2="430" stroke="#a9a9a2"/>
<text x="600" y="480" text-anchor="middle" font-family="Inter, DejaVu Sans, sans-serif" font-size="16" letter-spacing="5" fill="#5a5a56">WEDDING PHOTOGRAPHY &amp; CINEMATOGRAPHY — CYPRUS &amp; WORLDWIDE</text>
</svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(out);
console.log("Wrote", out);
