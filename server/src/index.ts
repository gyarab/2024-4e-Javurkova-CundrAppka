// import modules
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import adRoutes from '../routes/ads.route'
import userRoutes from '../routes/users.route'

// app
const app = express()

// middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
app.use('/api/ads', adRoutes)
app.use('/api/users', userRoutes)

// port
const PORT: number = parseInt(process.env.PORT || '8000', 10)

// db and listener
const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) {
  console.error('URI databáze není definováno v .env')
  process.exit(1)
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Databáze připojena')
    app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`))
  })
  .catch((err) => {
    console.error('Nastala chyba při připojování k databázi: ', err.message)
})
