export default interface User {
    _id?: string
    username: string
    first_name: string
    middle_name?: string
    last_name: string
    birthday: Date,
    age?: number,
    email: string
    password: string
    ads?: string[]
    saved_ads?: string[]
  }