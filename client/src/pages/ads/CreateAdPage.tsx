import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateAd from 'hooks/ads/useCreateAd'

function CreateAdPage() {
    const [title, setTitle] = useState('')
    const { createAd } = useCreateAd()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim()) {
            alert('Vyplnte nazev inzeratu')
            return
        }

        setLoading(true)
        const success = await createAd({ title })

        if (success) {
            navigate('/inzeraty')
        } else {
            alert('Nastal problém při vytváření inzerátu')
        }
    }

    if (loading) {
        return <p>Inzerat se vytvari...</p>
    }

  return (
    <div>
      <h1>Vytvor si svuj inzerat!!</h1>
      <form onSubmit={handleSubmit}>
        <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

        <button type="submit">Vytvorit inzerat</button>
      </form>
      <a href="/inzeraty">Zpatky</a>
    </div>
  )
}

export default CreateAdPage
