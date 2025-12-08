// routes/portfolio.routes.js

const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/portfolio.controller");
const { requireAuth } = require("../middleware/auth.middleware");

// Middleware de upload (multer)
const multer = require("multer");

// Configuração do multer (armazenamento em memória)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ROTAS DO PORTFÓLIO

// Listar imagens
router.get("/", ctrl.listImages);

// Criar nova imagem (com upload de arquivo)
router.post("/", requireAuth, upload.single("image"), ctrl.createImage);

// Atualizar imagem (arquivo opcional)
router.put("/:id", requireAuth, upload.single("image"), ctrl.updateImage);

// Deletar imagem
router.delete("/:id", requireAuth, ctrl.deleteImage);

module.exports = router;
