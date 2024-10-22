import useFetchAds from 'hooks/ads/useFetchAds'

interface Ad {
    _id: string
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
                    <p key={ index }><a href={`/inzeraty/${ad._id}`}>{ ad.title }</a></p>
                ))
            ) : (
                <p>Nejsou zveřejněny žádné inzeráty</p>
            )}
            <p><a className="btn btn-primary"href='/inzeraty/zverejnit'>Vytvorit</a></p>
            <p><a href='/'>Domu</a></p>
        </div>
    )
}

export default AdsPage
