interface User {
    username: string,
    password: string
}

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
            return data.success
      
        } catch{
            alert('Při prihlasovani účtu nastala chyba')
            return
        }

    }
    return { loginUser }
}

export default useLoginUser