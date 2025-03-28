import LoadingCircle from "components/LoadingCircle";
import { useAuth } from "context/AuthContext";
import 'styles/Forum.css'

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

  if (loading) return <LoadingCircle/>;

  return (
    <div className="forum-container">
      <h1 className="forum-title">👋 Komunitní Fórum</h1>
      
      {user ? (
        <p>
          <a href="komunitni-forum/zverejnit" className="forum-post-btn">✚ Přidat příspěvek</a>
        </p>
      ) : (
        <p className="forum-login-msg">
          Pro tvorbu příspěvků se přihlaste <a href="/prihlaseni">zde</a>.
        </p>
      )}

      <div className="forum-cities">
        {Object.entries(cities).map(([key, value]) => (
          <a key={key} href={`/komunitni-forum/${key}`} className="forum-city-link">{value}</a>
        ))}
      </div>
    </div>
  );
}

export default ForumHomePage;
