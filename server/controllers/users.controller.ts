import mongoose from 'mongoose'
import User from '../models/users.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    res.json({message: 'Muj profil'})
}

export const registerUser = async (req, res) => {
    res.json({message: 'Registrace'})
}

export const loginUser = async (req, res) => {
    res.json({message: 'Prihlaseni'})
}

export const logoutUser = async (req, res) => {
    res.json({message: 'Odhlaseni'})   
}
