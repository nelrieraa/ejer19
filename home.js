const { layout } = require('./layout');

function home(req, res) {
  res.send(layout('Inicio', `
    <div class="hero">
      <p class="hero-tag">// plataforma de portafolios</p>
      <h1 class="hero-title">Muestra tu trabajo<br>al mundo</h1>
      <p class="hero-sub">Crea tu portafolio profesional en segundos.<br>Comparte tus proyectos y redes sociales.</p>
      <div class="hero-actions">
        <a href="/register" class="btn btn-primary btn-lg">Crear mi portafolio</a>
        <a href="/login" class="btn btn-ghost btn-lg">Iniciar sesión</a>
      </div>
    </div>`, req.session));
}

module.exports = { home };
