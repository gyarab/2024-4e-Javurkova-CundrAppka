import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterUser from 'hooks/users/useRegisterUser'
//import RegisterModal from 'components/users/RegisterModal'

function RegisterUserPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const { registerUser } = useRegisterUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!username.trim() || !email.trim() || !password.trim()) {
          alert('Nejsou zadane vsechny informace')
          return
      }

      setLoading(true)
      const success = await registerUser({ username, email, password })

      if (success) {
          navigate('/muj-ucet')
      } else {
          alert('Nastal problém při vytváření uctu')
      }
  }

    if (loading) {
      return <p>Inzerat se vytvari...</p>
    }

  return (
    <div>
      <h1>Registrace</h1>
      <form onSubmit={handleSubmit}>
        <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

        <button type="submit">Vytvorit inzerat</button>
      </form>
      <p><a href='/'>Domu</a></p>
    </div>
  )
}

export default RegisterUserPage
