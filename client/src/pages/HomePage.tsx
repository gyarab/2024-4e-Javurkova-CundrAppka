import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from 'components/Navbar'
import HeroSection from 'components/HeroSection'
import Footer from 'components/Footer'
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'
import 'styles/Home.css'

function HomePage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  return (
    <>
      <LogoutConfirmComp
                message="Are you sure you want to log out?"
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={() => {
                setShowLogoutModal(false)
                handleLogout() // Perform logout after confirmation
                }}
            />
      <HeroSection />
    </>
  )
}

export default HomePage
