import express from 'express'
const router = express.Router()

// import controllers
import { getCityPosts, createPost, getAllPosts, deletePost } from '../controllers/forum.controller'

// import middlewares

// api routes
router.post('/', createPost)
router.delete('/:id', deletePost)
router.get('/posts', getAllPosts)
router.get('/posts/:city', getCityPosts)

export default router
