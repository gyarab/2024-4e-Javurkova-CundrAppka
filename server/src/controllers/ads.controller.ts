// TODO: osetrit errory.. treba middlewarem

import mongoose, { ObjectId } from 'mongoose'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import Ad from '../models/ads.model'
import User from '../models/users.model'

export const getAds: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
    const ads = await Ad.find({})
    if(ads){
        res.status(200).json({ success: true, data: ads })
        return
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Při načítání inzerátů nastala chyba' })
  }
})

export const getAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Při načítání inzerátu nastala chyba' })
  }
})

export const createAd = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract data from the request body
        const { title, description, phone, destination, date, preferences } = req.body
        const authenticatedUserId = req.session.userId
        const user = await User.findById(authenticatedUserId).select('+email').exec()

        // Validate the required fields
        if (!title || !description ) {
          res.status(400).json({ success: false, message: 'Title, description, and contact name are required' })
          return
        }
    
        // Create a new ad instance with the provided data
        const newAd = new Ad({
          title,
          description,
          phone,
          destination,
          date,
          preferences,
          full_name: `${user?.first_name} ${user?.last_name}`,
          email: user?.email,
          user: authenticatedUserId,
          user_age: user?.age
        })
    
        // Save the ad to the database
        const savedAd = await newAd.save()
        await User.findByIdAndUpdate(
            user?._id, 
            { $push: { ads: newAd._id as string } }, 
            { new: true } // Return the updated document
        );
    
        // Return the saved ad as a response
        if(savedAd){
            res.status(201).json({success: true, data: savedAd})
        }
      } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: 'Error creating ad' })
      }
}

export const updateAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Při úpravě inzerátu nastala chyba' })
  }
})

export const deleteAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
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
  } catch(error) {
    res.status(500).json({ success: false, message: 'Inzerát se nepodařilo smazat' })
  }
})


export const saveAd: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, adId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Ensure we're using the same type for adId and saved_ads
    const adObjectId = new mongoose.Types.ObjectId(adId); // Use mongoose.Types.ObjectId to ensure consistency

    // Compare saved_ads as string representations of ObjectIds
    const isAlreadySaved = user.saved_ads.some(savedAdId => savedAdId.toString() === adObjectId.toString()); // Use toString() to compare ObjectId values

    if (isAlreadySaved) {
      user.saved_ads = user.saved_ads.filter(savedAdId => savedAdId.toString() !== adObjectId.toString()); // Compare as strings
    } else {
      // Add the ad to saved_ads (save)
      user.saved_ads.push(adObjectId as unknown as ObjectId); 
    }

    // Save the updated user document
    await user.save();

    // Return the updated saved_ads array to the frontend
    res.json({ success: true, saved_ads: user.saved_ads });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
});




