const db = require('../db');

async function getUserByUsername(username) {
  const [rows] = await db.query(
    'SELECT id, username, bio, email, photo FROM users WHERE username = ?', [username]
  );
  return rows[0] || null;
}

async function getProjectsByUserId(userId) {
  const [rows] = await db.query(
    'SELECT * FROM projects WHERE user_id = ? ORDER BY id DESC', [userId]
  );
  return rows;
}

async function getSocialLinksByUserId(userId) {
  const [rows] = await db.query(
    'SELECT * FROM social_links WHERE user_id = ? ORDER BY platform', [userId]
  );
  return rows;
}

module.exports = { getUserByUsername, getProjectsByUserId, getSocialLinksByUserId };
