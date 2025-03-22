const useLoginUser = () => {

    const loginUser = async (userInfo: string, password: string) => {
    
        try {
            const response = await fetch('/api/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userInfo, password }),
            })
            const data = await response.json()
            return { success: data.success, message: data.message }
      
        } catch{
          return { success: false, message: 'Pri prihlasovani nastala chyba' }
        }

    }
    return { loginUser }
}

export default useLoginUser