import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterUser from 'hooks/users/useRegisterUser'
import User from 'models/user'

function RegisterUserPage() {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState(new Date())
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false);

  const { registerUser } = useRegisterUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      const newUser: User = {
        username: username,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        birthday: birthday,
        email: email,
        password: password
      }
      const { success, message } = await registerUser(newUser)

      if (success) {
        navigate('/prihlaseni')
      } else {
        alert(message)
      }
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
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Uživatelské jméno'
        />
        <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder='Krestni jmeno'
        />
        <input
                type="text"
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder='Druhe jmeno'
        />
        <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Prijmeni'
        />
        <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
        />
        <input
                type="date"
                onChange={(e) => setBirthday(new Date(e.target.value))}
                required
                placeholder='Datum narozeni'
        />
        <input
                id='password'
                type={showPassword ? "text" : "password"}
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
