// AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import useFetchUser from 'hooks/users/useFetchUser'

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  loginAction: (userData: User) => void;
  logoutAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchUser } = useFetchUser()

  // Fetch user data when logged in or logged out
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        setLoading(false)
        return
      }

      try {
        const data = await fetchUser();
        if (data.success) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user)); // Store user in localStorage
        } else {
          setUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem('user');
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error fetching user data');
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]); // Only fetch when isLoggedIn state changes

   // Handle login action
   const loginAction = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  // Handle logout action
  const logoutAction = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, error, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
}

// Type Guard to ensure we get a valid context value
function useAuth() {
  const context = useContext(AuthContext);
  console.log(context)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
