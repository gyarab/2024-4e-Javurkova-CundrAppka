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
  ads: mongoose.Schema.Types.ObjectId[] // Array of ObjectIds referencing Ads
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
  ads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ad' }] // Optional: reference to Ad model
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
