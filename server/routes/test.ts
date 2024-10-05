import express from 'express'
const router = express.Router()

// import controllers
import getTest from '../controllers/test.js'

// import middlewares

// api routes
router.get('/test', getTest)

export default router
