import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from 'components/Navbar'
import HeroSection from 'components/HeroSection'
import Footer from 'components/Footer'
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'
import 'styles/Home.css'

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const navigate = useNavigate()

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
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => setShowLogoutModal(true)} />
      <LogoutConfirmComp
        message="Are you sure you want to log out?"
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false)
          handleLogout()
        }}
      />
      <HeroSection />
      <Footer />
    </>
  )
}

export default HomePage
