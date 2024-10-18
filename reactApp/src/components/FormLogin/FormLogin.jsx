import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormLogin.css';
import axios from 'axios';
import Cookies from 'js-cookie'; // Importa la librería de cookies

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let inputErrors = {};
    if (!email) inputErrors.email = 'Por favor, ingrese su correo electrónico.';
    if (!password) inputErrors.password = 'Por favor, ingrese su contraseña.';
    return inputErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = validate();
    if (Object.keys(inputErrors).length === 0) {
      try {
        // Cambiar la URL de acuerdo a tu API
        const response = await axios.post('http://localhost:8000/api/login2/', { 
          email: "admin@gmail.com",
          password: "1234" 
        });

        // Guardar el token en una cookie
        Cookies.set('token2', response.data.access, { expires: 1 }); // Expira en 1 día
        alert('Inicio de sesión exitoso');
        navigate('/home');
      } catch (error) {
        alert('Credenciales incorrectas');
      }
    } else {
      setErrors(inputErrors);
      alert('Ingrese datos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su Correo"
              required
              autoFocus
              className="form-input"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su Contraseña"
              required
              className="form-input"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button 
            type="submit"
            className="submit-button"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
