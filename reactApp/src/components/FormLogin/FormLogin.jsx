import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../FormLogin/FormLogin.css';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Datos de credenciales permitidas
  const adminCredentials = {
    correo: "admin@gmail.com",
    clave: "1234"
  };

  const validate = () => {
    let inputErrors = {};
    if (!email) inputErrors.email = 'Por favor, ingrese su correo electrónico.';
    if (!password) inputErrors.password = 'Por favor, ingrese su contraseña.';
    return inputErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputErrors = validate();
    if (Object.keys(inputErrors).length === 0) {
      // Verificación de credenciales
      if (adminCredentials.correo === email && adminCredentials.clave === password) {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('user', true); // Guarda 'admin' en localStorage
        navigate('/home'); // Redirige a la ruta privada
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      setErrors(inputErrors);
      alert('Ingrese datos');
    }
  };

  return (
    <div className="form2">
      <div className="title">
        <h2 className="title-login">Inicio de Sesión</h2>
      </div>
      <div className="login_css">
        <form onSubmit={handleSubmit}>
          <div>
            <label><strong>Correo electrónico</strong></label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Ingrese su Correo'
              required
            />
            <br />
            <br />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label><strong>Contraseña</strong></label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Ingrese su Contraseña'
              required
            />
            <br />
            <br />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit">Iniciar Sesión</button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
