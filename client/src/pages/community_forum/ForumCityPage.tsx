import { useParams } from "react-router-dom"

function ForumCityPage() {
    const { city } = useParams()
    const special_city_names: { [key: string]: string } = {
      "Plzen": "Plzeň",
      "Ceske-Budejovice": "České Budějovice",
      "Hradec-Kralove": "Hradec Králové",
      "Zlin": "Zlín"
    };

  return (
    <div>
      <h1>Mesto {special_city_names[city as keyof typeof special_city_names] || city}</h1>
    </div>
  )
}

export default ForumCityPage
