// import modules
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { isHttpError } from 'http-errors'
import session from 'express-session'
import MongoStore from 'connect-mongo'

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
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000 //hodina
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    })
}))

// routes
app.use('/api/ads', adRoutes)
app.use('/api/users', userRoutes)
// page not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: 'Endpoint neexistuje' })
})
// called when 'createHttpError()'
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "Nastal error";
  let statusCode = 500;
  if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
})

// listening on port
const PORT: number = parseInt(process.env.PORT || '8000', 10)
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`))

export default app
