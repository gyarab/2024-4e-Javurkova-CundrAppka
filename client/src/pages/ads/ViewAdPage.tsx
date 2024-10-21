import { useParams } from 'react-router'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'

function ViewAdPage() {
    const { id } = useParams()
    const { ad, loading } = useFetchSingleAd(id!)

    if (loading) {
        return <p>Načítání...</p>
    }
    
    if (!ad) {
        return <>
            <p>Inzerát nenalezen.</p>
            <p><a href="/inzeraty">Zpatky</a></p>
        </>
    }
      
  return (
    <div>
      <h1>{ad.title}</h1>
      <p><a href="/inzeraty">Zpatky</a></p>
    </div>
  )
}

export default ViewAdPage
