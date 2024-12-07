import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'
import User from '../models/users.model'

interface DecodedToken {
    id: string
}

export const protect = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    let token: string = 'x'
    const header: string = req.headers.authorization as string
    if(header && header.startsWith('Bearer')){
       try {
        token = header.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken
        const user = await User.findOne({ _id: decoded.id }).select('-password')

        if (!user) {
            res.status(401).json({ success: false, message: 'Uzivatel neexistuje' });
            
        }

        req.user = user

        next()
       } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: 'Pristup zamitnut' })
       }
    }

    if(token === 'x'){
        res.status(401).json({ success: false, message: 'Nebyl prilozen zadny token' })
    }
})