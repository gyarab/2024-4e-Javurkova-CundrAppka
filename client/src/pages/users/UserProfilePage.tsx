import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import useFetchUser from 'hooks/users/useFetchUser'
import LoadingCircle from 'components/LoadingCircle'
import User from 'models/user'
import { useAuth } from 'context/AuthContext'

function UserProfilePage() {
    const { fetchUser } = useFetchUser()
    const { user, loading } = useAuth(); // Access user data from AuthContext
    
    if (loading) {
        return <LoadingCircle/>
    }

  return (
    <div>
        <h1>{user!.first_name} {user!.last_name}</h1>
        <p>Username: {user!.username}</p>
        <p>Email: {user!.email}</p>
        <p>Muj vek: {user!.age}</p>
        <a href="/muj-ucet/inzeraty">MOje inzeraty</a>
        <p><a href="/">Domu</a></p>
    </div>
  )
}

export default UserProfilePage