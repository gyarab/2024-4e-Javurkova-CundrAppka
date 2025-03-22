const useDeleteAd = () => {

    const deleteAd = async (id: string) => {
        try {
            const response = await fetch(`/api/ads/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            return data.success
        } catch (error) {
            return { success: false }
        }
    }

    return { deleteAd }
}

export default useDeleteAd
