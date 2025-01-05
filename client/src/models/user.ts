import { Ad } from "./ad"

export default interface User {
    username: string
    first_name: string
    middle_name?: string
    last_name: string
    birthday: {
      day: number
      month: number
      year: number
    }
    email: string
    password: string
    ads?: string[]
  }