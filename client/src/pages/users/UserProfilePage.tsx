import LoadingCircle from 'components/LoadingCircle'
import { useAuth } from 'context/AuthContext'

function UserProfilePage() {
    const { user, loading } = useAuth()
    
    if (loading) {
        return <LoadingCircle/>
    }

  return (
    <div>
        <h1>{user!.first_name} {user!.last_name}</h1>
        <p>Username: {user!.username}</p>
        <p>Email: {user!.email}</p>
        <p>Muj vek: {user!.age}</p>
        <a href="/muj-ucet/moje-inzeraty" className='btn btn-primary'>MOje inzeraty</a>
        <a href="/muj-ucet/ulozene-inzeraty" className='btn btn-secondary'>Ulozene inzeraty</a>
        <p><a href="/muj-ucet/moje-prispevky" className='btn btn-secondary'>Moje prispevky</a></p>
        <p><a href="/">Domu</a></p>
    </div>
  )
}

export default UserProfilePage