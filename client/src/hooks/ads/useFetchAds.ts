import { useEffect, useState } from 'react'

interface Ad {
    title: string
}

const useFetchAds = () => {

    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/ads', { method: 'GET' })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Nastal problém při načítání inzerátů.')
                }
                return res.json()
            })
            .then((data: { success: boolean, data: Ad[] }) => {
                if (data.success) {
                    setAds(data.data)
                } else {
                    throw new Error('Nastal problém při načítání inzerátů.')
                }
                setLoading(false)
            })
    }, [])

    return { ads, loading }
}

export default useFetchAds