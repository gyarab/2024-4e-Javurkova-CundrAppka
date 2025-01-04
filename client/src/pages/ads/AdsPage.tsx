import useFetchAds from 'hooks/ads/useFetchAds';
import '../../styles/Ads.css'; // Make sure to import the CSS
import VintageCard from 'assets/images/vintage-card.png'
import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react';
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'
import { useNavigate } from 'react-router-dom';
import LoadingPage from 'pages/LoadingPage';

interface Ad {
    _id: string;
    title: string;
}

function AdsPage() {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { ads, loading } = useFetchAds();

    //if (loading) {
        //return <LoadingPage message="Nacitani..." />;
    //}
      
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
            {/* Ads Content */}
            <div className="ads-container">
                {ads.length > 0 ? (
                    ads.map((ad, index) => (
                        <div key={index} className="vintage-paper-box">
                            <h2>{ad.title}</h2>
                            <p>{"Lorem ipsum dolor sit amet."}</p>
                            <a href={`/inzeraty/${ad._id}`} className='btn btn-dark'>Zobrazit</a>
                        </div>
                    ))
                ) : (
                    <p>No ads available.</p>
                )}
            </div>
        </>
    )
}

export default AdsPage;
