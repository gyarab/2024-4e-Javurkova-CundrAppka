import LoadingCircle from "components/LoadingCircle"
import { useAuth } from "context/AuthContext"
import useFetchCityPosts from "hooks/forum/useFetchCityPosts"
import { useState } from "react"
import { useParams } from "react-router-dom"
import 'styles/Forum.css'

function ForumCityPage() {
    const { user, loading: loadingUser } = useAuth()
    const { city } = useParams()
    const { posts, loading: loadingPosts } = useFetchCityPosts(city as string)
    const [sortOrder, setSortOrder] = useState('newest')
    const [searchQuery, setSearchQuery] = useState('')

    const myPostsIds = user?.posts || []
    const shownPosts = posts.filter(post => !myPostsIds.includes(post._id))
    shownPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    const filteredPosts = shownPosts?.filter(post =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.text.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const special_city_names: { [key: string]: string } = {
      "Plzen": "Plzeň",
      "Ceske-Budejovice": "České Budějovice",
      "Hradec-Kralove": "Hradec Králové",
      "Zlin": "Zlín"
    }

    if (loadingUser || loadingPosts) {
      return <LoadingCircle/>
    }

  return (
    <div className="forum-city-container">
      <h1 className="forum-city-title">
          📍{special_city_names[city as keyof typeof special_city_names] || city}
      </h1>
      
      {user ? (
          <p>
              <a href={`/komunitni-forum/${city}/zverejnit`} className="forum-post-btn">
               ✚ Přidat příspěvek
              </a>
          </p>
      ) : (
          <p className="forum-login-msg">
              Pro tvorbu příspěvků se přihlaš <a href="/prihlaseni">ZDE</a>.
          </p>
      )}

      <input
          type="text"
          placeholder="Hledat mezi příspěvky..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="forum-search"
      />

      <div className="forum-sort-container">
          <label className="forum-sort-label">Seřadit podle:</label>
          <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="forum-sort-dropdown"
          >
              <option value="newest">Nejnovější</option>
              <option value="oldest">Nejstarší</option>
          </select>
      </div>

      <div className="forum-posts-container">
          {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                  <div key={index} className="forum-post-card">
                      <h2 className="forum-post-title">
                        {post.title} <span className="forum-post-user">({post.full_name})</span>
                      </h2>
                      <p className="forum-post-text">{post.text}</p>
                      <p className="forum-post-date">
                          Zveřejněno: {new Date(post.createdAt).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                  </div>
              ))
          ) : (
              <p className="forum-no-posts">Žádné příspěvky k dispozici.</p>
          )}
      </div>
      <p><a href="/komunitni-forum" className='back-link'>Zpátky</a></p>
  </div>
  )
}

export default ForumCityPage
