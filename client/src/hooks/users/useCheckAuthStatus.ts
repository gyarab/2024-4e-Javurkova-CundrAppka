const useCheckAuthStatus = () => {

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/users/status', {
              method: 'GET',
              credentials: 'include',
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching auth status:', error);
            return
        }
    }
    return { checkAuthStatus }
}

export default useCheckAuthStatus
