import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import 'App.css'

import HomePage from 'pages/HomePage'
import AdsPage from 'pages/ads/AdsPage'
import CreateAdPage from 'pages/ads/CreateAdPage'
import ViewAdPage from 'pages/ads/ViewAdPage'
import UpdateAdPage from 'pages/ads/UpdateAdPage'
import RegistrationPage from 'pages/users/RegisterUserPage'
import LoginUserPage from 'pages/users/LoginUserPage'
import UserProfilePage from 'pages/users/UserProfilePage'
import MapPage from 'pages/MapPage'

import Navbar from 'components/Navbar'
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'
import Footer from 'components/Footer'

function App() {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      navigate('/')
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error)
      alert('Error logging out. Please try again.')
    }
  }

  return (
    <div className='page-wrapper'>
      <Navbar setShowLogoutModal={setShowLogoutModal}/>
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
    </div>
  );
}

export default App;
