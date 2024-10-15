const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173' // Asegúrate de que esto coincida con el origen de tu frontend
}));
app.use(cors()); // Permitir cualquier origen (no recomendado en producción)


// Ruta para manejar el envío del formulario
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configura el transportador de correo con Nodemailer usando variables de entorno
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emanuelaarcazuniga@gmail.com', // Especifica tu correo directamente aquí
      pass: 'faum lxtv xdcr xzju', // Especifica tu contraseña directamente aquí
    },
  });

  // Detalles del correo
  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL, // Correo destinatario desde las variables de entorno
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
