import express from 'express'
const router = express.Router()

// import controllers
import { getUser, registerUser, loginUser, logoutUser } from '../controllers/users.controller'

// api routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/me', getUser)

export default router
