// TODO: osetrit errory.. treba middlewarem
import User from '../models/users.model'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'

interface RegisterBody {
    username?: string,
    email?: string,
    password?: string
}


// @route POST /api/users/register
export const registerUser: RequestHandler<unknown, unknown, RegisterBody, unknown> = async (req, res, next) => {
    const { username, email } = req.body
    const rawPassword = req.body.password
    
    try {
        if(!username || !email || !rawPassword){
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

        const newUser = await User.create({
            username: username,
            email: email, 
            password: hashedPassword
        })

        req.session.userId = newUser._id



        res.status(200).json({
            success: true, 
            newUser: newUser
        })
    } catch (error) {
        next(error)
    }
}

interface LoginBody {
    username?: string,
    password?: string
}

// @route POST /api/users/login
export const loginUser: RequestHandler<unknown, unknown, LoginBody, unknown> = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body

    try {
        if(!username || !password){
            throw createHttpError(400, 'Vyplňte všechny pole')
        }

        const user = await User.findOne({username: username}).select('+email +password').exec()
        if(!user){
            throw createHttpError(401, 'Nespravne zadane udaje')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            throw createHttpError(401, 'Nespravne zadane udaje')
        }
        
        req.session.userId = user._id
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
    console.log(`tady jsou ${authenticatedUserId}`)

    try {
        if(!authenticatedUserId){
            throw createHttpError(401, 'Nejste prihlasenyi')
        }
        const user = await User.findById(authenticatedUserId).select('+email').exec()
        res.status(200).json({user, message: `Jste prihlasen jako ${user!.username}`})
    } catch (error) {
        next(error)
    }
}
