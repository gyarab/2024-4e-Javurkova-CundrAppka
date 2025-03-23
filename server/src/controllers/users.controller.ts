// TODO: osetrit errory.. treba middlewarem
import User, { IUser } from '../models/users.model'

import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'

const calculateAge = (birthDateString: string): number => {
    const birthDate = new Date(birthDateString);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// @route POST /api/users/register
export const registerUser: RequestHandler<unknown, unknown, IUser, unknown> = async (req, res, next) => {    
    try {
        const { username, first_name, middle_name, last_name, birthday, email  } = req.body
        const rawPassword = req.body.password

        const usernameExists = await User.findOne({username: username}).exec()
        const emailExists = await User.findOne({email: email}).exec()
        if(usernameExists){
            res.status(409).json({ success: false, message: "Uzivatel s timto username jiz existuje"})
            return
        }
        if(emailExists){
            res.status(409).json({ success: false, message: "Uzivatel s timto emailem jiz existuje"})
            return
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
            age: calculateAge((birthday as unknown) as string)
        })

        res.status(200).json({
            success: true, 
            newUser: newUser
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Registrace se nepodarila"})
    }
}

interface LoginBody {
    userInfo: string,
    password: string
}

// @route POST /api/users/login
export const loginUser: RequestHandler<unknown, unknown, LoginBody, unknown> = asyncHandler(async (req, res) => {
    try {
        const { userInfo, password } = req.body

        const user1 = await User.findOne({username: userInfo}).select('+email +password').exec()
        const user2 = await User.findOne({email: userInfo}).select('+username +password').exec()
        const user = user1 || user2
        if(!user){
            res.status(401).json({ success: false, message: "Tento uzivatel neexistuje"})
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            res.status(401).json({ success: false, message: "Nespravne heslo"})
            return
        }
        req.session.userId = user!.id
        res.status(200).json({user, success: true, message: "Prihlaseni probehlo uspesne"})
    } catch (error) {
        res.status(500).json({ success: false, message: "Prihlaseni se nepodarilo"})
    }
})

// @route POST /api/users/logout
export const logoutUser: RequestHandler = async (req, res, next) => {
    req.session.destroy(error => {
        if(error){
            res.status(500).json({ success: false, message: "Odhlaseni se nepodarilo"})
        }
        else{
            res.status(200).json({ success: true, message: "Byli jste odhlaseni"})
        }
    })
}

// @route GET /api/users
export const getUser: RequestHandler = async (req, res) => {
    try {
        const authenticatedUserId = req.session.userId

        if(!authenticatedUserId){
            res.status(200).json({success: false})
            return
        }
        const user = await User.findById(authenticatedUserId).select('+email').exec()
        res.status(200).json({user, success: true, message: `Jste prihlasen jako ${user!.username}`})
    } catch (error) {
        res.status(500).json({success: false})
    }
}
