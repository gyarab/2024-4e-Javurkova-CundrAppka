import User from '../models/users.model'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

// @route POST /api/users/register
export const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        res.status(400).json({ success: false, message: 'Vyplňte všechny pole' })
        return
    }

    const foundUser = await User.findOne({username})
    if(foundUser){
        res.status(400).json({ success: false, message: 'Uzivatel s timto username jiz existuje' })
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        username, password: hashedpassword
    })

    if(newUser){
        res.status(200).json({
            success: true, 
            _id: newUser.id, 
            username: newUser.username, 
            token: generateToken(newUser._id) 
        })
        return
    }
    res.status(500).json({ success: false, message: `Pri registraci nastala chyba` })
})

// @route POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        res.status(400).json({ success: false, message: 'Vyplňte všechny pole' })
        return
    }

    const user = await User.findOne({username})

    if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            success: true, 
            _id: user.id, 
            username: user.username, 
            token: generateToken(user._id) 
        })
        return
    }
    res.status(400).json({ success: false, message: 'Nespravne zadane udaje' })
})

// @route POST /api/users/logout
export const logoutUser = asyncHandler(async (req, res) => {
    res.json({message: 'Odhlaseni'})   
})

// @route GET /api/users/me
export const getUser = asyncHandler(async (req: Request, res) => {
    const { _id, username } = await User.findById(req.user._id)

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}