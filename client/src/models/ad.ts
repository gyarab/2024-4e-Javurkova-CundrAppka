export interface Ad {
    title: string
    description: string
    contactInfo: {
      email?: string
      phone?: string
    }
    destination?: string
    date?: string
    preferences?: {
      gender?: "Muž" | "Žena"
      minAge?: number
      maxAge?: number
      languages?: string[]
      smokingPreference?: "Kuřák" | "Nekuřák"
    }
    flexibility?: {
      gender?: boolean
      ageRange?: boolean
      languages?: boolean
    }
    createdAt: string
    updatedAt: string
  }