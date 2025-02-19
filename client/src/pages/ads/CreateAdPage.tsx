import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateAd from 'hooks/ads/useCreateAd'
import { Ad } from 'models/ad';

type AdFormData = Partial<Omit<Ad, '_id' | 'createdAt' | 'updatedAt'>>;
function CreateAdPage() {

  const [adData, setAdData] = useState<AdFormData>({
    title: '',
    description: '',
    phone: '',
    destination: '',
    date: '',
    preferences: {
      gender: '',
      minAge: '',
      maxAge: '',
      languages: [] as string[],
      smokingPreference: ''
    }
    });

    const { createAd } = useCreateAd()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!adData.title.trim() || !adData.description.trim()) {
        alert('Vyplnte nazev a popis inzeratu');
        return;
      }
      setLoading(true);
      
      const success = await createAd(adData as Ad);
      setLoading(false);
      
      if (success) {
        navigate('/inzeraty');
      } else {
        alert('Nastal problém při vytváření inzerátu');
      }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setAdData({
        ...adData,
        preferences: {
          ...adData.preferences,
          languages: e.target.checked
            ? [...adData.preferences.languages, value]
            : adData.preferences.languages.filter((lang: string) => lang !== value),
        },
      });
    };
  

    if (loading) {
        return <p>Inzerat se vytvari...</p>
    }

  return (
    <div>
      <h1>Vytvor si svuj inzerat!!</h1>
      <form onSubmit={handleSubmit}>
      <input
          name="title"
          onChange={(e) => setAdData({ ...adData, title: e.target.value })}
          placeholder="Název"
          required
        />
        <textarea
          name="description"
          onChange={(e) => setAdData({ ...adData, description: e.target.value })}
          placeholder="Popis"
          required
        />
        <input
          name="phone"
          onChange={(e) => setAdData({ ...adData, phone: e.target.value })}
          placeholder="Telefon"
        />
        <input
          name="destination"
          onChange={(e) => setAdData({ ...adData, destination: e.target.value })}
          placeholder="Destinace"
        />
        <input
          type="date"
          name="date"
          onChange={(e) => setAdData({ ...adData, date: e.target.value })}
        />
        <input
          name="preferences.gender"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, gender: e.target.value } })}
          placeholder="Pohlavi"
        />
        <input
          name="preferences.minAge"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, minAge: e.target.value } })}
          placeholder="Minimalni vek"
        />
        <input
          name="preferences.maxAge"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, maxAge: e.target.value } })}
          placeholder="Maximalni vek"
        />
      {/* Checkboxes for languages */}
      <div>
          <label>
            <input
              type="checkbox"
              value="spanish"
              onChange={handleLanguageChange}
            />
            Spanelsky
          </label>
          <label>
            <input
              type="checkbox"
              value="english"
              onChange={handleLanguageChange}
            />
            Anglicky
          </label>
          <label>
            <input
              type="checkbox"
              value="russian"
              onChange={handleLanguageChange}
            />
            Rusky
          </label>
          <label>
            <input
              type="checkbox"
              value="italian"
              onChange={handleLanguageChange}
            />
            Italsky
          </label>
          <label>
            <input
              type="checkbox"
              value="german"
              onChange={handleLanguageChange}
            />
            Nemecky
          </label>
          <label>
            <input
              type="checkbox"
              value="french"
              onChange={handleLanguageChange}
            />
            Francouzsky
          </label>
        </div>
        <input
          name="preferences.smokingPreference"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, smokingPreference: e.target.value } })}
          placeholder="Kuractvi"
        />
        <button type="submit">Vytvorit inzerat</button>
      </form>
      <a href="/inzeraty">Zpatky</a>
    </div>
  )
}

export default CreateAdPage
