// controllers/portfolio.controller.js

const db = require("../db");
const cloud = require("../config/cloudinary");

// ============================
// LISTAR IMAGENS
// ============================
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

// ============================
// CRIAR IMAGEM (UPLOAD → CLOUDINARY)
// ============================
async function createImage(req, res) {
  try {
    const { title, category, grid_size, description } = req.body;

    // Verifica se recebeu arquivo
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Nenhum arquivo enviado" });
    }

    // Upload para Cloudinary (privado: authenticated)
    const uploadResult = await new Promise((resolve, reject) => {
      cloud.uploader
        .upload_stream(
          {
            folder: "portfolio", // pasta no Cloudinary
            resource_type: "image",
            type: "authenticated", // privado
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    const { public_id, secure_url } = uploadResult;

    // Salva no banco apenas a URL + public_id
    const result = await db.query(
      `INSERT INTO portfolio_images 
        (public_id, image_url, title, category, grid_size, description) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        public_id,
        secure_url,
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

// ============================
// ATUALIZAR IMAGEM (ATUALIZA DADOS — SEM NOVO UPLOAD)
// ============================
async function updateImage(req, res) {
  try {
    const { id } = req.params;
    const { title, category, grid_size, description } = req.body;

    // Buscar imagem atual
    const find = await db.query(
      "SELECT * FROM portfolio_images WHERE id = $1",
      [id]
    );
    if (find.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Imagem não encontrada" });
    }
    const oldImage = find.rows[0];
    let image_url = oldImage.image_url;
    let public_id = oldImage.public_id;

    // Se veio um novo arquivo, enviar para Cloudinary
    if (req.file) {
      // Deletar imagem antiga do Cloudinary
      await cloud.uploader.destroy(public_id, { type: "authenticated" });

      // Upload do novo arquivo
      const uploadResult = await new Promise((resolve, reject) => {
        cloud.uploader
          .upload_stream(
            {
              folder: "portfolio",
              resource_type: "image",
              type: "authenticated",
            },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      image_url = uploadResult.secure_url;
      public_id = uploadResult.public_id;
    }

    // Atualiza banco
    const result = await db.query(
      `UPDATE portfolio_images
       SET title = $1,
           category = $2,
           grid_size = $3,
           description = $4,
           image_url = $5,
           public_id = $6,
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [title, category, grid_size, description, image_url, public_id, id]
    );

    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    return res
      .status(500)
      .json({ success: false, error: "Erro ao atualizar imagem" });
  }
}

// ============================
// DELETAR IMAGEM (BANCO + CLOUDINARY)
// ============================
async function deleteImage(req, res) {
  try {
    const { id } = req.params;

    // Buscar imagem pelo ID para pegar public_id
    const find = await db.query(
      "SELECT public_id FROM portfolio_images WHERE id = $1",
      [id]
    );

    if (find.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Imagem não encontrada" });
    }

    const public_id = find.rows[0].public_id;

    // Deletar do Cloudinary
    await cloud.uploader.destroy(public_id, { type: "authenticated" });

    // Deletar do banco
    await db.query("DELETE FROM portfolio_images WHERE id = $1", [id]);

    return res.json({
      success: true,
      message: "Imagem deletada com sucesso",
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
