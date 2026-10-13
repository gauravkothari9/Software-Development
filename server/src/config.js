import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

try {
  process.loadEnvFile(path.join(root, '.env'))
} catch {
  // No .env file: rely on real environment variables (as on a hosting platform)
}

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  adminToken: process.env.ADMIN_TOKEN || '',
  clientDist: path.resolve(root, '../client/dist'),
}
