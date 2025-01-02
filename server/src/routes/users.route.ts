import express from 'express'
const router = express.Router()

// import controllers
import { getUser, registerUser, loginUser, logoutUser, getStatus } from '../controllers/users.controller'

// import middlewares

// api routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/status', getStatus)
router.get('/', getUser)

export default router
