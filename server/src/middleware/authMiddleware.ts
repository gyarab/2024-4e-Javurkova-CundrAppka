import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'
import User from '../models/users.model'

interface DecodedToken {
    id: string
}

export const protect = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    
})