import useFetchAds from 'hooks/ads/useFetchAds';
import '../../styles/Ads.css'; // Make sure to import the CSS
import VintageCard from 'assets/images/vintage-card.png'
import LoadingCircle from 'components/LoadingCircle';
import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react';
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'
import { useNavigate } from 'react-router-dom'

function AdsPage() {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { ads, loading } = useFetchAds();
    const [searchQuery, setSearchQuery] = useState('');
      
    const handleLogout = async () => {
        try {
          const response = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include',
          })
          if (response.ok) {
            setIsLoggedIn(false)
            window.location.reload();
          } else {
            alert('Logout failed. Please try again.')
          }
        } catch (error) {
          console.error('Error logging out:', error)
          alert('Error logging out. Please try again.')
        }
    }

    useEffect(() => {
        const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/users/status', {
            method: 'GET',
            credentials: 'include',
            });
            const data = await response.json();
            setIsLoggedIn(data.isLoggedIn);
        } catch (error) {
            console.error('Error fetching auth status:', error);
        }
        };
        checkAuthStatus();
    }, []);

    var filteredAds = ads.filter(ad =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase())||
        ad.destination?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    filteredAds = ads.filter(ad => {
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

    return (
        <>
            {loading ? (
                <LoadingCircle/>
            ) : (
                <>
                    <LogoutConfirmComp
                        message="Are you sure you want to log out?"
                        show={showLogoutModal}
                        onClose={() => setShowLogoutModal(false)}
                        onConfirm={() => {
                            setShowLogoutModal(false);
                            handleLogout(); // Perform logout after confirmation
                        }}
                    />

                    {isLoggedIn ? (
                        <>
                        <p>Zverejnit inzerat <a href="/inzeraty/zverejnit">ZDE</a></p>
                        </>
                    ) : (
                        <>
                         <p>Pro zverejneni inzeratu se prihlaste <a href="/prihlaseni">ZDE</a></p>
                        </>
                    )}

                    <input
                        type="text"
                        placeholder="Hledat inzerat.."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border rounded mb-4 w-full"
                    />

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


                    <div className="ads-container">
                        {filteredAds.length > 0 ? (
                            filteredAds.map((ad, index) => (
                                <div key={index} className="vintage-paper-box">
                                    <h2>{ad.title}</h2>
                                    <p>{ad.description}</p>
                                    <a href={`/inzeraty/${ad._id}`} className="btn btn-dark">
                                        Zobrazit
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>No ads available.</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default AdsPage;
