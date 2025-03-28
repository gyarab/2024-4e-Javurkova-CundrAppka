import LoadingCircle from 'components/LoadingCircle';
import { useAuth } from 'context/AuthContext';
import useFetchAllPosts from 'hooks/forum/useFetchAllPosts';
import React, { useMemo, useState } from 'react'
import useDeletePost from 'hooks/forum/useDeletePost'
import DeleteConfirmComp from 'components/ads/DeleteConfirmComp'
import { useNavigate } from 'react-router-dom'
import 'styles/Forum.css'

function MyPostsPage() {
    const { posts, loading: loadingPosts } = useFetchAllPosts();
    const { user, loading: loadingUser } = useAuth();
    const navigate = useNavigate()
    const [postToDelete, setPostToDelete] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const { deletePost } = useDeletePost()
    const [sortOrder, setSortOrder] = useState('newest')

    const myPostsIds = user?.posts || [];
    const myPosts = posts.filter(post => myPostsIds.includes(post._id));
    myPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    if (loadingPosts || loadingUser) {
        return <LoadingCircle/>
    }

    const filteredPosts = myPosts?.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleDelete(postId: string){
        const response = await deletePost(postId)
        if (response!.success) {
            window.location.reload();
        } else {
            alert('Nastal problém při mazání inzerátu')
        }
    }

    const special_city_names: { [key: string]: string } = {
      "Plzen": "Plzeň",
      "Ceske-Budejovice": "České Budějovice",
      "Hradec-Kralove": "Hradec Králové",
      "Zlin": "Zlín"
    };

  return (
    <div className="forum-city-container">
    <h1>Moje prispevky</h1>
      <input
        type="text"
        placeholder="Hledat prispevek.."
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

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="forum-post-card">
              <h2 className="forum-post-title">{post.title} <span className="forum-post-user">({special_city_names[post.city as keyof typeof special_city_names] || post.city})</span></h2>
              <p className="forum-post-text">{post.text}</p>
              <p className="forum-post-date">Vytvořeno: {new Date(post.createdAt).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p>
                <button className="btn btn-danger" onClick={() => { setShowConfirmModal(true); setPostToDelete(post._id); }}>
                  Smazat
                </button>
              </p>
            </div>
          ))
          ) : (
            <p className="forum-no-posts">Žádné příspěvky k dispozici.</p>
      )}
      <p><a href="/muj-ucet">zpet</a></p>
      <DeleteConfirmComp
        message="Opravdu chcete inzerat smazat?"
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          handleDelete(postToDelete);
        }}
      />
    </div>
  )
}

export default MyPostsPage
