// Builds the site's logo files from a picture of the GK monogram on its navy background:
//   public/logo.png     the gold mark alone on a transparent background
//   public/favicon.png  the mark on a rounded navy square (browser tab, home-screen icon)
// Usage: node scripts/generate-logo.mjs "<path to logo image>"
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const source = process.argv[2]
if (!source) {
  console.error('Usage: node scripts/generate-logo.mjs "<path to logo image>"')
  process.exit(1)
}

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public')
const SAFFRON = [245, 165, 36]
const SCALE = 4

// Enlarge first so the edges stay smooth, then turn "how gold is this pixel" into opacity
const meta = await sharp(source).metadata()
const { data, info } = await sharp(source)
  .removeAlpha()
  .resize({ width: meta.width * SCALE, kernel: 'lanczos3' })
  .raw()
  .toBuffer({ resolveWithObject: true })

const background = data[0] // red channel of the top-left (navy) pixel
const rgba = Buffer.alloc(info.width * info.height * 4)
for (let i = 0; i < info.width * info.height; i++) {
  const red = data[i * 3]
  const alpha = Math.min(1, Math.max(0, (red - background - 12) / (SAFFRON[0] - background - 40)))
  rgba.set([...SAFFRON, Math.round(alpha * 255)], i * 4)
}

const mark = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png()
  .toBuffer()
await sharp(mark).toFile(path.join(publicDir, 'logo.png'))

const size = 192
const tile = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="42" fill="#0E1A2B"/></svg>`,
)
const inner = await sharp(mark).resize({ width: 124, height: 124, fit: 'inside' }).toBuffer()
await sharp(tile).composite([{ input: inner, gravity: 'centre' }]).png().toFile(path.join(publicDir, 'favicon.png'))

const out = await sharp(mark).metadata()
console.log(`Wrote logo.png (${out.width}x${out.height}) and favicon.png (${size}x${size})`)
