import React, { useState, useEffect } from 'react'
import useFetchUser from 'hooks/users/useFetchUser'

interface User {
    username: string,
    email: String,
    password: string
}

function UserProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const { fetchUser } = useFetchUser()

    useEffect(() => {
        const getUser = async () => {
            const fetch = await fetchUser();
            setLoading(false);
            if (fetch.success) {
                setUser(fetch.user);
            } else {
                alert('Nastal problém při zobrazování účtu');
            }
        };

        getUser();
    }, [fetchUser]);

    if (loading) {
        return <p>Probiha prihlasovani...</p>
    }

  return (
    <div>
        <h1>Profile</h1>
        <p>Username: {user!.username}</p>
        <p>Email: {user!.email}</p>
        <p><a href="/">Domu</a></p>
    </div>
  )
}

export default UserProfilePage