import LoadingCircle from 'components/LoadingCircle';
import { useAuth } from 'context/AuthContext';
import useFetchAds from 'hooks/ads/useFetchAds';
import { useState } from 'react';

function SavedAdsPage() {
    const { ads, loading: loading1 } = useFetchAds();
    const { user, loading } = useAuth(); // Access user data from AuthContext
    const savedAdsIds = user?.saved_ads || [];
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest')
    const savedAds = ads.filter(ad => savedAdsIds.includes(ad._id));
    savedAds.sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });

    if (loading || loading1) {
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
            <div className="ads-container">
                {filteredAds.length > 0 ? (
                filteredAds.map((ad, index) => (
                    <div key={index} className="vintage-paper-box">
                    <h2>{ad.title}</h2>
                    <p>{ad.description}</p>
                    <p className="text-gray-500 text-sm">Posledni uprava: {new Date(ad.updatedAt).toLocaleString()}</p>
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