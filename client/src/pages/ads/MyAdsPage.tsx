import LoadingCircle from 'components/LoadingCircle';
import { useAuth } from 'context/AuthContext';
import useFetchAds from 'hooks/ads/useFetchAds';
import useFetchUser from 'hooks/users/useFetchUser'
import { Ad } from 'models/ad';
import User from 'models/user';
import { useEffect, useState } from 'react';

function MyAds() {
  const { ads } = useFetchAds();
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading } = useAuth(); // Access user data from AuthContext
  const [sortOrder, setSortOrder] = useState('newest')

  const myAdsIds = user?.ads || [];
  const myAds = ads.filter(ad => myAdsIds.includes(ad._id));

  myAds.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return <LoadingCircle/>
  }

  const filteredAds = myAds?.filter(ad =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchQuery.toLowerCase())||
    ad.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1>Moje inzeraty</h1>

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
              <a href={`/inzeraty/${ad._id}`} className="btn btn-dark">
                Zobrazit
              </a>
              <p className="text-gray-500 text-sm">Vytvořeno: {new Date(ad.createdAt).toLocaleString()}</p>
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

export default MyAds