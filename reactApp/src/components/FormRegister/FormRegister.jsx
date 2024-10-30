import React, { useState } from 'react';
import './FormRegister.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    password: '',
    rol: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        setFormData({ name: '', mail: '', password: '', rol: '' });
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Ingresa un nombre'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Correo electrónico:</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder='Ingresa un correo'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Ingresa una contraseña'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <input
            type="text"
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            placeholder='Ingresa un rol'
            required
          />
        </div>
        <button type="submit" className="submit-btn">Registrar</button>
      </form>
    </div>
  );
}