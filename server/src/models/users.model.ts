import mongoose, { Document, ObjectId } from 'mongoose'

const { Schema, model } = mongoose

export interface UserDocument extends Document {
  _id: ObjectId
  username: string
  password: string
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = model('User', userSchema)
export default User