import React, { useState } from 'react';
import { useParams } from 'react-router'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import { useNavigate } from 'react-router-dom'
import useDeleteAd from 'hooks/ads/useDeleteAd'
import DeleteConfirmComp from 'components/ads/DeleteConfirmComp'

function ViewAdPage() {
    const { id } = useParams()
    const { ad, loading } = useFetchSingleAd(id!)
    const navigate = useNavigate()
    const { deleteAd, loading: deleting } = useDeleteAd()
    const [showConfirmModal, setShowConfirmModal] = useState(false)

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
      interests: "Zájmy"
    };

  return (
    <div>
      <h1>{ad.title}</h1>
      <p>uzivatel: {ad.full_name}</p>
      <p>{ad.description}</p>
      <h5>Kontaktni udaje:</h5>
        <p>Email: {ad.email}
        {ad.phone && <div>, Telefonni cislo: {ad.phone}</div>}</p>
      {ad.preferences && 
      <ul>
        <p>Preference:</p>
        {Object.entries(ad.preferences).map(([key, value]) => {
          if (value !== undefined) {
            return (
              <li key={key}>
                <strong>{preferenceLabels[key]}:</strong> {Array.isArray(value) ? value.join(", ") : value}
              </li>
            );
          }
          return null;
        })}
      </ul>
      }

      <p><a className='btn btn-primary' href={`/inzeraty/upravit/${ad._id}`}>Upravit</a></p>
      <p><button className="btn btn-danger" onClick={() => setShowConfirmModal(true)}>Smazat</button></p>
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
