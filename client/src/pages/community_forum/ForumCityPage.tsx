import { useAuth } from "context/AuthContext";
import useFetchPosts from "hooks/forum/useFetchPosts";
import { useParams } from "react-router-dom"

function ForumCityPage() {
    const { city } = useParams()
    const { posts } = useFetchPosts(city as string);

    const special_city_names: { [key: string]: string } = {
      "Plzen": "Plzeň",
      "Ceske-Budejovice": "České Budějovice",
      "Hradec-Kralove": "Hradec Králové",
      "Zlin": "Zlín"
    };

    const { user, loading } = useAuth();

  return (
    <div>
      <h1>Mesto {special_city_names[city as keyof typeof special_city_names] || city}</h1>
      {user ? (
        <p><a href={`/komunitni-forum/${city}/zverejnit`} className="btn btn-primary">+</a></p>
      ) : (
        <p>Pro tvorbu prispevku se prihlasete <a href="/prihlaseni">zde</a></p>
      )}
      <div className="posts-container" >
        {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="vintage-paper-box">
                <h2>Uzivatel {post.full_name}: {post.title}</h2>
                <p>{post.text}</p>
              </div>
            ))
            ) : (
              <p>No ads available.</p>
        )}
      </div>
    </div>
  )
}

export default ForumCityPage
