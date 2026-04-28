const model = require('./model');
const view = require('./view');

async function show(req, res) {
  const user = await model.getUserByUsername(req.params.username);
  if (!user) return res.status(404).send('<h1>Usuario no encontrado</h1><a href="/">Volver</a>');

  const [projects, socialLinks] = await Promise.all([
    model.getProjectsByUserId(user.id),
    model.getSocialLinksByUserId(user.id),
  ]);

  const isOwner = req.session && Number(req.session.userId) === Number(user.id);
  res.send(view.portfolio(user, projects, socialLinks, isOwner, req.session));
}

module.exports = { show };
