import { useAuth } from "context/AuthContext";

function ForumHomePage() {

  const cities: { [key: string]: string } = {
    "Praha": "Praha",
    "Brno": "Brno",
    "Ostrava": "Ostrava",
    "Plzen": "Plzeň",
    "Liberec": "Liberec",
    "Olomouc": "Olomouc",
    "Ceske-Budejovice": "České Budějovice",
    "Hradec-Kralove": "Hradec Králové",
    "Zlin": "Zlín",
    "Pardubice": "Pardubice"
  };

  const { user, loading } = useAuth();

  return (
    <div>
      <h1>Komunitni forum</h1>
      {user ? (
        <p><a href="komunitni-forum/zverejnit" className="btn btn-primary">+</a></p>
      ) : (
        <p>Pro tvorbu prispevku se prihlasete <a href="/prihlaseni">zde</a></p>
      )}
      
      {Object.entries(cities).map(([key, value], index) => (
        <h3><a href={`/komunitni-forum/${key}`}>{value}</a></h3>
      ))}
    </div>
  )
}

export default ForumHomePage
