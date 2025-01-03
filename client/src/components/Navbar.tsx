import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'styles/Navbar.css'

const Navbar = ({ setShowLogoutModal }: { setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // Check auth status when the component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/users/status', {
          method: 'GET',
          credentials: 'include',
        })
        const data = await response.json()
        setIsLoggedIn(data.isLoggedIn)
      } catch (error) {
        console.error('Error fetching auth status:', error)
      }
    }

    checkAuthStatus()
  }, [])

  // Logout function
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

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Left Side Links */}
        <a className="navbar-brand vintage-brand" href="/">
          ČundrAppka
        </a>

        {/* Navbar Toggler for mobile collapse */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links (Collapsible part) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <a className="nav-link vintage-link" href="/inzeraty">
              Inzeraty
            </a>
            <a className="nav-link vintage-link" href="/mapa">
              Mapa
            </a>
            <a className="nav-link vintage-link" href="/komunitni-forum">
              Komunitni Forum
            </a>
            <a className="nav-link vintage-link" href="/cestovni-balicky">
              Cestovni Balicky
            </a>
          </div>

          {/* Right Side Links (Login/Register or My Account/Logout) */}
          <div className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                <a className="nav-link vintage-link" href="/muj-ucet">
                  My Account
                </a>
                <button className="btn vintage-btn" onClick={() => setShowLogoutModal(true)}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a className="nav-link vintage-link" href="/prihlaseni">
                  Login
                </a>
                <a className="nav-link vintage-link" href="/registrace">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
