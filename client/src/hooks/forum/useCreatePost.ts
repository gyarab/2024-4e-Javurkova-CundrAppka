import { Post } from "models/forum-post"


const useCreatePost = () => {

  const createPost = async (newPost: Post) => {

      try {
          const response = await fetch('/api/forum', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
          })
          const data = await response.json()
          return data.success
    
      } catch{
          alert('Při vytváření prispevku nastala chyba')
          return
      }
  }

  return { createPost }
}

export default useCreatePost