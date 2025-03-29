/* url: /registrace */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useRegisterUser from 'hooks/users/useRegisterUser'
import User from 'models/user'
import 'styles/Auth.css'

function RegisterUserPage() {
  // states containing new user info
  // their contents are read out of the registration form
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // import register function from hook
  const { registerUser } = useRegisterUser()
  const navigate = useNavigate()

  // executed after submiting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // create a new User instance with provided data
    const newUser: User = {
      username,
      first_name: firstName,
      last_name: lastName,
      birthday: new Date(birthday),
      email,
      password,
    }

    // retrieve success and message from backend
    const { success, message } = await registerUser(newUser)
    if (success) {
      // navigate to 'prihlaseni' so th euser can log-in
      navigate('/prihlaseni')
    } else {
      // if anything went wrong there will be displayed error message
      alert(message)
    }
  }

  // takes care of the password visibility
  // once called it changes it's boolean value to the opposite
  const toggleVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Registrace</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" type="text" onChange={(e) => setFirstName(e.target.value)} required placeholder="Křestní jméno" />
        <input className="auth-input" type="text" onChange={(e) => setLastName(e.target.value)} required placeholder="Příjmení" />
        <label htmlFor="date">Tvoje narozeniny</label>
        <input className="auth-input" type="date" onChange={(e) => setBirthday(e.target.value)} required/>
        <br />
        <input className="auth-input" type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Uživatelské jméno" />
        <input className="auth-input" type="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        <div className="password-container">
          <input className="auth-input" type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} required placeholder="Heslo" />
          <button type="button" onClick={toggleVisibility} className="toggle-password" aria-label="Toggle password visibility">
            {showPassword ? '👁️' : '🔒'}
          </button>
        </div>
        <button className="auth-button" type="submit">Vytvořit účet</button>
      </form>
      <p className="auth-footer">
        <a href="/" className="auth-link">Domů</a>
      </p>
    </div>
  )
}

export default RegisterUserPage
