import { Post } from 'models/forum-post';
import { useEffect, useState } from 'react'

const useFetchAllPosts = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/forum/posts`, { method: 'GET' })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Nastal problém při načítání prispevku.')
                }
                return res.json()
            })
            .then((data: { success: boolean, data: Post[] }) => {
                if (data.success) {
                    setPosts(data.data)
                } else {
                    throw new Error('Nastal problém při načítání inzerátů.')
                }
                setLoading(false)
            })
    }, [])

    return { posts, loading }
}

export default useFetchAllPosts