import mongoose from 'mongoose'
import { createApp } from './app.js'
import { config } from './config.js'

if (config.mongoUri) {
  mongoose
    .connect(config.mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err.message))
} else {
  console.warn('MONGODB_URI is not set: enquiries will not be saved')
}

createApp().listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})
