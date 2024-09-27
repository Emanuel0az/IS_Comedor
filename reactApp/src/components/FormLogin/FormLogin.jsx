import React, { useState } from 'react';
import '../FormLogin/FormLogin.css'
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        navigate('/');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inicio de Sesión</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default FormLogin;