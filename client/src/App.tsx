import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from 'pages/HomePage'
import AdsPage from 'pages/ads/AdsPage'
import CreateAdPage from 'pages/ads/CreateAdPage'
import ViewAdPage from 'pages/ads/ViewAdPage'
import UpdateAdPage from 'pages/ads/UpdateAdPage'

import RegistrationPage from 'pages/users/RegisterUserPage'
import LoginUserPage from 'pages/users/LoginUserPage'
import ViewAccountPage from 'pages/users/ViewAccountPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/inzeraty' element={<AdsPage />} />
          <Route path='/inzeraty/zverejnit' element={<CreateAdPage />} />
          <Route path='/inzeraty/:id' element={<ViewAdPage />} />
          <Route path='/inzeraty/upravit/:id' element={<UpdateAdPage />} />
          <Route path='/registrace' element={<RegistrationPage />} />
          <Route path='/prihlaseni' element={<LoginUserPage />} />
          <Route path='/muj-ucet' element={<ViewAccountPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
