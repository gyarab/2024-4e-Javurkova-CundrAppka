import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

const app = express()


const PORT = 5000
app.listen(PORT, () => {
    console.log('Server is running...')
})