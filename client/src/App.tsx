import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'App.css';
import HomePage from 'pages/HomePage'
import AdsPage from 'pages/ads/AdsPage'

// functions


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/inzeraty' element={<AdsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
