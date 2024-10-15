// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Permite peticiones desde el frontend de React

// Ruta para manejar el envío del formulario
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configura el transportador de correo con Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '', // Reemplaza con tu correo
      pass: '',       // Reemplaza con tu contraseña
    },
  });

  // Detalles del correo
  const mailOptions = {
    from: email,
    to: 'emanuelabarcazuniga@gmail.com', // Correo destinatario
    subject: `Mensaje de ${name} desde el formulario de contacto`,
    text: message,
  };

  // Envía el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo.');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado exitosamente.');
    }
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
