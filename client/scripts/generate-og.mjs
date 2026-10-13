// Renders scripts/og-image.svg, with the logo placed top left, to public/og-image.png
// (WhatsApp does not accept SVG previews).
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const dir = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(dir, '../public/og-image.png')

const logo = await sharp(path.join(dir, '../public/logo.png')).resize({ width: 140 }).toBuffer()
await sharp(path.join(dir, 'og-image.svg'))
  .composite([{ input: logo, left: 80, top: 72 }])
  .png()
  .toFile(out)
console.log(`Wrote ${out}`)
