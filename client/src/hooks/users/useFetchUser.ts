const useFetchUser = () => {

    const fetchUser = async () => {
    
        try {
            const response = await fetch('/api/users', {
                method: 'GET',
                credentials: 'include', // Ensure cookies are sent
            })
            const data = await response.json()
            return data
        } catch (err) {
            alert('Při zobrazovani účtu nastala chyba')
            return
        }

    }
    return { fetchUser }
}

export default useFetchUser
