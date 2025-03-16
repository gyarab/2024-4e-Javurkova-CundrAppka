import LoadingCircle from "components/LoadingCircle";
import { useAuth } from "context/AuthContext";
import useFetchCityPosts from "hooks/forum/useFetchCityPosts";
import { useParams } from "react-router-dom"

function ForumCityPage() {
    const { user, loading } = useAuth();
    const { city } = useParams()
    const { posts } = useFetchCityPosts(city as string);
    const myPostsIds = user?.posts || []
    const shownPosts = posts.filter(post => !myPostsIds.includes(post._id));

    const special_city_names: { [key: string]: string } = {
      "Plzen": "Plzeň",
      "Ceske-Budejovice": "České Budějovice",
      "Hradec-Kralove": "Hradec Králové",
      "Zlin": "Zlín"
    };

    if (loading) {
      return <LoadingCircle/>
    }

  return (
    <div>
      <h1>Mesto {special_city_names[city as keyof typeof special_city_names] || city}</h1>
      {user ? (
        <p><a href={`/komunitni-forum/${city}/zverejnit`} className="btn btn-primary">+</a></p>
      ) : (
        <p>Pro tvorbu prispevku se prihlasete <a href="/prihlaseni">zde</a></p>
      )}
      <div className="posts-container" >
        {shownPosts.length > 0 ? (
            shownPosts.map((post, index) => (
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
