import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRegisterUser from 'hooks/users/useRegisterUser';
import User from 'models/user';
import 'styles/Auth.css';

function RegisterUserPage() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser } = useRegisterUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      username,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      birthday: new Date(birthday),
      email,
      password,
    };

    const { success, message } = await registerUser(newUser);
    if (success) {
      navigate('/prihlaseni');
    } else {
      alert(message);
    }
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Registrace</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Uživatelské jméno" />
        <input className="auth-input" type="text" onChange={(e) => setFirstName(e.target.value)} required placeholder="Křestní jméno" />
        <input className="auth-input" type="text" onChange={(e) => setMiddleName(e.target.value)} placeholder="Druhé jméno" />
        <input className="auth-input" type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Příjmení" />
        <input className="auth-input" type="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        <input className="auth-input" type="date" onChange={(e) => setBirthday(e.target.value)} required placeholder="Datum narození" />
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
  );
}

export default RegisterUserPage;
