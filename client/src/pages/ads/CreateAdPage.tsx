import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateAd from 'hooks/ads/useCreateAd'
import { Ad } from 'models/ad';

type AdFormData = Partial<Omit<Ad, '_id' | 'createdAt' | 'updatedAt'>>;
function CreateAdPage() {
  const [adData, setAdData] = useState<AdFormData>({
    title: '',
    description: '',
    contactInfo: { name: '', email: '', phone: '' },
    destination: '',
    date: '',
    preferences: {
      gender: '',
      minAge: '',
      maxAge: '',
      languages: '',
      interests: '',
      smokingPreference: ''
    }
  });
    const { createAd } = useCreateAd()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!adData.title.trim()) {
        alert('Vyplnte nazev inzeratu');
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
  

    if (loading) {
        return <p>Inzerat se vytvari...</p>
    }

  return (
    <div>
      <h1>Vytvor si svuj inzerat!!</h1>
      <form onSubmit={handleSubmit}>
      <input
          name="title"
          value={adData.title || ''}
          onChange={(e) => setAdData({ ...adData, title: e.target.value })}
          placeholder="Název"
          required
        />
        <textarea
          name="description"
          value={adData.description}
          onChange={(e) => setAdData({ ...adData, description: e.target.value })}
          placeholder="Popis"
          required
        />
        <input
          name="contactInfo.name"
          value={adData.contactInfo.name}
          onChange={(e) => setAdData({ ...adData, contactInfo: { ...adData.contactInfo, name: e.target.value } })}
          placeholder="Cele jmeno"
        />
        <input
          name="contactInfo.email"
          type="email"
          value={adData.contactInfo.email}
          onChange={(e) => setAdData({ ...adData, contactInfo: { ...adData.contactInfo, email: e.target.value } })}
          placeholder="Email"
        />
        <input
          name="contactInfo.phone"
          value={adData.contactInfo.phone}
          onChange={(e) => setAdData({ ...adData, contactInfo: { ...adData.contactInfo, phone: e.target.value } })}
          placeholder="Telefon"
        />
        <input
          name="destination"
          value={adData.destination}
          onChange={(e) => setAdData({ ...adData, destination: e.target.value })}
          placeholder="Destinace"
        />
        <input
          type="date"
          name="date"
          value={adData.date}
          onChange={(e) => setAdData({ ...adData, date: e.target.value })}
        />
        <input
          name="preferences.gender"
          value={adData.preferences.gender}
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, gender: e.target.value } })}
          placeholder="Pohlavi"
        />
        <input
          name="preferences.minAge"
          value={adData.preferences.minAge}
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, minAge: e.target.value } })}
          placeholder="Minimalni vek"
        />
        <input
          name="preferences.maxAge"
          value={adData.preferences.maxAge}
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, maxAge: e.target.value } })}
          placeholder="Maximalni vek"
        />
        <input
          name="preferences.languages"
          value={adData.preferences.languages}
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, languages: e.target.value } })}
          placeholder="Jazyky"
        />
        <input
          name="preferences.interests"
          value={adData.preferences.interests}
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, interests: e.target.value } })}
          placeholder="Zajmy"
        />
        <input
          name="preferences.smokingPreference"
          value={adData.preferences.smokingPreference}
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
