export interface Ad {
    _id: string
    title: string
    description: string
    phone?: string
    destination?: string
    date?: string
    preferences?: {
      gender?: string
      minAge?: string
      maxAge?: string
      languages?: string[]
      smokingPreference?: string
    }
    createdAt: string
    updatedAt: string
    user: string
    full_name: string
    email: string
    user_age: number
    [key: string]: any  // This allows any other property with any type
  }