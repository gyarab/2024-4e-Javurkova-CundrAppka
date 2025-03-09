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

  return (
    <div>
      <h1>Mesto {special_city_names[city as keyof typeof special_city_names] || city}</h1>
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
