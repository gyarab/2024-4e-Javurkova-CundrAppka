import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from 'pages/HomePage'
import AdsPage from 'pages/ads/AdsPage'
import CreateAdPage from 'pages/ads/CreateAdPage'
import ViewAdPage from 'pages/ads/ViewAdPage'

// functions


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/inzeraty' element={<AdsPage />} />
          <Route path='/inzeraty/zverejnit' element={<CreateAdPage />} />
          <Route path='/inzeraty/:id' element={<ViewAdPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
