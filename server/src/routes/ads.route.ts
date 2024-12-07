import express from 'express'
const router = express.Router()

// import controllers
import { getAds, createAd, getAd, updateAd, deleteAd } from '../controllers/ads.controller'

// import middlewares

// api routes
router.get('/', getAds)
router.post('/', createAd)
router.get('/:id', getAd)
router.put('/:id', updateAd)
router.delete('/:id', deleteAd)

export default router
