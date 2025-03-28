import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import useUpdateAd from 'hooks/ads/useUpdateAd'
import { Ad } from 'models/ad'
import LoadingCircle from 'components/LoadingCircle'
import 'styles/Ads.css';

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
        alert('Nastal problém při úprave inzerátu')
      }
    }
  }

  if (loadingAd || updating) return <LoadingCircle />

  const languageLabels: { [key: string]: string } = {
    czech: "Čeština",
    english: "Angličtina",
    german: "Němčina",
    spanish: "Španělština",
    russian: "Ruština",
    italian: "Italština",
    french: "Francouzština"
  }

  return (
    <div className="create-ad-container">
      <h1 className="create-ad-title">Upravit inzerát</h1>
      <form onSubmit={handleSubmit} className="create-ad-form">
        <input
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Název"
          required
          className="create-ad-input"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Popis"
          required
          className="create-ad-textarea"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Telefon"
          className="create-ad-input"
        />
        <input
          name="destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="Destinace"
          className="create-ad-input"
        />
        <input
          type="month"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="create-ad-input"
        />

         {/* Checkboxes for languages */}
         <div className="create-ad-languages">
          <p>Jakými jazyky mluvíš?</p>
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

        {/* Gender Dropdown */}
        <select
          name="preferences.gender"
          value={formData.preferences?.gender}
          onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, gender: e.target.value } })}
          className="create-ad-select"
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
          className="create-ad-input"
        />
        <input
          name="preferences.maxAge"
          value={formData.preferences?.maxAge}
          onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, maxAge: e.target.value } })}
          placeholder="Maximální věk"
          className="create-ad-input"
        />

        {/* Smoking Preference Dropdown */}
        <select
          name="preferences.smokingPreference"
          value={formData.preferences?.smokingPreference}
          onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, smokingPreference: e.target.value } })}
          className="create-ad-select"
        >
          <option value="">Kuřáctví</option>
          <option value="smoker">Kuřák</option>
          <option value="nonsmoker">Nekuřák</option>
        </select>

        <button type="submit" className="create-ad-submit">Uložit změny</button>
      </form>
      <a href="/inzeraty" className="back-link">Zpátky</a>
    </div>
  )
}

export default UpdateAdPage
