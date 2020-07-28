require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (content) => {
  const { user, service, pet, date, time, email, description } = content;

  contentHTML = `
          <h1>Confirmación de Turno</h1>


          <h2>Hola ${user}</h2>
          <ul>
          
          <li>El turno de <b>${service}</b> para tu Mascota ${pet} fue confirmado</li>

          <li>Fecha: <b>${date}</b></li>
          <li>Hora: <b>${time}</b></li>
          <li>Consulta: <b>${description}</b></li>

          <li>Recuerda venir con tu mascota 15 minutos antes</li>
          </ul>

          <p>Si por algún motivo estás impedido de asistir al servicio solicitado, comunícate con nosotros 24 horas antes</p>



        `;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: "vet.puerco.arania@gmail.com",
    to: email,
    subject: "confirmacion de Turno",
    html: contentHTML,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      // console.log(mailOptions);
      console.log("No se pudo enviar el Mail. Verifica la dirección de Correo");
      console.log(err);
    } else {
      // console.log(mailOptions);
      console.log("EMAIL ENVIADO");
    }
  });
  // console.log(contentHTML);
};

module.exports = sendEmail;
