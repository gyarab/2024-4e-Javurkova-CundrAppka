import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'

//import 'App.css'
import 'styles/App.css'

import HomePage from 'pages/HomePage'
import AdsPage from 'pages/ads/AdsPage'
import CreateAdPage from 'pages/ads/CreateAdPage'
import ViewAdPage from 'pages/ads/ViewAdPage'
import UpdateAdPage from 'pages/ads/UpdateAdPage'
import RegistrationPage from 'pages/users/RegisterUserPage'
import LoginUserPage from 'pages/users/LoginUserPage'
import UserProfilePage from 'pages/users/UserProfilePage'
import MapPage from 'pages/MapPage'
import MyAdsPage from 'pages/ads/MyAdsPage'
import SavedAdsPage from 'pages/ads/SavedAdsPage'

import useLogoutUser from 'hooks/users/useLogoutUser'

import Navbar from 'components/Navbar'
import LogoutConfirmComp from 'components/users/LogoutConfirmComp'
import Footer from 'components/Footer'
import PackagesPage from 'pages/travel_packages/PackagesPage'
import ViewPackagePage from 'pages/travel_packages/ViewPackagePage'
import PrivateRoute from 'components/PrivateRoute'
import ForumHomePage from 'pages/community_forum/ForumHomePage'
import ForumCityPage from 'pages/community_forum/ForumCityPage'
import ForumPostingPage from 'pages/community_forum/ForumPostingPage'
import MyPostsPage from 'pages/community_forum/MyPostsPage'
import NotFoundPage from 'pages/NotFoundPage'

function App() {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { logoutUser } = useLogoutUser()

  return (
    <div className='page-wrapper'>
      <Navbar setShowLogoutModal={setShowLogoutModal}/>
      <LogoutConfirmComp
        message="Are you sure you want to log out?"
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
        setShowLogoutModal(false)
        logoutUser() // Perform logout after confirmation
        }}
      />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/inzeraty' element={<AdsPage />} />
        <Route path='/inzeraty/zverejnit' element={<PrivateRoute redirectTo='/prihlaseni'><CreateAdPage /></PrivateRoute>} />
        <Route path='/inzeraty/:id' element={<ViewAdPage />} />
        <Route path='/inzeraty/upravit/:id' element={<PrivateRoute redirectTo='/inzeraty'><UpdateAdPage /></PrivateRoute>} />
        <Route path='/registrace' element={<PrivateRoute redirectTo='/muj-ucet'><RegistrationPage /></PrivateRoute>} />
        <Route path='/prihlaseni' element={<PrivateRoute redirectTo='/muj-ucet'><LoginUserPage /></PrivateRoute>} />
        <Route path='/muj-ucet' element={<PrivateRoute redirectTo='/prihlaseni'><UserProfilePage/></PrivateRoute>} />
        <Route path='/muj-ucet/moje-inzeraty' element={<PrivateRoute redirectTo='/prihlaseni'><MyAdsPage /></PrivateRoute>} />
        <Route path='/muj-ucet/ulozene-inzeraty' element={<PrivateRoute redirectTo='/prihlaseni'><SavedAdsPage /></PrivateRoute>} />
        <Route path='/muj-ucet/moje-prispevky' element={<PrivateRoute redirectTo='/prihlaseni'><MyPostsPage /></PrivateRoute>} />
        <Route path='/mapa' element={<MapPage />} />
        <Route path='/cestovni-balicky' element={<PackagesPage/>} ></Route>
        <Route path='/cestovni-balicky/:city' element={<ViewPackagePage/>} ></Route>
        <Route path='/komunitni-forum' element={<ForumHomePage/>} ></Route>
        <Route path='/komunitni-forum/zverejnit' element={<PrivateRoute redirectTo='/prihlaseni'><ForumPostingPage/></PrivateRoute>} ></Route>
        <Route path='/komunitni-forum/:city' element={<ForumCityPage/>} ></Route>
        <Route path='/komunitni-forum/:city/zverejnit' element={<PrivateRoute redirectTo='/prihlaseni'><ForumPostingPage/></PrivateRoute>} ></Route>
        <Route path='*' element={<NotFoundPage/>} ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
