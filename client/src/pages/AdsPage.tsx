import React, { useEffect, useState } from 'react'

interface Ad {
    title: string
}

function AdsPage() {
    
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/ads', { method: "GET" })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Nastal problém při načítání inzerátů.');
                }
                return res.json()
            })
            .then((data: { success: boolean; data: Ad[] }) => {
                if (data.success) {
                    setAds(data.data)
                } else {
                    throw new Error('Nastal problém při načítání inzerátů.');
                }
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>Načítání...</div>
    }

    return (
        <div>
        <h1>Tady budu inzeraty:</h1>
        {ads.map((ad: Ad) => (
            <h4>{ad.title}</h4>
        ))}
        <a href="/">Domu</a>
        </div>
    )
}

export default AdsPage
