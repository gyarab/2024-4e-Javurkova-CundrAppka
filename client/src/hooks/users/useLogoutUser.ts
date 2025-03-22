import { useNavigate } from "react-router-dom"

const useLogoutUser = () => {
    const navigate = useNavigate()
    const logoutUser = async () => {
        try {
            const response = await fetch('/api/users/logout', {
              method: 'POST',
              credentials: 'include',
            })
            const data = await response.json()

            if(data.success) {
              navigate('/')
              window.location.reload();
            }
            else {
              throw new Error();
            }
          } catch (error) {
            alert('Nastala chyba pri odhlasovani')
          }

    }
    return { logoutUser }
}

export default useLogoutUser