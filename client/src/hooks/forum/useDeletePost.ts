import { useState } from 'react'

const useDeletePost = () => {
    const [loading, setLoading] = useState(false)

    const deletePost = async (id: string) => {
        setLoading(true)

        try {
            const response = await fetch(`/api/forum/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (response.ok) {
                return { success: true }
            } else {
                return { success: false }
            }
        } catch (err) {
            return { success: false }
        } finally {
            setLoading(false)
        }
    }

    return { deletePost, loading }
}

export default useDeletePost
