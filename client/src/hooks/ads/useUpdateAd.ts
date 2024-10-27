import { useState } from 'react'

const useUpdateAd = () => {

  const [loading, setLoading] = useState(false)

  async function updateAd(id: string, updatedData: any) {
    setLoading(true)

    try {

      const response = await fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })

      const data = await response.json()

      return data.success
    } catch (err) {
      alert('Při vytváření inzerátu nastala chyba')
      return
    }
  }

  return { updateAd, loading }
}

export default useUpdateAd;
