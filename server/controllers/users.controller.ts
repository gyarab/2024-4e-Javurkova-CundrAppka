import User from '../models/users.model'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
        res.status(200).json({ success: true, message: `Uzivatel s id ${newUser.id} byl uspesne vytvoren` })
        return
    }
    else{
        res.status(500).json({ success: false, message: `Pri registraci nastala chyba` })
        return
    }
})

// @route POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
    res.json({message: 'Prihlaseni'})
})

// @route POST /api/users/logout
export const logoutUser = asyncHandler(async (req, res) => {
    res.json({message: 'Odhlaseni'})   
})

// @route GET /api/users/me
export const getUser = asyncHandler(async (req, res) => {
    res.json({message: 'Muj profil'})
})
