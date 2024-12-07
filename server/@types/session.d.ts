import mongoose from 'mongoose'

// v package 'express-session' pridavam paramtry do typu promenne 'SessionData'
declare module 'express-session' {
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}