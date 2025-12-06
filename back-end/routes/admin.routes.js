// routes/admin.routes.js
const express = require("express");
const router = express.Router();

const {
  getContent,
  upsertContent
} = require("../controllers/content.controller");

const {
  listImages,
  createImage,
  updateImage,
  deleteImage
} = require("../controllers/portfolio.controller");

// ROTAS DE CONTEÚDO -------------------------
router.get("/conteudo", getContent);
router.put("/conteudo", upsertContent);

// ROTAS DO PORTFÓLIO ------------------------
router.get("/portfolio", listImages);
router.post("/portfolio", createImage);
router.put("/portfolio/:id", updateImage);
router.delete("/portfolio/:id", deleteImage);

module.exports = router;
