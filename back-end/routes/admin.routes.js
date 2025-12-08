// routes/admin.routes.js

const express = require("express");
const router = express.Router();

// Controllers
const {
  getContent,
  upsertContent,
} = require("../controllers/content.controller");

const {
  listImages,
  createImage,
  updateImage,
  deleteImage,
} = require("../controllers/portfolio.controller");

// Middleware de autenticação
const { requireAuth } = require("../middleware/auth.middleware");

// Multer para upload de imagens
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------------------------------
// ROTAS DE CONTEÚDO
// -------------------------------------------

// Buscar todo o conteúdo
router.get("/conteudo", getContent);

// Atualizar / inserir conteúdo
router.put("/conteudo", requireAuth, upsertContent);

// -------------------------------------------
// ROTAS DO PORTFÓLIO (USADAS PELO SEU FRONT-END)
// -------------------------------------------

// Listar imagens
router.get("/portfolio", listImages);

// Criar nova imagem (UPLOAD COM MULTER)
router.post(
  "/portfolio",
  requireAuth,
  upload.single("image"), // <--- AGORA FUNCIONA!
  createImage
);

// Atualizar imagem (arquivo opcional)
router.put(
  "/portfolio/:id",
  requireAuth,
  upload.single("image"), // <--- PERMITE ALTERAR IMAGEM TAMBÉM
  updateImage
);

// Remover imagem
router.delete("/portfolio/:id", requireAuth, deleteImage);

module.exports = router;
