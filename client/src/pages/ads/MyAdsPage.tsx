import LoadingCircle from 'components/LoadingCircle'
import { useAuth } from 'context/AuthContext'
import useFetchAds from 'hooks/ads/useFetchAds'
import { useState } from 'react'
import 'styles/Ads.css'

function MyAds() {
  const { ads, loading: loading1 } = useFetchAds()
  const [searchQuery, setSearchQuery] = useState('')
  const { user, loading } = useAuth() // Access user data from AuthContext
  const [sortOrder, setSortOrder] = useState('newest')

  const myAdsIds = user?.ads || []
  const myAds = ads.filter(ad => myAdsIds.includes(ad._id))

  myAds.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  if (loading || loading1) {
    return <LoadingCircle/>
  }

  const filteredAds = myAds?.filter(ad =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchQuery.toLowerCase())||
    ad.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <h1>Tvoje inzeráty</h1>
      <p>Dohromady zveřejněno inzeratů: {myAds.length}</p>
      <input
        type="text"
        placeholder="Hledat mezi inzeráty.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      />
      <div className="mb-4">
                <label className="mr-2">Seřadit podle:</label>
                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                    className="p-2 border rounded"
                >
                    <option value="newest">Nejnovější</option>
                    <option value="oldest">Nejstarší</option>
                </select>
        </div>
      <div className="ads-container">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad, index) => (
            <div key={index} className="vintage-paper-box">
              <h2>{ad.title}</h2>
              <p className="ad-description">{ad.description}</p>
              <div className="ad-footer">
                <a href={`/inzeraty/${ad._id}`} className="btn btn-dark">
                  Zobrazit
                </a>
                <p className="ad-updated">Vytvořeno: {new Date(ad.createdAt).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          ))
          ) : (
            <p className='no-ads'>Nezveřejnil jsi žádné inzeráty.</p>
      )}
      </div>
      <p><a href="/muj-ucet" className='back-link' >Zpátky</a></p>
    </>
  )
}

export default MyAds