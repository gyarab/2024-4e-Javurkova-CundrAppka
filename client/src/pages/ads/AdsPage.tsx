import useFetchAds from 'hooks/ads/useFetchAds';
import 'styles/Ads.css';
import LoadingCircle from 'components/LoadingCircle';
import { useState } from 'react';
import { useAuth } from 'context/AuthContext';

function AdsPage() {
    const { user, loading: loading1 } = useAuth();
    const [sortOrder, setSortOrder] = useState('newest');
    const { ads, loading } = useFetchAds();

    ads.sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const [filters, setFilters] = useState({
        destination: '',
        date: '',
        userAge: '',
        gender: '',
        languages: [] as string[],
        smokingPreference: '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'languages') {
            setFilters(prevFilters => {
                const selectedLanguages = prevFilters.languages.includes(value)
                    ? prevFilters.languages.filter(lang => lang !== value)
                    : [...prevFilters.languages, value];
                return { ...prevFilters, languages: selectedLanguages };
            });
        } else {
            setFilters({ ...filters, [name]: value });
        }
    };

    const filteredAds = ads.filter(ad => {
        const adMinAge = ad.preferences?.minAge ? Number(ad.preferences.minAge) : null;
        const adMaxAge = ad.preferences?.maxAge ? Number(ad.preferences.maxAge) : null;
        const userAge = filters.userAge ? Number(filters.userAge) : null;
        return (
            (!userAge ||
              (adMinAge === null && adMaxAge === null) ||
              (adMinAge !== null && adMaxAge === null && userAge >= adMinAge) ||
              (adMinAge === null && adMaxAge !== null && userAge <= adMaxAge) ||
              (adMinAge !== null && adMaxAge !== null && userAge >= adMinAge && userAge <= adMaxAge)
            ) &&
            (filters.destination ? (ad.destination && ad.destination.toLowerCase().includes(filters.destination.toLowerCase())) : true) &&
            (filters.date ? (ad.date && ad.date === filters.date) : true) &&
            (filters.gender ? (!ad.preferences?.gender || ad.preferences.gender === filters.gender) : true) &&
            (filters.languages.length > 0 ? (ad.preferences?.languages?.some((lang: string) => filters.languages.includes(lang))) : true) &&
            (filters.smokingPreference ? (!ad.preferences?.smokingPreference || ad.preferences.smokingPreference === filters.smokingPreference) : true)
        );
    });

    if (loading || loading1) {
        return <LoadingCircle/>
    }

    const languageLabels: { [key: string]: string } = {
        czech: "Česky",
        english: "Anglicky",
        german: "Německy",
        spanish: "Španělsky",
        russian: "Rusky",
        italian: "Italsky",
        french: "Francouzsky"
    };

    return (
        <>
            <header className="ads-header">
                {user ? (
                    <p className="header-text">Vytvořte si svůj inzerát <a href="/inzeraty/zverejnit">ZDE</a></p>
                ) : (
                    <p className="header-text">Pro vytvoření inzerátu se přihlaste <a href="/prihlaseni">ZDE</a></p>
                )}
            </header>

            {/* Filters */}
            <div className="filters">
                <div className="filter-row">
                    <input
                        type="text"
                        name="destination"
                        placeholder="Destinace"
                        onChange={handleFilterChange}
                    />
                    <p>Predpokladane datum</p>
                    <input
                        type="month"
                        name="date"
                        onChange={handleFilterChange}
                    />
                </div>

                <p><strong>Vase informace:</strong></p>
                <div className="filter-row">
                    <div className="language-filter">
                        <p>Mluvim:</p>
                        {['czech', 'spanish', 'english', 'russian', 'italian', 'german', 'french'].map((lang) => (
                            <label key={lang}>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value={lang}
                                    onChange={handleFilterChange}
                                />
                                {languageLabels[lang]}
                            </label>
                        ))}
                    </div>
                </div>

                <div className='filter-row'>
                    <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                        <option value="">Pohlaví</option>
                        <option value="female">Žena</option>
                        <option value="male">Muž</option>
                    </select>
                    <select name="smokingPreference" value={filters.smokingPreference} onChange={handleFilterChange}>
                        <option value="">Kuractvi</option>
                        <option value="smoker">Kuřák</option>
                        <option value="nonsmoker">Nekuřák</option>
                    </select>
                    <input
                        type="number"
                        name="userAge"
                        placeholder="Muj věk"
                        value={filters.userAge}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="mr-2">Seřadit podle:</label>
                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                    className="sort-select"
                >
                    <option value="newest">Nejnovější</option>
                    <option value="oldest">Nejstarší</option>
                </select>
            </div>

            {filteredAds.length != 0 && filteredAds.length < 5 ? (
                <>
                    {filteredAds.length == 1 ? (
                        <p className="ads-count">Zobrazen 1 inzerat</p>
                    ) : (
                        <p className="ads-count">Zobrazeny {filteredAds.length} inzeraty</p>
                    )}
                </>
                ) : (
                    (filteredAds.length != 0 && <p className="ads-count">Zobrazeno {filteredAds.length} inzeratu</p>)
            )}

            <div className="ads-container">
                {filteredAds.length > 0 ? (
                    filteredAds.map((ad, index) => (
                        <div key={index} className="vintage-paper-box">
                            <h2>{ad.title}</h2>
                            <p className="ad-description">{ad.description}</p>
                            <div className="ad-footer">
                                <a href={`/inzeraty/${ad._id}`} className="btn btn-dark">
                                    Zobrazit
                                </a>
                                <p className="ad-updated">
                                    Poslední úprava: {new Date(ad.updatedAt).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No ads available.</p>
                )}
            </div>
        </>
    );
}

export default AdsPage;
