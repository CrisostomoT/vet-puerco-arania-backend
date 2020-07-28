require("dotenv").config();
const nodemailer = require("nodemailer");
const userModel = require("../models/user");

const sendMail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: new RegExp(email, "i") });

  contentHTML = `
            <h1>Recuperación de Usuario y Contaseña</h1>

            <h2>Hola ${user.username}, estamos trabajando en el proceso para que recuperes tu usuario y contraseña por este medio. Por el momento puedes hacerlo llamando al 080022PUERCO </h2>

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
    subject: "cambio de Contraseña",
    html: contentHTML,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("No se pudo enviar el Mail. Verifica la dirección de Correo");
      console.log(err);
    } else {
      console.log("EMAIL ENVIADO");
    }
  });
};

module.exports = sendMail;
