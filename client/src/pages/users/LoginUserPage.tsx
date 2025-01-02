import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginUser from 'hooks/users/useLoginUser'

function LoginUserPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false)
  const { loginUser } = useLoginUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!username.trim() || !password.trim()) {
            alert('Nejsou zadane vsechny informace')
            return
        }

        setLoading(true)
        const success = await loginUser({ username, password })
        if (success) {
            navigate('/muj-ucet')
        } else {
            alert('Nastal problém při prihlasovani')
        }
    }

    if (loading) {
      return <p>Probiha prihlasovani...</p>
    }

    const toggleVisibility = () => {
      setShowPassword(!showPassword);
    }

  return (
    <div>
      <h1>Tady je prihlasovani</h1>
      <form onSubmit={handleSubmit}>
        <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Uživatelské jméno'
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

        <button type="submit">Prihlasit se</button>
      </form>

      <p><a href="/">Domu</a></p>
    </div>
  )
}

export default LoginUserPage
