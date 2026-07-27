/**
 * One-off helper: reports the dominant colours in the logo and their oklch
 * equivalents so they can be pasted into the theme tokens in globals.css.
 * Usage: node scripts/analyze-logo.mjs <path-to-logo>
 */
import sharp from "sharp";

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function rgbToOklch(r, g, b) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;

  return { L, C, H };
}

const file = process.argv[2];
if (!file) throw new Error("Pass a path to the logo image.");

const { data, info } = await sharp(file)
  .resize(200, 200, { fit: "inside" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const buckets = new Map();

for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // Skip near-white and near-grey pixels; we only want the brand greens.
  if (max > 240 && max - min < 20) continue;
  if (max - min < 25) continue;

  const key = `${Math.round(r / 12) * 12},${Math.round(g / 12) * 12},${Math.round(b / 12) * 12}`;
  buckets.set(key, (buckets.get(key) ?? 0) + 1);
}

const total = [...buckets.values()].reduce((a, b) => a + b, 0);

const entries = [...buckets.entries()].map(([key, count]) => {
  const [r, g, b] = key.split(",").map(Number);
  const { L, C, H } = rgbToOklch(r, g, b);
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  return {
    hex,
    L,
    share: `${((count / total) * 100).toFixed(1)}%`,
    oklch: `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`,
    count,
  };
});

const bands = [
  ["deep (L < 0.45)", (e) => e.L < 0.45],
  ["mid (0.45 – 0.65)", (e) => e.L >= 0.45 && e.L < 0.65],
  ["bright (L >= 0.65)", (e) => e.L >= 0.65],
];

for (const [name, predicate] of bands) {
  const rows = entries
    .filter(predicate)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(({ hex, share, oklch }) => ({ hex, share, oklch }));

  console.log(`\n${name}`);
  console.table(rows);
}
