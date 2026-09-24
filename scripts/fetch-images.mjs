/**
 * Downloads placeholder food photography (Unsplash licence) and stores
 * optimised WebP masters in /public/images. next/image then serves
 * AVIF/WebP at responsive sizes from these masters.
 *
 * Replace entries in src/data/image-sources.json (or drop your own
 * photos into /public/images with the same file names) when real
 * Kibandaski photography is ready.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const MAX_WIDTH = 1600;
const sources = JSON.parse(await readFile(new URL("../src/data/image-sources.json", import.meta.url), "utf8"));
await mkdir(new URL("../public/images/", import.meta.url), { recursive: true });

await Promise.all(
  sources.map(async ({ file, src }) => {
    const res = await fetch(`https://images.unsplash.com/${src}?w=${MAX_WIDTH}&q=85&fm=jpg`);
    if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
    const out = await sharp(Buffer.from(await res.arrayBuffer()))
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer();
    await writeFile(new URL(`../public/images/${file}.webp`, import.meta.url), out);
    console.log(`✓ ${file}.webp (${Math.round(out.length / 1024)} KB)`);
  }),
);
