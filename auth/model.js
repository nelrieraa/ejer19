const db = require('../db');
const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

async function findByUsername(username) {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ username, password, email }) {
  const [result] = await db.query(
    'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
    [username, md5(password), email]
  );
  return result.insertId;
}

async function findByCredentials(username, password) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, md5(password)]
  );
  return rows[0] || null;
}

module.exports = { findByUsername, findById, create, findByCredentials };
