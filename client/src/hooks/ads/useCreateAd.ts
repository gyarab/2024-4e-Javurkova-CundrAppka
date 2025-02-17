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
          console.log(JSON.stringify(newAd))
          const data = await response.json()
          return data.success
    
      } catch{
          alert('Při vytváření inzerátu nastala chyba')
          return
      }
  }

  return { createAd }
}

export default useCreateAd
