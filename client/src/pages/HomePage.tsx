import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'


function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/users/status', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json()
        setIsLoggedIn(data.isLoggedIn)
        } catch (error) {
          console.error('Error fetching auth status:', error)
        } finally {
          setLoading(false)
        }
      }
      checkAuthStatus()
    }, [])

    const handleLogout = async () => {
      try {
          await fetch('/api/users/logout', {
              method: 'POST',
              credentials: 'include',
          })
          setIsLoggedIn(false)
          alert('Successfully logged out.')
          navigate('/')
      } catch (error) {
          console.error('Error logging out:', error)
      }
    }

    if (loading) {
      return <p>Nacitani...</p>
    }

  return (
    <div>
      <h1>Domovska stranka ^^</h1>
      {isLoggedIn ? (
                <>
                  <button onClick={() => setShowLogoutModal(true)}>Logout</button>
                  <button onClick={() => navigate('/muj-ucet')}>Muj ucet</button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate('/prihlaseni')}>Prihlaseni</button>
                    <button onClick={() => navigate('/registrace')}>REgistrace</button>
                </>
            )}
        <LogoutConfirmComp
          message="Opravdu chcete inzerat smazat?"
          show={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
            handleLogout();
          }}
        />
      <p><a href="/inzeraty">Inzeraty</a></p>
    </div>
  )
}

export default HomePage
