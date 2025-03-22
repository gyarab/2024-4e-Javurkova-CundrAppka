import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import useUpdateAd from 'hooks/ads/useUpdateAd'
import { Ad } from 'models/ad'
import LoadingCircle from 'components/LoadingCircle'

function UpdateAdPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ad, loading: loadingAd } = useFetchSingleAd(id!)
  const { updateAd, loading: updating } = useUpdateAd()

  const [formData, setFormData] = useState<Ad>({} as Ad)

  useEffect(() => {
    if (ad) {
      const newFormData: any = {}

      // Filter out non-editable fields like _id, createdAt, updatedAt
      Object.entries(ad).forEach(([key, value]) => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'user_age' && value !== undefined) {
          newFormData[key] = value
        }
      })

      setFormData(newFormData)
    }
  }, [ad])


  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        languages: e.target.checked
          ? [...(formData.preferences?.languages || []), value]
          : formData.preferences?.languages?.filter((lang: string) => lang !== value),
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
      const success = await updateAd(id, formData)
      if (success) {
        navigate(`/inzeraty/${id}`)
      } else {
        alert('Nastal problém při uprave inzerátu')
      }
    }
  }

  if (loadingAd || updating) return <LoadingCircle />

  const languageLabels: { [key: string]: string } = {
    czech: "Cestina",
    english: "Anglictina",
    german: "Nemcina",
    spanish: "Spanelstina",
    russian: "Rustina",
    italian: "Italstina",
    french: "Francouzstina"
  }

  return (
    <div>
      <h1>Upravit inzerát</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Název"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Popis"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Telefon"
        />
        <input
          name="destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="Destinace"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        {/* Gender Dropdown */}
        <select
          name="preferences.gender"
          value={formData.preferences?.gender}
          onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, gender: e.target.value } })}
        >
          <option value="">Pohlaví</option>
          <option value="female">Žena</option>
          <option value="male">Muž</option>
        </select>

        <input
          name="preferences.minAge"
          value={formData.preferences?.minAge}
          onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, minAge: e.target.value } })}
          placeholder="Minimální věk"
        />
        <input
          name="preferences.maxAge"
          value={formData.preferences?.maxAge}
          onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, maxAge: e.target.value } })}
          placeholder="Maximální věk"
        />

        {/* Checkboxes for languages */}
        <div>
          <p>Jakými jazyky mluvíte?</p>
          {['czech', 'spanish', 'english', 'russian', 'italian', 'german', 'french'].map((lang) => (
            <label key={lang}>
              <input
                type="checkbox"
                value={lang}
                checked={formData.preferences?.languages?.includes(lang)}
                onChange={handleLanguageChange}
              />
              {languageLabels[lang]}
            </label>
          ))}
        </div>

        {/* Smoking Preference Dropdown */}
        <select
          name="preferences.smokingPreference"
          value={formData.preferences?.smokingPreference}
          onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, smokingPreference: e.target.value } })}
        >
          <option value="">Kouření</option>
          <option value="smoker">Kuřák</option>
          <option value="nonsmoker">Nekuřák</option>
        </select>

        <button type="submit">Uložit změny</button>
      </form>
      <a href="/inzeraty">Zpátky</a>
    </div>
  )
}

export default UpdateAdPage
