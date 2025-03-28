import { useState, useEffect } from "react"
import User from "models/user" 

const useFetchUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => { 
        setLoading(true)
        try {
            const response = await fetch("/api/users", {
                method: "GET",
                credentials: "include",
            })
            const data = await response.json()

            if (data.success) {
                setUser(data.user)
            } else {
                setUser(null)
            }
        } catch (err) {
            console.error("Error fetching user:", err)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser() // Automatically fetch user on mount
    }, [])

    return { user, loading, fetchUser } // Now we return `fetchUser` too!
}

export default useFetchUser
