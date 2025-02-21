const useSaveAd = () => {
  const saveAd = async (userId: string, adId: string) => {
      try {
          const response = await fetch(`/api/ads/${userId}/save-ad/${adId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", },
          })
          const data = await response.json()
          return data.saved_ads.includes(adId);
      } catch{
        alert("Při ukládání inzerátu nastala chyba.");
        return false;
      }
  }

  return { saveAd }
}

export default useSaveAd
