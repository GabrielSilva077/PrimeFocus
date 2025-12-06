// controllers/content.controller.js
const db = require("../db");

// GET conteúdo
async function getContent(req, res) {
  try {
    // Buscar conteúdo do site_content
    const result = await db.query("SELECT key_name, content FROM site_content");
    const data = {};

    // Converte cada linha em objeto JS (já vem como JSON do PostgreSQL)
    result.rows.forEach((row) => {
      data[row.key_name] = row.content;
    });

    // Buscar imagens do portfolio
    const portfolioRes = await db.query(
      `SELECT id, image_url, title, category, grid_size, description 
       FROM portfolio_images 
       ORDER BY id ASC`
    );

    data.portfolio = portfolioRes.rows.map((p) => ({
      id: p.id,
      url: p.image_url || "https://placehold.co/150x150",
      titulo: p.title || "",
      category: p.category || "",
      grid_size: p.grid_size || "1x1",
      descricao: p.description || "",
    }));

    res.json(data);
  } catch (err) {
    console.error("Erro ao buscar conteúdo:", err);
    res.status(500).json({ error: "Erro ao buscar conteúdo" });
  }
}

// PUT conteúdo
async function upsertContent(req, res) {
  try {
    const payload = req.body;

    // Atualiza site_content
    for (const key in payload) {
      if (key !== "portfolio") {
        const value = payload[key];

        // Se o valor já for string, transforma em objeto antes de salvar
        const jsonValue = typeof value === "string" ? { value } : value;

        await db.query(
          `UPDATE site_content SET content = $1 WHERE key_name = $2`,
          [JSON.stringify(jsonValue), key]
        );
      }
    }

    // Atualiza portfolio_images
    if (payload.portfolio && Array.isArray(payload.portfolio)) {
      for (const item of payload.portfolio) {
        if (item.id) {
          // Atualiza existente
          await db.query(
            `UPDATE portfolio_images SET image_url=$1, title=$2, category=$3, grid_size=$4, description=$5 WHERE id=$6`,
            [
              item.url,
              item.titulo,
              item.category,
              item.grid_size,
              item.descricao,
              item.id,
            ]
          );
        } else {
          // Insere novo
          await db.query(
            `INSERT INTO portfolio_images (image_url, title, category, grid_size, description) VALUES ($1,$2,$3,$4,$5)`,
            [
              item.url,
              item.titulo,
              item.category,
              item.grid_size,
              item.descricao,
            ]
          );
        }
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Erro ao salvar conteúdo:", err);
    res.status(500).json({ error: "Erro ao salvar conteúdo" });
  }
}

module.exports = { getContent, upsertContent };
