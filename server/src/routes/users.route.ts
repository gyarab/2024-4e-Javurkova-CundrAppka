import express from 'express'
const router = express.Router()

// import controllers
import { getUser, registerUser, loginUser, logoutUser } from '../controllers/users.controller'

// import middlewares
import { protect } from '../middleware/authMiddleware'

// api routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/me', protect, getUser)

export default router
