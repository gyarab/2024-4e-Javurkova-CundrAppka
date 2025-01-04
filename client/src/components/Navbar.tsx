import React, { useEffect, useState } from 'react'
import 'styles/Navbar.css'

const Navbar = ({ setShowLogoutModal }: { setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      setLoading(true)
      const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/users/status', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Error fetching auth status:', error);
      } finally {
        setLoading(false); // Set loading to false once everything is loaded
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand vintage-brand" href="/">
          ČundrAppka
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

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

          <div className="navbar-nav ml-auto">
          {loading ? (
            <>
              <p>Načítání..</p>
            </>
          ) : (
            <>
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
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
