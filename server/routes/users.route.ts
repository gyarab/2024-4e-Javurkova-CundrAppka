import express from 'express'
const router = express.Router()

// import controllers
import { registerUser } from '../controllers/users.controller'

// import middlewares

// api routes
router.post('/', registerUser)

export default router
