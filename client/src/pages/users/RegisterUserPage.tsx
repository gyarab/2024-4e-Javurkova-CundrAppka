import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterUser from 'hooks/users/useRegisterUser'
//import RegisterModal from 'components/users/RegisterModal'

function RegisterUserPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

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
        navigate('/')
        window.location.reload();
      } else {
          alert('Nastal problém při vytváření uctu')
      }
  }

    if (loading) {
      return <p>Inzerat se vytvari...</p>
    }

    const toggleVisibility = () => {
      setShowPassword(!showPassword);
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
                placeholder='Uživatelské jméno'
            />
        <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
            />
        <input
                id='password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Heslo'
            />
        <button
                type="button"
                onClick={toggleVisibility}
                aria-label="Toggle password visibility"
            >
                {showPassword ? "Hide" : "Show"}
            </button>

        <button type="submit">Vytvorit Ucet</button>
      </form>
      <p><a href='/'>Domu</a></p>
    </div>
  )
}

export default RegisterUserPage
