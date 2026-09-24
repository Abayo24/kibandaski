// Generates apple-icon.png and og.jpg. Run: node scripts/make-brand-assets.cjs
const sharp = require("sharp");
const fs = require("fs");
(async () => {
  const icon = fs.readFileSync("src/app/icon.svg");
  fs.writeFileSync("src/app/apple-icon.png", await sharp(icon, { density: 600 }).resize(180, 180).flatten({ background: "#a63a0c" }).png().toBuffer());

  const photo = await sharp("public/images/mishkaki-chips.webp").resize(500, 500, { fit: "cover" })
    .composite([{ input: Buffer.from('<svg width="500" height="500"><circle cx="250" cy="250" r="250"/></svg>'), blend: "dest-in" }]).png().toBuffer();
  const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <style>.d{font-family:'Arial Black',Arial,sans-serif;font-weight:900}</style>
    <circle cx="950" cy="315" r="275" fill="#a63a0c"/>
    <text x="70" y="120" class="d" font-size="42" fill="#a63a0c">KIBANDASKI</text>
    <text x="70" y="200" class="d" font-size="64" fill="#a63a0c">CHAKULA CHA</text>
    <text x="70" y="275" class="d" font-size="64" fill="#a63a0c">KIBANDASKI,</text>
    <text x="70" y="350" class="d" font-size="64" fill="#2b160c">LADHA YA</text>
    <text x="70" y="425" class="d" font-size="64" fill="#2b160c">KWELI.</text>
    <rect x="70" y="490" width="430" height="74" rx="37" fill="#fbba2b"/>
    <text x="285" y="538" text-anchor="middle" class="d" font-size="28" fill="#2b160c">ORDER ON WHATSAPP</text>
  </svg>`);
  const og = await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#fff7ec" } })
    .composite([{ input: text }, { input: photo, left: 700, top: 65 }]).jpeg({ quality: 82 }).toBuffer();
  fs.writeFileSync("public/og.jpg", og);
  console.log("ok");
})();
