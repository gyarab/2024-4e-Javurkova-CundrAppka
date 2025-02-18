import LoadingCircle from 'components/LoadingCircle';
import useFetchAds from 'hooks/ads/useFetchAds';
import useFetchUser from 'hooks/users/useFetchUser'
import User from 'models/user';
import { useEffect, useState } from 'react';

function MyAds() {
  const { ads, loading } = useFetchAds();
  const { fetchUser } = useFetchUser()
  const [user, setUser] = useState<User | null>(null)

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

  const userEmail = user ? user.email : ''
  const myAds = ads.filter(ad =>
    ad.email.toLowerCase().includes(userEmail.toLowerCase())
  );

  if (loading) {
    return <LoadingCircle/>
  }

  return (
    <>
      <h1>Moje inzeraty</h1>
      <div className="ads-container">
        {myAds.length > 0 ? (
          myAds.map((ad, index) => (
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