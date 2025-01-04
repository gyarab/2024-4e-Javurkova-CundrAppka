import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import 'App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from 'pages/HomePage'
import AdsPage from 'pages/ads/AdsPage'
import CreateAdPage from 'pages/ads/CreateAdPage'
import ViewAdPage from 'pages/ads/ViewAdPage'
import UpdateAdPage from 'pages/ads/UpdateAdPage'

import RegistrationPage from 'pages/users/RegisterUserPage'
import LoginUserPage from 'pages/users/LoginUserPage'
import UserProfilePage from 'pages/users/UserProfilePage'

import MapPage from 'pages/MapPage'
import { useEffect, useState } from 'react'
import LoadingPage from 'pages/LoadingPage'
import Navbar from 'components/Navbar'
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'
import Footer from 'components/Footer'

import { useNavigate } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showLoadingPage, setShowLoadingPage] = useState(false); // Track the loading page state
  const location = useLocation();

  // Show loading page when the route changes and preload the next page
  useEffect(() => {
    setShowLoadingPage(true); // Trigger loading page visibility
    const timer = setTimeout(() => {
      setShowLoadingPage(false); // Hide loading page after 2 seconds
    }, 2000); // 2 seconds delay
  
    // Clean up timer when the location changes or the component unmounts
    return () => clearTimeout(timer);
  }, [location]);

  // Simulating an authentication check, e.g., fetching user data
  useEffect(() => {
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

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        setIsLoggedIn(false)
        window.location.reload();
      } else {
        alert('Logout failed. Please try again.')
      }
    } catch (error) {
      console.error('Error logging out:', error)
      alert('Error logging out. Please try again.')
    }
  }

  // While everything is loading, show the loading page
  if (showLoadingPage || loading) {
    return <LoadingPage message="Authenticating and loading..." />;
  }

  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} setShowLogoutModal={setShowLogoutModal}/>
    <LogoutConfirmComp
                message="Are you sure you want to log out?"
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={() => {
                setShowLogoutModal(false)
                handleLogout() // Perform logout after confirmation
                }}
      />
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/inzeraty' element={<AdsPage />} />
        <Route path='/inzeraty/zverejnit' element={<CreateAdPage />} />
        <Route path='/inzeraty/:id' element={<ViewAdPage />} />
        <Route path='/inzeraty/upravit/:id' element={<UpdateAdPage />} />
        <Route path='/registrace' element={<RegistrationPage />} />
        <Route path='/prihlaseni' element={<LoginUserPage />} />
        <Route path='/muj-ucet' element={<UserProfilePage />} />
        <Route path='/mapa' element={<MapPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
