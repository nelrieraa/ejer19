const db = require('../db');

async function getUserById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
}

async function updateProfile(userId, { bio, email, photo }) {
  await db.query('UPDATE users SET bio=?, email=?, photo=? WHERE id=?', [bio, email, photo, userId]);
}

async function getProjects(userId) {
  const [rows] = await db.query('SELECT * FROM projects WHERE user_id=? ORDER BY id DESC', [userId]);
  return rows;
}

async function getProjectById(id, userId) {
  const [rows] = await db.query('SELECT * FROM projects WHERE id=? AND user_id=?', [id, userId]);
  return rows[0] || null;
}

async function addProject({ title, description, repo_url, live_url, user_id }) {
  await db.query(
    'INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES (?,?,?,?,?)',
    [title, description, repo_url, live_url, user_id]
  );
}

async function updateProject(id, userId, { title, description, repo_url, live_url }) {
  await db.query(
    'UPDATE projects SET title=?, description=?, repo_url=?, live_url=? WHERE id=? AND user_id=?',
    [title, description, repo_url, live_url, id, userId]
  );
}

async function deleteProject(id, userId) {
  await db.query('DELETE FROM projects WHERE id=? AND user_id=?', [id, userId]);
}

async function getSocialLinks(userId) {
  const [rows] = await db.query('SELECT * FROM social_links WHERE user_id=? ORDER BY platform', [userId]);
  return rows;
}

async function addSocialLink({ platform, url, user_id }) {
  await db.query('INSERT INTO social_links (platform, url, user_id) VALUES (?,?,?)', [platform, url, user_id]);
}

async function deleteSocialLink(id, userId) {
  await db.query('DELETE FROM social_links WHERE id=? AND user_id=?', [id, userId]);
}

module.exports = {
  getUserById, updateProfile,
  getProjects, getProjectById, addProject, updateProject, deleteProject,
  getSocialLinks, addSocialLink, deleteSocialLink,
};
