import LoadingCircle from 'components/LoadingCircle';
import useFetchAds from 'hooks/ads/useFetchAds';
import useFetchUser from 'hooks/users/useFetchUser'
import { Ad } from 'models/ad';
import User from 'models/user';
import { useEffect, useState } from 'react';

function MyAds() {
  const { ads, loading } = useFetchAds();
  const { fetchUser } = useFetchUser()
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
          const getUser = async () => {
              const fetch = await fetchUser();
              if (fetch.success) {
                  setUser(fetch.user);
              } else {
                  alert('Nastal problém při zobrazování účtu');
              }
          };
          getUser();
      }, []);

  const myAdsIds = user?.ads || [];
  const myAds = ads.filter(ad => myAdsIds.includes(ad._id));


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

export default MyAds