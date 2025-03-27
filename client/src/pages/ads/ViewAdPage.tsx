import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import { useNavigate } from 'react-router-dom'
import useDeleteAd from 'hooks/ads/useDeleteAd'
import DeleteConfirmComp from 'components/ads/DeleteConfirmComp'
import useSaveAd from 'hooks/ads/useSaveAd'
import { useAuth } from 'context/AuthContext';
import LoadingCircle from 'components/LoadingCircle';
import 'styles/ViewAd.css'


function ViewAdPage() {
    const { id } = useParams()
    const { ad, loading: loadingAd } = useFetchSingleAd(id!)
    const navigate = useNavigate()
    const { deleteAd } = useDeleteAd()
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const { saveAd } = useSaveAd()
    const [saved, setSaved] = useState(false)
    
    const { user, loading } = useAuth(); // Access user data from AuthContext

    const myAdsIds = user?.ads || [];
    const isMine = myAdsIds.includes(id as string)
    useEffect(() => {
      const mySavedAdsIds = user?.saved_ads || [];
      setSaved(mySavedAdsIds.includes(id as string)); // Update saved state based on whether the ad is in the user's saved ads.
    }, [user, id]); // Add 'user' and 'id' as dependencies to run this effect only when they change.

    if (loading || loadingAd) {
        return <LoadingCircle/>
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
      female: "Žena",
      male: "Muž",
      minAge: "Minimálně věk",
      maxAge: "Maximální věk",
      languages: "Mluvené jazyky",
      smokingPreference: "Kuřáctví",
      nonsmoker: 'Nekuřák',
      smoker: 'Kuřák',
      interests: "Zájmy",
      czech: "Čeština",
      spanish: "Španělština",
      english: "Angličtina",
      german: "Němčina",
      russian: "Ruština",
      italian: "Italština",
      french: "Francouština"
    };

    const czechMonths = [
      'leden', 'únor', 'březen', 'duben', 'květen', 'červen',
      'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'
    ];

    const formatMonthYear = (monthYear: string) => {
      if (!monthYear) return '';
      
      const [year, month] = monthYear.split('-');
      const monthName = czechMonths[Number(month) - 1]; // Adjust because months are 0-indexed
      
      return `${monthName} ${year}`;
    };

    const handleSaveClick = async () => {
      const newSavedState = await saveAd(user!._id!, ad!._id);
      setSaved(newSavedState)
    }

    /*TODO: preference a dalsi pole */
  return (
    <div className="vintage-container">
            <div className="vintage-card">
                <h1 className="vintage-title">{ad.title}</h1>
                <p className="vintage-meta">Uživatel: {ad.full_name} ({ad.user_age} let)</p>
                <p className="vintage-description">{ad.description}</p>
                {ad.destination && <p><strong>Destinace:</strong> {ad.destination}</p>}
                <h5>Kontaktní údaje:</h5>
                <p>Email: {ad.email}{ad.phone && <> | Telefon: {ad.phone}</>}</p>
                <p className="text-gray-500">Vytvořeno: {new Date(ad.createdAt).toLocaleDateString('cs-CZ')}</p>
                <p className="text-gray-500">Poslední úprava: {new Date(ad.updatedAt).toLocaleDateString('cs-CZ')}</p>
                
                {user !== null && (
                    <div className="vintage-buttons">
                        <button className={`btn ${saved ? 'btn-secondary' : 'btn-primary'}`} onClick={handleSaveClick}>
                            {saved ? 'Odebrat z uložených' : 'Uložit'}</button>
                        {isMine && (
                            <>
                                <a className="btn btn-primary" href={`/inzeraty/upravit/${ad._id}`}>Upravit</a>
                                <button className="btn btn-danger" onClick={() => setShowConfirmModal(true)}>Smazat</button>
                            </>
                        )}
                    </div>
                )}
                <p><a href="/inzeraty">Zpět</a></p>
            </div>
            <DeleteConfirmComp show={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={handleDelete} message="Opravdu chcete inzerát smazat?" />
        </div>
  )
}

export default ViewAdPage
