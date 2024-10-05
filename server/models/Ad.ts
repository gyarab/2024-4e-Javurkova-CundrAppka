import mongoose from 'mongoose'

const { Schema, model } = mongoose

const adSchema = new Schema({
  title: String
})

const Ad = model('Ad', adSchema);
export default Ad