import mongoose from 'mongoose'
import { Request, Response, RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'

import Ad from '../models/ads.model'

export const getAds: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const ads = await Ad.find({})
    if(ads){
        res.status(200).json({ success: true, data: ads })
        return
    }
    res.status(500).json({ success: false, message: 'Při načítání inzerátů nastala chyba' })
})

export const getAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: 'Inzerát se zadaným ID neexistuje' })
        return
	}
 
    const ad = await Ad.findById({_id: id})

    if(ad){
        res.json({ success: true, data: ad })
        return
    }
    res.status(500).json({ success: false, message: 'Při načítání inzerátu nastala chyba' })
})

export const createAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body

    if (!data.title) {
		res.status(400).json({ success: false, message: 'Vyplňte všechny pole' })
        return
	}
    const newAd = await Ad.create({ title: data.title })

    if(newAd){
        res.status(201).json({ success: true, data: newAd })
        return
    }
    res.status(500).json({ success: false, message: 'Při vytváření inzerátu nastala chyba' })
})

export const updateAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const ad = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: 'Inzerát se zadaným ID neexistuje' })
        return
	}

    const updatedAd = await Ad.findByIdAndUpdate(id, ad, { new: true })

    if(updatedAd){
        res.status(200).json({ success: true, data: updatedAd })
        return
    }
    res.status(500).json({ success: false, message: 'Při úpravě inzerátu nastala chyba' })
})

export const deleteAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ message: 'Inzerát se zadaným ID neexistuje' })
        return
	}

    const deletedAd = await Ad.findByIdAndDelete(id)

    if(deletedAd){
        res.status(200).json({ success: true, message: 'Inzerát úspěšně smazán' })
        return
    }
    res.status(500).json({ success: false, message: 'Inzerát se nepodařilo smazat' })
})
