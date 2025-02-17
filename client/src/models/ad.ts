export interface Ad {
    _id: string
    title: string
    description: string
    contactInfo: {
      name: string
      email?: string
      phone?: string
    }
    destination?: string
    date?: string
    preferences?: {
      gender?: "Muž" | "Žena"
      minAge?: number
      maxAge?: number
      languages?: string
      interests?: string
      smokingPreference?: "Kuřák" | "Nekuřák"
    }
    createdAt: string
    updatedAt: string
    [key: string]: any;  // This allows any other property with any type
  }