import React, { useState } from 'react';
import axios from 'axios';
import './EmailOpenAI.css'; // Asegúrate de importar tu archivo CSS

const EmailOpenAI = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/send-email', formData);
      if (response.status === 200) {
        setStatus('Correo enviado exitosamente.');
      }
    } catch (error) {
      setStatus('Hubo un error al enviar el correo.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="message" className="form-label">Message:</label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        
        <button type="submit" className="form-button">Send</button>
      </form>
      
      {status && <p className="form-status">{status}</p>}
    </div>
  );
};

export default EmailOpenAI;
