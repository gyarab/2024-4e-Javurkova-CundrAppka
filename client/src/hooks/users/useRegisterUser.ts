interface User {
    name: string,
    password: string
}

const useRegisterUser = () => {

    const registerUser = async (newUser: User) => {
        try {
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            })
  
            const data = await response.json()
            return data.success
      
        } catch{
            alert('Při vytváření účtu nastala chyba')
            return
        }

    }
    return { registerUser }
}

export default useRegisterUser