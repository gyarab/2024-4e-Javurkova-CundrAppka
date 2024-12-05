import mongoose from 'mongoose'
import User from '../models/users.model'

export const registerUser = async (req, res) => {
    const data = req.body

    if (!data.name || !data.password) {
		return res.status(400).json({ success: false, message: 'Vyplňte všechny pole' })
	}
    const newUser = new User(data)

    try {
        await newUser.save()
        res.status(201).json({ success: true, data: newUser })
    } catch (error) {
        console.log('Nastal error: ', error.message)
        res.status(500).json({ success: false, message: 'Při vytváření účtu nastala chyba' })
    }
}

