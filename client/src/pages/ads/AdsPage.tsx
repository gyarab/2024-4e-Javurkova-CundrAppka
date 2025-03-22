import useFetchAds from 'hooks/ads/useFetchAds';
import '../../styles/Ads.css';
import LoadingCircle from 'components/LoadingCircle';
import { useState } from 'react';
import { useAuth } from 'context/AuthContext';

function AdsPage() {
    const { user, loading: loading1 } = useAuth()
    const [sortOrder, setSortOrder] = useState('newest')
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

    // Handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        // For multi-select languages, handle checkbox behavior
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
          (!userAge ||  // If user doesn't enter age, show all ads
            (adMinAge === null && adMaxAge === null) ||  // Show ads with no min/max age
            (adMinAge !== null && adMaxAge === null && userAge >= adMinAge) ||  // Show ads where user is older than minAge
            (adMinAge === null && adMaxAge !== null && userAge <= adMaxAge) ||  // Show ads where user is younger than maxAge
            (adMinAge !== null && adMaxAge !== null && userAge >= adMinAge && userAge <= adMaxAge) // Show ads within range
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

    return (
        <>
                    {user ? (
                        <>
                        <p>Zverejnit inzerat <a href="/inzeraty/zverejnit">ZDE</a></p>
                        </>
                    ) : (
                        <>
                         <p>Pro zverejneni inzeratu se prihlaste <a href="/prihlaseni">ZDE</a></p>
                        </>
                    )}

                    {/* Filters */}
                    <div className="filters">
                        <input
                        type="text"
                        name="destination"
                        placeholder="Destinace"
                        onChange={handleFilterChange}
                        />

                        <input
                        type="date"
                        name="date"
                        onChange={handleFilterChange}
                        />

                        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                        <option value="">Pohlavi</option>
                        <option value="Žena">Žena</option>
                        <option value="Nekuřák">Muž</option>
                        </select>

                        {/* Language Filter (Multiple Choice) */}
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value="spanish"
                                    onChange={handleFilterChange}
                                />
                                Spanelsky
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value="english"
                                    onChange={handleFilterChange}
                                />
                                Anglicky
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value="russian"
                                    onChange={handleFilterChange}
                                />
                                Rusky
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value="italian"
                                    onChange={handleFilterChange}
                                />
                                Italsky
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value="german"
                                    onChange={handleFilterChange}
                                />
                                Nemecky
                            </label>
                        </div>

                        <input
                        type="number"
                        name="userAge"
                        placeholder="Muj vek"
                        value={filters.userAge}
                        onChange={handleFilterChange}
                        />


                        <select name="smokingPreference" value={filters.smokingPreference} onChange={handleFilterChange}>
                        <option value="">Kuractvi</option>
                        <option value="Kuřák">Kuřák</option>
                        <option value="Nekuřák">Nekuřák</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="mr-2">Seřadit podle:</label>
                        <select 
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                            className="p-2 border rounded"
                        >
                            <option value="newest">Nejnovější</option>
                            <option value="oldest">Nejstarší</option>
                        </select>
                    </div>

                    {filteredAds.length != 0 && filteredAds.length < 5 ? (
                        <>
                            {filteredAds.length == 1 ? (
                                <p>Zobrazen 1 inzerat</p>
                            ) : (
                                <p>Zobrazeny {filteredAds.length} inzeraty</p>
                            )}
                        </>
                    ) : (
                        (filteredAds.length != 0 && <p>Zobrazeno {filteredAds.length} inzeratu</p>)
                    )}
                    <div className="ads-container">
                        {filteredAds.length > 0 ? (
                            filteredAds.map((ad, index) => (
                                <div key={index} className="vintage-paper-box">
                                    <h2>{ad.title}</h2>
                                    <p>{ad.description}</p>
                                    <a href={`/inzeraty/${ad._id}`} className="btn btn-dark">
                                        Zobrazit
                                    </a>
                                    <p className="text-gray-500 text-sm">Posledni uprava: {new Date(ad.updatedAt).toLocaleString()}</p>
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
