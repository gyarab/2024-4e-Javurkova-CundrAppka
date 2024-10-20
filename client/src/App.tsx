import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'App.css';
import HomePage from 'pages/HomePage'
import AdsPage from 'pages/ads/AdsPage'
import CreateAdPage from 'pages/ads/CreateAdPage'

// functions


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/inzeraty' element={<AdsPage />} />
          <Route path='/inzeraty/zverejnit' element={<CreateAdPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
