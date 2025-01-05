export interface Ad {
    id: string
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
      ageRange?: [number, number]
      languages?: string[]
      interests?: string[]
      smokingPreference?: "Kuřák" | "Nekuřák"
    }
    flexibility?: {
      gender: boolean
      ageRange: boolean
      languages: boolean
    }
  }