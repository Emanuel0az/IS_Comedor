import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import './NodeMailer.css';

const containerStyle = {
  width: '90%',
  height: '80%',
  borderRadius: '10px', 
};

const center = {
  lat: 9.981382394121916, // Latitud para centrar el mapa (San José, Costa Rica en este caso)
  lng: -84.7570828674284, // Longitud
};

const NodeMailer = () => {
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
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('Correo enviado exitosamente.');
        setTimeout(() => setStatus(''), 5000);
        setFormData({ name: '', email: '', message: '' }); // Limpia los campos después de enviar
      } else {
        setStatus('Hubo un error al enviar el correo.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Hubo un error al enviar el correo.');
    }
  };

  return (
    <div className="EmailPageContainer">
      <div className='info_mapContainer'>
        <div>
          <h1 style={{color: '#155499'}}>Ubicación:</h1> <br /><br />
          <div>Podras encontrarnos ubicados en <span style={{ color: '#007BFF'}}>Puntarenas</span>, siguiendo el <span style={{ color: 'greenyellow' }}>mapa</span> te será más facil. <br/><br /><br /><br /><br /><br /><br />
            Nuestra ubicacion es: <span style={{ color: 'greenyellow' }}>isyfvbiyb</span>.
          </div>
        </div>
        <div className='mapContainer'>
          <LoadScript googleMapsApiKey="AIzaSyDTf-6xMvlajez4UHvXTBu3WIUIi6pMTiQ">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
            >
              <Marker position={center} />
            </GoogleMap>  
          </LoadScript>
        </div>
      </div>


      <div style={{marginLeft: '1%'}}>También puedes <span style={{color: 'greenyellow'}}>contactarnos</span> directamente. <br /><br /></div>
      <div className="formContainer">
        <h2 className="formEmailTittle">¡Contactanos!</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="form-label">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="message" className="form-label">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            value={formData.message || ''}
            onChange={handleChange}
            required
          ></textarea>
          
          <button type="submit" className="form-button">Enviar</button>
        </form>
        
        {status && <p className="form-status">{status}</p>}
      </div>


    </div>
  );
};

export default NodeMailer;
