import express from 'express'
const router = express.Router()

// import controllers
import { getPosts, createPost } from '../controllers/forum.controller'

// import middlewares

// api routes
router.post('/', createPost)
router.get('/:city', getPosts)

export default router
