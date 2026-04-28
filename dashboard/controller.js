const model = require('./model');
const view = require('./view');

async function showDashboard(req, res) {
  const userId = req.session.userId;
  const [user, projects, socialLinks] = await Promise.all([
    model.getUserById(userId),
    model.getProjects(userId),
    model.getSocialLinks(userId),
  ]);
  res.send(view.dashboard(user, projects, socialLinks, req.session));
}

async function updateProfile(req, res) {
  const { bio, email, photo } = req.body;
  await model.updateProfile(req.session.userId, {
    bio: bio || '', email: email || '', photo: photo || '',
  });
  res.redirect('/dashboard');
}

async function addProject(req, res) {
  const { title, description, repo_url, live_url } = req.body;
  if (!title?.trim()) return res.redirect('/dashboard');
  await model.addProject({
    title: title.trim(),
    description: description?.trim() || '',
    repo_url: repo_url?.trim() || '',
    live_url: live_url?.trim() || '',
    user_id: req.session.userId,
  });
  res.redirect('/dashboard');
}

async function showEditProject(req, res) {
  const project = await model.getProjectById(req.params.id, req.session.userId);
  if (!project) return res.status(403).send('<h1>No autorizado o no encontrado</h1><a href="/dashboard">Volver</a>');
  res.send(view.editProject(project, req.session));
}

async function saveProject(req, res) {
  const { id, title, description, repo_url, live_url } = req.body;
  if (!title?.trim()) return res.redirect('/dashboard');
  await model.updateProject(id, req.session.userId, {
    title: title.trim(),
    description: description?.trim() || '',
    repo_url: repo_url?.trim() || '',
    live_url: live_url?.trim() || '',
  });
  res.redirect('/dashboard');
}

async function deleteProject(req, res) {
  await model.deleteProject(req.params.id, req.session.userId);
  res.redirect('/dashboard');
}

async function addSocialLink(req, res) {
  const { platform, url } = req.body;
  if (!platform?.trim() || !url?.trim()) return res.redirect('/dashboard');
  await model.addSocialLink({
    platform: platform.trim(),
    url: url.trim(),
    user_id: req.session.userId,
  });
  res.redirect('/dashboard');
}

async function deleteSocialLink(req, res) {
  await model.deleteSocialLink(req.params.id, req.session.userId);
  res.redirect('/dashboard');
}

module.exports = {
  showDashboard, updateProfile,
  addProject, showEditProject, saveProject, deleteProject,
  addSocialLink, deleteSocialLink,
};
