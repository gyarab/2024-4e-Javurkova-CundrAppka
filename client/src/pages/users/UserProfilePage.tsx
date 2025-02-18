import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useFetchUser from 'hooks/users/useFetchUser'
import LoadingCircle from 'components/LoadingCircle'
import User from 'models/user'

function UserProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const { fetchUser } = useFetchUser()
    const navigate = useNavigate()

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
    }, []);

    if (loading) {
        return <LoadingCircle/>
    }

  return (
    <div>
        <h1>{user!.first_name} {user!.last_name}</h1>
        <p>Username: {user!.username}</p>
        <p>Email: {user!.email}</p>
        <p>Muj vek: {user!.age}</p>
        <p><a href="/">Domu</a></p>
    </div>
  )
}

export default UserProfilePage