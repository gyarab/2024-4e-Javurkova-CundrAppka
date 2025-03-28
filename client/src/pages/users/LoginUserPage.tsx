import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginUser from 'hooks/users/useLoginUser'
import LoadingCircle from 'components/LoadingCircle'
import 'styles/Auth.css'

function LoginUserPage() {
  const [userInfo, setUserInfo] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { loginUser } = useLoginUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { success, message } = await loginUser(userInfo, password)

    if (success) {
      navigate('/')
      window.location.reload()
    } else {
      alert(message)
      setPassword('')
    }
  }

  const toggleVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Přihlášení</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          value={userInfo}
          onChange={(e) => setUserInfo(e.target.value)}
          required
          placeholder="Uživatelské jméno nebo email"
        />
        <div className="password-container">
          <input
            className="auth-input"
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Heslo"
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="toggle-password"
            aria-label="Toggle password visibility"
          >
            {showPassword ? '👁️' : '🔒'}
          </button>
        </div>
        <button className="auth-button" type="submit">Přihlásit se</button>
      </form>
      <p className="auth-footer">
        Nemáš u nás účet? <a href="/registrace" className="auth-link">Registruj se</a>
      </p>
      <p className="auth-footer">
        <a href="/" className="auth-link">Domů</a>
      </p>
    </div>
  )
}

export default LoginUserPage
