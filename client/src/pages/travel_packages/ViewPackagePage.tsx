import LoadingCircle from 'components/LoadingCircle'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function ViewPackagePage() {
    const { city } = useParams()
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)

   useEffect(() => {
        const path = `/cities_info/${city}.txt`;
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error("File not found");
                }
                return response.text();
            })
            .then(data => setText(data))
            .catch(error => console.error("Error loading text file:", error));
        setLoading(false)
    }, [city]);

    if (loading) {
        return <LoadingCircle/>
    }

  return (
    <div>
      <h1>{city}</h1>
      <p>{text}</p>
      <p><a href="/cestovni-balicky">Zpet</a></p>
    </div>
  )
}

export default ViewPackagePage
