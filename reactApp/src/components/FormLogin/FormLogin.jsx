import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './FormLogin.css';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Hacer la solicitud de login a la API
      const response = await axios.post('http://localhost:8000/api/login_admin/', {
        username: email,
        password: password,
      });

      // Guardar el token en una cookie
      Cookies.set('token2', response.data.access, { expires: 1 });  // Expira en 1 día
      alert('Inicio de sesión exitoso');
      navigate('/home');  // Navega a la página de inicio o a la ruta protegida
    } catch (error) {
      setErrors({ login: 'Correo o contraseña incorrectos' });
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su Correo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su Contraseña"
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
          {errors.login && <p className="error-message">{errors.login}</p>}
        </form>
      </div>
    </div>
  );
}
