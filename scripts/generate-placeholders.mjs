/**
 * Generates placeholder imagery so the site renders complete before the
 * foundation supplies real photography. Run with `npm run placeholders`.
 *
 * The output is deliberately abstract rather than a flat colour block with a
 * label stamped across it, so layout and contrast can be judged realistically.
 * Delete this script and the files it writes once real photos are in place.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/* Greens sampled from the foundation logo, plus warm earth tones so the set
   does not read as a single flat hue. */
const SCHEMES = [
  { base: "#0b4a1c", mid: "#1d7a2f", light: "#7bb436", warm: "#c9a227" },
  { base: "#08381a", mid: "#166b28", light: "#6ca824", warm: "#b8862f" },
  { base: "#123f22", mid: "#2b8340", light: "#8cc04a", warm: "#d0b04a" },
  { base: "#0a4224", mid: "#1a7038", light: "#74ad3a", warm: "#a8762a" },
  { base: "#0e3d18", mid: "#237430", light: "#95c051", warm: "#c69a35" },
];

function scenery(width, height, scheme, seed) {
  const { base, mid, light, warm } = scheme;
  // Deterministic pseudo-random so repeat runs produce identical files.
  const rand = (n) => {
    const x = Math.sin(seed * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };

  const blobs = Array.from({ length: 5 }, (_, i) => {
    const cx = rand(i * 3 + 1) * width;
    const cy = rand(i * 3 + 2) * height;
    const r = (0.2 + rand(i * 3 + 3) * 0.3) * Math.max(width, height);
    const fill = [mid, light, warm, base][i % 4];
    const opacity = (0.16 + rand(i + 40) * 0.22).toFixed(2);
    return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${fill}" opacity="${opacity}"/>`;
  }).join("");

  const horizon = (0.58 + rand(99) * 0.16) * height;

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="55%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${base}"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${base}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${base}" stop-opacity="0.85"/>
    </linearGradient>
    <radialGradient id="light" cx="72%" cy="18%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="45%" r="72%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.42"/>
    </radialGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  ${blobs}
  <rect y="${horizon.toFixed(0)}" width="${width}" height="${(height - horizon).toFixed(0)}" fill="url(#ground)"/>
  <rect width="${width}" height="${height}" fill="url(#light)"/>
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>
</svg>`);
}

/** Film-like grain keeps the gradients from banding on large surfaces. */
async function grain(width, height) {
  const pixels = Buffer.alloc(width * height * 4);
  let seed = 7;
  for (let i = 0; i < pixels.length; i += 4) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const v = 118 + (seed % 40);
    pixels[i] = pixels[i + 1] = pixels[i + 2] = v;
    pixels[i + 3] = 16;
  }
  return sharp(pixels, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

const escapeXml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );

/** Small, unobtrusive label so placeholders remain identifiable. */
function label(width, height, text) {
  const pad = Math.round(width * 0.03);
  const fontSize = Math.max(13, Math.round(width * 0.022));
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <text x="${pad}" y="${height - pad}" font-family="Helvetica, Arial, sans-serif"
        font-size="${fontSize}" font-weight="500" fill="#ffffff" opacity="0.5"
        letter-spacing="1.5">${escapeXml(text.toUpperCase())}</text>
</svg>`);
}

const IMAGES = [
  { file: "hero.jpg", w: 1400, h: 1750, label: "Hero placeholder" },
  { file: "about.jpg", w: 1400, h: 1050, label: "Our story" },
  {
    file: "projects/students-education.jpg",
    w: 1400,
    h: 1050,
    label: "Students education",
  },
  {
    file: "projects/free-education-tutorship.jpg",
    w: 1400,
    h: 1050,
    label: "Free education & tutorship",
  },
  {
    file: "projects/ramzan-ration-pack.jpg",
    w: 1400,
    h: 1050,
    label: "Ramzan ration pack",
  },
  {
    file: "projects/widows-support.jpg",
    w: 1400,
    h: 1050,
    label: "Widows support",
  },
  {
    file: "projects/health-support.jpg",
    w: 1400,
    h: 1050,
    label: "Health support",
  },
  { file: "gallery/01.jpg", w: 1400, h: 1050, label: "School supplies drive" },
  { file: "gallery/02.jpg", w: 1050, h: 1400, label: "Free medical camp" },
  { file: "gallery/03.jpg", w: 1400, h: 1050, label: "Ration distribution" },
  { file: "gallery/04.jpg", w: 1400, h: 1050, label: "Skills workshop" },
  { file: "gallery/05.jpg", w: 1050, h: 1400, label: "Winter drive" },
  { file: "gallery/06.jpg", w: 1400, h: 1050, label: "Clean water project" },
  { file: "gallery/07.jpg", w: 1400, h: 1050, label: "Scholarship ceremony" },
  { file: "gallery/08.jpg", w: 1050, h: 1400, label: "Volunteer team" },
  { file: "news/scholarships.jpg", w: 1600, h: 1000, label: "Scholarships" },
  { file: "news/medical-camp.jpg", w: 1600, h: 1000, label: "Medical camp" },
  { file: "news/flood-relief.jpg", w: 1600, h: 1000, label: "Relief drive" },
];

const root = path.join(process.cwd(), "public", "images");

for (const [index, { file, w, h, label: text }] of IMAGES.entries()) {
  const target = path.join(root, file);
  await mkdir(path.dirname(target), { recursive: true });

  const scheme = SCHEMES[index % SCHEMES.length];

  const buffer = await sharp(scenery(w, h, scheme, index + 1))
    .blur(Math.max(1.5, Math.min(w, h) * 0.004))
    .composite([
      { input: await grain(w, h), blend: "overlay" },
      { input: label(w, h, text), blend: "over" },
    ])
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  await writeFile(target, buffer);
  console.log(`generated public/images/${file}`);
}

console.log(`\n${IMAGES.length} placeholder images written.`);
