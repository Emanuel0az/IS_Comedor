import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormLogin2.css';

export default function FormLogin() {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const adminCredentials = {
    clave: "1234"
  };

  const validate = () => {
    let inputErrors = {};
    if (!password) inputErrors.password = 'Por favor, ingrese su contraseña.';
    return inputErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputErrors = validate();
    if (Object.keys(inputErrors).length === 0) {
      if (adminCredentials.clave === password) {
        localStorage.setItem('asistir', 'true');
        navigate('/asistencias');
      } else {
        alert('Contraseña incorrecta');
      }
    } else {
      setErrors(inputErrors);
      alert('Ingrese datos');
    }
  };

  return (
    <div className="login-container2">
      <div className="login-form2">
        <h2 className="login-title2"></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group2">
            <label htmlFor="password" className="form-label2">Ingresa la Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su Contraseña"
              required
              className="form-input2"
              autoFocus
            />
            {errors.password && <span className="error-message2">{errors.password}</span>}
          </div>
          <button 
            type="submit"
            className="submit-button2"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}