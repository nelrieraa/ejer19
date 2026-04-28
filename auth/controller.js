const model = require('./model');
const view = require('./view');

function showRegister(req, res) {
  if (req.session.userId) return res.redirect('/dashboard');
  res.send(view.register(null, req.session));
}

async function register(req, res) {
  const { username, password, email } = req.body;
  if (!username?.trim() || !password || !email?.trim()) {
    return res.send(view.register('Todos los campos son obligatorios.', req.session));
  }
  const exists = await model.findByUsername(username.trim());
  if (exists) return res.send(view.register('Ese nombre de usuario ya está en uso.', req.session));

  const userId = await model.create({ username: username.trim(), password, email: email.trim() });
  req.session.userId = userId;
  req.session.username = username.trim();
  res.redirect('/dashboard');
}

function showLogin(req, res) {
  if (req.session.userId) return res.redirect('/dashboard');
  res.send(view.login(null, req.session));
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username?.trim() || !password) {
    return res.send(view.login('Introduce usuario y contraseña.', req.session));
  }
  const user = await model.findByCredentials(username.trim(), password);
  if (!user) return res.send(view.login('Usuario o contraseña incorrectos.', req.session));
  req.session.userId = user.id;
  req.session.username = user.username;
  res.redirect('/dashboard');
}

function logout(req, res) {
  req.session = null;
  res.redirect('/login');
}

module.exports = { showRegister, register, showLogin, login, logout };
