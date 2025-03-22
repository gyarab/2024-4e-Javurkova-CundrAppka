import User from "models/user"

const useRegisterUser = () => {

    const registerUser = async (newUser: User) => {
        try {
            const response = await fetch('/api/users/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            })
  
            const data = await response.json()
            return { success: data.success, message: data.message }
      
        } catch{
            return { success: false, message: 'Pri registraci nastala chyba' }
        }

    }
    return { registerUser }
}

export default useRegisterUser