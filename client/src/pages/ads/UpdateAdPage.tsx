import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import useUpdateAd from 'hooks/ads/useUpdateAd'

function UpdateAdPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ad, loading: loadingAd } = useFetchSingleAd(id!)
  const { updateAd, loading: updating } = useUpdateAd()
  
  const [formData, setFormData] = useState({
    title: ''
  })

  useEffect(() => {
    if (ad) {
      setFormData({ title: ad.title })
    }
  }, [ad])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
        const success = await updateAd(id, formData);
      if (success) {
        navigate(`/inzeraty/${id}`)
      } else {
        alert('Nastal problém při uprave inzerátu')
      }
    }
  }

  if (loadingAd || updating) return <p>Načítání...</p>

  return (
    <div>
      <h1>Upravit Inzerát</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Název:
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Uložit změny</button>
      </form>
      <p><a href={`/inzeraty/${id}`}>Zpátky</a></p>
    </div>
  )
}

export default UpdateAdPage
