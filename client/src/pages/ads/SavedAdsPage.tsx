import LoadingCircle from 'components/LoadingCircle';
import { useAuth } from 'context/AuthContext';
import useFetchAds from 'hooks/ads/useFetchAds';
import { useState } from 'react';

function SavedAdsPage() {
    const { ads } = useFetchAds();
    const { user, loading } = useAuth(); // Access user data from AuthContext
    const savedAdsIds = user?.saved_ads || [];
    const savedAds = ads.filter(ad => savedAdsIds.includes(ad._id));
    const [searchQuery, setSearchQuery] = useState('');

    if (loading) {
        return <LoadingCircle/>
    }
    
    const filteredAds = savedAds?.filter(ad =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase())||
        ad.destination?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <h1>Ulozene inzeraty</h1>

            <input
                type="text"
                placeholder="Hledat inzerat.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded mb-4 w-full"
            />
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
            <p><a href="/muj-ucet">zpet</a></p>
    </>
    )
}

export default SavedAdsPage