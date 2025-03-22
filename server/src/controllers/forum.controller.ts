import { Request, Response, RequestHandler, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import Post from '../models/forum-post.model'
import User from '../models/users.model'
import mongoose from 'mongoose'

const cities: string[] = [
    'Praha', 
    'Brno', 
    'Ostrava', 
    'Plzen',
    'Liberec',
    'Olomouc',
    'Ceske-Budejovice',
    'Hradec-Kralove',
    'Zlin',
    'Pardubice'
]


export const getCityPosts: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { city } = req.params
      if (!cities.includes(city)) {
          res.status(404).json({ success: false, message: 'K tomuto mestu neni forum' })
          return
      }
  
      const posts = await Post.find({city: city})
      if(posts){
        res.status(200).json({ success: true, data: posts })
        return
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Při načítání prispevku nastala chyba' })
    }
})

export const getAllPosts: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({})
    if(posts){
        res.status(200).json({ success: true, data: posts })
        return
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Při načítání prispevku nastala chyba' })
  }
})

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract data from the request body
        const { city, title, text } = req.body
        const authenticatedUserId = req.session.userId
        const user = await User.findById(authenticatedUserId).select('+email').exec()
    
        // Validate the required fields
        if (!city || !text ) {
          res.status(400).json({ success: false, message: 'city a text jsou potreba vyplnit' })
          return
        }
    
        // Create a new ad instance with the provided data
        const newPost = new Post({
          city,
          title,
          text,
          full_name: `${user?.first_name} ${user?.last_name}`,
          user: authenticatedUserId
        })
    
        // Save the ad to the database
        const savedPost = await newPost.save()
        await User.findByIdAndUpdate(
            user?._id, 
            { $push: { posts: newPost._id as string } }, 
            { new: true } // Return the updated document
        );
    
        // Return the saved ad as a response
        if(savedPost){
            res.status(201).json({success: true, data: savedPost})
        }
      } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: 'Error creating post' })
      }
}

export const deletePost: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ success: false, message: 'Prispevek se zadaným ID neexistuje' })
      return
    }
  
      const deletedPost = await Post.findByIdAndDelete(id)
  
      if(deletedPost){
          res.status(200).json({ success: true, message: 'Prispevek úspěšně smazán' })
          return
      }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Prispevek se nepodařilo smazat' })
  }
})