import './App.css';
import {useState, useEffect} from 'react'

// functions
import { getTest } from './functions/test'

function App() {
  const [data, setData] = useState('Ahoj Svete')

  useEffect(() => {
    getTest()
      .then((res) => {
        setData(res.message)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <h1>{data}</h1>
  );
}

export default App;
