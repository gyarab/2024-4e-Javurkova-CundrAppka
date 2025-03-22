import LoadingCircle from 'components/LoadingCircle';
import { useAuth } from 'context/AuthContext';
import useFetchAllPosts from 'hooks/forum/useFetchAllPosts';
import { Post } from 'models/forum-post';
import React, { useMemo, useState } from 'react'
import useDeletePost from 'hooks/forum/useDeletePost'
import DeleteConfirmComp from 'components/ads/DeleteConfirmComp'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div>
    <h1>Moje prispevky</h1>
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
      <div className="ads-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="vintage-paper-box">
              <h2>{post.title}</h2>
              <p>{post.text}</p>
              <p className="text-gray-500 text-sm">Vytvořeno: {new Date(post.createdAt).toLocaleString()}</p>
              <p>
                <button className="btn btn-danger" onClick={() => { setShowConfirmModal(true); setPostToDelete(post._id); }}>
                  Smazat
                </button>
              </p>
            </div>
          ))
          ) : (
            <p>No posts available.</p>
      )}
      </div>
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
