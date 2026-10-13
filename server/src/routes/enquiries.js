import { timingSafeEqual } from 'node:crypto'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import { config } from '../config.js'
import { Enquiry } from '../models/Enquiry.js'

const router = Router()

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

function requireDb(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database unavailable' })
  }
  next()
}

function requireAdmin(req, res, next) {
  const given = Buffer.from(String(req.get('x-admin-token') ?? ''))
  const expected = Buffer.from(config.adminToken)
  if (!config.adminToken || given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

router.post('/', submitLimiter, requireDb, async (req, res, next) => {
  const { name, business, phone, message, channel } = req.body ?? {}
  try {
    const enquiry = await Enquiry.create({ name, business, phone, message, channel })
    res.status(201).json({ id: enquiry.id })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    next(err)
  }
})

router.get('/', requireAdmin, requireDb, async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(200).lean()
  res.json(enquiries)
})

export default router
