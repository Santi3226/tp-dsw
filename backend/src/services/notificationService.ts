import nodemailer from "nodemailer";
import { mailFormat } from "./mailFormat.js";

/* METODO OFICIAL
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // Usa SSL/TLS
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
*/

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "69b67b6edc08f8",
    pass: "2b1bfd843c48ba"
  }
});


const sendNotification = async (mail: string, message: string) => {
    console.log(`Enviando notificacion a ${mail}: ${message}`);
    // Logica del mail
    (async () => {
    const info = await transport.sendMail({
    from: '"Laboratorio Genérico" <laboratorio@ethereal.email>',
    to: mail,
    subject: "Turno Proximo",
    html: mailFormat(message),
  });

  console.log("Message sent:", info.messageId);
})();
};

export { sendNotification };