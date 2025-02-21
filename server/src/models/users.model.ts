import mongoose, { Schema, Document } from 'mongoose'

// Define the User interface
export interface IUser extends Document {
  username: string
  first_name: string
  middle_name: string
  last_name: string
  birthday: Date,
  age?: number
  email: string
  password: string
  ads: string[]
  saved_ads: string[]
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  middle_name: { type: String },
  last_name: { type: String, required: true },
  birthday: { type: Date },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ads: [{ type: String, ref: 'Ad' }],
  saved_ads: [{ type: String, ref: 'Saved_Ad' }]
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
