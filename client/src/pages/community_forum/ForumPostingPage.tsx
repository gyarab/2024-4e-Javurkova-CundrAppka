import LoadingCircle from "components/LoadingCircle";
import useCreatePost from "hooks/forum/useCreatePost";
import { Post } from "models/forum-post";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

type PostFormData = Partial<Omit<Post, '_id' | 'createdAt' | 'updatedAt'>>;
function ForumPostingPage() {
    const { city } = useParams()
    const [postData, setPostData] = useState<PostFormData>({
        title: '',
        city: city || '',
        text: ''
    });

    const { createPost } = useCreatePost()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postData.city?.trim() || !postData.text?.trim()) {
            alert('Vyplnte nazev a popis inzeratu');
            return;
        }
        setLoading(true);
        
        const success = await createPost(postData as Post);
        setLoading(false);
        
        if (success) {
            navigate(`/komunitni-forum/${postData.city}`);
        } else {
        alert('Nastal problém při vytváření prispevku');
        }
    };
    
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

    if(loading) return <LoadingCircle/>

  return (
    <div>
      <h1>Zverejneni prispevku
        { city && <> pro mesto {cities[city]}</>}
      </h1>

      <form onSubmit={handleSubmit}>
        { !city && 
          <select 
            name="city"
            onChange={(e) => setPostData({ ...postData, city: e.target.value })}
            required
            >
               {Object.entries(cities).map(([key, value], index) => (
                    <option value={key}>{value}</option>
                ))}
          </select>
        }
      <input
          name="title"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          placeholder="Titulek"
        />
        <textarea
          name="text"
          onChange={(e) => setPostData({ ...postData, text: e.target.value })}
          placeholder="Text"
          required
        />
        <button type="submit">Zverejnit</button>
      </form>
    </div>
  )
}

export default ForumPostingPage
