import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

interface NavbarProps {
  isLoggedIn: boolean
  onLogout: () => void
}

function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/assets/images/logo.png" alt="Logo" height="40" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="/inzeraty">Ads</a></li>
            <li className="nav-item"><a className="nav-link" href="/cestovni-balicky">Travel Packages</a></li>
            <li className="nav-item"><a className="nav-link" href="/mapa">Map</a></li>
            <li className="nav-item"><a className="nav-link" href="/forum">Forum</a></li>
            {isLoggedIn ? (
              <>
                <li className="nav-item"><button className="btn btn-primary me-2" onClick={() => navigate('/muj-ucet')}>My Account</button></li>
                <li className="nav-item"><button className="btn btn-outline-danger" onClick={onLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><button className="btn btn-success me-2" onClick={() => navigate('/prihlaseni')}>Login</button></li>
                <li className="nav-item"><button className="btn btn-outline-primary" onClick={() => navigate('/registrace')}>Register</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
