// import modules
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './config/db'
import adRoutes from './routes/ads.route'
import userRoutes from './routes/users.route'

// connecting db
connectDB()

// app
const app = express()

// middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
app.use('/api/ads', adRoutes)
app.use('/api/users', userRoutes)
// page not found
app.use((req, res, next) => {
  res.status(400).json({ message: 'Endpoint neexistuje' })
});

// listening on port
const PORT: number = parseInt(process.env.PORT || '8000', 10)
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`))

export default app
