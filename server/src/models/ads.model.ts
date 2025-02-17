import mongoose, { Schema, Document } from 'mongoose'

interface IAd extends Document {
  title: string
  description: string
  contactInfo: {
    name?: string
    email?: string
    phone?: string
  }
  destination?: string
  date?: string
  preferences?: {
    gender?: string
    minAge?: number
    maxAge?: number
    languages?: string
    interests?: string
    smokingPreference?: string
  }
  /*user: mongoose.Schema.Types.ObjectId*/
}

const adSchema = new Schema<IAd>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String },
    },
    destination: { type: String },
    date: { type: String },
    preferences: {
      gender: { type: String },
      minAge: { type: Number },
      maxAge: { type: Number },
      languages: { type: String },
      interests: { type: String },
      smokingPreference: { type: String },
    }
    /*user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add the reference to User*/
  },
  { timestamps: true }
)

const Ad = mongoose.model<IAd>('Ad', adSchema)

export default Ad
