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
      // Intentar primero la validación en la ruta 'users'
      const usersResponse = await axios.post('http://localhost:8000/api/users/', {
        mail: email,
        password: password,
      });

      // Si la respuesta es exitosa, guardar el token y navegar
      Cookies.set('token3', usersResponse.data.access, { expires: 0.0625 });  // Expira en 1.5 horas
      alert('Inicio de sesión exitoso');
      navigate('/home');
    } catch (error) {
      // Si la validación en 'users' falla, intenta la validación en 'login_admin'
      try {
        const adminResponse = await axios.post('http://localhost:8000/api/login_admin/', {
          username: email, // Usar 'username' en lugar de 'email' para 'login_admin'
          password: password,
        });

        // Guardar el token y navegar
        Cookies.set('token2', adminResponse.data.access, { expires: 0.0625 });
        alert('Inicio de sesión exitoso');
        navigate('/home');
      } catch (adminError) {
        // Mostrar error si ambos intentos fallan
        setErrors({ login: 'Correo o contraseña incorrectos' });
        alert('Credenciales incorrectas');
      }
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
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su Correo"
              required
              className='form-input'
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
              className='form-input'
            />
          </div>
          <button type="submit" className='submit-button'>Iniciar Sesión</button>
          {errors.login && <p className="error-message">{errors.login}</p>}
        </form>
      </div>
    </div>
  );
}
