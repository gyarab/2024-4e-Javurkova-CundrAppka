import React from 'react'
import 'styles/Home.css'
import CompassIcon from 'assets/images/compass-icon.png'

function HeroSection() {
  return (
    <header className="hero-section">
      <div>
        <img src={CompassIcon} alt="Compass" className="hero-icon" />
        <h1 className="hero-title">Embark on Your Journey</h1>
        <p className="hero-text">Travel the world, connect with like-minded adventurers, and create unforgettable memories.</p>
        <a href="/packages" className="btn btn-custom">Discover Travel Packages</a>
      </div>
    </header>
  )
}

export default HeroSection
