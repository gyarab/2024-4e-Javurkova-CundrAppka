// import modules
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import adRoutes from '../routes/ads.route'

// app
const app = express()

// middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
app.use('/api/ads', adRoutes)

// port
const PORT = process.env.PORT || 8000

// db and listener
mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('DB connected')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}).catch(err => console.log('DB connection error', err))