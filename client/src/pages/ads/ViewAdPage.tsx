import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import { useNavigate } from 'react-router-dom'
import useDeleteAd from 'hooks/ads/useDeleteAd'
import DeleteConfirmComp from 'components/ads/DeleteConfirmComp'
import useSaveAd from 'hooks/ads/useSaveAd'
import { useAuth } from 'context/AuthContext';
import LoadingCircle from 'components/LoadingCircle';


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
                      : preferenceLabels[value as keyof typeof preferenceLabels] || value
                  }</strong>
                </li>
              ))
            }
          </ul>
        )}
        {ad.date && <p>Priblizne datum: {formatMonthYear(ad.date)}</p>}
        <p className="text-gray-500 text-sm">Vytvořeno: {new Date(ad.createdAt).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="text-gray-500 text-sm">Posledni uprava: {new Date(ad.createdAt).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
