import express from 'express'
const router = express.Router()

// import controllers
import { getPosts } from '../controllers/forum.controller'

// import middlewares

// api routes
router.get('/:city', getPosts)

export default router
