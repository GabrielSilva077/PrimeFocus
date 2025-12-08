// test-email.js
const { Resend } = require("resend"); // importa a classe Resend
require("dotenv").config(); // carrega variáveis de ambiente

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

// Inicializa o cliente Resend corretamente
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTest() {
  try {
    const response = await resend.emails.send({
      from: "Site Portfólio <teste@resend.dev>", // remetente válido
      to: process.env.MAIL_TO,                     // e-mail de destino
      subject: "Teste de envio Resend",
      html: "<p>Se você receber, está funcionando!</p>",
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

sendTest();
