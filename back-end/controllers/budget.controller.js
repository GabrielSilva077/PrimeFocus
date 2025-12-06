// controllers/budget.controller.js
const nodemailer = require("nodemailer");
require("dotenv").config();


async function sendBudgetRequest(req, res) {
  const { name, email, phone, eventType, date, message } = req.body;

  if (!name || !email || !phone || !eventType) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // SENHA DE APP DO GMAIL!!!
      },
    });

    const mailOptions = {
      from: `"Site Portfólio" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: "📸 Novo Pedido de Orçamento",
      html: `
        <h2>Novo Pedido de Orçamento</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefone:</b> ${phone}</p>
        <p><b>Tipo de Serviço:</b> ${eventType}</p>
        <p><b>Data Desejada:</b> ${date || "Não informada"}</p>
        <p><b>Mensagem:</b> ${message || "Sem mensagem adicional"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return res.status(500).json({ error: "Erro ao enviar email." });
  }
}

module.exports = { sendBudgetRequest };