import { Ad } from "./ad"

export default interface User {
    username: string
    first_name: string
    middle_name?: string
    last_name: string
    birthday: Date,
    age?: number,
    email: string
    password: string
    ads?: string[]
    liked_ads?: string[]
  }