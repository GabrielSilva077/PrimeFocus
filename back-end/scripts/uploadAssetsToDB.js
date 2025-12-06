// backend/scripts/uploadAssetsToDB.js
import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // carrega DATABASE_URL

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function uploadAssets() {
  try {
    await client.connect();
    console.log("📦 Conectado ao banco!");

    // ➜ Ajuste o caminho da pasta assets do seu front-end
    const assetsFolder = path.join(process.cwd(), "../front-end/src/assets");

    // ➜ Arquivos que você quer enviar
    const files = [
      "1.png",
      "2.png",
      "3.png",
      "imgSobre.png",
      "planodeFundo.png",
      "cameraicon.png",
      "user.png",
      "award.png",
      "star.png",
      "mail.png",
      "telephone.png",
      "instagram.png",
      "logo.png",
      "cameraPequena.png"
    ];

    for (const filename of files) {
      const filePath = path.join(assetsFolder, filename);

      if (!fs.existsSync(filePath)) {
        console.log(`⚠ Arquivo não encontrado: ${filename}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const base64 = fileBuffer.toString("base64");

      // detecta o tipo automaticamente pela extensão
      const ext = filename.split(".").pop();
      const mimeType =
        ext === "png" ? "image/png" :
        ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
        ext === "svg" ? "image/svg+xml" :
        "application/octet-stream";

      const imageBase64 = `data:${mimeType};base64,${base64}`;

      await client.query(
        `
        INSERT INTO portfolio_images (image_url, title, category)
        VALUES ($1, $2, $3)
        `,
        [imageBase64, filename, "galeria"]
      );

      console.log(`✔ Enviado: ${filename}`);
    }

    console.log("🚀 Todas as imagens foram enviadas com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao enviar imagens:", err);
  } finally {
    await client.end();
    console.log("🔌 Conexão encerrada.");
  }
}

uploadAssets();
