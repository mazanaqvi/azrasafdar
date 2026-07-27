/**
 * Derives the site's logo assets from the master artwork.
 * Usage: node scripts/prepare-logo.mjs <path-to-master-png>
 *
 * The master files are dark artwork flattened onto white. We recover an alpha
 * channel from the darkest channel of each pixel, then un-premultiply, which
 * gives clean edges on both light and dark backgrounds.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

async function whiteToTransparent(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const coverage = 255 - Math.min(r, g, b);

    if (coverage <= 2) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
      continue;
    }

    const alpha = coverage / 255;
    // Reverse "composite over white" to recover the original colour.
    const unpremultiply = (c) =>
      Math.max(0, Math.min(255, Math.round((c - 255 * (1 - alpha)) / alpha)));

    out[o] = unpremultiply(r);
    out[o + 1] = unpremultiply(g);
    out[o + 2] = unpremultiply(b);
    out[o + 3] = coverage;
  }

  return sharp(out, { raw: { width, height, channels: 4 } }).png();
}

const source = process.argv[2];
if (!source) throw new Error("Pass a path to the master logo PNG.");

const { width, height } = await sharp(source).metadata();
console.log(`source: ${width}x${height}`);

await mkdir(path.join(process.cwd(), "public"), { recursive: true });

// The wordmark sits in the bottom quarter; the emblem is everything above it.
const emblemHeight = Math.round(height * 0.73);

const emblem = await sharp(source)
  .extract({ left: 0, top: 0, width, height: emblemHeight })
  .toBuffer();

const emblemTransparent = await (await whiteToTransparent(emblem))
  .trim({ threshold: 1 })
  .toBuffer();

const fullTransparent = await (await whiteToTransparent(source))
  .trim({ threshold: 1 })
  .toBuffer();

// Square mark used in the header, footer and as a favicon base.
await sharp(emblemTransparent)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/logo-mark.png");

// Full lockup including the wordmark.
await sharp(fullTransparent)
  .resize({ width: 1024, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile("public/logo-full.png");

// Favicons. Next.js picks these up automatically from src/app.
await mkdir(path.join(process.cwd(), "src", "app"), { recursive: true });

await sharp(emblemTransparent)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("src/app/icon.png");

// Apple touch icons are composited on black if left transparent, so give it
// a white plate with a little breathing room.
await sharp(emblemTransparent)
  .resize(160, 160, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .extend({
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .flatten({ background: "#ffffff" })
  .png({ compressionLevel: 9 })
  .toFile("src/app/apple-icon.png");

// Open Graph card shown when the site is shared on social media.
const ogLogo = await sharp(fullTransparent)
  .resize(640, 460, { fit: "inside" })
  .toBuffer();

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    { input: ogLogo, gravity: "centre" },
    {
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
           <rect x="0" y="0" width="1200" height="14" fill="#005424"/>
           <rect x="0" y="616" width="1200" height="14" fill="#6ca824"/>
         </svg>`,
      ),
      top: 0,
      left: 0,
    },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile("public/images/og.jpg");

console.log("wrote public/logo-mark.png");
console.log("wrote public/logo-full.png");
console.log("wrote src/app/icon.png");
console.log("wrote src/app/apple-icon.png");
console.log("wrote public/images/og.jpg");
