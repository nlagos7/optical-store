require('dotenv').config();
const nodemailer = require('nodemailer');
const { secret } = require('./secret');

// sendEmail
module.exports.sendEmail = (body, res, message) => {
  console.log('Iniciando la creación del transportador de correo...');
  const transporter = nodemailer.createTransport({
    host: secret.email_host,
    port: secret.email_port,
    secure: true,
    auth: {
      user: secret.email_user,
      pass: secret.email_pass,
    },
  });

  console.log('Verificando el transportador...');
  transporter.verify(function (err, success) {
    if (err) {
      console.error(`Error durante la verificación: ${err.message}`);
      return res.status(403).send({
        message: `Error durante la verificación: ${err.message}`,
      });
    } else {
      console.log('Servidor listo para enviar correos.');
    }

    console.log('Enviando correo...');
    transporter.sendMail(body, (err, data) => {
      if (err) {
        console.error(`Error enviando el correo: ${err.message}`);
        return res.status(403).send({
          message: `Error enviando el correo: ${err.message}`,
        });
      } else {
        console.log('Correo enviado con éxito:', data);
        return res.send({
          message: message,
        });
      }
    });
  });
};
