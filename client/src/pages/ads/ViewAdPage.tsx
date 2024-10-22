import { useParams } from 'react-router'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import { useNavigate } from 'react-router-dom'
import useDeleteAd from 'hooks/ads/useDeleteAd'

function ViewAdPage() {
    const { id } = useParams()
    const { ad, loading } = useFetchSingleAd(id!)
    const navigate = useNavigate()
    const { deleteAd, loading: deleting } = useDeleteAd()

    if (loading || deleting) {
        return <p>Načítání...</p>
    }
    
    if (!ad) {
        return <>
            <p>Inzerát nenalezen.</p>
            <p><a href="/inzeraty">Zpatky</a></p>
        </>
    }

    async function handleDelete(){
      const response = await deleteAd(ad!._id)
      if (response!.success) {
          navigate('/inzeraty')
      } else {
          alert('Nastal problém při mazání inzerátu')
      }
    }
      
  return (
    <div>
      <h1>{ad.title}</h1>
      <p><button onClick={handleDelete}>Smazat</button></p>
      <p><a href="/inzeraty">Zpatky</a></p>
    </div>
  )
}

export default ViewAdPage
