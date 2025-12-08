// routes/admin.routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  listImages,
  createImage,
  updateImage,
  deleteImage,
} = require("../controllers/portfolio.controller");

const { requireAuth } = require("../middleware/auth.middleware");

// ROTAS DE PORTFÓLIO
router.get("/portfolio", listImages);

router.post("/portfolio", requireAuth, upload.single("image"), createImage);

router.put("/portfolio/:id", requireAuth, upload.single("image"), updateImage);

router.delete("/portfolio/:id", requireAuth, deleteImage);

module.exports = router;
