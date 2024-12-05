import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterUser from 'hooks/users/useRegisterUser'

function RegisterUserPage() {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { registerUser } = useRegisterUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !password.trim()) {
        alert('Vyplnte vsechna policka')
        return
    }

    setLoading(true)
    const success = await registerUser({ name, password })

    if (success) {
        navigate('/')
    } else {
        alert('Nastal problém při vytváření účtu')
    }
}

  return (
    <div>
      <h1>Tady see muzes zaregistrovat</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Jmeno' 
        />

        <input 
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Heslo' 
        />

        <button type="submit">Registrovat se</button>
      </form>

      <p><a href='/'>Domu</a></p>
    </div>
  )
}

export default RegisterUserPage
