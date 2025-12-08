// controllers/budget.controller.js
const { Resend } = require("resend");
require("dotenv").config();

// Inicializa o cliente Resend com a API Key
const resend = new Resend({ apiKey: process.env.RESEND_API_KEY });

async function sendBudgetRequest(req, res) {
  const { name, email, phone, eventType, date, message } = req.body;

  // Validação de campos obrigatórios
  if (!name || !email || !phone || !eventType) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  try {
    // Envia o e-mail usando a API Resend
    await resend.emails.send({
      from: "Site Portfólio <no-reply@prime-focus.com>", // pode trocar pelo seu domínio
      to: process.env.MAIL_TO, // e-mail de destino
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
    });

    // Retorna sucesso
    return res.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return res.status(500).json({ error: "Erro ao enviar email." });
  }
}

module.exports = { sendBudgetRequest };
