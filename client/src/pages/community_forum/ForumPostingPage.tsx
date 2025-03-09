import { useParams } from "react-router-dom"

function ForumPostingPage() {
    const {city} = useParams()
    
  return (
    <div>
      <h1>Zverejneni inzeratu
        { city && <> pro mesto {city}</>}
      </h1>
    </div>
  )
}

export default ForumPostingPage
