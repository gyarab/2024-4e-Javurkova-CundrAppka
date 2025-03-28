import LoadingCircle from "components/LoadingCircle";
import useCreatePost from "hooks/forum/useCreatePost";
import { Post } from "models/forum-post";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'styles/Forum.css'

type PostFormData = Partial<Omit<Post, "_id" | "createdAt" | "updatedAt">>;

function ForumPostingPage() {
  const { city } = useParams();
  const [postData, setPostData] = useState<PostFormData>({
    title: "",
    city: city || "Praha",
    text: "",
  });

  const { createPost } = useCreatePost();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postData.city?.trim() || !postData.text?.trim()) {
      alert("Vyplňte obsah příspěvku");
      return;
    }
    setLoading(true);

    const success = await createPost(postData as Post);
    setLoading(false);

    if (success) {
      navigate(`/komunitni-forum/${postData.city}`);
    } else {
      alert("Nastal problém při vytváření příspěvku");
    }
  };

  const cities: { [key: string]: string } = {
    Praha: "Praha",
    Brno: "Brno",
    Ostrava: "Ostrava",
    Plzen: "Plzeň",
    Liberec: "Liberec",
    Olomouc: "Olomouc",
    "Ceske-Budejovice": "České Budějovice",
    "Hradec-Kralove": "Hradec Králové",
    Zlin: "Zlín",
    Pardubice: "Pardubice",
  };

  if (loading) return <LoadingCircle />;

  return (
    <div className="forum-posting-container">
      <h1 className="forum-title">
        Zveřejnění příspěvku
        {city && <> pro město {cities[city]}</>}
      </h1>

      <form onSubmit={handleSubmit} className="forum-form">
        {!city && (
          <select
            name="city"
            className="forum-select"
            onChange={(e) => setPostData({ ...postData, city: e.target.value })}
            required
          >
            {Object.entries(cities).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        )}
        <input
          name="title"
          className="forum-input"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          placeholder="Titulek"
        />
        <textarea
          name="text"
          className="forum-textarea"
          onChange={(e) => setPostData({ ...postData, text: e.target.value })}
          placeholder="Text příspěvku..."
          required
        />
        <button type="submit" className="forum-button">
          Zveřejnit
        </button>
      </form>
    </div>
  );
}

export default ForumPostingPage;
