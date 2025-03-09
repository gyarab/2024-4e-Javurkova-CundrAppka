import { Request, Response, RequestHandler, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import Post from '../models/forum-post.model'

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