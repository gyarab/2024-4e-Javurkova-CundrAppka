import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateAd from 'hooks/ads/useCreateAd'
import { Ad } from 'models/ad';
import LoadingCircle from 'components/LoadingCircle';
import 'styles/Ads.css';

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
    return <LoadingCircle />;
  }

  const languageLabels: { [key: string]: string } = {
    czech: "Čeština",
    english: "Angličtina",
    german: "Němčina",
    spanish: "Španělština",
    russian: "Ruština",
    italian: "Italština",
    french: "Francouzština"
  };

  return (
    <div className="create-ad-container">
      <h1 className="create-ad-title">Vytvoř si svůj inzerát</h1>
      <form className="create-ad-form" onSubmit={handleSubmit}>
        <input
          name="title"
          className="create-ad-input"
          onChange={(e) => setAdData({ ...adData, title: e.target.value })}
          placeholder="Název"
          required
        />
        <textarea
          name="description"
          className="create-ad-textarea"
          onChange={(e) => setAdData({ ...adData, description: e.target.value })}
          placeholder="Popis"
          required
        />
        <input
          name="phone"
          className="create-ad-input"
          onChange={(e) => setAdData({ ...adData, phone: e.target.value })}
          placeholder="Telefon"
        />
        <input
          name="destination"
          className="create-ad-input"
          onChange={(e) => setAdData({ ...adData, destination: e.target.value })}
          placeholder="Destinace"
        />
        <input
          type="month"
          name="date"
          className="create-ad-input"
          onChange={(e) => setAdData({ ...adData, date: e.target.value })}
        />

         {/* Checkboxes for languages */}
         <div className="create-ad-languages">
          <p><strong>Jakými jazyky mluvíš?</strong></p>
          {['czech', 'spanish', 'english', 'russian', 'italian', 'german', 'french'].map((lang) => (
            <label key={lang}>
              <input
                type="checkbox"
                value={lang}
                onChange={handleLanguageChange}
              />
              {languageLabels[lang]}
            </label>
          ))}
        </div>

        <p><strong>Preferované vlastnosti kamaráda na cestování:</strong></p>
        {/* Gender Dropdown */}
        <select
          name="preferences.gender"
          className="create-ad-select"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, gender: e.target.value } })}
        >
          <option value="">Pohlaví</option>
          <option value="female">Žena</option>
          <option value="male">Muž</option>
        </select>

        <input
          name="preferences.minAge"
          className="create-ad-input"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, minAge: e.target.value } })}
          placeholder="Minimální věk"
        />
        <input
          name="preferences.maxAge"
          className="create-ad-input"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, maxAge: e.target.value } })}
          placeholder="Maximální věk"
        />

        {/* Smoking Preference Dropdown */}
        <select
          name="preferences.smokingPreference"
          className="create-ad-select"
          onChange={(e) => setAdData({ ...adData, preferences: { ...adData.preferences, smokingPreference: e.target.value } })}
        >
          <option value="">Kuřáctví</option>
          <option value="smoker">Kuřák</option>
          <option value="nonsmoker">Nekuřák</option>
        </select>

        <button type="submit" className="create-ad-submit">Zveřejnit inzerát</button>
      </form>
      <a href="/inzeraty" className="back-link">Zpátky</a>
    </div>
  );
}

export default CreateAdPage;
