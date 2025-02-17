// TODO: osetrit errory.. treba middlewarem

import mongoose from 'mongoose'
import { Request, Response, RequestHandler, NextFunction } from 'express'
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

export const createAd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract data from the request body
        const { title, description, contactInfo, destination, date, preferences } = req.body
    
        // Validate the required fields
        if (!title || !description || !contactInfo || !contactInfo.name) {
          res.status(400).json({ message: 'Title, description, and contact name are required' })
          return
        }
    
        // Create a new ad instance with the provided data
        const newAd = new Ad({
          title,
          description,
          contactInfo,
          destination,
          date,
          preferences
        })
    
        // Save the ad to the database
        const savedAd = await newAd.save()
    
        // Return the saved ad as a response
        if(savedAd){
            res.status(201).json({success: true, data: savedAd})
        }
      } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error creating ad' })
        next(err) // Pass the error to the error handling middleware
      }
}

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
