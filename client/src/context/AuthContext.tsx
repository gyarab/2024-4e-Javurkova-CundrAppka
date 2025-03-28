import { createContext, useContext } from "react"
import User from "models/user"
import useFetchUser from "hooks/users/useFetchUser"
import useLogoutUser from "hooks/users/useLogoutUser"

interface AuthContextType {
    user: User | null
    loading: boolean
    fetchUser: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, fetchUser } = useFetchUser()
    const { logoutUser } = useLogoutUser()

    const logout = async () => {
        await logoutUser()
        await fetchUser() // Clear user state after logout
    }

    return (
        <AuthContext.Provider value={{ user, loading, fetchUser, logout }}>
          {children}
        </AuthContext.Provider>
    )
}
    
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}