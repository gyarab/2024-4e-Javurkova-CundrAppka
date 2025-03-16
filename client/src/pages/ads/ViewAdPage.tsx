import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import { useNavigate } from 'react-router-dom'
import useDeleteAd from 'hooks/ads/useDeleteAd'
import DeleteConfirmComp from 'components/ads/DeleteConfirmComp'
import useFetchUser from 'hooks/users/useFetchUser';
import User from 'models/user';
import useSaveAd from 'hooks/ads/useSaveAd'
import useCheckAuthStatus from 'hooks/users/useCheckAuthStatus';
import { useAuth } from 'context/AuthContext';


function ViewAdPage() {
    const { id } = useParams()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { ad } = useFetchSingleAd(id!)
    const navigate = useNavigate()
    const { deleteAd, loading: deleting } = useDeleteAd()
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    //const [user, setUser] = useState<User | null>(null)
    //const { fetchUser } = useFetchUser()
    const { saveAd } = useSaveAd()
    const [saved, setSaved] = useState(false)
    
    const { user, loading } = useAuth(); // Access user data from AuthContext

    const myAdsIds = user?.ads || [];
    const isMine = myAdsIds.includes(id as string)
    useEffect(() => {
      const mySavedAdsIds = user?.saved_ads || [];
      setSaved(mySavedAdsIds.includes(id as string)); // Update saved state based on whether the ad is in the user's saved ads.
    }, [user, id]); // Add 'user' and 'id' as dependencies to run this effect only when they change.

    if (loading || deleting) {
        return <p>Načítání...</p>
    }
    
    if (!ad) {
        return <>
            <p>Inzerát nenalezen.</p>
            <p><a href="/inzeraty">Zpatky</a></p>
        </>
    }

    async function handleDelete(){
      const response = await deleteAd(ad!._id)
      if (response!.success) {
          navigate('/inzeraty')
      } else {
          alert('Nastal problém při mazání inzerátu')
      }
    }
      
    const preferenceLabels: { [key: string]: string } = {
      gender: "Pohlaví",
      minAge: "Minimálně věk",
      maxAge: "Maximální věk",
      languages: "Mluvené jazyky",
      smokingPreference: "Kuřáctví",
      interests: "Zájmy",
      spanish: "Španělština",
      english: "Angličtina",
      german: "Němčina",
      russina: "Ruština",
      italian: "Italština",
      french: "Francouština"
    };

    const handleSaveClick = async () => {
      const newSavedState = await saveAd(user!._id!, ad!._id);
      setSaved(newSavedState)
    }

  return (
    <div>
      <h1>{ad.title}</h1>
      <p>uzivatel: {ad.full_name} ({ad.user_age} let)</p>
      <p>{ad.description}</p>
      {ad.phone && <p>Destinace: {ad.destination}</p>}
      <h5>Kontaktni udaje:</h5>
        <p>Email: {ad.email} {ad.phone && <div>, Telefonni cislo: {ad.phone}</div>}</p>
        {ad.preferences && Object.entries(ad.preferences).some(([_, value]) => value !== '' && (Array.isArray(value) ? value.length > 0 : true)) && (
          <ul>
            <p>Preference:</p>
            {Object.entries(ad.preferences)
              .filter(([key, value]) => value !== '' && (key !== 'languages' || (Array.isArray(value) && value.length > 0))) // Exclude languages if empty
              .map(([key, value]) => (
                <li key={key}>
                  <strong>{preferenceLabels[key]}: {
                    key === 'languages' 
                      ? (Array.isArray(value) 
                          ? value.map(lang => preferenceLabels[lang] || lang).join(', ') 
                          : value)
                      : value
                  }</strong>
                </li>
              ))
            }
          </ul>
        )}
        <p className="text-gray-500 text-sm">Vytvořeno: {new Date(ad.createdAt).toLocaleString()}</p>
        <p className="text-gray-500 text-sm">Posledni uprava: {new Date(ad.updatedAt).toLocaleString()}</p>
      {user !== null && (
        <div> 
          <button className='btn btn-secondary' onClick={handleSaveClick}>
            {saved ? 'Oddelat z ulozenych' : 'Ulozit si'}
          </button>
          {isMine && (
            <div>
              <p>
                <a className='btn btn-primary' href={`/inzeraty/upravit/${ad._id}`}>
                  Upravit
                </a>
              </p>
              <p>
                <button className="btn btn-danger" onClick={() => setShowConfirmModal(true)}>
                  Smazat
                </button>
              </p>
            </div>
            )}
            </div>
          )}
      
      <p><a href="/inzeraty">Zpatky</a></p>
      <DeleteConfirmComp
        message="Opravdu chcete inzerat smazat?"
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          handleDelete();
        }}
      />
    </div>
  )
}

export default ViewAdPage
