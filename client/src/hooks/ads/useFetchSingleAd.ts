import { useEffect, useState } from 'react'
import {Ad} from 'models/ad'

const useFetchSingleAd = (id: string) => {
    const [ad, setAd] = useState<Ad | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        fetch(`/api/ads/${id}`, { method: 'GET' })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Nastal problém při načítání inzerátu.')
                }
                return res.json()
            })
            .then((data: { success: boolean, data: Ad }) => {
                if (data.success) {
                    setAd(data.data)
                } else {
                    throw new Error('Nastal problém při načítání inzerátu.')
                }
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setAd(null)
              })
        }, [id])
    
    return { ad, loading }
}

export default useFetchSingleAd