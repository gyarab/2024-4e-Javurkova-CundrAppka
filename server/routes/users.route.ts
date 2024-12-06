import express from 'express'
const router = express.Router()

// import controllers
import { getUser, registerUser, loginUser, logoutUser } from '../controllers/users.controller'

// import middlewares

// api routes
router.get('/:id', getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
