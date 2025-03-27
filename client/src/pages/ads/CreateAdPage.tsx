import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateAd from 'hooks/ads/useCreateAd'
import { Ad } from 'models/ad';
import LoadingCircle from 'components/LoadingCircle';

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
        return <LoadingCircle/>
    }

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
      <h1>Vytvoř si svůj inzerát!!</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" onChange={(e) => setAdData({ ...adData, title: e.target.value })} placeholder="Název" required />
        <textarea name="description" onChange={(e) => setAdData({ ...adData, description: e.target.value })} placeholder="Popis" required />
        <input name="phone" onChange={(e) => setAdData({ ...adData, phone: e.target.value })} placeholder="Telefon" />
        <input name="destination" onChange={(e) => setAdData({ ...adData, destination: e.target.value })} placeholder="Destinace" />
        <input type="month" name="date" onChange={(e) => setAdData({ ...adData, date: e.target.value })} />

        {/* Gender Dropdown */}
        <select name="preferences.gender" onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, gender: e.target.value } })}>
          <option value="">Pohlaví</option>
          <option value="female">Žena</option>
          <option value="male">Muž</option>
        </select>

        <input name="preferences.minAge" onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, minAge: e.target.value } })} placeholder="Minimální věk" />
        <input name="preferences.maxAge" onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, maxAge: e.target.value } })} placeholder="Maximální věk" />

        {/* Checkboxes for languages */}
        <div>
          <p>Jakými jazyky mluvíte?</p>
          {['czech', 'spanish', 'english', 'russian', 'italian', 'german', 'french'].map((lang) => (
            <label key={lang}>
              <input type="checkbox" value={lang} onChange={handleLanguageChange} />
              {languageLabels[lang]}
            </label>
          ))}
        </div>

        {/* Smoking Preference Dropdown */}
        <select name="preferences.smokingPreference" onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, smokingPreference: e.target.value } })}>
          <option value="">Kouření</option>
          <option value="smoker">Kuřák</option>
          <option value="nonsmoker">Nekuřák</option>
        </select>

        <button type="submit">Vytvořit inzerát</button>
      </form>
      <a href="/inzeraty">Zpátky</a>
    </div>
  )
}

export default CreateAdPage
