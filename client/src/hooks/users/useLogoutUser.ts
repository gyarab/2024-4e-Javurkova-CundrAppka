import { useNavigate } from "react-router-dom"

const useLogoutUser = () => {
    const navigate = useNavigate()
    const logoutUser = async () => {
        try {
            await fetch('/api/users/logout', {
              method: 'POST',
              credentials: 'include',
            })
            navigate('/')
            window.location.reload();
          } catch (error) {
            console.error('Error logging out:', error)
            alert('Error logging out. Please try again.')
          }

    }
    return { logoutUser }
}

export default useLogoutUser