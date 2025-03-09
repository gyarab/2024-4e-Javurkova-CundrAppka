import { Request, Response, RequestHandler, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import Post from '../models/forum-post.model'
import User from '../models/users.model'

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


export const getPosts: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
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
    res.status(500).json({ success: false, message: 'Při načítání prispevku nastala chyba' })
})

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract data from the request body
        const { city, title, text } = req.body
        const authenticatedUserId = req.session.userId
        const user = await User.findById(authenticatedUserId).select('+email').exec()
    
        // Validate the required fields
        if (!city || !text ) {
          res.status(400).json({ message: 'city a text jsou potreba vyplnit' })
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
        res.status(500).json({ message: 'Error creating post' })
        next(err) // Pass the error to the error handling middleware
      }
}