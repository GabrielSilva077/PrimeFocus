// init-db.js
const db = require('./db');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function init(){
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS portfolio_images (
      id SERIAL PRIMARY KEY,
      image_url TEXT NOT NULL,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      grid_size VARCHAR(20) DEFAULT '1x1',
      description TEXT,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS site_content (
      id SERIAL PRIMARY KEY,
      key_name VARCHAR(100) UNIQUE NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT now()
    );
  `);

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (adminUser && adminPass) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(adminPass, salt);
    try {
      await db.query(
        `INSERT INTO users (username, password_hash) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING`,
        [adminUser, hash]
      );
      console.log('Admin criado ou já existia.');
    } catch (err) {
      console.error('Erro criando admin', err);
    }
  } else {
    console.log('Não foi fornecido ADMIN_USERNAME/ADMIN_PASSWORD no .env');
  }

  console.log('Init DB concluído.');
  process.exit(0);
}

init().catch(err=>{
  console.error(err);
  process.exit(1);
});
