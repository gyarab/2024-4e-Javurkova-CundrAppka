import mongoose, { Schema, Document } from 'mongoose'

interface IAd extends Document {
  title: string
  description: string
  phone?: number
  destination?: string
  date?: string
  preferences?: {
    gender?: string
    minAge?: string
    maxAge?: string
    languages?: string[]
    smokingPreference?: string
  }
  full_name: string
  email: string
  user_age: number
  user: mongoose.Schema.Types.ObjectId
}

const adSchema = new Schema<IAd>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: Number },
    destination: { type: String },
    date: { type: String },
    preferences: {
      gender: { type: String },
      minAge: { type: String },
      maxAge: { type: String },
      languages: [String],
      smokingPreference: { type: String },
    },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    user_age: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add the reference to User*/
  },
  { timestamps: true }
)

const Ad = mongoose.model<IAd>('Ad', adSchema)

export default Ad
