// controllers/auth.controller.js
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Dados insuficientes' });

  const result = await db.query('SELECT * FROM users WHERE username=$1', [username]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
}

module.exports = { login };
