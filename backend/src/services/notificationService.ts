import nodemailer from "nodemailer";
import { mailFormatProx } from "./mailFormatTurnoProx.js";
import { mailFormatPrev } from "./mailFormatTurnoPrev.js";
import dotenv from "dotenv";


dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* TESTER EN DESARROLLO
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "69b67b6edc08f8",
    pass: "2b1bfd843c48ba"
  }
});
*/

const sendNotification = async (mail: string, message: string, subject: string, tipo: "prox" | "prev") => {
    console.log(`Enviando notificacion a ${mail}: ${message}`);
    // Logica del mail
    (async () => {
    const info = await transport.sendMail({
    from: '"Laboratorio Genérico" <laboratorio@ethereal.email>',
    to: mail,
    subject: subject,
    html: tipo === "prox" ? mailFormatProx(message, subject) : mailFormatPrev(message, subject),
  });

  console.log("Message sent:", info.messageId);
})();
};

export { sendNotification };