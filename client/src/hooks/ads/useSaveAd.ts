const useSaveAd = (userId?: string) => {

  const saveAd = async (adId: string) => {
    if (!userId) {
        alert("Musíte být přihlášeni k uložení inzerátu.");
        return false;
    }

      try {
          const response = await fetch(`/users/${userId}/save-ad/${adId}`, {
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
