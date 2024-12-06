import { UserDocument } from '../../../models/users.model'
import {Request} from 'express'
import { Express } from "express-serve-static-core"
import 'express'

declare global {
  declare module 'express-serve-static-core' {
    interface Request {
      user?: UserDocument
    }
  }
}
