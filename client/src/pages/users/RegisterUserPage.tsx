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
  const [birthday, setBirthday] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false)
  const { registerUser } = useRegisterUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!username.trim() || !firstName.trim() || !lastName.trim() || !email.trim() || !birthday.trim() || !password.trim()) {
          alert('Nejsou zadane vsechny informace')
          return
      }
      // TODO: kontrola aby heslo bylo silne a osetreni jiz existujich (jen na frontendu)

      setLoading(true)

      const newUser: User = {
        username: username,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        birthday: {
          "day": 1,
          "month": 1,
          "year": 1
        },
        email: email,
        password: password
      }
      const success = await registerUser(newUser)

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
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder='Krestni jmeno'
        />
        <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder='Druhe jmeno'
        />
        <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Prijmeni'
        />
        <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
        />
        <input
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                placeholder='Datum narozeni'
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
