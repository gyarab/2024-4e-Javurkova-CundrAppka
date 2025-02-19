import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import { useNavigate } from 'react-router-dom'
import useDeleteAd from 'hooks/ads/useDeleteAd'
import DeleteConfirmComp from 'components/ads/DeleteConfirmComp'
import useFetchUser from 'hooks/users/useFetchUser';
import User from 'models/user';

function ViewAdPage() {
    const { id } = useParams()
    const { ad, loading } = useFetchSingleAd(id!)
    const navigate = useNavigate()
    const { deleteAd, loading: deleting } = useDeleteAd()
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const { fetchUser } = useFetchUser()
    
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
    
    const userEmail = user ? user.email : '?'

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

  return (
    <div>
      <h1>{ad.title}</h1>
      <p>uzivatel: {ad.full_name}</p>
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
      {ad.email == userEmail && <div>
        <p><a className='btn btn-primary' href={`/inzeraty/upravit/${ad._id}`}>Upravit</a></p>
        <p><button className="btn btn-danger" onClick={() => setShowConfirmModal(true)}>Smazat</button></p></div>
      }
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
