import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

function MapPage() {

  const center = {
    lat: 49.8175, // Latitude
    lng: 15.473,  // Longitude
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

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

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
  return (
    <>
      <Navbar setShowLogoutModal={setShowLogoutModal} />
      <LoadScript googleMapsApiKey={apiKey} loadingElement={<p>Loading map...</p>}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
      >
        {/* You can add markers or other components here */}
      </GoogleMap>
      </LoadScript>
      <Footer/>
    </>
  )
}

export default MapPage