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
            return data.success
      
        } catch{
            return { success: false }
        }

    }
    return { registerUser }
}

export default useRegisterUser