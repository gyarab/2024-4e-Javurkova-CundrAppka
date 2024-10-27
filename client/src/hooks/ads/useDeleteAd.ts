import { useState } from 'react'

const useDeleteAd = () => {
    const [loading, setLoading] = useState(false)

    const deleteAd = async (id: string) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/ads/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (response.ok) {
                return { success: true }
            } else {
                return { success: false }
            }
        } catch (err) {
            return { success: false }
        } finally {
            setLoading(false)
        }
    }

    return { deleteAd, loading }
}

export default useDeleteAd
