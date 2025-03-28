import { useAuth } from "context/AuthContext"
import { Navigate, useParams } from "react-router-dom"  // Use Navigate instead of Redirect
import LoadingCircle from "./LoadingCircle"

interface PrivateRouteProps {
  children: React.ReactNode
  redirectTo: string
}

const PrivateRoute = ({ children, redirectTo }: PrivateRouteProps) => {
  const { user, loading } = useAuth()
  const { id } = useParams()

  if(loading) {
    return <LoadingCircle />
  }

  switch(redirectTo) { 
    case '/prihlaseni': { 
        if (!user) {
            return <Navigate to='/prihlaseni' />
        }
        break
    } 
    case '/muj-ucet': { 
        if (user) {
            return <Navigate to='/muj-ucet' />
        }
        break 
    } 
    case '/inzeraty': { 
        const userAds = user?.ads || []
        const isMine = userAds.includes(id as string)
        if (!isMine) {
            return <Navigate to={`/inzeraty/${id}`} />
        }
        break 
     }
    } 

  return <>{children}</>
}

export default PrivateRoute
