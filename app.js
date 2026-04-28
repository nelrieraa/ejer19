require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging → archivo access.log en local, solo consola en Vercel
if (!process.env.VERCEL) {
  const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: logStream }));
}
app.use(morgan('dev'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'devfolio_session',
  keys: [process.env.SESSION_SECRET || 'fallback-secret-change-me'],
  maxAge: 24 * 60 * 60 * 1000,
}));

const { requireAuth } = require('./middleware');
const home = require('./home');
const authController = require('./auth/controller');
const portfolioController = require('./portfolio/controller');
const dashController = require('./dashboard/controller');

// ── Home ──────────────────────────────────────────────
app.get('/', home.home);

// ── Auth ──────────────────────────────────────────────
app.get('/register', authController.showRegister);
app.post('/register', authController.register);
app.get('/login', authController.showLogin);
app.post('/login', authController.login);
app.get('/logout', authController.logout);

// ── Portfolio público ─────────────────────────────────
app.get('/portfolio/:username', portfolioController.show);

// ── Dashboard (privado) ───────────────────────────────
app.get('/dashboard', requireAuth, dashController.showDashboard);
app.post('/dashboard/profile', requireAuth, dashController.updateProfile);

app.post('/dashboard/project/add', requireAuth, dashController.addProject);
app.get('/dashboard/project/edit/:id', requireAuth, dashController.showEditProject);
app.post('/dashboard/project/save', requireAuth, dashController.saveProject);
app.post('/dashboard/project/delete/:id', requireAuth, dashController.deleteProject);

app.post('/dashboard/social/add', requireAuth, dashController.addSocialLink);
app.post('/dashboard/social/delete/:id', requireAuth, dashController.deleteSocialLink);

// ── Error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('<h1>Error interno del servidor</h1><a href="/">Volver al inicio</a>');
});

// ── 404 ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send('<h1>404 — Página no encontrada</h1><a href="/">Volver al inicio</a>');
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 DevFolio corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
