import mongoose from 'mongoose'

const { Schema, model } = mongoose

const adSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: false },
      phone: { type: String, required: false },
    },
    destination: { type: String, required: false },
    date: { type: String, required: false },
    preferences: {
      gender: { type: String, required: false },
      minAge: { type: Number, required: false },
      maxAge: { type: Number, required: false },
      languages: { type: [String], required: false },
      smokingPreference: { type: String, required: false },
    },
    flexibility: {
      gender: { type: Boolean, required: false },
      ageRange: { type: Boolean, required: false },
      languages: { type: Boolean, required: false },
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

const Ad = model('Ad', adSchema)
export default Ad