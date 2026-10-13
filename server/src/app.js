import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { config } from './config.js'
import enquiries from './routes/enquiries.js'

export function createApp() {
  const app = express()

  // Hosting platforms sit behind one proxy; needed for correct client IPs in rate limiting
  app.set('trust proxy', 1)
  app.use(helmet())
  app.use(express.json({ limit: '10kb' }))

  app.get('/api/health', (req, res) => {
    res.json({ ok: true, db: mongoose.connection.readyState === 1 })
  })
  app.use('/api/enquiries', enquiries)
  app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }))

  // In production the same server also serves the built React app
  const indexHtml = path.join(config.clientDist, 'index.html')
  if (fs.existsSync(indexHtml)) {
    app.use(express.static(config.clientDist, { index: false, maxAge: '1h' }))
    app.use((req, res, next) => {
      if (req.method !== 'GET') return next()
      res.sendFile(indexHtml)
    })
  }

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') {
      return res.status(400).json({ error: 'Invalid request body' })
    }
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  })

  return app
}
