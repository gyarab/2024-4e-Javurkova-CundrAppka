import useFetchAds from '../hooks/useFetchAds'

interface Ad {
    title: string
}

function AdsPage() {
    
    const { ads, loading } = useFetchAds()

    if (loading) {
        return <p>Načítání...</p>
    }

    return (
        <div>
            <h1>Tady budu inzeraty:</h1>
            {ads.length > 0 ? (
                ads.map((ad: Ad, index) => (
                    <h4 key={ index }>{ ad.title }</h4>
                ))
            ) : (
                <p>Nejsou zveřejněny žádné inzeráty</p>
            )}
            <a href='/'>Domu</a>
        </div>
    )
}

export default AdsPage
