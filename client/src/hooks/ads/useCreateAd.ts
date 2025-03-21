import { Ad } from "models/ad"


const useCreateAd = () => {

  const createAd = async (newAd: Ad) => {

      try {
          const response = await fetch('/api/ads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAd),
          })
          const data = await response.json()
          return { success: data.success }
    
      } catch{
        return { success: false }
      }
  }

  return { createAd }
}

export default useCreateAd
