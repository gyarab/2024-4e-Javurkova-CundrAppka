import { useState } from 'react'

const useDeletePost = () => {

    const deletePost = async (id: string) => {
        try {
            const response = await fetch(`/api/forum/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            return { success: data.success }
        } catch (err) {
            return { success: false }
        }
    }

    return { deletePost }
}

export default useDeletePost
