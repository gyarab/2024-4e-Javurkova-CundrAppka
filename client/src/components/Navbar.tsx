import 'styles/Navbar.css'
import { useAuth } from 'context/AuthContext'

const Navbar = ({ setShowLogoutModal }: { setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user, loading } = useAuth()

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
                Inzeráty
              </a>
              <a className="nav-link vintage-link" href="/mapa">
                Mapa
              </a>
              <a className="nav-link vintage-link" href="/komunitni-forum">
                Komunitní Fórum
              </a>
              <a className="nav-link vintage-link" href="/cestovni-balicky">
                Cestovní Balíčky
              </a>
            </div>

            <div className="navbar-nav ml-auto">
            {loading ? (
              <>
                <p>Načítání..</p>
              </>
              ) : (
                <>
                  {user ? (
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
