// TODO: osetrit errory.. treba middlewarem
import User, { IUser } from '../models/users.model'

import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'

// @route POST /api/users/register
export const registerUser: RequestHandler<unknown, unknown, IUser, unknown> = async (req, res, next) => {
    const { username, first_name, middle_name, last_name, birthday, email, ads  } = req.body
    const rawPassword = req.body.password
    
    try {
        if(!username || !first_name || !last_name || !birthday || !email || !rawPassword){
            throw createHttpError(400, 'Prosim vyplnte vsechna pole')
        }

        const usernameExists = await User.findOne({username: username}).exec()
        const emailExists = await User.findOne({email: email}).exec()
        if(usernameExists){
            throw createHttpError(409, 'Uzivatel s timto username jiz existuje')
        }
        if(emailExists){
            throw createHttpError(409, 'Uzivatel s timto emailem jiz existuje')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(rawPassword, salt)

        const newUser: IUser = await User.create({
            username: username,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            birthday: birthday,
            email: email,
            password: hashedPassword,
            ads: ads
        })

        // TODO: prubezne toto smazat aby user po registraci nebyl prihlasen
        req.session.userId = newUser.id

        res.status(200).json({
            success: true, 
            newUser: newUser
        })
    } catch (error) {
        next(error)
    }
}

interface LoginBody {
    username: string,
    email: string,
    password: string
}

// @route POST /api/users/login
export const loginUser: RequestHandler<unknown, unknown, LoginBody, unknown> = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body

    try {
        if( ( !username && !email ) || !password){
            throw createHttpError(400, 'Vyplňte všechny pole')
        }

        const user1 = await User.findOne({username: username}).select('+email +password').exec()
        const user2 = await User.findOne({email: email}).select('+email +password').exec()
        if(!user1 && !user2){
            throw createHttpError(401, 'Nespravne zadane udaje')
        }
        var user
        if(!user1) {user = user2}
        else {user = user1}

        const passwordMatch = await bcrypt.compare(password, user!.password)

        if(!passwordMatch){
            throw createHttpError(401, 'Nespravne zadane udaje')
        }
        
        req.session.userId = user!.id
        res.status(200).json({user, success: true, message: "Prihlaseni probehlo uspesne"})
    } catch (error) {
        next(error)
    }
})

// @route POST /api/users/logout
export const logoutUser: RequestHandler = async (req, res, next) => {
    req.session.destroy(error => {
        if(error){
            next(error)
        }
        else{
            res.status(200).json({message: "Byli jste odhlaseni"})
        }
    })
}

// @route GET /api/users
export const getUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId

    try {
        if(!authenticatedUserId){
            throw createHttpError(401, 'Nejste prihlasenyi')
        }
        const user = await User.findById(authenticatedUserId).select('+email').exec()
        res.status(200).json({user, success: true, message: `Jste prihlasen jako ${user!.username}`})
    } catch (error) {
        next(error)
    }
}


// @route GET /api/status
export const getStatus: RequestHandler = async (req, res, next) => {
    const isLoggedIn = !!req.session.userId;
    res.status(200).json({ isLoggedIn });
}