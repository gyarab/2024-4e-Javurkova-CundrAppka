import LoadingCircle from "components/LoadingCircle";
import { useAuth } from "context/AuthContext";
import useFetchCityPosts from "hooks/forum/useFetchCityPosts";
import { useState } from "react";
import { useParams } from "react-router-dom"

function ForumCityPage() {
    const { user, loading: loadingUser } = useAuth();
    const { city } = useParams()
    const { posts, loading: loadingPosts } = useFetchCityPosts(city as string);
    const [sortOrder, setSortOrder] = useState('newest')
    const [searchQuery, setSearchQuery] = useState('')

    const myPostsIds = user?.posts || []
    const shownPosts = posts.filter(post => !myPostsIds.includes(post._id));
    shownPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const filteredPosts = shownPosts?.filter(post =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const special_city_names: { [key: string]: string } = {
      "Plzen": "Plzeň",
      "Ceske-Budejovice": "České Budějovice",
      "Hradec-Kralove": "Hradec Králové",
      "Zlin": "Zlín"
    };

    if (loadingUser || loadingPosts) {
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
      <input
        type="text"
        placeholder="Hledat prispevek.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      />
      <div className="mb-4">
                <label className="mr-2">Seřadit podle:</label>
                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                    className="p-2 border rounded"
                >
                    <option value="newest">Nejnovější</option>
                    <option value="oldest">Nejstarší</option>
                </select>
        </div>
      <div className="posts-container" >
        {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={index} className="vintage-paper-box">
                <h2>Uzivatel {post.full_name}: {post.title}</h2>
                <p>{post.text}</p>
                <p className="text-gray-500 text-sm">Zverejneno: {new Date(post.createdAt).toLocaleString()}</p>
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
