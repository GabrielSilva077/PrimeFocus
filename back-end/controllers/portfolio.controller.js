// controllers/portfolio.controller.js

const db = require("../db");

// LISTAR IMAGENS
async function listImages(req, res) {
  try {
    const result = await db.query(
      "SELECT * FROM portfolio_images ORDER BY created_at DESC"
    );
    return res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    return res
      .status(500)
      .json({ success: false, error: "Erro ao listar imagens" });
  }
}

// CRIAR IMAGEM
async function createImage(req, res) {
  try {
    const { image_url, title, category, grid_size, description } = req.body;

    if (!image_url) {
      return res
        .status(400)
        .json({ success: false, error: "URL da imagem é obrigatória" });
    }

    const result = await db.query(
      `INSERT INTO portfolio_images (image_url, title, category, grid_size, description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        image_url,
        title || "",
        category || "",
        grid_size || "1x1",
        description || "",
      ]
    );

    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Erro ao criar imagem:", error);
    return res
      .status(500)
      .json({ success: false, error: "Erro ao criar imagem" });
  }
}

// ATUALIZAR IMAGEM
async function updateImage(req, res) {
  try {
    const { id } = req.params;
    const { image_url, title, category, grid_size, description } = req.body;

    const result = await db.query(
      `UPDATE portfolio_images
       SET image_url = $1,
           title = $2,
           category = $3,
           grid_size = $4,
           description = $5,
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [image_url, title, category, grid_size, description, id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Imagem não encontrada" });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    return res
      .status(500)
      .json({ success: false, error: "Erro ao atualizar imagem" });
  }
}

// DELETAR IMAGEM
async function deleteImage(req, res) {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM portfolio_images WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Imagem não encontrada" });
    }

    return res.json({
      success: true,
      message: "Imagem removida com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return res
      .status(500)
      .json({ success: false, error: "Erro ao deletar imagem" });
  }
}

module.exports = {
  listImages,
  createImage,
  updateImage,
  deleteImage,
};
