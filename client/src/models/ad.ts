export interface Ad {
    _id: string
    title: string
    description: string
    phone?: string
    destination?: string
    date?: string
    preferences?: {
      gender?: "Muž" | "Žena"
      minAge?: string
      maxAge?: string
      languages?: string
      interests?: string
      smokingPreference?: "Kuřák" | "Nekuřák"
    }
    createdAt: string
    updatedAt: string
    user: string
    full_name: string
    email: string
    [key: string]: any;  // This allows any other property with any type
  }