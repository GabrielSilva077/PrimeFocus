// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Caso use variáveis de ambiente

// Importação das rotas
const authRoutes = require("./routes/auth.routes");
const portfolioRoutes = require("./routes/portfolio.routes");
const contentRoutes = require("./routes/content.routes");
const adminRoutes = require("./routes/admin.routes");
const budgetRoutes = require("./routes/budget.routes.js");


// Criar app
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Rotas
app.use("/auth", authRoutes); // Rotas de autenticação
app.use("/portfolio", portfolioRoutes); // Rotas do portfolio
app.use("/site-content", contentRoutes); // Rotas de conteúdo do site
app.use("/api/admin", adminRoutes); // Rotas administrativas
app.use("/api/budget", budgetRoutes);

// Rota teste simples
app.get("/", (req, res) => {
  res.send("API Fotógrafo funcionando!");
});

module.exports = app;
