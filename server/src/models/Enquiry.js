import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    business: { type: String, trim: true, maxlength: 150, default: '' },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[+\d][\d\s-]{6,19}$/, 'Phone number looks invalid'],
    },
    message: { type: String, trim: true, maxlength: 2000, default: '' },
    channel: { type: String, enum: ['whatsapp', 'email'], default: 'whatsapp' },
  },
  { timestamps: true },
)

export const Enquiry = mongoose.model('Enquiry', enquirySchema)
